"""Mi avance con datos ficticios y red interceptada, sin cuentas ni base real."""
import mimetypes
from pathlib import Path
from urllib.parse import parse_qs, urlparse

import pytest
from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[2]


def respuesta(texto="Envío nuevo", **cambios):
    return dict(caso="1.1", pregunta="explicacion", texto=texto, nivel=None,
                retro=None, modelo=None, creado="2026-10-02T12:00:00Z") | cambios


@pytest.fixture
def alumno():
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        page = browser.new_page(viewport={"width": 390, "height": 844})
        errores = []
        page.on("pageerror", lambda error: errores.append(str(error)))
        estado = {"respuestas": [], "fallar": False, "consultas": []}

        def interceptar(route):
            url = urlparse(route.request.url)
            path = url.path
            if url.hostname == "127.0.0.1":
                archivo = ROOT / (path.lstrip("/") if path.startswith("/design/") else "site/" + path.lstrip("/"))
                if archivo.is_file():
                    route.fulfill(body=archivo.read_bytes(), content_type=mimetypes.guess_type(str(archivo))[0] or "application/octet-stream")
                else:
                    route.fulfill(status=404)
                return
            datos = []
            if path == "/auth/v1/user":
                datos = {"id": "usuario-ficticio", "email": "prueba@example.invalid"}
            elif path == "/rest/v1/perfiles":
                datos = [{"alumno_id": "PRUEBA", "nombre": "Prueba", "grupo": None}]
            elif path == "/rest/v1/casos":
                datos = [{"id": "1.1", "modulo": 1, "titulo": "Caso de prueba", "secciones": []},
                         {"id": "4.1", "modulo": 4, "titulo": "Otro caso", "secciones": []}]
            elif path == "/rest/v1/respuestas":
                consulta = parse_qs(url.query)
                estado["consultas"].append(consulta)
                if estado["fallar"]:
                    route.fulfill(status=503, json={"message": "Error de prueba"})
                    return
                offset = int(consulta.get("offset", [0])[0])
                limit = int(consulta.get("limit", [1000])[0])
                datos = estado["respuestas"][offset:offset + limit]
            elif path.startswith("/rest/v1/rpc/"):
                datos = None
            else:
                assert path in {"/rest/v1/eventos", "/rest/v1/vista_avance", "/rest/v1/entregas_grupo", "/rest/v1/mensajes_curso"}, path
            if datos is None:
                route.fulfill(body="null", content_type="application/json")
            else:
                route.fulfill(json=datos)

        page.route("**/*", interceptar)
        page.add_init_script("""localStorage.setItem('tdd-sesion', JSON.stringify({
            access_token: 'sesion-ficticia', expires_at: Date.now() + 3600000
        }));""")

        def abrir():
            page.goto("http://127.0.0.1/alumno.html")
            expect(page.locator("#casos .case")).to_have_count(2)

        yield page, estado, abrir
        assert errores == []
        browser.close()


def test_cada_revision_acompana_su_envio_y_conserva_historial(alumno):
    page, estado, abrir = alumno
    anterior = respuesta("Envío anterior") | {"modelo": "revision", "nivel": 0,
                 "retro": "Comentario anterior", "creado": "2026-10-01T12:00:00Z"}
    estado["respuestas"] = [respuesta("<img src=x onerror=alert(1)>"), anterior,
        respuesta("Solo comentario", pregunta="hipotesis_razon") | {"modelo": "revision", "retro": "Comentario sin nivel"},
        respuesta("Otra revisión", pregunta="ejemplo", caso="4.1") | {"modelo": "revision", "nivel": 2}]
    abrir()
    feedback = page.locator("#casos .case").first.locator(".feedback")
    expect(feedback).to_have_attribute("open", "")
    actual = feedback.locator("ul > li").first.locator(":scope > .response")
    expect(actual).to_contain_text("Sin revisar aún")
    expect(actual).not_to_contain_text("Comentario anterior")
    expect(actual).to_contain_text("<img src=x onerror=alert(1)>")
    expect(feedback.locator("img")).to_have_count(0)
    historial = feedback.locator("details")
    historial.locator("summary").focus()
    page.keyboard.press("Enter")
    expect(historial).to_contain_text("Envío anterior")
    expect(historial).to_contain_text("Nivel 0 de 3 · 0 bits")
    expect(historial).to_contain_text("Comentario anterior")
    expect(feedback).to_contain_text("Con comentario")
    expect(feedback).not_to_contain_text("Otra revisión")
    page.select_option("#fModulo", "4")
    expect(page.locator("#casos .feedback")).to_contain_text("Otra revisión")
    expect(page.locator("#casos .feedback")).to_contain_text("Nivel 2 de 3 · 10 bits")
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")


def test_vacio_y_error_son_distintos_y_se_puede_reintentar(alumno):
    page, estado, abrir = alumno
    estado["fallar"] = True
    abrir()
    expect(page.locator("#respuestasError")).to_be_visible()
    expect(page.locator("#casos")).not_to_contain_text("Aún no hay respuestas")
    page.locator("#respuestasReintentar").click()
    expect(page.locator("#respuestasReintentar")).to_be_enabled()
    expect(page.locator("#respuestasError")).to_be_visible()
    estado["fallar"] = False
    page.locator("#respuestasReintentar").click()
    expect(page.locator("#respuestasError")).to_be_hidden()
    expect(page.locator("#casos .case").first).to_contain_text("Aún no hay respuestas abiertas")
    estado["respuestas"] = [respuesta()]
    page.reload()
    expect(page.locator("#casos .feedback")).not_to_have_attribute("open", "")
    page.locator("#casos .feedback > summary").click()
    expect(page.locator("#casos .feedback")).to_contain_text("Sin revisar aún")


def test_carga_todas_las_paginas_sin_perder_preguntas_antiguas(alumno):
    page, estado, abrir = alumno
    estado["respuestas"] = [respuesta(f"Envío {i}") for i in range(1000)] + [
        respuesta("Pregunta conservada", pregunta="hipotesis_razon")]
    abrir()
    expect(page.locator("#casos .feedback > summary")).to_contain_text("Tus respuestas · 2")
    assert [q["offset"] for q in estado["consultas"]] == [["0"], ["1000"]]
    for consulta in estado["consultas"]:
        assert consulta["usuario"] == ["eq.usuario-ficticio"]
        assert consulta["order"] == ["creado.desc,id.desc"]
