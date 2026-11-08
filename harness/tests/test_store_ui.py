"""Store y Clases grabadas del área del alumno en Chromium, con datos ficticios y sin red (esquema 0.16).
La base decide saldo, precios y permisos; aquí se prueba que la página muestre lo que la base dice, que canjear
mande lo correcto y que el marcador no cambie al gastar."""

import copy
import json
from pathlib import Path
from urllib.parse import urlparse

import pytest
from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[2]
MARKER = {
    "inscrito": True, "participa": True, "alias": "Oaxaca 42", "bits": 1240,
    "banda": "top5", "posicion": 2, "participantes": 30, "siguiente": {"meta": "subir", "bits_faltantes": 14},
    "desglose": {"secciones": 40, "retos": 600, "casos": 200, "respuestas": 400},
    "top5": [{"posicion": 1, "alias": "Ciudad ficticia 10", "bits": 1300, "soy_yo": False},
             {"posicion": 2, "alias": "Oaxaca 42", "bits": 1240, "soy_yo": True}],
    "grupo": {"mediana_bits": 600, "tasa_primer_intento": 0.4},
}
ART = lambda **k: {"existencias": None, "restantes": None, "mios": [], "opciones": [], "pide_texto": None, "requiere_caso": False,
                   "casos": None, "desde_clase": 2, "por_clase": False, "adorno": None, "motivo": None, "descripcion": "Descripción ficticia", **k}
TIENDA = {
    "inscrito": True, "puede": True, "cerrada": None, "ganados": 1240, "gastado": 860, "saldo": 380, "clase": 6, "cierre": "2027-06-20",
    "articulos": [
        ART(id="color_alias", nombre="Color de tu alias", categoria="cosmetico", precio=30, adorno="color",
            opciones=["comal", "anil", "rosa"], mios=[{"caso": "", "eleccion": "comal"}]),
        ART(id="marco_top5", nombre="Marco especial", categoria="cosmetico", precio=60, adorno="marco", motivo="Ya lo tienes"),
        ART(id="revision_cv", nombre="Revisión escrita de tu CV", categoria="carrera", precio=600, existencias=8, restantes=3,
            pide_texto="Enlace a tu CV", motivo="Te faltan 220 bits"),
        ART(id="cvs_anotados", nombre="CVs anotados", categoria="carrera", precio=500, desde_clase=8, motivo="Se abre en la clase 8"),
        ART(id="version_director", nombre="Versión del director", categoria="contenido", precio=120, requiere_caso=True,
            casos=[{"id": "1.1", "titulo": "Wald"}]),
    ],
    "canjes": [{"id": 7, "articulo": "banco_entrevistas", "nombre": "Banco de entrevistas", "categoria": "carrera", "precio": 400,
                "creado": "2027-02-01T18:00:00Z", "estado": "entregado", "url": "https://drive.google.com/file/d/FICTICIO/view"}],
    "metas": {"promedio": 640, "lista": [{"umbral": 500, "premio": "Caso extra", "alcanzada": True},
                                         {"umbral": 900, "premio": "Clase extra", "alcanzada": False}]},
    "adornos": {"color": "comal"},
}
CLASES = [
    {"id": 1, "numero": 1, "inicio": "2026-01-08T00:00:00Z", "fin": "2026-01-08T03:00:00Z", "tema": "Wald", "caso": "1.1",
     "meet_url": None, "grabacion_url": "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUv/view?usp=sharing", "grabacion_hasta": "2099-01-08T00:00:00Z"},
    {"id": 2, "numero": 2, "inicio": "2026-01-09T14:00:00Z", "fin": "2026-01-09T17:00:00Z", "tema": "Literary Digest", "caso": "1.2",
     "meet_url": None, "grabacion_url": None, "grabacion_hasta": "2099-01-09T14:00:00Z"},
    {"id": 3, "numero": 3, "inicio": "2099-01-15T00:00:00Z", "fin": "2099-01-15T03:00:00Z", "tema": "John Snow", "caso": "2.1",
     "meet_url": None, "grabacion_url": None, "grabacion_hasta": "2100-01-15T00:00:00Z"},
]

STUB = r"""
window.llamadas = [];
const api = async (path, opts = {}) => {
  const body = opts.body ? JSON.parse(opts.body) : null;
  if (path.includes('/auth/')) return {id: 'ficticio', email: 'ficticio@example.invalid'};
  if (path.includes('/rpc/canjear')) {
    llamadas.push(body);
    config.tienda.saldo -= 30; config.tienda.gastado += 30;
    config.tienda.articulos[0].mios.push({caso: '', eleccion: body.p_eleccion});
    config.tienda.adornos = {color: body.p_eleccion};
    return {canje: 99, repetido: false, saldo: config.tienda.saldo, url: null};
  }
  if (path.includes('mi_tienda')) return JSON.parse(JSON.stringify(config.tienda));
  if (path.includes('adornos_grupo')) return [{alias: 'Ciudad ficticia 10', adornos: {marco: 'si', color: 'anil', avatar: 'a03'}}];
  if (path.includes('mis_clases')) return config.clases;
  if (path.includes('mi_marcador')) return config.marker;
  if (path.includes('mi_rol')) return false;
  if (path.includes('/perfiles')) return [{alumno_id: 'FICTICIO', nombre: 'Persona ficticia', grupo: 'A'}];
  if (path.includes('mi_inscripcion')) return null;
  if (path.includes('mi_practica')) return null;
  return [];
};
window.TDD = {api, rpc: (name, body) => api('/rpc/' + name, {body: JSON.stringify(body || {})}),
  todo: api, funcion: async () => ({}), activo: true,
  iniciar: () => true, tomarRetorno: () => ({}), entrar: () => {}, cerrar: async () => {}};
"""


@pytest.fixture(scope="module")
def browser():
    with sync_playwright() as pw:
        instance = pw.chromium.launch()
        yield instance
        instance.close()


@pytest.fixture(params=[{"width": 1440, "height": 900}, {"width": 390, "height": 844}], ids=["escritorio", "telefono"])
def screen(browser, request):
    page = browser.new_page(viewport=request.param)
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))

    def open_page(hash_=""):
        config = {"marker": copy.deepcopy(MARKER), "tienda": copy.deepcopy(TIENDA), "clases": copy.deepcopy(CLASES)}
        page.add_init_script("window.config = " + json.dumps(config) + ";")

        def route(req):
            url = urlparse(req.request.url)
            path = url.path.lstrip("/")
            if url.hostname != "curso.test":
                req.abort()
            elif path == "sesion.js":
                req.fulfill(body=STUB, content_type="application/javascript")
            elif path == "tiempos.json":
                req.fulfill(json={})
            elif (ROOT / "site" / path).is_file():
                req.fulfill(path=str(ROOT / "site" / path))
            else:
                req.fulfill(status=404, body="")

        page.route("**/*", route)
        page.goto("http://curso.test/alumno.html" + hash_)
        expect(page.locator("#tabs")).to_be_visible()
        return page

    yield open_page
    page.close()
    assert errors == []


def test_store_muestra_saldo_ganados_y_motivos(screen):
    page = screen("#store")
    expect(page.locator("#vistaStore")).to_be_visible()
    expect(page.locator("#tabStore")).to_have_attribute("aria-selected", "true")
    expect(page.locator("#vistaAvance")).to_be_hidden()
    expect(page.locator("#storeSaldo")).to_have_text("380")
    expect(page.locator("#storeGanados")).to_have_text("1,240")
    expect(page.locator(".store-garantia")).to_contain_text("Gastar no te baja de lugar")
    expect(page.locator("#storeGrid .item")).to_have_count(5)
    expect(page.locator(".item.cat-carrera").first).to_contain_text("Te faltan 220 bits")
    expect(page.locator("#storeGrid")).to_contain_text("Se abre en la clase 8")
    expect(page.locator("#storeGrid")).to_contain_text("Quedan 3 de 8")
    expect(page.locator("#metasLista li")).to_have_count(2)
    expect(page.locator("#storeMios a")).to_have_attribute("href", "https://drive.google.com/file/d/FICTICIO/view")
    page.locator(".chip-filtro", has_text="Carrera").click()
    expect(page.locator("#storeGrid .item")).to_have_count(2)
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")


def test_canjear_un_color_no_cambia_el_marcador(screen):
    page = screen("#store")
    page.locator(".item", has_text="Color de tu alias").get_by_role("button", name="Canjear").click()
    dlg = page.locator("#dlgCanje")
    expect(dlg).to_be_visible()
    expect(dlg.locator(".opcion.ya")).to_have_count(1)  # el comal ya es suyo
    expect(page.locator("#canjeCuenta")).to_contain_text("350 bits")
    dlg.locator(".opcion", has_text="Rosa").click()
    page.locator("#canjeOk").click()
    expect(dlg).to_be_hidden()
    expect(page.locator("#storeSaldo")).to_have_text("350")
    llamadas = page.evaluate("llamadas")
    assert len(llamadas) == 1 and llamadas[0]["p_articulo"] == "color_alias" and llamadas[0]["p_eleccion"] == "rosa"
    assert llamadas[0]["p_id_cliente"]
    page.locator("#tabAvance").click()
    expect(page.locator("#bitsVal")).to_have_text("1240")  # los bits ganados del marcador no se tocan


def test_canje_por_caso_pide_el_caso(screen):
    page = screen("#store")
    page.locator(".item", has_text="Versión del director").get_by_role("button", name="Canjear").click()
    expect(page.locator("#canjeCampos select option")).to_have_text(["Caso 1.1 · Wald"])
    page.locator("#canjeCerrar").click()


def test_top5_con_adornos(screen):
    page = screen()
    expect(page.locator("#top5 li.marco-pixel")).to_have_count(1)
    expect(page.locator("#top5 li.marco-pixel svg.sprite")).to_have_count(1)
    expect(page.locator("#top5 .alias-nombre.pintado")).to_have_text(["Ciudad ficticia 10"])


def test_clases_grabadas(screen):
    page = screen()
    page.locator("#tabClases").click()
    expect(page.locator("#vistaClases")).to_be_visible()
    expect(page.locator("#grabadasLista .grabada")).to_have_count(2)  # solo las que ya pasaron
    expect(page.locator("#grabadasLista .grabada").first).to_contain_text("Literary Digest")
    expect(page.locator("#grabadasLista .grabada.sin")).to_contain_text("Grabación en proceso")
    page.locator(".grabada", has_text="Wald").get_by_role("button", name="Ver aquí").click()
    expect(page.locator("#playerMarco iframe")).to_have_attribute("src", "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUv/preview")
    expect(page.locator("#playerDrive")).to_have_attribute("href", CLASES[0]["grabacion_url"])
    page.locator("#grabadasBuscar").fill("snow")
    expect(page.locator("#grabadasLista .vacio")).to_be_visible()  # la clase 3 aún no pasa
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")
