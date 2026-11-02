#!/usr/bin/env python3
"""Carga fuera de clase por semana según qué etapas de clases/mapa_conceptos.yaml son obligatorias.

Propuesta de docs/DURACIONES.md («Bloques obligatorios»). Las reglas están en REGLAS; cámbialas y vuelve a correr.
Supuestos: dos clases por semana (viernes y sábado), la clase N cae en la semana (N + 1) // 2 y lo de «antes» se
hace la misma semana de su clase. Minutos por pieza: site/tiempos.json (modelo.min_por_concepto).
"""

from __future__ import annotations

import collections
import json
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
MODELO = json.loads((ROOT / "site" / "tiempos.json").read_text(encoding="utf-8"))["modelo"]["min_por_concepto"]
MAPA = yaml.safe_load((ROOT / "clases" / "mapa_conceptos.yaml").read_text(encoding="utf-8"))

# Supuesto de la propuesta: lo que no se termina de la misión en los 35 min de clase.
MISION_FUERA_DE_CLASE = 40

# Minutos obligatorios por concepto según su etapa. Lo que no aparece aquí es opcional.
REGLAS = {
    "antes": MODELO["aprender"] + MODELO["ejercicio_guiado"] + MODELO["repaso"],  # la transferencia queda opcional
    "caso": MODELO["ejercicio_guiado"],
    "error": MODELO["ejercicio_guiado"],
}


def calcular(reglas=REGLAS, mision=MISION_FUERA_DE_CLASE):
    semanas, partes = collections.Counter(), collections.Counter()
    for numero, clase in MAPA["clases"].items():
        semana = (int(numero) + 1) // 2
        semanas[semana] += mision
        partes["mision"] += mision
        for etapa, conceptos in clase.items():
            if isinstance(conceptos, list) and etapa in reglas:
                semanas[semana] += reglas[etapa] * len(conceptos)
                partes[etapa] += reglas[etapa] * len(conceptos)
    return semanas, partes


def main() -> None:
    semanas, partes = calcular()
    total = sum(semanas.values()) / 60
    n = max(semanas)
    print("Horas obligatorias fuera de clase por parte:",
          {k: round(v / 60, 1) for k, v in partes.items()})
    print(f"Total: {total:.1f} h · promedio {total / n:.1f} h por semana en {n} semanas")
    for s in range(1, n + 1):
        print(f"  Semana {s:>2}: {semanas[s] / 60:4.1f} h")


if __name__ == "__main__":
    main()
