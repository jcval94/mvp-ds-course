from pathlib import Path

from pipeline import load_config, run_pipeline, safe_log


HERE = Path(__file__).resolve().parent
config = load_config(HERE / "config.example.json")
response = run_pipeline(
    {"inventory_units": 70, "temperature_c": 31, "is_weekend": True},
    config,
    request_id="demo-001",
)
print(safe_log(response))
