"""Browser smoke tests for dist/, served at '/' (Cloudflare Pages) and under a subpath (GitHub project Pages)."""

from __future__ import annotations

import json
from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from typing import Any
from urllib.parse import urlsplit

from .config import DIST, ROOT, HarnessError


class _PrefixHandler(SimpleHTTPRequestHandler):
    """Static server that mounts dist/ under a prefix and answers misses with 404.html (like both hosts)."""

    prefix = "/"

    def translate_path(self, path: str) -> str:
        request_path = urlsplit(path).path
        if not request_path.startswith(self.prefix):
            return str(Path(self.directory) / "__fuera_del_prefijo__")
        return super().translate_path("/" + request_path[len(self.prefix):])

    def send_error(self, code: int, message: str | None = None, explain: str | None = None) -> None:
        not_found = Path(self.directory) / "404.html"
        if code == HTTPStatus.NOT_FOUND and not_found.exists():
            body = not_found.read_bytes()
            self.send_response(code)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            if self.command != "HEAD":
                self.wfile.write(body)
            return
        super().send_error(code, message, explain)

    def log_message(self, *_args: Any) -> None:
        return


def _serve(dist: Path, prefix: str) -> tuple[ThreadingHTTPServer, str]:
    handler = type("Handler", (_PrefixHandler,), {"prefix": prefix})
    server = ThreadingHTTPServer(("127.0.0.1", 0), partial(handler, directory=str(dist)))
    Thread(target=server.serve_forever, daemon=True).start()
    return server, f"http://127.0.0.1:{server.server_address[1]}{prefix}"


def _targets(dist: Path) -> list[str]:
    catalog = json.loads((dist / "catalog.json").read_text(encoding="utf-8"))
    targets = ["", "methodology.html", "placement.html", "missions/", "capsulas/"]
    targets += [item for item in ("casos/", "salud/", "curso/", "curso/?vista=casos") if (dist / item.split("?")[0] / "index.html").exists()]
    first_case = sorted((dist / "capsulas" / "cases").glob("*.html"))
    if first_case:
        targets.append(first_case[0].relative_to(dist).as_posix())
    targets += [level["entrypoint"] for level in catalog["levels"]]
    return targets


def _check_page(page, base: str, target: str, origin: str) -> list[str]:
    problems: list[str] = []
    console_errors: list[tuple[str, str]] = []
    failed_local: list[str] = []

    def on_console(message) -> None:
        if message.type == "error":
            console_errors.append((message.text, (message.location or {}).get("url", "")))

    def on_response(response) -> None:
        if response.url.startswith(origin) and response.status >= 400:
            failed_local.append(f"{response.status} {response.url[len(origin):]}")

    page.on("console", on_console)
    page.on("pageerror", lambda error: problems.append(f"error de JavaScript: {error}"))
    page.on("response", on_response)
    response = page.goto(base + target, wait_until="networkidle")
    if response is None or response.status >= 400:
        problems.append(f"HTTP {response.status if response else 'sin respuesta'}")
    if not page.title().strip():
        problems.append("título vacío")
    problems += [f"recurso local no disponible: {item}" for item in failed_local]
    for text, url in console_errors:
        external = url and not url.startswith(origin)
        if not external and not (text.startswith("Failed to load resource") and not failed_local):
            problems.append(f"consola: {text}")
    page.remove_listener("console", on_console)
    page.remove_listener("response", on_response)
    return [f"{target or '(inicio)'}: {problem}" for problem in problems]


def _check_shell(page, base: str, prefix: str, levels: list[dict[str, Any]]) -> list[str]:
    """The course shell lists every level, opens one from the URL and switches views in its stage."""
    problems: list[str] = []
    page.goto(base + "curso/?nivel=3", wait_until="networkidle")
    listed = page.locator("#levelList [data-level]").count()
    if listed != len(levels):
        problems.append(f"[{prefix}] curso/: {listed} niveles en la barra lateral, se esperaban {len(levels)}")
    frame_src = page.locator("#courseFrame").get_attribute("src") or ""
    if "labs/level-3/" not in frame_src or page.locator("#levelList [data-level='3'].active").count() != 1:
        problems.append(f"[{prefix}] curso/?nivel=3: el escenario no abrió el Nivel 3")
    page.locator("[data-view='casos']").first.click()
    page.wait_for_load_state("networkidle")
    if "casos/index.html" not in (page.locator("#courseFrame").get_attribute("src") or "") or "vista=casos" not in page.url:
        problems.append(f"[{prefix}] curso/: la vista Banco de casos no se abrió en el escenario")
    return problems


def run(base_paths: list[str] | None = None, root: Path = ROOT, dist: Path | None = None) -> dict[str, Any]:
    from playwright.sync_api import sync_playwright

    dist = (dist or (root / "dist")).resolve()
    if not (dist / "index.html").exists():
        raise HarnessError("dist/ no existe; ejecuta `python -m harness build`.")
    base_paths = base_paths or ["/", "/mvp-ds-course/"]
    missions = json.loads((dist / "missions.json").read_text(encoding="utf-8"))["missions"]
    targets = _targets(dist)
    failures: list[str] = []
    results: dict[str, Any] = {}

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch()
        for prefix in base_paths:
            prefix = "/" + prefix.strip("/") + "/" if prefix.strip("/") else "/"
            server, base = _serve(dist, prefix)
            origin = base[: base.index("/", len("http://"))]
            try:
                context = browser.new_context(viewport={"width": 1280, "height": 800})
                context.route("**/*", lambda route: route.continue_() if route.request.url.startswith(origin) else route.abort())
                page = context.new_page()
                for target in targets:
                    failures += [f"[{prefix}] {item}" for item in _check_page(page, base, target, origin)]

                levels = json.loads((dist / "catalog.json").read_text(encoding="utf-8"))["levels"]
                if (dist / "curso" / "index.html").exists() and levels:
                    failures += _check_shell(page, base, prefix, levels)

                page.goto(base + "missions/", wait_until="networkidle")
                cards = page.locator("[data-mission-id]").count()
                if cards != len(missions):
                    failures.append(f"[{prefix}] missions/: {cards} tarjetas, se esperaban {len(missions)}")
                if not missions and "Todavía no hay misiones" not in page.locator("#missionList").inner_text():
                    failures.append(f"[{prefix}] missions/: falta el estado vacío")

                missing = page.goto(base + "no-existe/", wait_until="load")
                if missing is None or missing.status != 404 or "Esta página no existe" not in page.content():
                    failures.append(f"[{prefix}] no-existe/: se esperaba la página 404 propia con estado 404")

                mobile = browser.new_context(viewport={"width": 390, "height": 844})
                mobile.route("**/*", lambda route: route.continue_() if route.request.url.startswith(origin) else route.abort())
                mobile_page = mobile.new_page()
                for target in ["", "missions/", "capsulas/"] + [item for item in ("casos/", "salud/", "curso/") if (dist / item / "index.html").exists()]:
                    mobile_page.goto(base + target, wait_until="networkidle")
                    if mobile_page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth"):
                        failures.append(f"[{prefix}] {target or '(inicio)'}: desbordamiento horizontal en móvil")
                mobile.close()
                context.close()
                results[prefix] = len(targets) + 2
            finally:
                server.shutdown()
        browser.close()

    if failures:
        raise HarnessError("Smoke tests fallidos:\n- " + "\n- ".join(failures))
    return {"páginas_por_subruta": results}
