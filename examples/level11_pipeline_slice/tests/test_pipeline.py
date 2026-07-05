import json
from pathlib import Path
import sys
import unittest


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from pipeline import Config, ContractError, load_config, run_pipeline, safe_log  # noqa: E402


class PipelineContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.config = Config("level11-slice-v1", 0.65)
        self.valid = {"inventory_units": 70, "temperature_c": 31, "is_weekend": True}

    def test_valid_input_returns_versioned_response(self) -> None:
        response = run_pipeline(self.valid, self.config, "case-001")
        self.assertEqual(response["artifact_version"], "level11-slice-v1")
        self.assertEqual(response["request_id"], "case-001")
        self.assertIn(response["risk_band"], {"normal", "review"})

    def test_same_input_is_reproducible(self) -> None:
        first = run_pipeline(self.valid, self.config, "same")
        second = run_pipeline(self.valid, self.config, "same")
        self.assertEqual(first, second)

    def test_missing_required_field_fails_visibly(self) -> None:
        invalid = {"inventory_units": 70, "is_weekend": True}
        with self.assertRaisesRegex(ContractError, "temperature_c"):
            run_pipeline(invalid, self.config, "case-002")

    def test_invalid_range_fails_visibly(self) -> None:
        invalid = {**self.valid, "temperature_c": 90}
        with self.assertRaisesRegex(ContractError, "outside"):
            run_pipeline(invalid, self.config, "case-003")

    def test_config_is_loaded_from_file(self) -> None:
        config = load_config(ROOT / "config.example.json")
        self.assertEqual(config.artifact_version, "level11-slice-v1")
        self.assertAlmostEqual(config.risk_threshold, 0.65)

    def test_log_contains_traceability_without_secret(self) -> None:
        response = run_pipeline(self.valid, self.config, "case-004")
        payload = json.loads(safe_log(response))
        self.assertEqual(payload["request_id"], "case-004")
        self.assertNotIn("TOKEN", safe_log(response))


if __name__ == "__main__":
    unittest.main()
