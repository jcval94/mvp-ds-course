"""Mantener la puerta y el catálogo alineados con la política canónica de acceso."""

import json
import re

import pytest

from harness.config import ROOT, load_course


def assert_middleware_levels_match(course, source):
    # Deliberately accept only a single, plain JSON array literal. A changed
    # representation must update this contract instead of silently skipping it.
    declarations = re.findall(r"^const GRATIS = new Set\((\[[^\n]*\])\);$", source, re.M)
    assert len(declarations) == 1, "No se puede comprobar el literal GRATIS del middleware"
    actual = json.loads(declarations[0])
    expected = course["access"]["free_lab_levels"]
    assert sorted(actual) == sorted(expected), (
        "GRATIS del middleware debe coincidir con course.yaml → access.free_lab_levels"
    )


def test_middleware_matches_canonical_free_lab_levels():
    source = (ROOT / "deploy/cloudflare/functions/labs/_middleware.js").read_text(encoding="utf-8")
    assert_middleware_levels_match(load_course(), source)


@pytest.mark.parametrize("levels", [[1], [1, 2, 3], [1, 1, 2]])
def test_middleware_policy_drift_is_rejected(levels):
    course = {"access": {"free_lab_levels": [1, 2]}}
    with pytest.raises(AssertionError, match="debe coincidir"):
        assert_middleware_levels_match(course, f"const GRATIS = new Set({json.dumps(levels)});")


def test_unrecognized_middleware_policy_cannot_bypass_comparison():
    with pytest.raises(AssertionError, match="No se puede comprobar"):
        assert_middleware_levels_match(load_course(), "const GRATIS = readSomethingElse();")


def assert_catalog_levels_match(course, source):
    declarations = re.findall(r"^  const FREE_LEVELS = (\[[^\n]*\]);$", source, re.M)
    assert len(declarations) == 1, "No se puede comprobar el literal FREE_LEVELS del catálogo"
    actual = json.loads(declarations[0])
    assert sorted(actual) == sorted(course["access"]["free_lab_levels"]), (
        "FREE_LEVELS del catálogo debe coincidir con course.yaml → access.free_lab_levels"
    )


def test_catalog_matches_canonical_free_lab_levels():
    source = (ROOT / "site/app.js").read_text(encoding="utf-8")
    assert_catalog_levels_match(load_course(), source)


@pytest.mark.parametrize("levels", [[1], [1, 2, 3], [1, 1, 2]])
def test_catalog_policy_drift_is_rejected(levels):
    with pytest.raises(AssertionError, match="debe coincidir"):
        assert_catalog_levels_match(
            {"access": {"free_lab_levels": [1, 2]}},
            f"  const FREE_LEVELS = {json.dumps(levels)};",
        )


def test_unrecognized_catalog_policy_cannot_bypass_comparison():
    with pytest.raises(AssertionError, match="No se puede comprobar"):
        assert_catalog_levels_match(load_course(), "  const FREE_LEVELS = readSomethingElse();")
