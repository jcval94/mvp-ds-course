"""Read-only external link audit. Network failures never participate in `all`."""

from __future__ import annotations

import json
import re
import socket
from http.client import HTTPException
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import parse_qsl, unquote, urldefrag, urljoin, urlsplit, urlunsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

from .config import ROOT, HarnessError, load_course

USER_AGENT = "LearningLabs-LinkChecker/1.0 (+https://github.com/jcval94/mvp-ds-course)"
STATIC_URL = re.compile(r'''["'`]((?:https?:)?//[^\s"'`<>]+)["'`]''')
CSS_URL = re.compile(r'''url\(\s*["']?((?:https?:)?//[^\s"')]+)''')
LOCAL_DATA = re.compile(r'''["']([^\s"'<>]+\.(?:js|json)(?:\?[^\s"'<>]*)?)["']''')
ACTION_PATH = re.compile(
    r"(?:^|/)(?:forms?|formResponse|submit|logout|signout|unsubscribe|delete|remove|"
    r"revoke|reset|checkout|oauth|authorize|callback|login|signin|surveys?|"
    r"confirm|activate|verify|signup|register|subscribe)(?:[/.?_-]|$)", re.I
)
FORM_HOSTS = {"forms.gle", "forms.office.com", "form.jotform.com", "form.typeform.com"}
TRANSIENT = {408, 425, 429, 500, 502, 503, 504}


def normalize(value: str) -> str | None:
    value = unescape(value.strip()).replace(r"\/", "/")
    if value.startswith("//"):
        value = "https:" + value
    try:
        parts = urlsplit(urldefrag(value)[0])
        if parts.scheme.lower() not in {"http", "https"} or not parts.hostname:
            return None
        # Accessing port catches malformed URLs before an HTTP request.
        _ = parts.port
        return urlunsplit((parts.scheme.lower(), parts.netloc.lower(), parts.path or "/", parts.query, ""))
    except ValueError:
        return None


class Collector(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.urls: list[tuple[str, int]] = []
        self.form_targets: set[str] = set()
        self.script = False

    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        line = self.getpos()[0]
        if tag == "script":
            self.script = True
        for key in ("action", "formaction"):
            if data.get(key):
                self.form_targets.add(data[key])
        for key in ("href", "src", "poster", "data"):
            if data.get(key) and not (tag == "link" and "canonical" in (data.get("rel") or "").split()):
                self.urls.append((data[key], line))
        for candidate in (data.get("srcset") or "").split(","):
            if candidate.strip():
                self.urls.append((candidate.strip().split()[0], line))

    handle_startendtag = handle_starttag

    def handle_endtag(self, tag):
        if tag == "script":
            self.script = False

    def handle_data(self, text):
        # Inline script URL literals used by Colab/source buttons, without JS execution.
        if self.script:
            for match in STATIC_URL.finditer(text):
                self.urls.append((match[1], self.getpos()[0] + text.count("\n", 0, match.start())))


def extract(dist: Path, site_url: str = "") -> tuple[dict[str, list[str]], set[str]]:
    """Deduplicate requests, keeping every source file and line for each URL."""
    found: dict[str, set[str]] = {}
    parents: dict[str, set[str]] = {}
    form_targets: set[str] = set()
    own_host = urlsplit(site_url).netloc.lower()
    for path in sorted(dist.rglob("*")):
        if not path.is_file() or path.suffix.lower() not in {".html", ".svg", ".js", ".json", ".css"}:
            continue
        text = path.read_text(encoding="utf-8", errors="replace")
        relative = path.relative_to(dist).as_posix()
        if path.suffix.lower() in {".html", ".svg"}:
            collector = Collector()
            collector.feed(text)
            candidates = collector.urls
            form_targets.update(filter(None, (normalize(url) for url in collector.form_targets)))
        else:
            candidates = [(m[1], text.count("\n", 0, m.start()) + 1)
                          for m in STATIC_URL.finditer(text)]
        if path.suffix.lower() in {".html", ".css"}:
            candidates += [(m[1], text.count("\n", 0, m.start()) + 1) for m in CSS_URL.finditer(text)]
        # Trace local JS/JSON references back to HTML, without executing code.
        # This also handles a case's medios.json and the shared catalog.json.
        for value in [url for url, _ in candidates] + LOCAL_DATA.findall(text):
            if not value or urlsplit(value).scheme or value.startswith(("//", "#")):
                continue
            target = (path.parent / urlsplit(value).path).resolve()
            if target.is_file() and target.is_relative_to(dist.resolve()):
                parents.setdefault(target.relative_to(dist.resolve()).as_posix(), set()).add(relative)
        for value, line in candidates:
            url = normalize(value)
            if not url or (own_host and urlsplit(url).netloc == own_host):
                continue
            # XML namespace identifiers are not navigational links/resources.
            if url.startswith(("http://www.w3.org/", "https://www.w3.org/")) and path.suffix.lower() == ".js":
                continue
            found.setdefault(url, set()).add(f"{relative}:{line}")

    def html_parents(source):
        pending, seen, pages = [source], set(), set()
        while pending:
            current = pending.pop()
            if current in seen:
                continue
            seen.add(current)
            if current.endswith(".html"):
                pages.add(current)
            else:
                pending.extend(parents.get(current, ()))
        return pages

    traced = {}
    for url, sources in sorted(found.items()):
        occurrences = set()
        for source in sources:
            filename = source.rsplit(":", 1)[0]
            pages = html_parents(filename) if not filename.endswith(".html") else set()
            occurrences.update(f"{page} ({source})" for page in pages)
            if not pages:
                occurrences.add(source)
        traced[url] = sorted(occurrences)
    return traced, form_targets


def load_ignores(path: Path) -> dict[str, str]:
    rules = {}
    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        host, separator, comment = line.partition("#")
        host = host.strip().lower()
        if (not separator or not comment.strip() or not re.fullmatch(r"[a-z0-9]+(?:[.-][a-z0-9]+)*", host)):
            raise HarnessError(f"{path.name}:{line_number}: usa dominio exacto # motivo de la excepción")
        if host in rules:
            raise HarnessError(f"{path.name}:{line_number}: dominio duplicado: {host}")
        rules[host] = comment.strip()
    return rules


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class Checker:
    def __init__(self, *, timeout=10.0, retries=2, pause=0.5, ignores=None, form_targets=None):
        if timeout <= 0 or pause < 0 or retries not in range(3):
            raise HarnessError("timeout debe ser positivo; pause >= 0; retries entre 0 y 2")
        self.timeout, self.retries, self.pause = timeout, retries, pause
        self.ignores = ignores or {}
        self.form_targets = form_targets or set()
        self.locks: dict[str, threading.Lock] = {}
        self.last: dict[str, float] = {}
        self.guard = threading.Lock()

    def exclusion(self, url):
        parts = urlsplit(url)
        host = parts.hostname or ""
        if parts.username or parts.password:
            return "skipped", "URL con credenciales; no se envía"
        if any(token in url for token in ("${", "{{", "…")):
            return "skipped", "URL dinámica o placeholder; requiere revisión manual"
        action_query = any(key.lower() in {"action", "do", "op", "operation", "unsubscribe", "delete",
                                          "remove", "submit", "logout", "signout", "confirm", "activate"}
                           for key, _ in parse_qsl(parts.query))
        if url in self.form_targets or host in FORM_HOSTS or ACTION_PATH.search(unquote(parts.path)) or action_query:
            return "skipped", "Formulario o ruta de acción; no se envía"
        if host in self.ignores:
            return "ignored", self.ignores[host]
        return None

    def request(self, url, method):
        host = urlsplit(url).hostname
        with self.guard:
            lock = self.locks.setdefault(host, threading.Lock())
        with lock:
            delay = self.pause - (time.monotonic() - self.last.get(host, -float("inf")))
            if delay > 0:
                time.sleep(delay)
            self.last[host] = time.monotonic()
            headers = {"User-Agent": USER_AGENT, "Accept": "*/*"}
            if method == "GET":
                headers["Range"] = "bytes=0-0"
            try:
                # No cookies, credentials, JS, form submissions or response body download.
                with build_opener(NoRedirect()).open(Request(url, headers=headers, method=method), timeout=self.timeout) as response:
                    return response.status, response.headers.get("Location"), ""
            except HTTPError as error:
                with error:
                    return error.code, error.headers.get("Location"), "HTTP " + str(error.code)
            except (TimeoutError, socket.timeout):
                return None, None, "timeout"
            except URLError as error:
                return None, None, "timeout" if isinstance(error.reason, (TimeoutError, socket.timeout)) else str(error.reason)
            except (OSError, ValueError, HTTPException) as error:
                return None, None, str(error)

    def follow(self, url, method):
        seen = set()
        current = url
        for _ in range(9):
            excluded = self.exclusion(current)
            if excluded:
                return {"status": excluded[0], "code": None, "detail": excluded[1], "final_url": current}
            if current in seen:
                break
            seen.add(current)
            code, location, detail = self.request(current, method)
            if code in {301, 302, 303, 307, 308} and location:
                next_url = normalize(urljoin(current, location))
                if not next_url:
                    return {"status": "failed", "code": code, "detail": "Redirección fuera de HTTP(S)", "final_url": current}
                current = next_url
                continue
            return {"status": "ok" if code and 200 <= code < 300 else "failed",
                    "code": code, "detail": detail or ("Redirección sin destino" if code and 300 <= code < 400 else ""), "final_url": current}
        return {"status": "failed", "code": None, "detail": "Bucle o límite de redirecciones", "final_url": current}

    def check(self, url):
        for attempt in range(self.retries + 1):
            result = self.follow(url, "HEAD")
            if result["status"] == "failed":
                result = self.follow(url, "GET")
            result["attempts"] = attempt + 1
            if result["status"] != "failed" or (result["code"] is not None and result["code"] not in TRANSIENT):
                break
        return {"url": url, **result}


def audit(dist: Path, *, site_url="", workers=4, **options):
    if not 1 <= workers <= 16:
        raise HarnessError("workers debe estar entre 1 y 16")
    urls, form_targets = extract(dist, site_url)
    checker = Checker(form_targets=form_targets, **options)
    with ThreadPoolExecutor(max_workers=workers) as executor:
        results = list(executor.map(checker.check, urls))
    for result in results:
        result["pages"] = urls[result["url"]]
    return {"checked_at": datetime.now(timezone.utc).isoformat(), "user_agent": USER_AGENT,
            "summary": {status: sum(r["status"] == status for r in results)
                        for status in ("ok", "failed", "ignored", "skipped")}, "results": results}


def markdown(report):
    def cell(value):
        return str(value).replace("|", "&#124;").replace("\n", " ").replace("<", "&lt;").replace(">", "&gt;")
    lines = ["<!-- harness-external-links -->", "# Revisión de enlaces externos", "",
             f"Fecha UTC: {report['checked_at']}", "", "Resumen: " + json.dumps(report["summary"], ensure_ascii=False), "",
             "HEAD con fallback GET; sin sesión ni formularios. Un 401/403 o un error de red requiere revisión manual; no demuestra que el recurso haya desaparecido.", "",
             "| URL | Página/archivo de dist y línea | Código | Resultado | Detalle |", "| --- | --- | --- | --- | --- |"]
    for result in report["results"]:
        if result["status"] == "ok":
            continue
        for page in result["pages"]:
            lines.append("| " + " | ".join(map(cell, (result["url"], page, result["code"] or "sin respuesta", result["status"], result["detail"]))) + " |")
    return "\n".join(lines) + "\n"


def run(root=ROOT, *, rebuild=False, timeout=10.0, retries=2, pause=0.5, workers=4,
        report_path=None, markdown_path=None):
    dist = root / "dist"
    if rebuild or not (dist / "index.html").is_file():
        from .build import build
        build(root)
    course = load_course(root)
    report = audit(dist, site_url=course.get("build", {}).get("base_url", ""), timeout=timeout,
                   retries=retries, pause=pause, workers=workers, ignores=load_ignores(root / "harness/links_ignore.txt"))
    for path, content in ((report_path, json.dumps(report, ensure_ascii=False, indent=2) + "\n"),
                          (markdown_path, markdown(report))):
        if path:
            path = Path(path)
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(content, encoding="utf-8")
    return report
