from tools.render_case_html import build_html
from tools.validate_html_story import validate_collection, validate_html
from tests.test_validate_case_structure import sample_case


def test_rendered_html_passes() -> None:
    assert validate_html(build_html(sample_case())) == []


def test_rejects_javascript() -> None:
    page = build_html(sample_case()).replace("</body>", "<script></script></body>")
    assert any("JavaScript" in error for error in validate_html(page))


def test_rejects_second_chart() -> None:
    page = build_html(sample_case()).replace("</main>", "<svg></svg></main>")
    assert any("exactly one SVG" in error for error in validate_html(page))


def test_collection_rejects_repeated_punchline() -> None:
    page = build_html(sample_case())
    assert any("Repeated HTML punchline" in error for error in validate_collection({"a": page, "b": page}))
