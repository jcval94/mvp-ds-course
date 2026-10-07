"""Contract validation: schemas, cross-references, design tokens and repo hygiene."""

from __future__ import annotations

import hashlib
import re
import subprocess
from pathlib import Path
from typing import Any

from jsonschema import Draft202012Validator, FormatChecker

from .config import (
    FORBIDDEN_TRACKED_PREFIXES,
    FORBIDDEN_TRACKED_SUFFIXES,
    ROOT,
    HarnessError,
    load_cases,
    load_course,
    load_json,
    load_missions,
    load_schema,
)

MB = 1024 * 1024
LISTED_STATES = {"ready", "published"}


def _schema_errors(instance: Any, schema_name: str, label: str) -> list[str]:
    validator = Draft202012Validator(load_schema(schema_name), format_checker=FormatChecker())
    errors = []
    for error in sorted(validator.iter_errors(instance), key=lambda item: list(item.absolute_path)):
        location = "/".join(str(part) for part in error.absolute_path) or "(raíz)"
        errors.append(f"{label}: {location}: {error.message}")
    return errors


def _dataset_errors(case: dict[str, Any], label: str, root: Path) -> list[str]:
    """A case's dataset must exist, live under casos/data/<case id>/ and match its SHA-256."""
    dataset = case.get("dataset")
    if not isinstance(dataset, dict):
        return []
    case_id = case.get("id", "?")
    path = root / str(dataset.get("path", ""))
    if not str(dataset.get("path", "")).startswith(f"casos/data/{case_id}/"):
        return [f"{label}[{case_id}]: dataset.path debe vivir en casos/data/{case_id}/"]
    if not path.is_file():
        return [f"{label}[{case_id}]: no existe {dataset.get('path')}"]
    digest = hashlib.sha256(path.read_bytes()).hexdigest()
    if digest != dataset.get("sha256"):
        return [f"{label}[{case_id}]: el SHA-256 de {dataset.get('path')} es {digest}, no el declarado"]
    return []


def validate_contracts(root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    course = load_course(root)
    errors += _schema_errors(course, "course.schema.json", "course.yaml")
    if errors:
        return errors

    ids = [entry["id"] for entry in course["missions"]]
    duplicates = sorted({item for item in ids if ids.count(item) > 1})
    if duplicates:
        errors.append(f"course.yaml: misiones duplicadas: {', '.join(duplicates)}")

    listed_dirs = {Path(entry["manifest"]).parent.name for entry in course["missions"]}
    for folder in sorted((root / "missions").glob("m*/")):
        if folder.name not in listed_dirs:
            errors.append(f"missions/{folder.name}/ existe pero no está registrada en course.yaml")

    ledger, staging = load_cases(root)
    for case_id, case in ledger.items():
        errors += _schema_errors(case, "case.schema.json", f"casos/cases.jsonl[{case_id}]")
        if case.get("status") == "candidate":
            errors.append(f"casos/cases.jsonl[{case_id}]: un candidato debe vivir en casos/staging/, no en el ledger")
    for case_id, case in staging.items():
        errors += _schema_errors(case, "case.schema.json", f"casos/staging/{case_id}.json")
        if case.get("id") != case_id:
            errors.append(f"casos/staging/{case_id}.json: el id interno ({case.get('id')}) no coincide con el archivo")
    for label, case in [*(("casos/cases.jsonl", c) for c in ledger.values()), *(("casos/staging", c) for c in staging.values())]:
        errors += _dataset_errors(case, label, root)

    capsula_cases = root / "capsulas" / "corporate-data-narrative-lab" / "examples" / "cases"
    for mission in load_missions(course, root):
        label = f"missions/{mission.manifest_path.parent.name}/mission.yaml"
        mission_errors = _schema_errors(mission.data, "mission.schema.json", label)
        errors += mission_errors
        if mission_errors:
            continue
        data = mission.data
        if data["id"] != mission.id or mission.manifest_path.parent.name != mission.id:
            errors.append(f"{label}: el id debe coincidir con course.yaml y con el nombre de la carpeta")
        case_id = data["case"]["id"]
        case = ledger.get(case_id)
        if case is None and case_id not in staging:
            errors.append(f"{label}: el caso '{case_id}' no existe en casos/cases.jsonl ni en casos/staging/")
        if data["status"] in LISTED_STATES:
            if not case or case.get("status") != "approved":
                errors.append(f"{label}: una misión '{data['status']}' exige el caso '{case_id}' aprobado en casos/cases.jsonl")
            if not data.get("kit"):
                errors.append(f"{label}: una misión '{data['status']}' exige un kit")
        kit = data.get("kit")
        if kit and not (root / kit["path"]).exists():
            errors.append(f"{label}: no existe el kit {kit['path']}")
        side_quest = data.get("side_quest")
        if side_quest and not (capsula_cases / f"{side_quest['capsula']}.md").exists():
            errors.append(f"{label}: no existe la cápsula {side_quest['capsula']}")
    return errors


def _kebab(name: str) -> str:
    name = re.sub(r"([a-z])([A-Z])", r"\1-\2", name)
    name = re.sub(r"([a-zA-Z])([0-9])", r"\1-\2", name)
    return name.lower()


def validate_design_tokens(root: Path = ROOT) -> list[str]:
    css_path = root / "design" / "tokens" / "tokens.css"
    json_path = root / "design" / "tokens" / "tokens.json"
    errors: list[str] = []
    css = css_path.read_text(encoding="utf-8")
    block = re.search(r":root\s*\{(.*?)\}", css, re.S)
    if not block:
        return ["design/tokens/tokens.css: falta el bloque :root"]
    css_vars = {name: value.strip().lower() for name, value in re.findall(r"--([\w-]+)\s*:\s*([^;]+);", block.group(1))}
    colors = {_kebab(key): str(value).lower() for key, value in load_json(json_path)["color"].items()}
    for name, value in colors.items():
        if css_vars.get(name) != value:
            errors.append(f"design: --{name} es '{css_vars.get(name)}' en tokens.css y '{value}' en tokens.json")
    for name, value in css_vars.items():
        if re.fullmatch(r"#[0-9a-f]{3,8}", value) and name not in colors:
            errors.append(f"design: --{name} está en tokens.css pero no en tokens.json")
    return errors


# Superficies del portal y de las misiones que deben tomar todo color de design/tokens/.
COLOR_GUARDED_DIRS = ("site", "portal", "missions")
# Excepción documentada: 404.html se sirve desde cualquier ruta y no puede cargar assets relativos.
COLOR_LITERAL_EXCEPTIONS = {"portal/404.html"}
CSS_HEX = re.compile(r"(?:^|[\s:(,])(#[0-9a-fA-F]{3,8})\b")
CSS_NAMED = re.compile(r":\s*(white|black)\s*(?=[;}!])", re.I)
# En JS solo #rrggbb o #rrggbbaa: los de 3 o 4 dígitos chocan con anclas como "#add".
JS_HEX = re.compile(r"[\"'`](#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?)[\"'`]")


def _css_fragments(path: Path, text: str) -> list[str]:
    if path.suffix == ".css":
        return [text]
    if path.suffix == ".html":
        styles = re.findall(r"<style[^>]*>(.*?)</style>", text, re.S | re.I)
        inline = re.findall(r"\sstyle=\"([^\"]*)\"", text, re.I)
        return styles + inline
    return []


def validate_color_literals(root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    for directory in COLOR_GUARDED_DIRS:
        for path in sorted((root / directory).rglob("*")):
            relative = path.relative_to(root).as_posix()
            if not path.is_file() or path.suffix not in {".css", ".html", ".js"} or relative in COLOR_LITERAL_EXCEPTIONS:
                continue
            text = path.read_text(encoding="utf-8")
            found = set()
            for fragment in _css_fragments(path, text):
                found.update(CSS_HEX.findall(fragment))
                found.update(CSS_NAMED.findall(fragment))
            if path.suffix == ".js":
                found.update(JS_HEX.findall(text))
            if found:
                errors.append(f"{relative}: colores literales {sorted(found)}; usa variables de design/tokens/tokens.css")
    return errors


def tracked_files(root: Path = ROOT) -> list[str]:
    try:
        output = subprocess.run(["git", "ls-files", "-z"], cwd=root, check=True, capture_output=True).stdout
    except (OSError, subprocess.CalledProcessError) as error:
        raise HarnessError(f"No se pudo listar archivos con git: {error}") from error
    return [item for item in output.decode("utf-8").split("\0") if item]


def validate_repo_hygiene(course: dict[str, Any], root: Path = ROOT) -> tuple[list[str], dict[str, Any]]:
    budgets = course["build"]["budgets"]
    errors: list[str] = []
    total = 0
    largest: list[tuple[int, str]] = []
    for relative in tracked_files(root):
        path = root / relative
        if relative.startswith(FORBIDDEN_TRACKED_PREFIXES):
            errors.append(f"repo: {relative} es un artefacto regenerable y no debe versionarse")
        if Path(relative).suffix.lower() in FORBIDDEN_TRACKED_SUFFIXES:
            errors.append(f"repo: {relative} es un medio pesado; súbelo a YouTube o a un Release")
        if not path.is_file():
            continue
        size = path.stat().st_size
        total += size
        largest.append((size, relative))
        if size > budgets["repo_max_file_mb"] * MB:
            errors.append(f"repo: {relative} pesa {size / MB:.1f} MB (límite {budgets['repo_max_file_mb']} MB)")
    if total > budgets["repo_max_tracked_mb"] * MB:
        errors.append(f"repo: los archivos versionados suman {total / MB:.1f} MB (límite {budgets['repo_max_tracked_mb']} MB)")
    largest.sort(reverse=True)
    report = {"tracked_mb": round(total / MB, 2), "largest": [(name, round(size / MB, 2)) for size, name in largest[:5]]}
    return errors, report


def run(root: Path = ROOT) -> dict[str, Any]:
    course_errors = _schema_errors(load_course(root), "course.schema.json", "course.yaml")
    if course_errors:
        raise HarnessError("Validación fallida:\n- " + "\n- ".join(course_errors))
    errors = validate_contracts(root)
    errors += validate_design_tokens(root)
    errors += validate_color_literals(root)
    hygiene_errors, report = validate_repo_hygiene(load_course(root), root)
    errors += hygiene_errors
    if errors:
        raise HarnessError("Validación fallida:\n- " + "\n- ".join(errors))
    return report
