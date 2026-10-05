"""Shared paths and loaders for the course harness."""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[1]
SCHEMAS = ROOT / "schemas"
DIST = ROOT / "dist"
LEGACY_BUILD = ROOT / "_site"

# Host-specific files that belong to the deployment layer, never to dist/.
HOST_CONFIG_FILES = {".nojekyll", "CNAME", "_headers", "_redirects", "_routes.json", "_worker.js"}
# Hostnames that would couple the portal to a single provider.
HOST_COUPLING_MARKERS = ("jcval94.github.io", ".pages.dev")
# Media that must live outside Git.
FORBIDDEN_TRACKED_SUFFIXES = {".mp4", ".mov", ".webm", ".mkv", ".zip"}
# Regenerable outputs that must not be tracked.
FORBIDDEN_TRACKED_PREFIXES = ("_site/", "dist/", "capsulas/docs/", "studio/node_modules/", "studio/out/", "node_modules/")


class HarnessError(Exception):
    """A contract violation. Message is user-facing (Spanish)."""


@dataclass(frozen=True)
class Mission:
    id: str
    manifest_path: Path
    data: dict[str, Any]


def load_yaml(path: Path) -> Any:
    with path.open(encoding="utf-8") as handle:
        return yaml.safe_load(handle)


def load_json(path: Path) -> Any:
    with path.open(encoding="utf-8") as handle:
        return json.load(handle)


def load_schema(name: str) -> dict[str, Any]:
    return load_json(SCHEMAS / name)


def load_course(root: Path = ROOT) -> dict[str, Any]:
    path = root / "course.yaml"
    if not path.exists():
        raise HarnessError("Falta course.yaml en la raíz del repo.")
    return load_yaml(path)


def load_missions(course: dict[str, Any], root: Path = ROOT) -> list[Mission]:
    missions: list[Mission] = []
    for entry in course.get("missions", []):
        manifest = root / entry["manifest"]
        if not manifest.exists():
            raise HarnessError(f"course.yaml lista {entry['id']} pero no existe {entry['manifest']}.")
        missions.append(Mission(id=entry["id"], manifest_path=manifest, data=load_yaml(manifest)))
    return missions


def load_cases(root: Path = ROOT) -> tuple[dict[str, dict[str, Any]], dict[str, dict[str, Any]]]:
    """Return (approved-or-verified cases from cases.jsonl, staging candidates)."""
    ledger: dict[str, dict[str, Any]] = {}
    jsonl = root / "casos" / "cases.jsonl"
    if jsonl.exists():
        for number, line in enumerate(jsonl.read_text(encoding="utf-8").splitlines(), start=1):
            if not line.strip():
                continue
            try:
                case = json.loads(line)
            except json.JSONDecodeError as error:
                raise HarnessError(f"casos/cases.jsonl línea {number}: JSON inválido ({error.msg}).") from error
            ledger[case.get("id", f"<línea {number}>")] = case
    staging: dict[str, dict[str, Any]] = {}
    for path in sorted((root / "casos" / "staging").glob("*.json")):
        staging[path.stem] = load_json(path)
    return ledger, staging
