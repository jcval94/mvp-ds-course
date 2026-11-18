import shutil
from pathlib import Path

from harness.voz import ROOT, intro_lines, validate_case_voice

CASOS = ROOT / "site" / "casos"


def _copia(tmp_path: Path) -> Path:
    destino = tmp_path / "site" / "casos"
    destino.mkdir(parents=True)
    for nombre in ("pixel.js", "comun.js"):
        shutil.copy(CASOS / nombre, destino / nombre)
    shutil.copytree(CASOS / "4-1", destino / "4-1")
    return tmp_path


def test_todas_las_intros_tienen_su_voz_al_dia():
    assert validate_case_voice(ROOT) == []


def test_lee_las_lineas_de_la_escena_final():
    lineas = intro_lines(CASOS / "4-1")
    assert lineas[0] == "Viena, 1847. Un hospital enorme, de noche."
    assert "Tu turno, detective." in lineas


def test_falla_si_cambia_una_linea_sin_regenerar(tmp_path):
    raiz = _copia(tmp_path)
    escenas = raiz / "site" / "casos" / "4-1" / "escenas.js"
    texto = escenas.read_text(encoding="utf-8")
    escenas.write_text(texto.replace("Un hospital enorme, de noche.", "Un hospital enorme, de madrugada."), encoding="utf-8")
    errores = validate_case_voice(raiz)
    assert any("de madrugada" in e and "tts_intros 4-1" in e for e in errores)
    assert any("ya no existen" in e for e in errores)


def test_falla_si_falta_el_indice(tmp_path):
    raiz = _copia(tmp_path)
    shutil.rmtree(raiz / "site" / "casos" / "4-1" / "voz")
    assert any("falta voz/indice.json" in e for e in validate_case_voice(raiz))
