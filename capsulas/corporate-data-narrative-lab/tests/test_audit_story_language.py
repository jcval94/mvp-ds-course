from tools.audit_story_language import validate_case_language, validate_collection


def test_rejects_canned_language() -> None:
    errors = validate_case_language("La sala todavia olia a cafe recalentado.")
    assert any("Canned language" in error for error in errors)


def test_rejects_repeated_dialogue_across_collection() -> None:
    line = '> **Ana:** "Esta misma respuesta aparece en tres oficinas distintas."'
    cases = {f"{index}.md": line for index in range(3)}
    assert any("Repeated dialogue" in error for error in validate_collection(cases))


def test_rejects_repeated_narration_across_collection() -> None:
    paragraph = (
        "El equipo cerró la puerta y contó cada folio antes de volver a presentar "
        "el resultado en la junta del viernes."
    )
    cases = {"a.md": paragraph, "b.md": paragraph}
    assert any("Repeated narration" in error for error in validate_collection(cases))


def test_rejects_repeated_long_phrase_inside_distinct_paragraphs() -> None:
    shared = "esta frase demasiado larga aparece escondida dentro de párrafos diferentes"
    cases = {
        "a.md": f"Primero {shared} al final del turno.",
        "b.md": f"Después {shared} antes del cierre.",
        "c.md": f"Ahora {shared} durante la revisión.",
    }
    assert any("Repeated 10-word phrase" in error for error in validate_collection(cases))


def test_accepts_distinct_plain_language() -> None:
    cases = {
        "a.md": '> **Ana:** "Cuento los folios antes de prometer la fecha."',
        "b.md": '> **Luis:** "Voy a revisar por qué faltan esos pedidos."',
    }
    assert validate_case_language(cases["a.md"]) == []
    assert validate_collection(cases) == []
