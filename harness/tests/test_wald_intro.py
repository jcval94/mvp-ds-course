"""Keep the rescued intro's illustrative map consistent with its public dataset."""

import ast
import csv
import json
import math
import re

from harness.config import ROOT


def test_wald_intro_uses_returned_aircraft_data_and_geometry() -> None:
    data = ROOT / "casos/data/wald-bombers"
    source = (ROOT / "site/casos/1-1/escenas.js").read_text(encoding="utf-8")
    params = json.loads((data / "parametros.json").read_text(encoding="utf-8"))
    with (data / "regresaron.csv").open(encoding="utf-8", newline="") as handle:
        rows = list(csv.DictReader(handle))
    totals = {section["pixel"]: sum(int(row[section["id"]]) for row in rows)
              for section in params["secciones"]}
    plane = ast.literal_eval(re.search(r"var AVION = (\[.*?\]);", source, re.S)[1])
    points = dict((key, int(value)) for key, value in re.findall(
        r"([ECFWT]): (\d+)", re.search(r"var PUNTOS = \{(.*?)\};", source)[1]))
    assert plane == params["avion"]["filas"]
    assert points == {key: math.floor(value / 10 + 0.5) for key, value in totals.items()}
    assert f"AGUJEROS: {sum(totals.values()):,}" in source
    assert f"sd = {params['semilla']}" in source
    assert "no son cifras históricas" in source


def test_wald_intro_only_publishes_the_hook() -> None:
    intro = ROOT / "site/casos/1-1"
    assert {p.name for p in intro.rglob("*") if p.is_file()} == {
        "index.html", "escenas.js", "medios.json"}
    media = json.loads((intro / "medios.json").read_text(encoding="utf-8"))
    assert media["caso"] == "1.1"
    assert all(item["estado"] == "candidato" for item in media["items"])
    assert media["pendiente"]
