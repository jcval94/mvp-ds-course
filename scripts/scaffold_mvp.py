#!/usr/bin/env python3
"""Create a minimal MVP project structure without external dependencies."""

from pathlib import Path
import argparse
import sys


IDEA_TEMPLATE = """# IDEA.md

Puedes dejar campos incompletos. El agente debe inferir lo razonable y preguntar solo si algo bloquea el avance.

## Nombre provisional


## Idea en una frase


## Problema que resuelve


## Usuario objetivo


## Resultado esperado


## Contexto


## Plataforma deseada


## Restricciones


## Inspiraciones


## Lo que NO debe incluir el MVP


## Preguntas abiertas


## Supuestos permitidos

- Si falta informacion no critica, crear supuestos razonables y documentarlos.
- Si el alcance es grande, reducir a una vertical slice construible.
"""


README_TEMPLATE = """# {name}

Proyecto MVP generado con mvp-agent-factory.

## Flujo recomendado

1. Completa IDEA.md.
2. Ejecuta Codex o Claude Code con AGENTS.md.
3. Genera documentos en docs/.
4. Valida con evals/.
5. Define vertical slice.
6. Construye solo despues de aprobar documentos.
"""


AGENTS_TEMPLATE = """# AGENTS.md

Este proyecto debe trabajar primero sobre documentos. Lee IDEA.md antes de crear codigo.

## Orden de trabajo

1. Leer IDEA.md.
2. Crear supuestos razonables.
3. Generar docs/PRODUCT_BRIEF.md.
4. Generar docs/PRD.md.
5. Definir vertical slice.
6. Validar contra evals/.
7. Solo programar producto si el usuario lo pide explicitamente.
"""


CLAUDE_TEMPLATE = """# CLAUDE.md

Lee IDEA.md antes de actuar. No programes producto hasta que existan Product Brief, PRD, evals y vertical slice aprobada.

Mantiene todos los outputs en español. Si falta informacion no bloqueante, infiere supuestos razonables y documentalos. Si hay sobreingenieria, reduce alcance.
"""


RUBRIC_TEMPLATE = """# Rubrica minima

- [ ] Usuario objetivo claro.
- [ ] Problema concreto.
- [ ] MVP pequeno.
- [ ] No objetivos definidos.
- [ ] Vertical slice construible.
- [ ] Metricas observables.
"""


MVP_CHECKLIST_TEMPLATE = """# MVP Quality Checklist

- [ ] Usuario inicial especifico.
- [ ] Problema en una frase.
- [ ] Resultado observable.
- [ ] Vertical slice con entrada, flujo y salida.
- [ ] No objetivos definidos.
- [ ] Post-MVP separado.
- [ ] Prueba manual definida.
"""


DOCUMENT_CHECKLIST_TEMPLATE = """# Document Quality Checklist

- [ ] Brief y PRD tienen el mismo usuario.
- [ ] No hay placeholders fuera de templates.
- [ ] El PRD respeta los no objetivos.
- [ ] Las metricas son observables.
- [ ] El plan no inicia codigo antes de evals.
"""


DOCS_README_TEMPLATE = """# docs

Aqui se generan Product Brief, PRD, Agent Operating Spec, Skill Map, Eval Suite, Harness Spec, Implementation Plan y prompts.
"""


SKILLS_README_TEMPLATE = """# skills

Agrega aqui skills especificas del MVP cuando el paquete documental las requiera.
"""


EXAMPLES_README_TEMPLATE = """# examples

Guarda ejemplos de ideas, datos ficticios o salidas esperadas que ayuden a validar el MVP.
"""


APP_README_TEMPLATE = """# app

Esta carpeta queda reservada para codigo de producto. No la uses hasta aprobar documentos, evals y vertical slice.
"""


GITIGNORE_TEMPLATE = """__pycache__/
.pytest_cache/
.venv/
venv/
.env
.DS_Store
"""


def validate_project_name(name: str) -> None:
    if not name.strip():
        raise ValueError("El nombre del proyecto no puede estar vacio.")
    invalid = set('/\\:*?"<>|')
    if any(char in invalid for char in name):
        raise ValueError("El nombre contiene caracteres invalidos para una carpeta.")


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")


def scaffold(name: str) -> Path:
    validate_project_name(name)
    root = Path(name).resolve()
    if root.exists():
        raise FileExistsError(f"La carpeta ya existe: {root}")

    folders = [
        root / "docs",
        root / "evals",
        root / ".agents" / "skills",
        root / "examples",
        root / "app",
    ]
    for folder in folders:
        folder.mkdir(parents=True, exist_ok=False)

    write_file(root / "README.md", README_TEMPLATE.format(name=name))
    write_file(root / "IDEA.md", IDEA_TEMPLATE)
    write_file(root / "AGENTS.md", AGENTS_TEMPLATE)
    write_file(root / "CLAUDE.md", CLAUDE_TEMPLATE)
    write_file(root / ".gitignore", GITIGNORE_TEMPLATE)
    write_file(root / "evals" / "rubric.md", RUBRIC_TEMPLATE)
    write_file(root / "evals" / "mvp_quality_checklist.md", MVP_CHECKLIST_TEMPLATE)
    write_file(root / "evals" / "document_quality_checklist.md", DOCUMENT_CHECKLIST_TEMPLATE)
    write_file(root / "docs" / "README.md", DOCS_README_TEMPLATE)
    write_file(root / ".agents" / "skills" / "README.md", SKILLS_README_TEMPLATE)
    write_file(root / "examples" / "README.md", EXAMPLES_README_TEMPLATE)
    write_file(root / "app" / "README.md", APP_README_TEMPLATE)

    return root


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Crea una estructura minima para un nuevo MVP.")
    parser.add_argument("project_name", help="Nombre de la carpeta del nuevo MVP.")
    args = parser.parse_args(argv)

    try:
        root = scaffold(args.project_name)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(f"Proyecto creado: {root}")
    print("Proximos pasos:")
    print(f"1. Entra a la carpeta: cd {root}")
    print("2. Edita IDEA.md con tu idea inicial.")
    print("3. Abre Codex o Claude Code en la carpeta creada.")
    print("4. Pide: Lee AGENTS.md e IDEA.md y genera el paquete documental.")
    print("5. Valida con evals/ antes de escribir codigo de producto.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
