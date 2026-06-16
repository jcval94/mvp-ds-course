#!/usr/bin/env python3
"""Create a documentation-first DataClass Forge project."""

from pathlib import Path
import argparse
import shutil
import sys


REPO_ROOT = Path(__file__).resolve().parents[1]


IDEA_TEMPLATE = """# IDEA.md

## Nombre

{name}

## Concepto o bloque

Describe el concepto de ciencia de datos que quieres enseñar.

## Usuario objetivo

Profesor o creador de cursos de ciencia de datos.

## Audiencia estudiante

Principiantes, salvo que se indique otro nivel.

## Resultado de aprendizaje

Describe qué podrá explicar, interpretar o hacer el estudiante.

## Contexto

Indica duración, dominio aplicado y restricciones.

## Modos requeridos

- Aprender.
- Ejercitar.
- Enseñar en vivo.

## Inspiraciones

Describe experiencias cuyo nivel de profundidad sea útil, sin pedir que se copien.

## No objetivos

- No LMS.
- No cuentas.
- No backend.
- No código de producto antes de validar documentos.

## Supuestos permitidos

- Usar datos sintéticos.
- Asumir nivel principiante.
- Reducir a un objetivo principal.
"""


README_TEMPLATE = """# {name}

Proyecto de material educativo generado con DataClass Forge.

## Flujo

1. Completa `IDEA.md`.
2. Revisa `docs/CURRICULUM_MAP.md`.
3. Ejecuta las skills de `.agents/skills`.
4. Genera ConceptSpec, LearningModule, PracticeExercise y LiveTeachingPack.
5. Valida con `evals/`.
6. Usa `app/` solo después de aprobar la vertical slice documental.
"""


AGENTS_TEMPLATE = """# AGENTS.md

Este proyecto crea material educativo de ciencia de datos.

1. Lee `IDEA.md` y `docs/CURRICULUM_MAP.md`.
2. Define nivel, prerrequisitos y un objetivo observable.
3. Usa `.agents/skills`.
4. Genera primero documentos en `docs/packages/`.
5. Valida con `evals/`.
6. No programes una app sin aprobación explícita.

La salida final debe incluir archivos, supuestos, riesgos, validación y próxima vertical slice.
"""


CLAUDE_TEMPLATE = """# CLAUDE.md

Lee `AGENTS.md`, `IDEA.md` y `docs/CURRICULUM_MAP.md`.
Mantén el trabajo en español y enfocado en ciencia de datos.
Exige visualización significativa, práctica dependiente de evidencia y feedback específico.
No construyas producto antes de validar el paquete documental.
"""


DOCS_README = """# docs

- `CURRICULUM_MAP.md`: progresión y prerrequisitos.
- `packages/`: artefactos por concepto.
"""


PACKAGES_README = """# packages

Crea una carpeta por concepto con:

- `CONCEPT_SPEC.md`
- `LEARNING_MODULE.md`
- `PRACTICE_EXERCISE.md`
- `LIVE_TEACHING_PACK.md`
- `VALIDATION_REPORT.md`
"""


EXAMPLES_README = """# examples

Guarda entradas, datasets sintéticos y outputs de referencia.
"""


APP_README = """# app

Reservado para una vertical slice técnica aprobada. No crear código antes de completar documentos y evals.
"""


GITIGNORE = """__pycache__/
.pytest_cache/
.venv/
venv/
.env
.DS_Store
"""


def validate_project_name(name: str) -> None:
    if not name.strip():
        raise ValueError("El nombre del proyecto no puede estar vacío.")
    invalid = set('/\\:*?"<>|')
    if any(char in invalid for char in name):
        raise ValueError("El nombre contiene caracteres inválidos para una carpeta.")


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def copy_directory(source: Path, destination: Path) -> None:
    if not source.exists():
        raise FileNotFoundError(f"No existe la fuente requerida: {source}")
    shutil.copytree(source, destination, dirs_exist_ok=True)


def scaffold(name: str) -> Path:
    validate_project_name(name)
    root = Path(name).resolve()
    if root.exists():
        raise FileExistsError(f"La carpeta ya existe: {root}")

    for folder in [
        root / "docs" / "packages",
        root / "evals",
        root / ".agents" / "skills",
        root / "templates",
        root / "examples",
        root / "app",
    ]:
        folder.mkdir(parents=True, exist_ok=False)

    write_file(root / "README.md", README_TEMPLATE.format(name=name))
    write_file(root / "IDEA.md", IDEA_TEMPLATE.format(name=name))
    write_file(root / "AGENTS.md", AGENTS_TEMPLATE)
    write_file(root / "CLAUDE.md", CLAUDE_TEMPLATE)
    write_file(root / ".gitignore", GITIGNORE)
    write_file(root / "docs" / "README.md", DOCS_README)
    write_file(root / "docs" / "packages" / "README.md", PACKAGES_README)
    write_file(root / "examples" / "README.md", EXAMPLES_README)
    write_file(root / "app" / "README.md", APP_README)

    shutil.copy2(
        REPO_ROOT / "docs" / "CURRICULUM_MAP.md",
        root / "docs" / "CURRICULUM_MAP.md",
    )
    copy_directory(REPO_ROOT / "evals", root / "evals")
    copy_directory(REPO_ROOT / "templates", root / "templates")
    copy_directory(REPO_ROOT / ".agents" / "skills", root / ".agents" / "skills")

    return root


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(
        description="Crea un proyecto documental de material educativo de ciencia de datos."
    )
    parser.add_argument("project_name", help="Nombre de la carpeta del proyecto.")
    args = parser.parse_args(argv)

    try:
        root = scaffold(args.project_name)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(f"Proyecto creado: {root}")
    print("Próximos pasos:")
    print(f"1. Entra a la carpeta: cd {root}")
    print("2. Completa IDEA.md.")
    print("3. Genera el paquete documental con AGENTS.md.")
    print("4. Valida con evals/.")
    print("5. Usa app/ solo después de aprobación explícita.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
