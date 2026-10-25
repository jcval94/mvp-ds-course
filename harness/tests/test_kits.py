"""Los cuadernos de kits/ nunca cargan datos desde una rama del repositorio."""

from __future__ import annotations

import json
import re
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[2]
RAW = re.compile(r"https://raw\.githubusercontent\.com/[^/\s\"']+/[^/\s\"']+/([^/\s\"']+)/")
FIXED_REF = re.compile(r"^(?:[0-9a-f]{40}|v\d[\w.-]*|datos-[\w.-]+)$")


def remote_refs(text: str) -> list[str]:
    return RAW.findall(text)


def notebook_text(path: Path) -> str:
    cells = json.loads(path.read_text(encoding="utf-8"))["cells"]
    return "\n".join("".join(cell.get("source", [])) for cell in cells)


@pytest.mark.parametrize("path", sorted((ROOT / "kits").rglob("*.ipynb")), ids=lambda p: p.relative_to(ROOT).as_posix())
def test_kit_data_urls_are_pinned(path: Path) -> None:
    refs = remote_refs(notebook_text(path))
    unpinned = [ref for ref in refs if not FIXED_REF.match(ref)]
    assert not unpinned, f"{path.name}: datos cargados desde una rama ({', '.join(unpinned)}); fíjalos a un commit o release"


@pytest.mark.parametrize("ref", ["main", "master", "develop", "f2-wald"])
def test_branch_refs_are_rejected(ref: str) -> None:
    url = f'BASE = "https://raw.githubusercontent.com/jcval94/mvp-ds-course/{ref}/casos/data/x/"'
    assert not FIXED_REF.match(remote_refs(url)[0])


@pytest.mark.parametrize("ref", ["0c5500174bac7899dc18bb11424a2865fa668925", "v1.0.0", "datos-wald-v1"])
def test_fixed_refs_are_accepted(ref: str) -> None:
    url = f"https://raw.githubusercontent.com/jcval94/mvp-ds-course/{ref}/casos/data/x/a.csv"
    assert FIXED_REF.match(remote_refs(url)[0])
