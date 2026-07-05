#!/usr/bin/env python3
"""Build full narrative lessons from an approved LevelStory table."""

from __future__ import annotations

from pathlib import Path

from advanced_level_support import lesson


ROOT = Path(__file__).resolve().parents[1]


def story_scenes(level: int) -> list[dict[str, str]]:
    """Read the approved story table so generated dialogue never forks canon."""
    path = ROOT / "docs" / "stories" / f"LEVEL_{level}.md"
    rows: list[dict[str, str]] = []
    for line in path.read_text(encoding="utf-8").splitlines():
        if not line.startswith(f"| `L{level}-S"):
            continue
        cells = [cell.strip().strip("“”") for cell in line.strip().strip("|").split("|")]
        if len(cells) != 8:
            raise ValueError(f"Fila narrativa inválida en {path}: {line}")
        rows.append(dict(zip(
            ("scene", "concept", "learn", "don", "paco", "initial", "final", "practice"),
            cells,
        )))
    return rows


def concept_lesson(
    *, level: int, scene_number: int, slug: str, title: str, mechanism: str,
    variables: str, unit: str, data_state: str, episode: str,
) -> dict[str, object]:
    scene = story_scenes(level)[scene_number - 1]
    if scene["scene"].strip("`") != f"L{level}-S{scene_number:02d}":
        raise ValueError(f"Escena fuera de orden: {scene['scene']}")
    item = lesson(
        level=level,
        slug=slug,
        title=title,
        objective=f"Aplicar {title.lower()} y justificar una decisión con evidencia verificable.",
        definition=scene["initial"],
        mechanism=mechanism,
        setup=scene["learn"],
        don=scene["don"],
        paco=scene["paco"],
        subtitles=(scene["initial"], scene["final"]),
        scene=scene_number,
        episode=episode,
        data_state=data_state,
        values=((scene_number + 1, max(1, scene_number % 5 + 1)), (scene_number + 2, max(1, (scene_number + 2) % 6 + 1))),
        variables=variables,
        unit=unit,
        limit="La evidencia es didáctica y reproducible; no autoriza causalidad, automatización ni conclusiones fuera del contrato declarado.",
        context=scene["practice"],
        pressure="la decisión debe conservar unidad, contrato y trazabilidad sin confiar en una salida por apariencia",
        decision=f"aceptar o rechazar la propuesta después de verificar {mechanism}",
    )
    item["intuition"] = f"El visual separa los estados de {mechanism} para que el cambio pueda auditarse antes de decidir."
    item["error"] = f"Dar por válido {title.lower()} sin reconciliar las marcas visibles, la unidad y el límite del procedimiento."
    item["action"] = f"Recorrer y verificar {title.lower()}"
    item["cue"] = f"Compara entrada, transformación y comprobación de {title.lower()}."
    item["states"] = [
        {"label":"Entrada y contrato", "summary":scene["initial"], "bars":[{"label":"entrada","value":scene_number+1,"display":str(scene_number+1)},{"label":"reglas","value":2,"display":"2"}], "markers":["unidad declarada","contrato visible"], "note":scene["initial"]},
        {"label":"Mecanismo revelado", "summary":f"Se hace visible {mechanism}.", "bars":[{"label":"pasos","value":3,"display":"3"},{"label":"controles","value":2,"display":"2"}], "markers":["transformación trazable","evidencia intermedia"], "note":f"Se hace visible {mechanism}."},
        {"label":"Resultado verificado", "summary":scene["final"], "bars":[{"label":"checks","value":4,"display":"4"},{"label":"fallos","value":0,"display":"0"}], "markers":["resultado reconciliado","límite documentado"], "note":scene["final"]},
    ]
    item["practiceCases"][0].update({
        "question": f"¿Qué decisión sobre {title.lower()} está respaldada por las tres etapas?",
        "correct": scene["final"],
        "feedback": f"La entrada, el mecanismo y la comprobación sostienen la conclusión acotada: {scene['final']}",
        "evidence": f"El incidente guiado recorre entrada, mecanismo y verificación de {title.lower()}.",
    })
    item["practiceCases"][1].update({
        "question": f"¿Qué debe volver a comprobarse al transferir {title.lower()} a otro caso?",
        "correct": "La unidad, el contrato, las marcas del mecanismo y el resultado deben recalcularse con la nueva entrada.",
        "feedback": "Transferir conserva el procedimiento verificable, no la respuesta del caso anterior.",
        "evidence": f"La transferencia cambia la entrada y exige repetir {mechanism}.",
    })
    return item
