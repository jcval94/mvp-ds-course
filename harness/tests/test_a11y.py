"""Regression tests for the accessibility gate: do not loosen legacy tests."""
from __future__ import annotations

import json
from pathlib import Path

import pytest

from harness.a11y import audit
from harness.a11y.inject import applicable, inject
from harness.config import HarnessError


def _finding(rule="color-contrast", *, page="index.html", viewport="390x844", selector="#lead"):
    return {"page": page, "viewport": viewport, "id": rule, "target": selector,
            "impact": "serious", "summary": "test"}


def test_only_explicit_color_contrast_can_be_baselined(tmp_path: Path):
    baseline = tmp_path / "contrast.jsonl"
    valid = dict(_finding(), reason="Decisión de contraste pendiente del autor; no cambiar CSS.")
    valid.pop("impact")
    valid.pop("summary")
    baseline.write_text(json.dumps(valid, ensure_ascii=False) + "\n", encoding="utf-8")
    assert len(audit.load_baseline(baseline)) == 1
    baseline.write_text(json.dumps(dict(valid, id="button-name")) + "\n", encoding="utf-8")
    with pytest.raises(HarnessError, match="solo contraste"):
        audit.load_baseline(baseline)


def test_new_serious_and_critical_are_rejected(tmp_path: Path):
    initial = _finding()
    baseline = {audit.fingerprint(initial): initial}
    assert audit.gate([initial], baseline, tmp_path)["contrast_pending"] == 1
    critical = dict(_finding("aria-hidden-focus"), impact="critical")
    with pytest.raises(HarnessError, match="nuevas"):
        audit.gate([initial, critical], baseline, tmp_path)


def test_repaired_issues_can_disappear_without_rebaseline(tmp_path: Path):
    row = _finding()
    assert audit.gate([], {audit.fingerprint(row): row}, tmp_path)["baseline_remaining"] == 1


def test_inject_only_requested_student_pages(tmp_path: Path):
    (tmp_path / "index.html").write_text("<html><body>Inicio</body></html>", encoding="utf-8")
    (tmp_path / "admin.html").write_text("<html><body>Admin</body></html>", encoding="utf-8")
    path = tmp_path / "labs" / "level-1" / "alfabetizacion.html"
    path.parent.mkdir(parents=True)
    path.write_text("<html><body>Alfabetización</body></html>", encoding="utf-8")
    src = tmp_path / "patch.js"
    src.write_text("/* patch */", encoding="utf-8")
    touched = inject(tmp_path, src)
    assert sorted(touched) == ["index.html", "labs/level-1/alfabetizacion.html"]
    assert "../" in path.read_text(encoding="utf-8")
    assert "data-course-a11y" not in (tmp_path / "admin.html").read_text()
    assert not inject(tmp_path, src)
    assert not applicable("docente.html")
