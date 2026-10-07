#!/usr/bin/env python3
"""Genera los datos simulados de la misión m01-wald (sesgo de supervivencia).

Modelo: cada avión recibe un número de impactos (Poisson); cada impacto cae en una
sección con probabilidad proporcional a su área (supuesto de Wald: impactos uniformes);
cada impacto derriba el avión con la letalidad de su sección. Solo los aviones que
regresan quedan en regresaron.csv; todos.csv es la verdad completa que en la guerra no
se veía. Datos sintéticos, CC0. Determinista: misma semilla, mismos archivos.

Uso: python casos/data/wald-bombers/generar.py
"""

from __future__ import annotations

import csv
import hashlib
import json
import math
import random
from pathlib import Path

HERE = Path(__file__).resolve().parent


def poisson(rng: random.Random, mean: float) -> int:
    # Knuth: suficiente para medias pequeñas y estable entre versiones de Python.
    limit, k, product = math.exp(-mean), 0, rng.random()
    while product > limit:
        k += 1
        product *= rng.random()
    return k


def simulate(params: dict, armored: set[str] | None = None, seed: int | None = None) -> list[dict]:
    armored = armored or set()
    rng = random.Random(params["semilla"] if seed is None else seed)
    sections = params["secciones"]
    reduction = params["blindaje"]["reduccion_letalidad"]
    weights = [section["area"] for section in sections]
    planes = []
    for number in range(1, params["aviones_por_mision"] + 1):
        hits = {section["id"]: 0 for section in sections}
        downed = False
        for _ in range(poisson(rng, params["impactos_promedio"])):
            section = rng.choices(sections, weights=weights)[0]
            hits[section["id"]] += 1
            lethality = section["letalidad"] * ((1 - reduction) if section["id"] in armored else 1)
            if rng.random() < lethality:
                downed = True
        planes.append({"avion": f"A{number:04d}", **hits, "regreso": "no" if downed else "si"})
    return planes


def write_csv(path: Path, rows: list[dict], fields: list[str]) -> str:
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=fields, lineterminator="\n")
        writer.writeheader()
        for row in rows:
            writer.writerow({key: row[key] for key in fields})
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    params = json.loads((HERE / "parametros.json").read_text(encoding="utf-8"))
    ids = [section["id"] for section in params["secciones"]]
    planes = simulate(params)
    returned = [plane for plane in planes if plane["regreso"] == "si"]
    digest_returned = write_csv(HERE / "regresaron.csv", returned, ["avion", *ids])
    digest_all = write_csv(HERE / "todos.csv", planes, ["avion", *ids, "regreso"])
    print(f"Aviones: {len(planes)} · regresaron: {len(returned)} · derribados: {len(planes) - len(returned)}")
    print(f"regresaron.csv sha256 {digest_returned}")
    print(f"todos.csv      sha256 {digest_all}")


if __name__ == "__main__":
    main()
