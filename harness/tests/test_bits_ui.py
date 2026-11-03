"""Marcador en Chromium con datos enteramente ficticios, sin red ni cuentas reales."""

import copy
import json
from pathlib import Path
from urllib.parse import urlparse

import pytest
from playwright.sync_api import expect, sync_playwright

ROOT = Path(__file__).resolve().parents[2]
MARKER = {
    "inscrito": True, "participa": True, "alias": "Oaxaca 42", "bits": 26,
    "banda": "top5", "posicion": 2, "participantes": 30,
    "siguiente": {"meta": "subir", "bits_faltantes": 14},
    "desglose": {"secciones": 1, "hipotesis": 2, "retos": 8, "casos": 10,
                 "puntualidad": 0, "respuestas": 5, "primer_intento": 1, "retos_intentados": 2},
    "top5": [{"posicion": 1, "alias": "Ciudad ficticia 10", "bits": 40, "soy_yo": False},
             {"posicion": 2, "alias": "Oaxaca 42", "bits": 26, "soy_yo": True},
             {"posicion": 2, "alias": None, "bits": 26, "soy_yo": False}],
    "grupo": {"mediana_bits": 12.5, "tasa_primer_intento": 0.25},
}

STUB = r"""
window.aliasCalls = [];
const api = async (path, opts = {}) => {
  if (path.includes('/auth/')) return {id: 'ficticio', email: 'ficticio@example.invalid'};
  if (path.includes('poner_alias')) {
    aliasCalls.push(JSON.parse(opts.body).nuevo);
    if (config.delayAlias) await new Promise(resolve => window.finishAlias = resolve);
    if (config.aliasError) throw new Error('Ese alias ya está en uso.');
    config.marker.alias = aliasCalls.at(-1).trim() || 'Puebla 73';
    config.marker.top5[1].alias = config.marker.alias;
    return config.marker.alias;
  }
  if (path.includes('mi_marcador')) return config.marker;
  if (path.includes('mi_rol')) return config.panel
    ? {admin: true, docente: true, grupos: [{id: 'A'}, {id: 'B'}]} : false;
  if (path.includes('docente_alumnos')) return config.students || [];
  if (path.includes('bits_grupo')) return config.students || [];
  if (path.includes('grupos')) return [{id: 'A', nombre: 'Grupo ficticio A'}, {id: 'B', nombre: 'Grupo ficticio B'}];
  if (path.includes('/perfiles')) return [{alumno_id: 'FICTICIO', nombre: 'Persona ficticia', grupo: 'A'}];
  if (path.includes('mi_inscripcion')) return null;
  return [];
};
window.TDD = {api, rpc: (name, body) => api('/rpc/' + name, {body: JSON.stringify(body)}),
  todo: api, funcion: async () => ({version: 'prueba'}), activo: true,
  iniciar: () => true, tomarRetorno: () => ({}), entrar: () => {}, cerrar: async () => {}};
"""


@pytest.fixture(scope="module")
def browser():
    with sync_playwright() as pw:
        instance = pw.chromium.launch()
        yield instance
        instance.close()


@pytest.fixture(params=[{"width": 1440, "height": 900}, {"width": 390, "height": 844}])
def screen(browser, request):
    page = browser.new_page(viewport=request.param)
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))

    def open_page(marker=None, **config):
        config["marker"] = copy.deepcopy(MARKER if marker is None else marker)
        page.add_init_script("window.config = " + json.dumps(config) + ";")

        def route(req):
            url = urlparse(req.request.url)
            path = url.path.lstrip("/")
            if url.hostname != "curso.test":
                req.abort()
            elif path == "sesion.js":
                req.fulfill(body=STUB, content_type="application/javascript")
            elif path == "alumno-cv.js":
                req.fulfill(body="", content_type="application/javascript")
            elif path == "tiempos.json":
                req.fulfill(json={})
            elif (ROOT / "site" / path).is_file():
                req.fulfill(path=str(ROOT / "site" / path))
            else:
                req.fulfill(status=404, body="")

        page.route("**/*", route)
        page.goto("http://curso.test/" + ("admin.html" if config.get("panel") else "alumno.html"))
        expect(page.locator("#panel" if config.get("panel") else "#vistaAvance")).to_be_visible()
        return page

    yield open_page
    page.close()
    assert errors == []


@pytest.mark.parametrize("band,position,goal,label", [
    ("en_camino", 23, "top50", "Top 50 %"),
    ("top50", 8, "top20", "Top 20 %"),
    ("top20", 6, "top5", "Top 5"),
    ("top5", 2, "subir", "subir un lugar"),
    ("top5", 1, None, "primer lugar"),
])
def test_bands_and_next_goal(screen, band, position, goal, label):
    marker = copy.deepcopy(MARKER)
    marker.update(banda=band, posicion=position)
    marker["siguiente"] = {"meta": goal, "bits_faltantes": 6} if goal else None
    page = screen(marker)
    expect(page.locator("#bandaBadge")).to_contain_text(f"lugar {position} de 30")
    expect(page.locator("#escalera [aria-current=step]")).to_have_attribute("data-b", band)
    expect(page.locator("#siguiente")).to_contain_text(label)
    if goal:
        expect(page.locator("#siguiente")).to_contain_text("6 bits")


def test_breakdown_comparison_aliases_and_ties(screen):
    page = screen()
    expect(page.locator("#bitsVal")).to_have_text("26")
    expect(page.locator("#leyenda li")).to_have_count(6)
    expect(page.locator("#mezcla")).to_have_attribute("aria-label", "Secciones: 1, Hipótesis: 2, Retos: 8, Casos completos: 10, A tiempo: 0, Respuestas: 5")
    expect(page.locator("#comparar")).to_contain_text("12.5 bits")
    expect(page.locator("#comparar")).to_contain_text("50 % · grupo 25 %")
    expect(page.locator("#top5 .pos")).to_have_text(["1", "2", "2"])
    expect(page.locator("#top5 .who")).to_have_text(["Ciudad ficticia 10", "Oaxaca 42", "Participante"])
    expect(page.locator("#top5 .me")).to_have_count(1)
    assert not page.locator("#top5").get_by_text("ficticio@example.invalid").count()
    assert page.evaluate("document.documentElement.scrollWidth <= innerWidth")


def test_zero_bits_and_no_attempts(screen):
    marker = copy.deepcopy(MARKER)
    marker.update(bits=0, desglose={}, top5=[], grupo={"mediana_bits": 0, "tasa_primer_intento": None})
    page = screen(marker)
    expect(page.locator("#bitsVal")).to_have_text("0")
    expect(page.locator("#mezcla i")).to_have_count(0)
    expect(page.locator("#comparar")).to_contain_text("— · grupo —")
    expect(page.locator("#top5 .empty")).to_be_visible()


@pytest.mark.parametrize("marker", [{"inscrito": False}, {"inscrito": True, "participa": False, "top5": []}])
def test_nonparticipants(screen, marker):
    page = screen(marker)
    if not marker["inscrito"]:
        expect(page.locator("#marcador")).to_be_hidden()
    else:
        expect(page.locator("#marcador .board-main")).to_be_hidden()
        expect(page.locator("#aliasForm")).to_be_hidden()


def test_save_and_random_alias_without_concurrent_requests(screen):
    page = screen(delayAlias=True)
    page.locator("#aliasInput").fill("Alias ficticio")
    page.locator("#aliasGuardar").click()
    for selector in ("#aliasGuardar", "#aliasOtra", "#aliasInput"):
        expect(page.locator(selector)).to_be_disabled()
    page.locator("#aliasForm").evaluate("form => form.dispatchEvent(new Event('submit', {cancelable: true}))")
    assert page.evaluate("aliasCalls") == ["Alias ficticio"]
    page.evaluate("finishAlias()")
    expect(page.locator("#aliasNota")).to_contain_text("Alias ficticio")
    expect(page.locator("#top5 .me .who")).to_have_text("Alias ficticio")
    page.locator("#aliasOtra").click()
    expect(page.locator("#aliasOtra")).to_be_disabled()
    page.evaluate("finishAlias()")
    expect(page.locator("#aliasInput")).to_have_value("Puebla 73")
    expect(page.locator("#top5 .me .who")).to_have_text("Puebla 73")
    assert page.evaluate("aliasCalls") == ["Alias ficticio", ""]


def test_alias_error_keeps_input_and_allows_retry(screen):
    page = screen(aliasError=True)
    page.locator("#aliasInput").fill("Alias ocupado")
    page.locator("#aliasGuardar").click()
    expect(page.locator("#aliasNota")).to_have_text("Ese alias ya está en uso.")
    expect(page.locator("#aliasInput")).to_have_value("Alias ocupado")
    for selector in ("#aliasGuardar", "#aliasOtra", "#aliasInput"):
        expect(page.locator(selector)).to_be_enabled()


def test_teacher_top_is_per_group_and_preserves_ties(screen):
    students = []
    for group, scores in (("A", [40, 20, 20, 10, 8, 1]), ("B", [1000, 900, 800, 700, 600, 500])):
        for i, score in enumerate(scores):
            students.append({"id": f"{group}-{i}", "alumno_id": f"FICTICIO-{group}-{i}",
                             "nombre": f"Persona ficticia {group}-{i}", "grupo": group,
                             "alias": f"Alias ficticio {group}-{i}", "bits": score,
                             "posicion": scores.index(score) + 1})
    page = screen(panel=True, students=students)
    expect(page.locator("#top5 > li")).to_have_count(10)
    expect(page.locator("#top5 .pos")).to_have_text(["1", "2", "2", "4", "5", "1", "2", "3", "4", "5"])
    expect(page.locator("#top5")).to_contain_text("Grupo ficticio A")
    expect(page.locator("#top5")).to_contain_text("Grupo ficticio B")
    page.locator("#fGrupo").select_option("A")
    expect(page.locator("#top5 > li")).to_have_count(5)
    expect(page.locator("#top5 .pos")).to_have_text(["1", "2", "2", "4", "5"])
    expect(page.locator("#top5")).not_to_contain_text("Persona ficticia B")
