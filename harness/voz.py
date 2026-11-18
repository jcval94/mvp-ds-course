"""Narración con voz de las intros de caso: un audio por línea en site/casos/<id>/voz/.

El índice voz/indice.json guarda, por cada línea, el hash de su texto y su archivo. Si una línea cambia
y su audio no se regenera (python scripts/tts_intros <id>), el harness falla. Ver site/casos/README.md.
"""

from __future__ import annotations

import hashlib
import json
import shutil
import subprocess
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
EXTRACTOR = Path(__file__).with_name("lineas_intro.cjs")
VOICE_MAX_BYTES = 2 * 1024 * 1024
VOICE_HELP = "regenera con: python scripts/tts_intros {case}"


def text_hash(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8")).hexdigest()[:12]


def intro_lines(case_dir: Path) -> list[str]:
    """Líneas de narración de la intro, en orden, sin repetir."""
    node = shutil.which("node")
    if node is None:
        raise RuntimeError("hace falta node para leer las líneas de escenas.js")
    out = subprocess.run([node, str(EXTRACTOR), str(case_dir)], capture_output=True, text=True, encoding="utf-8")
    if out.returncode != 0:
        raise RuntimeError(out.stderr.strip().splitlines()[-1] if out.stderr.strip() else "no se pudo leer escenas.js")
    return list(dict.fromkeys(item["t"] for item in json.loads(out.stdout)))


def case_dirs(root: Path = ROOT) -> list[Path]:
    return sorted(p.parent for p in (root / "site" / "casos").glob("*/escenas.js"))


def validate_case_voice(root: Path = ROOT) -> list[str]:
    errors: list[str] = []
    for case_dir in case_dirs(root):
        relative = case_dir.relative_to(root).as_posix()
        help_text = VOICE_HELP.format(case=case_dir.name)
        index_path = case_dir / "voz" / "indice.json"
        if not index_path.is_file():
            errors.append(f"{relative}: falta voz/indice.json; {help_text}")
            continue
        try:
            index: dict[str, Any] = json.loads(index_path.read_text(encoding="utf-8"))
            lines = intro_lines(case_dir)
        except (json.JSONDecodeError, RuntimeError) as error:
            errors.append(f"{relative}/voz: {error}")
            continue
        by_hash = {str(item.get("hash")): item for item in index.get("lineas", []) if isinstance(item, dict)}
        for text in lines:
            item = by_hash.get(text_hash(text))
            if item is None or item.get("t") != text:
                errors.append(f"{relative}/voz: la línea «{text}» no tiene audio al día; {help_text}")
            elif not (case_dir / "voz" / str(item.get("archivo"))).is_file():
                errors.append(f"{relative}/voz: falta {item.get('archivo')}; {help_text}")
        expected = {text_hash(t) + ".mp3" for t in lines}
        files = {p.name for p in (case_dir / "voz").glob("*.mp3")}
        if files - expected or set(by_hash) - {text_hash(t) for t in lines}:
            errors.append(f"{relative}/voz: hay audios de líneas que ya no existen; {help_text}")
        size = sum((case_dir / "voz" / name).stat().st_size for name in files)
        if size > VOICE_MAX_BYTES:
            errors.append(f"{relative}/voz: pesa {size / 1048576:.2f} MB (límite 2 MB por intro)")
    return errors
