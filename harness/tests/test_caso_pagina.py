"""Casos que se resuelven en la página (docs/CASO_EN_PAGINA.md): reglas que el navegador no puede revisar solo."""

import json
import re
import shutil
import subprocess
import unicodedata
from pathlib import Path

import pytest

from harness.config import ROOT

CASOS = ROOT / "site/casos"
PAGINA = sorted(p.parent for p in CASOS.glob("*/caso.html"))
# Cómo se llama la herramienta de cada caso y en qué sección se nombra por primera vez (después de usarla).
HERRAMIENTA = {"1-1": ("faltantes", ["sesgo de supervivencia", "sesgo de sobrevivencia", "faltantes no aleatorios"]),
               "1-2": ("silencio", ["marco muestral", "no respuesta", "sesgo de no respuesta", "sesgo de seleccion",
                                    "muestra representativa", "poblacion objetivo"]),
               "1-4": ("registro", ["exceso de mortalidad", "muertes en exceso", "exceso de muertes", "definir la variable",
                                    "definicion de la variable"]),
               "2-3": ("vuelos", ["lo que una grafica deja fuera", "lo que la grafica deja fuera", "sesgo de seleccion",
                                  "extrapolar", "extrapolacion"]),
               "13-11": ("kilos", ["factor de conversion", "factores de conversion", "validar rangos", "validar el rango",
                                   "validacion de rangos", "analisis dimensional", "unidades de medida"])}
# Ids de secciones y de retos, en orden, tal como están registrados en la base del curso.
RECORRIDO = {"1-1": (["preparacion", "apuesta", "registro", "asistente", "faltantes", "verificacion", "firma", "revelacion",
                      "laboratorio", "cierre"], ["reto_menos_area", "reto_error_resumen", "reto_motores_faltan"]),
             "1-2": (["preparacion", "apuesta", "conteo", "silencio", "comparacion", "verificacion", "firma", "revelacion",
                      "laboratorio", "cierre"], ["reto_error_tasa_respuesta", "reto_tasa_real", "reto_silencio", "reto_gallup_dos"]),
             "1-4": (["preparacion", "apuesta", "regla", "registro", "asistente", "firma", "revelacion", "cierre"],
                     ["reto_meses_normales", "reto_octubre_exceso", "reto_error_linea_base"]),
             "2-3": (["preparacion", "apuesta", "grafica", "vuelos", "asistente", "firma", "revelacion", "cierre"],
                     ["reto_grafica_patron", "reto_vuelos_calidos", "reto_fuera_de_rango", "reto_error_sin_ceros"]),
             "13-11": (["preparacion", "apuesta", "cuentas", "asistente", "kilos", "firma", "revelacion", "cierre"],
                       ["reto_litros_total", "reto_error_factor", "reto_kilos_reales"])}


def _norm(texto: str) -> str:
    t = unicodedata.normalize("NFKD", texto)
    t = "".join(ch for ch in t if not unicodedata.combining(ch)).lower()
    return " ".join(re.sub(r"[^a-z0-9]+", " ", t).split())


def _lineas_intro(carpeta: Path) -> list[str]:
    fuente = (carpeta / "escenas.js").read_text(encoding="utf-8")
    fuente = re.sub(r"fuentes: \[.*?\n    \]", "", fuente, flags=re.S)  # las fuentes citadas sí se repiten
    # Toda frase de la intro (narración, diálogos y textos alternativos), no solo las líneas t:.
    lineas = re.findall(r"'((?:[^'\\]|\\.)+)'", fuente)
    return [x for x in lineas if len(x.split()) >= 4 and not x.startswith(('var(', '.', '<')) and not re.search(r"[\n;{}=]", x)]


def _secciones(fuente: str) -> list[tuple[str, str]]:
    """(id, código) de cada sección de caso-escenas.js, en orden."""
    partes = list(re.finditer(r"\{ id: '([a-z_]+)', titulo: '[^']*', (?:puerta|render):", fuente))
    return [(m.group(1), fuente[m.start(): partes[i + 1].start() if i + 1 < len(partes) else len(fuente)])
            for i, m in enumerate(partes)]


def test_hay_casos_en_la_pagina() -> None:
    assert PAGINA, "Se esperaba al menos el caso 1.1 en la página"


@pytest.mark.parametrize("carpeta", PAGINA, ids=lambda p: p.name)
def test_el_caso_no_repite_la_intro(carpeta: Path) -> None:
    caso = " " + _norm((carpeta / "caso-escenas.js").read_text(encoding="utf-8")) + " "
    repetidas = [l for l in _lineas_intro(carpeta) if " %s " % _norm(l) in caso]
    assert not repetidas, "El caso repite líneas de la intro: %s" % repetidas


@pytest.mark.parametrize("carpeta", PAGINA, ids=lambda p: p.name)
def test_la_herramienta_se_nombra_despues_de_usarla(carpeta: Path) -> None:
    seccion, nombres = HERRAMIENTA[carpeta.name]
    fuente = (carpeta / "caso-escenas.js").read_text(encoding="utf-8")
    secciones = _secciones(fuente)
    ids = [s for s, _ in secciones]
    assert seccion in ids
    for sid, codigo in secciones[: ids.index(seccion)]:
        for n in nombres:
            assert _norm(n) not in _norm(codigo), "«%s» aparece en %s, antes de %s" % (n, sid, seccion)
    for nombre in nombres:
        assert _norm(nombre) not in _norm((carpeta / "escenas.js").read_text(encoding="utf-8")), "la intro nombra la herramienta"
    # Dentro de su sección, el nombre llega en la tarjeta que aparece después del reto.
    codigo = _norm(dict(secciones)[seccion])
    primero = min(codigo.index(_norm(n)) for n in nombres if _norm(n) in codigo)
    assert codigo.index("reto ") < primero, "la herramienta se nombra antes del reto de su sección"


@pytest.mark.parametrize("carpeta", PAGINA, ids=lambda p: p.name)
def test_mismo_recorrido_que_el_backend(carpeta: Path) -> None:
    fuente = (carpeta / "caso-escenas.js").read_text(encoding="utf-8")
    secciones, retos = RECORRIDO[carpeta.name]
    assert [s for s, _ in _secciones(fuente)] == secciones
    assert re.findall(r"id: '(reto_[a-z0-9_]+)'", fuente) == retos
    assert "version: 'pagina-1.0'" in fuente


@pytest.mark.parametrize("carpeta", PAGINA, ids=lambda p: p.name)
def test_sin_claves_ni_colab(carpeta: Path) -> None:
    for archivo in ("caso.html", "caso-escenas.js"):
        texto = (carpeta / archivo).read_text(encoding="utf-8")
        assert "colab.research.google.com" not in texto
        assert not re.search(r"respuesta\s*:\s*['\"]|tolerancia|r[uú]brica", texto, re.I), archivo
    assert "colab.research.google.com" not in (carpeta / "index.html").read_text(encoding="utf-8")
    assert "resolver: 'caso.html'" in (carpeta / "escenas.js").read_text(encoding="utf-8")
    assert "puerta: function (S) { return !!S.respuestas.firma; }" in (carpeta / "caso-escenas.js").read_text(encoding="utf-8")


def test_wald_usa_los_mismos_datos_y_simulador() -> None:
    datos = (ROOT / "site/casos/1-1/datos.js").read_text(encoding="utf-8")
    params = json.loads(datos[datos.index("=") + 1: datos.rindex(";")])
    assert params == json.loads((ROOT / "casos/data/wald-bombers/parametros.json").read_text(encoding="utf-8"))
    assert (ROOT / "site/casos/1-1/sim.js").read_bytes() == (ROOT / "missions/m01-wald/app/sim.js").read_bytes()


def test_digest_usa_las_cifras_reales() -> None:
    import csv
    datos = (ROOT / "site/casos/1-2/datos.js").read_text(encoding="utf-8")
    cifras = json.loads(re.search(r"window.DigestCifras = (\{.*?\});", datos).group(1))
    with (ROOT / "casos/data/literary-digest-1936/cifras.csv").open(encoding="utf-8", newline="") as f:
        for r in csv.DictReader(f):
            assert float(cifras[r["id"]]) == float(r["valor"]), r["id"]


def test_puerto_rico_usa_los_datos_reales() -> None:
    import csv
    datos = (ROOT / "site/casos/1-4/datos.js").read_text(encoding="utf-8")
    filas = json.loads(datos[datos.index("=") + 1: datos.rindex(";")])
    with (ROOT / "casos/data/puerto-rico-maria-2017/defunciones_mensuales.csv").open(encoding="utf-8", newline="") as f:
        csvf = [{"anio": int(r["anio"]), "mes": int(r["mes"]), "defunciones": int(r["defunciones"]), "estado": r["estado"]} for r in csv.DictReader(f)]
    assert filas == csvf
    texto = (ROOT / "site/casos/1-4/caso-escenas.js").read_text(encoding="utf-8")
    assert "Aviso de contenido" in texto and "aviso:" in (ROOT / "site/casos/1-4/escenas.js").read_text(encoding="utf-8")


def test_challenger_usa_los_vuelos_reales() -> None:
    import csv
    datos = (ROOT / "site/casos/2-3/datos.js").read_text(encoding="utf-8")
    filas = json.loads(datos[datos.index("=") + 1: datos.rindex(";")])
    with (ROOT / "casos/data/challenger-1986/vuelos.csv").open(encoding="utf-8", newline="") as f:
        csvf = [{"orden": int(r["orden"]), "vuelo": r["vuelo"], "fecha": r["fecha"], "f": int(r["temperatura_f"]),
                 "c": float(r["temperatura_c"]), "juntas": int(r["juntas_con_dano"])} for r in csv.DictReader(f)]
    assert filas == csvf and len(filas) == 23 and sum(1 for x in filas if x["juntas"]) == 7
    texto = (ROOT / "site/casos/2-3/caso-escenas.js").read_text(encoding="utf-8")
    assert "Aviso de contenido" in texto and "aviso:" in (ROOT / "site/casos/2-3/escenas.js").read_text(encoding="utf-8")


def test_gimli_usa_las_cifras_reales() -> None:
    import csv
    datos = (ROOT / "site/casos/13-11/datos.js").read_text(encoding="utf-8")
    cifras = json.loads(datos[datos.index("=") + 1: datos.rindex(";")])
    with (ROOT / "casos/data/gimli-glider-1983/cifras.csv").open(encoding="utf-8", newline="") as f:
        filas = list(csv.DictReader(f))
    assert {r["id"]: {"valor": float(r["valor"]), "unidad": r["unidad"]} for r in filas} == cifras


@pytest.mark.skipif(shutil.which("node") is None, reason="sin node")
def test_wald_simulacion_da_las_cifras_del_material_docente() -> None:
    codigo = """
    const S=require('./site/casos/1-1/sim.js'); const p=require('./casos/data/wald-bombers/parametros.json');
    const n=a=>S.simulate(p,a).filter(x=>x.returned).length; const r=S.simulate(p,[]);
    const m=r.filter(x=>x.returned).reduce((s,x)=>s+x.hits.motor,0), d=r.filter(x=>!x.returned).reduce((s,x)=>s+x.hits.motor,0);
    console.log(JSON.stringify([n([]), n(['alas','cola']), n(['motor','cabina']), m, d]));"""
    salida = subprocess.run(["node", "-e", codigo], cwd=ROOT, capture_output=True, text=True, check=True).stdout
    assert json.loads(salida) == [736, 753, 898, 132, 240]


def test_mi_avance_no_manda_a_colab_los_casos_de_la_pagina() -> None:
    js = (ROOT / "site/alumno.js").read_text(encoding="utf-8")
    en_pagina = re.search(r"const EN_PAGINA = \{(.*?)\};", js).group(1)
    for caso, ruta in re.findall(r'"([\d.]+)": "([^"]+)"', en_pagina):
        assert (ROOT / "site" / ruta).is_file(), ruta
        cuadernos = re.search(r"const CUADERNOS = \{(.*?)\};", js, re.S).group(1)
        assert '"%s"' % caso not in cuadernos, "El caso %s se resuelve en la página: no va en CUADERNOS" % caso
    # La intro va antes que el caso en cada tarjeta.
    assert js.index('"Ver la intro (1 min)"') < js.index('"Resolver el caso"') < js.index('"Abrir en Colab"')
