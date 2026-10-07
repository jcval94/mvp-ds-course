from tools.validate_case_structure import validate_collection, validate_markdown


def sample_case(punchline: str = "Y todavia querian cobrar la junta.") -> str:
    dialogue = "\n\n".join(
        f'> **Persona {i % 3}:** "Esta linea habla de {i} casos y responde al problema de clientes durante el cierre semanal de soporte."'
        for i in range(1, 16)
    )
    narration = " ".join(["La oficina siguio discutiendo el mismo cierre."] * 15)
    return f"""# Caso de prueba

<!-- story
concept: prueba
characters: Persona 0, Persona 1, Persona 2
situation: cierre
bad_logic: contar solo lo comodo
escalation: el cierre se vuelve politica
data_turn: abren la historia completa
chart: barras
decision: medir a todos
punchline: {punchline}
rule: comparar la misma poblacion
synthetic_data: true
-->

## Inicio

{dialogue}

{narration}

## Consecuencia

> **Persona 1:** "Seguimos hablando de 20 clientes, no de otra cosa."

## La grafica

<svg data-chart="central" viewBox="0 0 100 50"><rect width="40" height="20"/></svg>

<!-- learning:pause -->
> **Persona 2:** "¿A quienes dejamos fuera de los 20 clientes?"

**Lo que muestra:** La barra completa incluye a la gente omitida y cambia la lectura.

## Cierre

> **Persona 0:** "{punchline}"

**Regla:** Compara siempre la misma poblacion.
"""


def test_valid_case_passes() -> None:
    assert validate_markdown(sample_case()) == []


def test_rejects_banned_dialogue() -> None:
    case = sample_case().replace("Esta linea habla", "Este slide habla", 1)
    assert any("slide" in error for error in validate_markdown(case))


def test_rejects_multiple_choice() -> None:
    case = sample_case().replace("**Lo que muestra:**", "A. Algo\nB. Otra cosa\n\n**Lo que muestra:**")
    assert any("A/B/C" in error for error in validate_markdown(case))


def test_rejects_missing_speaker() -> None:
    case = sample_case().replace('> **Persona 1:** "Esta linea', '> "Esta linea', 1)
    assert any("Character" in error for error in validate_markdown(case))


def test_rejects_repeated_punchline() -> None:
    errors = validate_collection({"a.md": sample_case(), "b.md": sample_case()})
    assert any("Repeated punchline" in error for error in errors)
