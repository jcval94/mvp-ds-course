"""External audits use a loopback HTTP server, never an Internet service."""

import json
import threading
import time
import shutil
import subprocess
from collections import Counter
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import pytest
import yaml

from harness import links
from harness.config import HarnessError


@pytest.fixture
def server():
    requests = []

    class Handler(BaseHTTPRequestHandler):
        def do_HEAD(self):
            self.reply()

        def do_GET(self):
            self.reply()

        def do_POST(self):
            pytest.fail("The checker must never POST")

        def reply(self):
            requests.append((self.command, self.path, self.headers.get('User-Agent'), self.headers.get('Range')))
            if self.path == '/slow':
                time.sleep(0.15)
            code = {'/missing': 404, '/head-rejected': 405 if self.command == 'HEAD' else 200,
                    '/redirect': 302, '/loop': 302, '/to-form': 302,
                    '/busy': 503, '/no-location': 302}.get(self.path, 200)
            self.send_response(code)
            if self.path in {'/redirect', '/loop', '/to-form'}:
                self.send_header('Location', {'/redirect': '/ok', '/loop': '/loop', '/to-form': '/form/submit'}[self.path])
            self.send_header('Content-Length', '0')
            self.end_headers()

        def log_message(self, *_):
            pass

    httpd = ThreadingHTTPServer(('127.0.0.1', 0), Handler)
    httpd.daemon_threads = True
    worker = threading.Thread(target=httpd.serve_forever, daemon=True)
    worker.start()
    yield f'http://127.0.0.1:{httpd.server_port}', requests
    httpd.shutdown()
    httpd.server_close()
    worker.join()


def test_healthy_head_and_identifiable_agent(server):
    base, requests = server
    result = links.Checker(pause=0).check(base + '/ok')
    assert result['status'] == 'ok' and result['code'] == 200
    assert [(r[0], r[1]) for r in requests] == [('HEAD', '/ok')]
    assert requests[0][2] == links.USER_AGENT


def test_404_uses_get_fallback_and_is_reported(server, tmp_path):
    base, requests = server
    (tmp_path / 'index.html').write_text(f'<a href="{base}/missing">Abrir</a>')
    report = links.audit(tmp_path, pause=0)
    result = report['results'][0]
    assert result['status'] == 'failed' and result['code'] == 404
    assert result['pages'] == ['index.html:1']
    assert [r[0] for r in requests] == ['HEAD', 'GET']
    assert requests[1][3] == 'bytes=0-0'
    assert '| 404 | failed |' in links.markdown(report)


def test_get_can_recover_rejected_head(server):
    base, requests = server
    result = links.Checker(pause=0).check(base + '/head-rejected')
    assert result['status'] == 'ok' and result['code'] == 200
    assert [r[0] for r in requests] == ['HEAD', 'GET']


def test_redirect_is_followed_and_final_status_is_reported(server):
    base, requests = server
    result = links.Checker(pause=0).check(base + '/redirect')
    assert result['status'] == 'ok' and result['final_url'] == base + '/ok'
    assert [r[1] for r in requests] == ['/redirect', '/ok']


def test_timeout_has_at_most_two_retries(server):
    base, requests = server
    result = links.Checker(timeout=0.02, retries=2, pause=0).check(base + '/slow')
    assert result['status'] == 'failed' and result['code'] is None
    assert result['detail'] == 'timeout' and result['attempts'] == 3
    assert Counter(r[0] for r in requests) == {'HEAD': 3, 'GET': 3}


def test_transient_http_failure_has_bounded_retries(server):
    base, requests = server
    result = links.Checker(retries=2, pause=0).check(base + '/busy')
    assert result['code'] == 503 and result['attempts'] == 3
    assert len(requests) == 6
    with pytest.raises(HarnessError):
        links.Checker(retries=3)


def test_domain_exception_sends_no_request_and_requires_comment(server, tmp_path):
    base, requests = server
    path = tmp_path / 'ignore.txt'
    path.write_text('127.0.0.1 # Simula bloqueo de robots\n')
    checker = links.Checker(ignores=links.load_ignores(path))
    result = checker.check(base + '/missing')
    assert result['status'] == 'ignored' and result['code'] is None
    assert not requests
    assert checker.exclusion('https://evil127.0.0.1/test') is None
    path.write_text('127.0.0.1\n')
    with pytest.raises(HarnessError, match='motivo'):
        links.load_ignores(path)


def test_forms_are_not_requested_even_via_redirect(server, tmp_path):
    base, requests = server
    (tmp_path / 'index.html').write_text(
        f'<form action="{base}/custom-endpoint"><button>Enviar</button></form>'
        f'<a href="{base}/custom-endpoint">Formulario</a>'
        f'<a href="{base}/to-form">Redirección</a>'
        f'<a href="{base}/?unsubscribe=1">Acción por query</a>'
        '<a href="https://forms.gle/example">Formulario externo</a>'
    )
    report = links.audit(tmp_path, pause=0)
    assert all(r['status'] == 'skipped' for r in report['results'])
    assert [r[1] for r in requests] == ['/to-form']


def test_redirect_loops_and_missing_location_are_errors(server):
    base, _ = server
    checker = links.Checker(retries=0, pause=0)
    assert 'Bucle' in checker.check(base + '/loop')['detail']
    result = checker.check(base + '/no-location')
    assert result['status'] == 'failed' and result['code'] == 302


def test_pause_applies_to_head_get_and_redirects(server, monkeypatch):
    base, requests = server
    now = [100.0]
    pauses = []

    def sleep(seconds):
        pauses.append(seconds)
        now[0] += seconds

    monkeypatch.setattr(links.time, 'monotonic', lambda: now[0])
    monkeypatch.setattr(links.time, 'sleep', sleep)
    checker = links.Checker(pause=0.5)
    checker.check(base + '/redirect')
    checker.check(base + '/missing')
    assert len(requests) == 4
    assert pauses == [0.5, 0.5, 0.5]


def test_extraction_deduplicates_and_finds_static_button_and_source_urls(tmp_path):
    (tmp_path / 'index.html').write_text('''<head><link rel="canonical" href="https://own.example/"></head>
<a href="https://example.org/doc#one">Doc</a><img src="//cdn.example/image.png">
<script>const colab = 'https://example.org/notebook';</script>
<form action="https://forms.example/send"><button formaction="https://forms.example/alternate">Enviar</button></form>
<!-- <a href="https://fake.example/">Fake</a> -->''')
    (tmp_path / 'other.html').write_text('<a href="https://example.org/doc#two">Doc</a>')
    (tmp_path / 'case.js').write_text("const source = 'https://example.org/paper';")
    (tmp_path / 'data.json').write_text(json.dumps({'source': 'https://example.org/data.csv'}))
    (tmp_path / 'style.css').write_text('body{background:url(https://cdn.example/bg.png)}')
    urls, forms = links.extract(tmp_path, 'https://own.example')
    assert urls['https://example.org/doc'] == ['index.html:2', 'other.html:1']
    assert len(urls) == 6
    assert 'https://cdn.example/image.png' in urls
    assert 'https://example.org/notebook' in urls
    assert forms == {'https://forms.example/send', 'https://forms.example/alternate'}


def test_command_builds_if_missing_and_reuses_existing_dist(tmp_path, monkeypatch):
    from harness import build
    (tmp_path / 'harness').mkdir()
    (tmp_path / 'harness/links_ignore.txt').write_text('# No exceptions\n')
    (tmp_path / 'course.yaml').write_text(yaml.safe_dump({'build': {}}))
    builds = []

    def fake_build(root):
        builds.append(root)
        (root / 'dist').mkdir(exist_ok=True)
        (root / 'dist/index.html').write_text('<h1>Sin enlaces externos</h1>')

    monkeypatch.setattr(build, 'build', fake_build)
    for rebuild in [False, False, True]:
        report = links.run(tmp_path, rebuild=rebuild, report_path=tmp_path / 'out/report.json')
        assert report['summary']['failed'] == 0
    assert builds == [tmp_path, tmp_path]
    assert json.loads((tmp_path / 'out/report.json').read_text())['results'] == []


def test_source_files_are_traced_back_to_their_html_page(tmp_path):
    (tmp_path / 'index.html').write_text('<script src="case.js"></script>')
    (tmp_path / 'case.js').write_text('const data = "media.json";')
    (tmp_path / 'media.json').write_text('{"source":"https://example.org/paper"}')
    urls, _ = links.extract(tmp_path)
    assert urls['https://example.org/paper'] == ['index.html (media.json:1)']


@pytest.mark.parametrize('failures,expected', [(0, 0), (1, 1)])
def test_cli_exit_code_and_options(monkeypatch, failures, expected, capsys):
    from harness.__main__ import main
    seen = {}

    def fake_run(**kwargs):
        seen.update(kwargs)
        return {'checked_at': 'test', 'summary': {'failed': failures}, 'results': []}

    monkeypatch.setattr(links, 'run', fake_run)
    assert main(['links', '--timeout', '2', '--retries', '1', '--pause', '0.2', '--workers', '2']) == expected
    assert seen['timeout'] == 2 and seen['retries'] == 1 and seen['pause'] == 0.2 and seen['workers'] == 2
    assert 'Revisión de enlaces externos' in capsys.readouterr().out


def test_single_issue_lifecycle_offline():
    node = shutil.which('node')
    if not node:
        pytest.skip('Node.js solo se requiere para probar el script de GitHub Actions')
    script = Path(__file__).with_name('links_issue.test.cjs')
    result = subprocess.run([node, '--test', str(script)], capture_output=True, text=True)
    assert result.returncode == 0, result.stdout + result.stderr
