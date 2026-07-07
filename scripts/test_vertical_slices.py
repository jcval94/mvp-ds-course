#!/usr/bin/env python3
"""Deterministic regression tests for completed Levels 5/11/12 and Level 13 boundary."""

from __future__ import annotations

import csv
import json
from pathlib import Path
import re
import unittest


ROOT = Path(__file__).resolve().parents[1]


def rows(name: str) -> list[dict[str, str]]:
    with (ROOT / "datasets" / "narrative" / name).open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


class Level5JoinSliceTests(unittest.TestCase):
    def setUp(self) -> None:
        self.closures = rows("cierres_nivel_5_slice.csv")
        self.shifts = rows("turnos_nivel_5_slice.csv")
        self.events = rows("eventos_nivel_5_slice.csv")

    def joined(self, day: str) -> list[tuple[dict[str, str], dict[str, str], dict[str, str]]]:
        closure = [row for row in self.closures if row["fecha"] == day]
        shifts = [row for row in self.shifts if row["fecha"] == day]
        events = [row for row in self.events if row["fecha"] == day]
        return [(c, s, e) for c in closure for s in shifts for e in events]

    def test_keys_and_referential_integrity(self) -> None:
        closure_days = [row["fecha"] for row in self.closures]
        self.assertEqual(len(closure_days), len(set(closure_days)))
        self.assertTrue({row["fecha"] for row in self.shifts}.issubset(closure_days))
        self.assertTrue({row["fecha"] for row in self.events}.issubset(closure_days))

    def test_learning_incident_is_four_rows_but_one_night(self) -> None:
        joined = self.joined("2026-11-14")
        self.assertEqual(len(joined), 4)
        self.assertEqual(len({row[0]["fecha"] for row in joined}), 1)
        self.assertEqual(sum(int(row[0]["ventas_mxn"]) for row in joined), 19200)
        self.assertEqual(int(joined[0][0]["ventas_mxn"]), 4800)

    def test_practice_incidents_change_which_side_duplicates(self) -> None:
        expectations = {"2026-11-07": (2, 7200, 3600), "2026-11-08": (2, 7800, 3900)}
        for day, (count, naive, correct) in expectations.items():
            joined = self.joined(day)
            self.assertEqual(len(joined), count)
            self.assertEqual(sum(int(row[0]["ventas_mxn"]) for row in joined), naive)
            self.assertEqual(int(joined[0][0]["ventas_mxn"]), correct)


class NewLevelPublicationTests(unittest.TestCase):
    def test_new_levels_are_complete_and_published(self) -> None:
        expected = {
            "data-class-sql-level-5": (5, 19, 38, 57, 7),
            "data-class-product-engineering-level-11": (11, 21, 42, 63, 7),
            "data-class-ai-systems-level-12": (12, 24, 48, 72, 6),
            "data-class-operations-level-13": (13, 16, 32, 48, 4),
        }
        for dirname, counts in expected.items():
            manifest = json.loads((ROOT / "generated" / dirname / "manifest.json").read_text(encoding="utf-8"))
            self.assertEqual(manifest["status"], "published")
            self.assertEqual((manifest["level"], manifest["concept_count"], manifest["exercise_count"], manifest["prompt_count"], len(manifest["blocks"])), counts)

    def test_no_duplicate_level_manifests(self) -> None:
        manifests = [json.loads(path.read_text(encoding="utf-8")) for path in (ROOT / "generated").glob("*/manifest.json") if "-slice" not in path.parent.name]
        levels = [manifest["level"] for manifest in manifests]
        self.assertEqual(sorted(levels), list(range(1, 14)))
        self.assertEqual(len(levels), len(set(levels)))

    def test_level12_starts_after_level11_and_builds_traceable_ai_system(self) -> None:
        metadata = json.loads((ROOT / "datasets" / "narrative" / "nivel_12.metadata.json").read_text(encoding="utf-8"))
        self.assertEqual(metadata["period"]["start"], "2028-01-22")
        self.assertIn("sistema_ia_trazable@L12.H1", metadata["data_state"])
        raw = (ROOT / "generated" / "data-class-ai-systems-level-12" / "assets" / "curriculum.js").read_text(encoding="utf-8")
        payload = json.loads(re.match(r"window\.DCF_LEVEL = (.*);", raw, re.S).group(1))
        ids = [lesson["id"] for block in payload["modules"].values() for lesson in block["lessons"]]
        self.assertIn("model-boundary", ids)
        self.assertIn("retrieval-evidence", ids)
        self.assertIn("system-blueprint", ids)
        self.assertNotIn("operational-readiness", ids)

    def test_level13_starts_after_traceable_ai_system_and_uses_readiness(self) -> None:
        metadata = json.loads((ROOT / "datasets" / "narrative" / "nivel_13.metadata.json").read_text(encoding="utf-8"))
        self.assertEqual(metadata["period"]["start"], "2028-02-19")
        self.assertEqual(metadata["data_state"][0], "sistema_ia_trazable@L12.H1")
        raw = (ROOT / "generated" / "data-class-operations-level-13" / "assets" / "curriculum.js").read_text(encoding="utf-8")
        payload = json.loads(re.match(r"window\.DCF_LEVEL = (.*);", raw, re.S).group(1))
        ids = [lesson["id"] for block in payload["modules"].values() for lesson in block["lessons"]]
        self.assertIn("operational-readiness", ids)
        self.assertNotIn("system-blueprint", ids)


if __name__ == "__main__":
    unittest.main()
