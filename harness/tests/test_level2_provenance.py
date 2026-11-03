import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
from build_pages import add_level2_provenance


def test_level2_pages_show_registered_snapshot_provenance_at_end(tmp_path):
    manifest = json.loads((ROOT / "generated/data-class-description-level-2/manifest.json").read_text(encoding="utf-8"))
    registry = json.loads((ROOT / "datasets/registry.json").read_text(encoding="utf-8"))
    pages = [manifest["entrypoint"], *(block["href"] for block in manifest["blocks"])]
    for name in pages:
        (tmp_path / name).write_text("<body><main>Contenido</main></body>", encoding="utf-8")
    add_level2_provenance(tmp_path, manifest, registry)
    expected = [item for item in registry["datasets"] if item["id"] in manifest["datasets"]]
    for name in pages:
        html = (tmp_path / name).read_text(encoding="utf-8")
        assert html.index("</main>") < html.index("<footer") < html.index("</body>")
        for item in expected:
            assert all(value in html for value in (item["name"], item["license"], item["sha256"]))
