#!/usr/bin/env python3
"""Apply the shared level-shell-v1 bridge to legacy Levels 1–2."""

from __future__ import annotations
import json
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "scripts" / "assets"
LEVELS = [
    ROOT / "generated" / "data-class-foundations-level-1",
    ROOT / "generated" / "data-class-description-level-2",
]

def main() -> None:
    for level in LEVELS:
        assets = level / "assets"
        shutil.copy2(ASSETS / "level_shell_bridge.js", assets / "level-shell-v1.js")
        shutil.copy2(ASSETS / "level_shell_bridge.css", assets / "level-shell-v1.css")
        for html in level.glob("*.html"):
            text = html.read_text(encoding="utf-8")
            if "level-shell-v1.css" not in text:
                text = text.replace("</head>", '<link rel="stylesheet" href="assets/level-shell-v1.css"></head>')
            if "level-shell-v1.js" not in text and "assets/app.js" in text:
                text = text.replace("</body>", '<script src="assets/level-shell-v1.js"></script></body>')
            html.write_text(text, encoding="utf-8")
        manifest_path = level / "manifest.json"
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        manifest.update({
            "experienceContract": "level-shell-v1", "blockNavigation": "left",
            "conceptNavigation": "top", "rendererRegistry": manifest.get("rendererRegistry", "level-native-v1"),
            "visualizationMatrix": manifest.get("visualizationMatrix", f"level-{manifest['level']}-visuals-v1"),
        })
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("level-shell-v1 aplicado a Niveles 1 y 2.")

if __name__ == "__main__":
    main()
