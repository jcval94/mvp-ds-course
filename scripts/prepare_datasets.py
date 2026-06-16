#!/usr/bin/env python3
"""Create reproducible teaching snapshots from downloaded public datasets."""

from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path
import shutil
import zipfile


ROOT = Path(__file__).resolve().parents[1]
DOWNLOADS = ROOT / "datasets" / "_downloads"
DATASETS = ROOT / "datasets"
SNAPSHOTS = DATASETS / "snapshots"
METADATA = DATASETS / "metadata"


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def row_count(path: Path) -> int:
    with path.open("r", encoding="utf-8", newline="") as handle:
        return sum(1 for _ in csv.reader(handle)) - 1


def copy_text_csv(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    text = source.read_text(encoding="utf-8")
    destination.write_text(text.replace("\r\n", "\n"), encoding="utf-8", newline="\n")


def prepare_penguins() -> dict[str, object]:
    destination = SNAPSHOTS / "palmer_penguins.csv"
    copy_text_csv(DOWNLOADS / "penguins.csv", destination)
    return {
        "id": "palmer-penguins",
        "name": "Palmer Penguins",
        "path": "snapshots/palmer_penguins.csv",
        "source_url": (
            "https://raw.githubusercontent.com/allisonhorst/"
            "palmerpenguins/main/inst/extdata/penguins.csv"
        ),
        "source_page": "https://allisonhorst.github.io/palmerpenguins/",
        "license": "CC0-1.0",
        "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
        "citation": (
            "Horst AM, Hill AP, Gorman KB (2020). palmerpenguins: "
            "Palmer Archipelago penguin data."
        ),
        "snapshot_date": "2026-06-14",
        "rows": row_count(destination),
        "columns": 8,
        "snapshot_label": "344 filas",
        "license_display": "CC0",
        "portal_use": "Resumen y comparación",
        "sha256": sha256(destination),
        "uses": ["resumen numérico", "comparación visual"],
    }


def prepare_bike_sharing() -> dict[str, object]:
    with zipfile.ZipFile(DOWNLOADS / "bike-sharing.zip") as archive:
        with archive.open("day.csv") as source:
            temporary = DOWNLOADS / "bike-day.csv"
            temporary.write_bytes(source.read())
    destination = SNAPSHOTS / "bike_sharing_day.csv"
    copy_text_csv(temporary, destination)
    temporary.unlink()
    with destination.open("r", encoding="utf-8", newline="") as handle:
        columns = len(next(csv.reader(handle)))
    return {
        "id": "bike-sharing-day",
        "name": "Bike Sharing Dataset · UCI",
        "path": "snapshots/bike_sharing_day.csv",
        "source_url": "https://archive.ics.uci.edu/static/public/275/bike+sharing+dataset.zip",
        "source_page": "https://archive.ics.uci.edu/dataset/275/bike+sharing+dataset",
        "license": "CC BY 4.0",
        "license_url": "https://creativecommons.org/licenses/by/4.0/",
        "citation": (
            "Fanaee-T, H. (2013). Bike Sharing [Dataset]. "
            "UCI Machine Learning Repository."
        ),
        "snapshot_date": "2026-06-14",
        "rows": row_count(destination),
        "columns": columns,
        "snapshot_label": "731 días",
        "license_display": "CC BY 4.0",
        "portal_use": "Distribuciones",
        "sha256": sha256(destination),
        "uses": ["distribuciones", "histogramas", "forma y bins"],
    }


def prepare_wine_quality() -> dict[str, object]:
    rows: list[dict[str, str]] = []
    fieldnames: list[str] = []
    with zipfile.ZipFile(DOWNLOADS / "wine-quality.zip") as archive:
        for color, filename in [
            ("red", "winequality-red.csv"),
            ("white", "winequality-white.csv"),
        ]:
            with archive.open(filename) as binary:
                lines = (line.decode("utf-8") for line in binary)
                reader = csv.DictReader(lines, delimiter=";")
                if not fieldnames:
                    fieldnames = ["color", *(reader.fieldnames or [])]
                for row in reader:
                    rows.append({"color": color, **row})

    destination = SNAPSHOTS / "wine_quality.csv"
    destination.parent.mkdir(parents=True, exist_ok=True)
    with destination.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        writer.writerows(rows)
    return {
        "id": "wine-quality",
        "name": "Wine Quality · UCI",
        "path": "snapshots/wine_quality.csv",
        "source_url": "https://archive.ics.uci.edu/static/public/186/wine+quality.zip",
        "source_page": "https://archive.ics.uci.edu/dataset/186/wine+quality",
        "license": "CC BY 4.0",
        "license_url": "https://creativecommons.org/licenses/by/4.0/",
        "citation": (
            "Cortez, P., Cerdeira, A., Almeida, F., Matos, T., "
            "& Reis, J. (2009). Wine Quality [Dataset]. UCI."
        ),
        "snapshot_date": "2026-06-14",
        "rows": row_count(destination),
        "columns": len(fieldnames),
        "snapshot_label": "6,497 muestras",
        "license_display": "CC BY 4.0",
        "portal_use": "Variación y outliers",
        "sha256": sha256(destination),
        "uses": ["variación", "valores atípicos", "casos raros válidos"],
    }


def main() -> None:
    required = [
        DOWNLOADS / "penguins.csv",
        DOWNLOADS / "bike-sharing.zip",
        DOWNLOADS / "wine-quality.zip",
    ]
    missing = [str(path) for path in required if not path.exists()]
    if missing:
        raise SystemExit(f"Faltan descargas requeridas: {', '.join(missing)}")

    SNAPSHOTS.mkdir(parents=True, exist_ok=True)
    METADATA.mkdir(parents=True, exist_ok=True)
    datasets = [prepare_penguins(), prepare_bike_sharing(), prepare_wine_quality()]
    for item in datasets:
        metadata_path = METADATA / f"{item['id']}.json"
        metadata_path.write_text(
            json.dumps(item, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    registry = {
        "schema_version": 1,
        "snapshot_policy": "fixed",
        "generated_at": "2026-06-14",
        "datasets": datasets,
    }
    (DATASETS / "registry.json").write_text(
        json.dumps(registry, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    shutil.copyfile(DATASETS / "registry.json", DATASETS / "registry.lock.json")
    print(
        "Datasets preparados: "
        + ", ".join(f"{item['name']} ({item['rows']} filas)" for item in datasets)
    )


if __name__ == "__main__":
    main()
