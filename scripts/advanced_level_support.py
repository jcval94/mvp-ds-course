#!/usr/bin/env python3
"""Shared content helpers for deterministic Levels 6 and 7."""

from __future__ import annotations


def lesson(
    *, level: int, slug: str, title: str, objective: str, definition: str,
    mechanism: str, setup: str, don: str, paco: str, subtitles: tuple[str, str],
    scene: int, episode: str, data_state: str,
    values: tuple[tuple[float, float], tuple[float, float]], variables: str,
    unit: str, limit: str, context: str, pressure: str, decision: str,
    guest: dict[str, str] | None = None,
) -> dict[str, object]:
    def visual_state(label: str, pair: tuple[float, float], note: str) -> dict[str, object]:
        return {
            "label": label,
            "summary": note,
            "bars": [
                {"label": "Valor A", "value": pair[0], "display": f"{pair[0]:.3f}"},
                {"label": "Valor B", "value": pair[1], "display": f"{pair[1]:.3f}"},
            ],
            "markers": [slug, data_state],
            "note": note,
        }

    item: dict[str, object] = {
        "id": slug,
        "title": title,
        "objective": objective,
        "definition": definition,
        "intuition": f"El visual hace visible {mechanism} antes de resumirlo.",
        "error": "Convertir una salida exploratoria o una métrica aislada en una decisión automática.",
        "scene": f"L{level}-S{scene:02d}",
        "episode": episode,
        "setup": setup,
        "donJuan": don,
        "paco": paco,
        "subtitles": subtitles,
        "mechanism": mechanism,
        "action": f"Comparar estados de {title.lower()}",
        "cue": f"Recorre los estados y cita la evidencia de {title.lower()}.",
        "states": [
            visual_state("Antes de decidir", values[0], subtitles[0]),
            visual_state("Evidencia revisada", values[1], subtitles[1]),
        ],
        "dataState": data_state,
        "unit": unit,
        "variables": variables,
        "limit": limit,
        "practiceCases": [
            {
                "question": f"¿Qué conclusión guiada sobre {title.lower()} conserva el alcance?",
                "correct": subtitles[1],
                "wrong1": "La salida demuestra una regla universal y ya puede automatizarse.",
                "wrong2": "Se puede omitir la unidad, la partición o la revisión humana.",
                "feedback": subtitles[1],
                "hint": "Cita el estado final y conserva denominador, escala o partición.",
                "evidence": f"Otro incidente recalcula {mechanism} con evidencia nueva.",
                "context": context,
                "pressure": pressure,
                "decision": decision,
            },
            {
                "question": f"¿Qué exige transferir {title.lower()} a otra decisión?",
                "correct": "Recalcular con datos nuevos, documentar el procedimiento y volver a revisar sus límites.",
                "wrong1": "Reutilizar la primera respuesta porque el procedimiento ya funcionó una vez.",
                "wrong2": "Cambiar el umbral o la escala sin registrar el efecto sobre la evidencia.",
                "feedback": "La transferencia conserva el procedimiento, no la respuesta ni la interpretación anterior.",
                "hint": "Distingue una salida reproducible de una verdad fija.",
                "evidence": f"Una segunda situación cambia valores y vuelve a recorrer {mechanism}.",
                "context": f"El turno cambia la pregunta después de revisar {title.lower()}",
                "pressure": "la decisión debe seguir siendo auditable sin ocultar errores ni casos raros",
                "decision": "repetir el cálculo, citar las marcas nuevas y mantener revisión humana",
            },
        ],
    }
    if guest:
        item["guest"] = guest
    return item

