"""Contratos de la misión piloto m01-wald: los datos, el avión y el simulador web no se separan."""

from __future__ import annotations

import json
import shutil
import subprocess
from collections import Counter
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "casos" / "data" / "wald-bombers"
APP = ROOT / "missions" / "m01-wald" / "app"


def _params() -> dict:
    return json.loads((DATA / "parametros.json").read_text(encoding="utf-8"))


def test_section_areas_match_the_pixel_plane() -> None:
    params = _params()
    pixels = Counter(ch for row in params["avion"]["filas"] for ch in row if ch != ".")
    total = sum(pixels.values())
    for section in params["secciones"]:
        assert abs(section["area"] - pixels[section["pixel"]] / total) < 0.002, section["id"]
    assert abs(sum(section["area"] for section in params["secciones"]) - 1) < 1e-9


@pytest.mark.skipif(shutil.which("node") is None, reason="node no está disponible")
def test_web_simulator_reproduces_the_dataset_exactly() -> None:
    script = f"""
    const sim = require({json.dumps(str(APP / "sim.js"))});
    const fs = require("fs");
    const params = JSON.parse(fs.readFileSync({json.dumps(str(DATA / "parametros.json"))}, "utf8"));
    const ids = params.secciones.map((s) => s.id);
    const rows = sim.simulate(params, []).map((p) => [p.avion, ...ids.map((i) => p.hits[i]), p.returned ? "si" : "no"].join(","));
    process.stdout.write(["avion," + ids.join(",") + ",regreso", ...rows].join("\\n") + "\\n");
    """
    output = subprocess.run(["node", "-e", script], check=True, capture_output=True, text=True).stdout
    assert output == (DATA / "todos.csv").read_text(encoding="utf-8")
