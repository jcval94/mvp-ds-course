"""Duraciones visibles: site/tiempos.json es la fuente única y sus sumas cuadran."""

from __future__ import annotations

import copy
import json
import sys
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from build_pages import apply_timing  # noqa: E402

TIMING = json.loads((ROOT / "site" / "tiempos.json").read_text(encoding="utf-8"))


def levels() -> list[dict]:
    return [
        {"level": 1, "blocks": [{"concept_count": 5}, {"concept_count": 4}]},
        {"level": 3, "blocks": [{"concept_count": 6}]},
        {"level": 10, "blocks": [{"concept_count": 2}]},  # sin caso ancla
    ]


def test_live_class_parts_add_up_to_its_length() -> None:
    clase = TIMING["clase_en_vivo"]
    assert sum(parte["min"] for parte in clase["partes"]) == clase["duracion_min"]


def test_level_anchors_exist_in_cases() -> None:
    for number, plan in TIMING["niveles"].items():
        assert plan["ancla"] in TIMING["casos"], f"Nivel {number}: caso ancla {plan['ancla']} no está en casos"


def test_blocks_add_up_to_level_and_course_totals() -> None:
    data = levels()
    timing = apply_timing(data, copy.deepcopy(TIMING))
    for level in data:
        blocks = sum(block["minutes"] for block in level["blocks"])
        assert level["minutes"]["concepts"] == blocks
        assert level["minutes"]["total"] == blocks + level["minutes"]["mission"]
    assert timing["total"] == sum(level["minutes"]["total"] for level in data)


def test_transfer_starts_at_configured_level() -> None:
    data = levels()
    apply_timing(data, copy.deepcopy(TIMING))
    per = TIMING["modelo"]["min_por_concepto"]
    base = per["aprender"] + per["ejercicio_guiado"] + per["repaso"]
    assert data[0]["minutes"]["per_concept"] == base
    assert data[1]["minutes"]["per_concept"] == base + per["transferencia"]


def test_case_specific_minutes_override_default() -> None:
    data = levels()
    apply_timing(data, copy.deepcopy(TIMING))
    anchor = TIMING["niveles"]["3"]["ancla"]
    expected = TIMING["casos"][anchor].get("min", TIMING["modelo"]["mision_ancla_min"])
    assert data[1]["case"]["minutes"] == expected
    assert data[2]["minutes"]["mission"] == 0 and "case" not in data[2]


def test_missing_block_minutes_would_fail() -> None:
    broken = copy.deepcopy(TIMING)
    del broken["modelo"]["min_por_concepto"]["aprender"]
    with pytest.raises(KeyError):
        apply_timing(levels(), broken)


def test_live_course_total_matches_generation_decisions() -> None:
    timing = apply_timing(levels(), copy.deepcopy(TIMING))
    clase = TIMING["clase_en_vivo"]
    assert timing["live_total"] == clase["sesiones"] * clase["duracion_min"]
    decisiones = (ROOT / "docs" / "DECISIONES_GENERACION_1.md").read_text(encoding="utf-8")
    assert f"{clase['sesiones']} clases de {clase['duracion_min'] // 60} horas" in decisiones
    assert f"**{timing['live_total'] // 60} horas**" in decisiones
