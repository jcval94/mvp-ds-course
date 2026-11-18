"""Genera la narración con voz de las intros de caso: un MP3 por línea en site/casos/<id>/voz/.

Uso:  python scripts/tts_intros 4-1 4-2      (o --todos; --forzar regenera aunque el texto no cambie)

Solo pide a OpenAI TTS las líneas nuevas o cambiadas (el archivo se llama como el hash del texto), borra los
audios de líneas que ya no existen y reescribe voz/indice.json. La llave sale de la variable de entorno
OPENAI_API_KEY y nunca se escribe en el repositorio. Con ffmpeg, cada audio se recomprime a mono 48 kbps
para que la intro quede por debajo de 2 MB (el harness lo comprueba).
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
from harness.voz import VOICE_MAX_BYTES, case_dirs, intro_lines, text_hash  # noqa: E402

MODELO = "gpt-4o-mini-tts"
VOZ = "onyx"  # elegida por el autor entre onyx, nova y sage (tarea v06)
INSTRUCCIONES = "Narrador de documental en español de México, tono sereno y misterioso, ritmo pausado, pronunciación clara."
API = "https://api.openai.com/v1/audio/speech"


def sintetizar(texto: str, llave: str) -> bytes:
    cuerpo = json.dumps({"model": MODELO, "voice": VOZ, "input": texto, "instructions": INSTRUCCIONES, "response_format": "mp3"})
    pedido = urllib.request.Request(API, data=cuerpo.encode("utf-8"), method="POST",
                                    headers={"Authorization": f"Bearer {llave}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(pedido, timeout=120) as respuesta:
            return respuesta.read()
    except urllib.error.HTTPError as error:
        raise SystemExit(f"OpenAI TTS respondió {error.code}: {error.read().decode('utf-8', 'replace')[:300]}") from None


def comprimir(mp3: bytes) -> bytes:
    ffmpeg = shutil.which("ffmpeg")
    if ffmpeg is None:
        return mp3
    with tempfile.TemporaryDirectory() as tmp:
        origen, destino = Path(tmp) / "in.mp3", Path(tmp) / "out.mp3"
        origen.write_bytes(mp3)
        subprocess.run([ffmpeg, "-v", "error", "-y", "-i", str(origen), "-ac", "1", "-b:a", "48k", "-map_metadata", "-1", str(destino)],
                       check=True)
        return destino.read_bytes()


def generar(case_dir: Path, llave: str | None, forzar: bool) -> None:
    voz_dir = case_dir / "voz"
    voz_dir.mkdir(exist_ok=True)
    lineas = intro_lines(case_dir)
    entradas = []
    for texto in lineas:
        archivo = voz_dir / f"{text_hash(texto)}.mp3"
        if forzar or not archivo.is_file():
            if not llave:
                raise SystemExit("Define la variable de entorno OPENAI_API_KEY para generar los audios.")
            print(f"  {case_dir.name}: {texto}", flush=True)
            archivo.write_bytes(comprimir(sintetizar(texto, llave)))
        entradas.append({"hash": text_hash(texto), "t": texto, "archivo": archivo.name})
    vigentes = {e["archivo"] for e in entradas}
    for viejo in voz_dir.glob("*.mp3"):
        if viejo.name not in vigentes:
            viejo.unlink()
    indice = {"caso": case_dir.name.replace("-", "."), "modelo": MODELO, "voz": VOZ, "instrucciones": INSTRUCCIONES,
              "sintetica": True, "lineas": entradas}
    (voz_dir / "indice.json").write_text(json.dumps(indice, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    peso = sum((voz_dir / a).stat().st_size for a in vigentes)
    aviso = "  (PASA DEL LIMITE DE 2 MB)" if peso > VOICE_MAX_BYTES else ""
    print(f"{case_dir.name}: {len(entradas)} líneas, {peso / 1024:.0f} KB{aviso}")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("casos", nargs="*", help="ids de carpeta en site/casos (por ejemplo 4-1)")
    parser.add_argument("--todos", action="store_true", help="todas las intros con escenas.js")
    parser.add_argument("--forzar", action="store_true", help="regenera también los audios que ya existen")
    args = parser.parse_args()
    todos = {d.name: d for d in case_dirs(ROOT)}
    nombres = sorted(todos) if args.todos else args.casos
    if not nombres:
        parser.error("indica uno o más casos, o --todos")
    faltan = [n for n in nombres if n not in todos]
    if faltan:
        parser.error(f"no hay intro en site/casos/ para: {', '.join(faltan)}")
    llave = os.environ.get("OPENAI_API_KEY")
    for nombre in nombres:
        generar(todos[nombre], llave, args.forzar)


if __name__ == "__main__":
    main()
