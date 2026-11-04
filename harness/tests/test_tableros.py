"""Tableros con actividad ficticia; sin Supabase ni cuentas reales."""
import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlparse

import pytest
from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[2]


@pytest.fixture(params=[("admin", 1440), ("docente", 390)])
def tablero(request):
    role, width = request.param
    now = datetime.now(timezone.utc)
    iso = lambda n: (now + timedelta(minutes=n)).isoformat()
    students = [{"id": str(i), "alumno_id": f"FICTICIO-{i}", "nombre": f"Persona ficticia {i}", "grupo": g}
                for i, g in [(1, "A"), (2, "A"), (3, "B")]]
    events = [{"id": 1, "usuario": "1", "caso": "demo", "tipo": "seccion", "seccion": "inicio", "creado": iso(-20)},
              {"id": 2, "usuario": "1", "caso": "demo", "tipo": "completo", "creado": iso(-10)},
              {"id": 3, "usuario": "3", "caso": "demo", "tipo": "completo", "creado": iso(-10)},
              {"id": 4, "usuario": "2", "caso": "demo", "tipo": "completo", "creado": iso(-180)}]
    attempts = [{"id": 10 + i, "usuario": "1", "caso": "demo", "reto": "practica", "respuesta": "opcion ficticia", "acierto": False, "intento": i, "creado": iso(-15 + i)} for i in [1, 2, 3]]
    cases = [{"id": "demo", "titulo": "Caso de prueba", "modulo": 1, "secciones": ["inicio", "cierre"]}]
    classes = [{"id": 1, "grupo": "A", "caso": "demo", "inicio": iso(-60), "duracion_min": 120, "tema": "Clase ficticia"}]
    groups = [{"id": "A", "nombre": "Grupo ficticio A", "activo": True}, {"id": "B", "nombre": "Grupo ficticio B", "activo": True}]
    config = dict(students=students, events=events, attempts=attempts, cases=cases, classes=classes, groups=groups)
    stub = r"""
    window.calls = []; window.failEvents = false; window.failAttempts = false;
    const api = async path => {
      calls.push(path);
      if (path.includes('/auth/')) return {id: 'profe', email: 'profe@example.invalid'};
      if (path.includes('mi_rol')) return {admin: true, docente: true, grupos: config.groups};
      if (path.includes('docente_alumnos')) return config.students;
      if (path.includes('docente_intentos_tablero')) { if (failAttempts) throw Error('consulta no disponible'); return config.attempts; }
      if (path.includes('/eventos?')) { if (failEvents) throw Error('sin conexión'); return config.events; }
      if (path.includes('/casos?')) return config.cases;
      if (path.includes('/clases?')) return config.classes;
      if (path.includes('/grupos?') || path.includes('admin_grupos')) return config.groups;
      return [];
    };
    window.TDD = {api, todo: api, rpc: name => api('/rpc/' + name), funcion: async () => ({version: 'prueba'}),
      iniciar: () => true, tomarRetorno: () => ({}), entrar: () => {}, cerrar: async () => {}, olvidar: () => {}};
    """
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": width, "height": 900})
        page.clock.install()
        errors = []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.add_init_script("window.config = " + json.dumps(config))
        def route(r):
            path = urlparse(r.request.url).path.lstrip("/")
            if path == "sesion.js":
                r.fulfill(body=stub, content_type="application/javascript")
            elif (ROOT / "site" / path).is_file():
                r.fulfill(path=str(ROOT / "site" / path))
            elif path.startswith("design/") and (ROOT / path).is_file():
                r.fulfill(path=str(ROOT / path))
            else:
                r.fulfill(status=404, body="")
        page.route("**/*", route)
        page.goto(f"http://curso.test/{role}.html")
        expect(page.locator("#panel")).to_be_visible()
        page.locator("#tab-tableros").click()
        expect(page.locator(".tablero-matriz")).to_be_visible()
        qa = ROOT / "output" / "qa"
        qa.mkdir(parents=True, exist_ok=True)
        page.screenshot(path=str(qa / f"tableros-{role}-{width}.png"), full_page=True)
        yield page
        assert errors == []
        browser.close()


def test_class_scope_evidence_and_projection(tablero):
    page = tablero
    expect(page.locator(".tablero-matriz tbody tr")).to_have_count(2)
    expect(page.locator(".tablero-kpis .kpi b")).to_have_text(["1/2", "1/2", "0/1"])
    expect(page.locator(".tablero-matriz")).not_to_contain_text("Persona ficticia 3")
    expect(page.locator(".tablero-matriz .visita")).to_have_text("◉ Visitada")
    expect(page.locator("#tableros .alerts")).to_contain_text("3 o más intentos")
    page.locator(".tablero-matriz .visita").click()
    expect(page.locator(".tablero-ficha[open]")).to_contain_text("Sin respuestas abiertas")
    expect(page.locator(".tablero-ficha[open]")).to_contain_text("intento 3")
    page.get_by_role("button", name="Cerrar", exact=True).click()
    page.get_by_role("button", name="Proyectar sin nombres").click()
    expect(page.locator(".tablero-matriz")).to_have_count(0)
    expect(page.locator("#tableros")).not_to_contain_text("Persona ficticia")
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")


def test_missing_evaluation_and_failed_read_are_not_zeroes(tablero):
    page = tablero
    page.evaluate("failAttempts = true")
    page.get_by_role("button", name="Actualizar tablero").click()
    expect(page.locator(".tablero-kpis .kpi b").nth(2)).to_have_text("—")
    expect(page.locator("#tableros [role=status]")).to_contain_text("no disponible")
    page.evaluate("failEvents = true")
    page.get_by_role("button", name="Actualizar tablero").click()
    expect(page.locator("#tableros")).to_contain_text("no se muestran como ceros")
    expect(page.locator(".tablero-kpis")).to_have_count(0)


def test_history_filters_and_empty_group(tablero):
    page = tablero
    page.get_by_label("Vista", exact=True).select_option("historial")
    expect(page.locator(".tablero-kpis .kpi b").nth(0)).to_have_text("3/3")
    page.locator("#fGrupo").select_option("B")
    expect(page.locator(".tablero-matriz tbody tr")).to_have_count(1)
    expect(page.locator(".tablero-matriz")).to_contain_text("Persona ficticia 3")
    expect(page.locator(".tablero-matriz")).not_to_contain_text("Persona ficticia 1")
    page.evaluate("config.students = []")
    page.locator("#recargar").click()
    expect(page.locator("#tableros")).to_contain_text("No hay alumnos")


def test_late_response_does_not_overwrite_current_scope(tablero):
    page = tablero
    page.evaluate("""() => { const original = TDD.todo; window.release = null;
      TDD.todo = async path => { if (path.includes('docente_intentos_tablero') && !window.delayed) {
        window.delayed = true; await new Promise(resolve => window.release = resolve);
      } return original(path); }; }""")
    page.get_by_role("button", name="Actualizar tablero").click()
    page.get_by_label("Vista", exact=True).select_option("historial")
    expect(page.locator(".tablero-matriz tbody tr")).to_have_count(3)
    page.evaluate("release()")
    expect(page.locator(".tablero-matriz tbody tr")).to_have_count(3)


def test_refresh_pauses_outside_tab_and_when_disabled(tablero):
    page = tablero
    count = lambda: page.evaluate("calls.filter(p => p.includes('docente_intentos_tablero')).length")
    before = count()
    page.clock.fast_forward(30001)
    expect(page.get_by_role("button", name="Actualizar tablero")).to_be_enabled()
    assert count() == before + 1
    page.get_by_label("Actualizar cada 30 s").uncheck()
    page.clock.fast_forward(30001)
    assert count() == before + 1
    page.get_by_label("Actualizar cada 30 s").check()
    page.locator("#tab-alumnos").click()
    page.clock.fast_forward(30001)
    assert count() == before + 1


def test_dashboard_accessibility(tablero):
    page = tablero
    page.add_script_tag(path=str(ROOT / "harness/a11y/node_modules/axe-core/axe.min.js"))
    findings = page.evaluate("async () => (await axe.run('#v-tableros')).violations.filter(v => ['serious', 'critical'].includes(v.impact))")
    assert not findings, [(v['id'], [n['target'] for n in v['nodes']]) for v in findings]
