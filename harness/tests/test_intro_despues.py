"""Toda intro de caso dice qué sigue después (E-08): `despues` con 2 o 3 títulos y texto por omisión en el motor."""
from __future__ import annotations

import re
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
CASOS = ROOT / "site" / "casos"
INTROS = sorted(p.parent for p in CASOS.glob("*/escenas.js"))


def _despues(fuente: str) -> str:
    bloque = re.search(r"\bdespues:\s*\[(.*?)\],\n", fuente, re.S)
    assert bloque, "falta `despues` en CASO"
    return bloque.group(1)


@pytest.mark.parametrize("carpeta", INTROS, ids=lambda p: p.name)
def test_cada_intro_dice_que_sigue(carpeta: Path) -> None:
    fuente = (carpeta / "escenas.js").read_text(encoding="utf-8")
    bloque = _despues(fuente)
    sin_objetos = re.sub(r"\{.*?\}", "'x'", bloque, flags=re.S)
    titulos = re.findall(r"'[^']*'", sin_objetos)
    assert 2 <= len(titulos) <= 3, "`despues` lleva 2 o 3 títulos cortos"
    if "resolver:" in fuente:
        assert "colab" not in bloque.lower(), "un caso que sigue en la página no manda a Colab"
    else:
        assert "Colab" in bloque and "../../colab.html" in bloque, "un caso que sigue en Colab lo dice y enlaza la guía"
        assert (ROOT / "site" / "colab.html").is_file()


def test_el_motor_tiene_texto_por_omision() -> None:
    motor = (CASOS / "motor.js").read_text(encoding="utf-8")
    assert "DESPUES_PAGINA" in motor and "DESPUES_COLAB" in motor
    assert "C.resolver ? DESPUES_PAGINA : DESPUES_COLAB" in motor
