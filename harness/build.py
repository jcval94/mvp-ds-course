"""Build a static, host-agnostic dist/ from the factory, portal, design and capsulas."""

from __future__ import annotations

import hashlib
import json
import os
import shutil
import stat
import subprocess
import sys
from pathlib import Path
from typing import Any

from .config import DIST, HOST_CONFIG_FILES, LEGACY_BUILD, ROOT, HarnessError, load_course, load_missions

PUBLIC_MISSION_STATES = {"ready", "published"}
NON_PUBLISHED_NAMES = {"README.md", "AGENTS.md", "CLAUDE.md", "REFERENCE.md"}


def _remove_tree(path: Path, expected_parent: Path, expected_name: str) -> None:
    resolved = path.resolve()
    if resolved.parent != expected_parent.resolve() or resolved.name != expected_name:
        raise HarnessError(f"Ruta de build insegura: {resolved}")
    if resolved.exists():
        def onerror(function, target, _info):
            os.chmod(target, stat.S_IWRITE)
            function(target)
        shutil.rmtree(resolved, onerror=onerror)


def _copy_tree(source: Path, destination: Path, *, skip_docs: bool, forbid_overwrite: bool) -> None:
    """Copy a component into dist/, dropping host config files (and agent docs for engine folders)."""
    skipped = HOST_CONFIG_FILES | (NON_PUBLISHED_NAMES if skip_docs else set())
    for path in sorted(source.rglob("*")):
        relative = path.relative_to(source)
        if path.is_dir() or any(part in skipped for part in relative.parts):
            continue
        target = destination / relative
        if forbid_overwrite and target.exists() and target.read_bytes() != path.read_bytes():
            raise HarnessError(f"{source.name}/{relative.as_posix()} sobrescribiría un archivo ya publicado en dist/")
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(path, target)


def _write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")


def _git(*args: str, root: Path) -> str:
    try:
        return subprocess.run(["git", *args], cwd=root, check=True, capture_output=True, text=True).stdout.strip()
    except (OSError, subprocess.CalledProcessError):
        return "unknown"


def build_factory(root: Path) -> None:
    """Run the existing factory build unchanged; it writes _site/."""
    result = subprocess.run([sys.executable, "scripts/build_pages.py"], cwd=root, capture_output=True, text=True)
    if result.returncode != 0:
        raise HarnessError("La fábrica no construyó _site/:\n" + result.stdout + result.stderr)


def build_capsulas(root: Path, destination: Path) -> None:
    lab = root / "capsulas" / "corporate-data-narrative-lab"
    result = subprocess.run(
        [sys.executable, "tools/build_pages_site.py", "--lab-root", str(lab), "--site-root", str(destination)],
        cwd=lab,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise HarnessError("Las cápsulas no se construyeron:\n" + result.stdout + result.stderr)
    for name in HOST_CONFIG_FILES:
        (destination / name).unlink(missing_ok=True)


def public_missions(course: dict[str, Any], root: Path) -> list[dict[str, Any]]:
    allowed_access = set(course["access"]["public_build_includes"])
    published = []
    for mission in load_missions(course, root):
        data = mission.data
        if data["status"] in PUBLIC_MISSION_STATES and data["access"] in allowed_access:
            entry = {
                "id": data["id"],
                "title": data["title"],
                "status": data["status"],
                "access": data["access"],
                "decision": {"question": data["decision"]["question"]},
                "concepts": data["concepts"],
                "level": data.get("level"),
            }
            if (mission.manifest_path.parent / "app" / "index.html").is_file():
                entry["href"] = f"missions/{data['id']}/"
            published.append(entry)
    return sorted(published, key=lambda item: item["id"])


MISSION_DATA_SUFFIXES = {".csv", ".json"}


def publish_mission_apps(missions: list[dict[str, Any]], course: dict[str, Any], root: Path, dist: Path) -> None:
    """Only public, ready/published missions get their page; their case data goes next to it.

    missions/<id>/app/ → dist/missions/<id>/ and casos/data/<case>/*.{csv,json} → dist/missions/<id>/data/.
    Drafts and premium missions never reach dist/ (see public_missions).
    """
    manifests = {mission.id: mission for mission in load_missions(course, root)}
    for entry in missions:
        if "href" not in entry:
            continue
        mission = manifests[entry["id"]]
        target = dist / "missions" / entry["id"]
        _copy_tree(mission.manifest_path.parent / "app", target, skip_docs=True, forbid_overwrite=True)
        data_dir = root / "casos" / "data" / mission.data["case"]["id"]
        if data_dir.is_dir():
            for path in sorted(data_dir.iterdir()):
                if path.is_file() and path.suffix in MISSION_DATA_SUFFIXES:
                    (target / "data").mkdir(parents=True, exist_ok=True)
                    shutil.copy2(path, target / "data" / path.name)


def file_inventory(dist: Path) -> list[dict[str, Any]]:
    inventory = []
    for path in sorted(item for item in dist.rglob("*") if item.is_file()):
        relative = path.relative_to(dist).as_posix()
        if relative == "build-info.json":
            continue
        inventory.append({"path": relative, "bytes": path.stat().st_size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
    return inventory


def build(root: Path = ROOT, dist: Path | None = None) -> dict[str, Any]:
    dist = dist or (root / "dist")
    course = load_course(root)
    components = course["components"]

    build_factory(root)
    _remove_tree(dist, root, "dist")
    dist.mkdir()

    # 1. Fábrica existente: mismas rutas que hoy publica GitHub Pages.
    _copy_tree(root / LEGACY_BUILD.name, dist, skip_docs=False, forbid_overwrite=False)
    # 2. Capa nueva del portal (misiones, 404).
    if components["portal"]["publish"]:
        _copy_tree(root / components["portal"]["path"], dist / components["portal"]["mount"], skip_docs=True, forbid_overwrite=True)
    # 3. Sistema visual.
    if components["design"]["publish"]:
        _copy_tree(root / components["design"]["path"], dist / components["design"]["mount"], skip_docs=True, forbid_overwrite=True)
    # 4. Cápsulas, construidas desde su fuente canónica.
    if components["capsulas"]["publish"]:
        build_capsulas(root, dist / components["capsulas"]["mount"])

    missions = public_missions(course, root)
    publish_mission_apps(missions, course, root, dist)
    _write_json(dist / "missions.json", {"schema_version": 1, "course": course["course"]["id"], "missions": missions})

    inventory = file_inventory(dist)
    info = {
        "schema_version": 1,
        "course": course["course"]["id"],
        "commit": _git("rev-parse", "HEAD", root=root),
        "commit_time": _git("log", "-1", "--format=%cI", root=root),
        "access_included": sorted(course["access"]["public_build_includes"]),
        "files": len(inventory) + 1,
        "bytes": sum(item["bytes"] for item in inventory),
        "content_sha256": hashlib.sha256(json.dumps(inventory, sort_keys=True).encode("utf-8")).hexdigest(),
        "public_missions": [item["id"] for item in missions],
    }
    _write_json(dist / "build-info.json", info)
    return info
