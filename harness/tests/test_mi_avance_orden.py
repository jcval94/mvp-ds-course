"""Mi avance más ligero (u05): orden, «Qué sigue» arriba y lo plegado, con datos enteramente ficticios y sin red."""

import json
from datetime import datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import urlparse

import pytest
from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[2]

STUB = r"""
const api = async (path) => {
  if (path.includes('/auth/')) return {id: 'ficticio', email: 'ficticio@example.invalid'};
  if (path.includes('mi_marcador')) return config.marcador;
  if (path.includes('mis_clases')) return config.clases;
  if (path.includes('mi_inscripcion')) return config.inscripcion;
  if (path.includes('mi_practica')) return config.practica;
  if (path.includes('mi_rol')) return false;
  if (path.includes('/perfiles')) return [{alumno_id: 'FICTICIO', nombre: 'Persona Ficticia', grupo: 'A'}];
  if (path.includes('/rest/v1/casos')) return config.casos;
  return [];
};
window.TDD = {api, rpc: (name, body) => api('/rpc/' + name, {body: JSON.stringify(body || {})}),
  todo: api, funcion: async () => ({}), activo: true,
  iniciar: () => true, tomarRetorno: () => ({}), entrar: () => {}, cerrar: async () => {}};
"""


def _iso(delta: timedelta) -> str:
    return (datetime.now(timezone.utc) + delta).isoformat()


def _config(**cambios):
    secciones = ["preparacion", "apuesta", "registro", "cierre"]
    config = {
        "casos": [{"id": "1.1", "modulo": 1, "titulo": "Caso ficticio uno", "secciones": secciones},
                  {"id": "1.2", "modulo": 1, "titulo": "Caso ficticio dos", "secciones": secciones}],
        "clases": [
            {"id": 1, "numero": 1, "tema": "Tema ficticio", "inicio": _iso(timedelta(days=-1, hours=-3)), "fin": _iso(timedelta(days=-1)),
             "caso": "1.1", "meet_url": "https://meet.example.invalid/a", "grabacion_url": None, "grabacion_hasta": _iso(timedelta(days=365))},
            {"id": 2, "numero": 2, "tema": "Tema en vivo", "inicio": _iso(timedelta(minutes=-1)), "fin": _iso(timedelta(hours=3)),
             "caso": "1.2", "meet_url": "https://meet.example.invalid/b", "grabacion_url": None, "grabacion_hasta": _iso(timedelta(days=365))},
            {"id": 5, "numero": 5, "tema": "Tema con Colab", "inicio": _iso(timedelta(days=3)), "fin": _iso(timedelta(days=3, hours=3)),
             "caso": None, "meet_url": None, "grabacion_url": None, "grabacion_hasta": _iso(timedelta(days=368))},
        ],
        "inscripcion": {"estado": "al_corriente", "plan": "cuotas", "cuotas_pagadas": 1, "cuotas_total": 3,
                        "fechas_cuotas": ["2027-01-08", "2027-02-08", "2027-03-08"], "monto_total": 9900, "codigo": "FICTICIO"},
        "practica": {"repasos": 0, "racha": 0, "bits_semana": 0, "tope_semana": 30, "disponibles": 0, "hoy": 0},
        "marcador": {"inscrito": True, "participa": True, "alias": "Ciudad ficticia 1", "bits": 12, "banda": "top50",
                     "posicion": 8, "participantes": 30, "siguiente": {"meta": "top20", "bits_faltantes": 4},
                     "desglose": {"secciones": 4, "retos": 8}, "top5": [], "grupo": {"mediana_bits": 6, "tasa_primer_intento": None}},
    }
    config.update(cambios)
    return config


@pytest.fixture(scope="module")
def browser():
    with sync_playwright() as pw:
        instance = pw.chromium.launch()
        yield instance
        instance.close()


@pytest.fixture
def abrir(browser):
    pages = []

    def _abrir(viewport, **cambios):
        page = browser.new_page(viewport=viewport)
        errores = []
        page.on("pageerror", lambda e: errores.append(str(e)))
        page.add_init_script("window.config = " + json.dumps(_config(**cambios)) + ";")

        def route(req):
            url = urlparse(req.request.url)
            path = url.path.lstrip("/")
            if url.hostname != "curso.test":
                req.abort()
            elif path == "sesion.js":
                req.fulfill(body=STUB, content_type="application/javascript")
            elif path in {"alumno-store.js", "tiempos.json"}:
                req.fulfill(body="" if path.endswith(".js") else "{}", content_type="application/javascript" if path.endswith(".js") else "application/json")
            elif (ROOT / "site" / path).is_file():
                req.fulfill(path=str(ROOT / "site" / path))
            else:
                req.fulfill(status=404, body="")

        page.route("**/*", route)
        page.goto("http://curso.test/alumno.html")
        expect(page.locator("#vistaAvance")).to_be_visible()
        expect(page.locator("#casos .case")).to_have_count(2)
        pages.append((page, errores))
        return page

    yield _abrir
    for page, errores in pages:
        page.close()
        assert errores == []


def _antes(page, a: str, b: str) -> bool:
    return page.evaluate("([a, b]) => !!(document.querySelector(a).compareDocumentPosition(document.querySelector(b)) & Node.DOCUMENT_POSITION_FOLLOWING)", [a, b])


def test_orden_y_que_sigue_en_la_primera_pantalla(abrir):
    page = abrir({"width": 390, "height": 844})
    for a, b in [("#continuar", "#clases"), ("#clases", "#acceso-colab"), ("#acceso-colab", "#casos"),
                 ("#casos", "#marcador"), ("#marcador", "#pagoPlegado"), ("#pagoPlegado", "#ayuda")]:
        assert _antes(page, a, b), f"{a} debe ir antes que {b}"
    caja = page.locator("#continuarBtn").bounding_box()
    assert caja and caja["y"] + caja["height"] <= 844, "El botón del caso debe verse en la primera pantalla"
    expect(page.locator("#continuar")).not_to_contain_text("misión")
    expect(page.locator("#continuarBtn")).to_have_text("Empezar el caso")
    # El día de clase, Meet también va en «Qué sigue».
    expect(page.locator("#continuarMeet")).to_be_visible()
    expect(page.locator("#continuarMeet")).to_have_text("Entrar a Google Meet")
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")


def test_plegados_y_ocultos_hasta_que_aplican(abrir):
    page = abrir({"width": 390, "height": 844})
    expect(page.locator("#resumen")).not_to_have_attribute("open", "")
    expect(page.locator("#pagoArriba")).to_be_empty()
    expect(page.locator("#pagoPlegado")).to_be_visible()
    expect(page.locator("#pagoPlegado")).not_to_have_attribute("open", "")
    expect(page.locator("#practica")).to_be_hidden()
    expect(page.locator("#casosFiltros")).to_be_hidden()
    expect(page.locator("#aliasCaja")).not_to_have_attribute("open", "")
    expect(page.locator("#ayuda")).not_to_have_attribute("open", "")
    # Semana de la clase 5: Acceso a Colab abierto, arriba de los casos, y las viñetas de Colab en la ayuda.
    expect(page.locator("#acceso-colab")).to_have_attribute("open", "")
    expect(page.locator("#ayuda .solo-colab").first).to_be_attached()
    assert page.locator("#ayuda .solo-colab[hidden]").count() == 0
    # Grabaciones: solo el enlace a su pestaña.
    expect(page.locator("#irGrabadas")).to_be_visible()
    expect(page.locator("#vistaAvance")).not_to_contain_text("Grabación en proceso")
    # Tarjeta compacta: secciones plegadas y una sola acción principal.
    tarjeta = page.locator("#casos .case").first
    expect(tarjeta.locator(".secs")).not_to_have_attribute("open", "")
    expect(tarjeta.locator(".case-foot .btn")).to_have_count(1)


def test_pago_con_algo_que_hacer_va_arriba(abrir):
    inscripcion = {"estado": "atrasado", "plan": "cuotas", "cuotas_pagadas": 1, "cuotas_total": 3, "por_pagar": "La cuota 2",
                   "vence_gracia": _iso(timedelta(days=5)), "url_pago": "https://pago.example.invalid", "codigo": "FICTICIO"}
    page = abrir({"width": 390, "height": 844}, inscripcion=inscripcion)
    expect(page.locator("#pagoArriba #pago")).to_be_visible()
    expect(page.locator("#pagoPlegado")).to_be_hidden()
    assert _antes(page, "#pagoArriba", "#continuar")


def test_lejos_de_la_clase_5_colab_queda_plegado_al_final(abrir):
    clases = _config()["clases"]
    clases[2]["inicio"], clases[2]["fin"] = _iso(timedelta(days=-20)), _iso(timedelta(days=-20, hours=-3) + timedelta(hours=6))
    page = abrir({"width": 1440, "height": 900}, clases=clases)
    expect(page.locator("#acceso-colab")).to_be_visible()
    expect(page.locator("#acceso-colab")).not_to_have_attribute("open", "")
    assert _antes(page, "#marcador", "#acceso-colab")


def test_pestanas_y_menu_en_celular(abrir):
    page = abrir({"width": 390, "height": 844})
    expect(page.locator("#perfilBtn")).not_to_contain_text("Profile")
    page.locator("#tabClases").scroll_into_view_if_needed()
    caja = page.locator("#tabClases").bounding_box()
    assert caja and caja["x"] >= 0 and caja["x"] + caja["width"] <= 390, "La cuarta pestaña debe poder verse completa"
    page.locator("#tabStore").click()
    expect(page.locator("#acceso-colab")).to_be_hidden()
    expect(page.locator("#vistaAvance")).to_be_hidden()
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
