from tools.render_case_html import build_html
from tests.test_validate_case_structure import sample_case


def test_renderer_is_linear_and_self_contained() -> None:
    page = build_html(sample_case())
    assert 'data-story-standard="absurd-office-data"' in page
    assert page.count("<svg") == 1
    assert "<script" not in page
    assert "http://" not in page
    assert "https://" not in page
    assert page.count("<section>") == 4
    assert 'class="learning-pause"' in page
    assert 'class="rule"' in page
    assert "<p>&gt;</p>" not in page
