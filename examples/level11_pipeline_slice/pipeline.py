"""Small deterministic data-product pipeline used by the Level 11 slice."""

from __future__ import annotations

from dataclasses import dataclass
import json
from pathlib import Path
from typing import Any


class ContractError(ValueError):
    """Raised when an input or configuration violates the public contract."""


@dataclass(frozen=True)
class Config:
    artifact_version: str
    risk_threshold: float


def load_config(path: Path) -> Config:
    payload = json.loads(path.read_text(encoding="utf-8"))
    version = payload.get("artifact_version")
    threshold = payload.get("risk_threshold")
    if not isinstance(version, str) or not version.strip():
        raise ContractError("artifact_version must be a non-empty string")
    if not isinstance(threshold, (int, float)) or not 0 < float(threshold) < 1:
        raise ContractError("risk_threshold must be between 0 and 1")
    return Config(version, float(threshold))


def validate_input(record: dict[str, Any]) -> dict[str, float | bool]:
    required = {"inventory_units", "temperature_c", "is_weekend"}
    missing = sorted(required - record.keys())
    if missing:
        raise ContractError(f"missing required fields: {', '.join(missing)}")
    inventory = record["inventory_units"]
    temperature = record["temperature_c"]
    weekend = record["is_weekend"]
    if isinstance(inventory, bool) or not isinstance(inventory, (int, float)):
        raise ContractError("inventory_units must be numeric")
    if isinstance(temperature, bool) or not isinstance(temperature, (int, float)):
        raise ContractError("temperature_c must be numeric")
    if not isinstance(weekend, bool):
        raise ContractError("is_weekend must be boolean")
    if not 0 <= float(inventory) <= 500:
        raise ContractError("inventory_units outside [0, 500]")
    if not -10 <= float(temperature) <= 50:
        raise ContractError("temperature_c outside [-10, 50]")
    return {
        "inventory_units": float(inventory),
        "temperature_c": float(temperature),
        "is_weekend": weekend,
    }


def transform(record: dict[str, float | bool]) -> dict[str, float]:
    return {
        "inventory_pressure": 1.0 - min(float(record["inventory_units"]) / 200.0, 1.0),
        "heat_pressure": max(float(record["temperature_c"]) - 24.0, 0.0) / 20.0,
        "weekend_pressure": 0.2 if record["is_weekend"] else 0.0,
    }


def predict(features: dict[str, float]) -> float:
    return min(
        1.0,
        0.55 * features["inventory_pressure"]
        + 0.25 * features["heat_pressure"]
        + features["weekend_pressure"],
    )


def run_pipeline(record: dict[str, Any], config: Config, request_id: str) -> dict[str, str | float]:
    if not request_id.strip():
        raise ContractError("request_id must be non-empty")
    score = predict(transform(validate_input(record)))
    return {
        "risk_score": round(score, 4),
        "risk_band": "review" if score >= config.risk_threshold else "normal",
        "artifact_version": config.artifact_version,
        "request_id": request_id,
    }


def safe_log(response: dict[str, str | float]) -> str:
    """Return operational context without configuration values or secrets."""
    return json.dumps(
        {
            "request_id": response["request_id"],
            "artifact_version": response["artifact_version"],
            "risk_band": response["risk_band"],
        },
        sort_keys=True,
    )
