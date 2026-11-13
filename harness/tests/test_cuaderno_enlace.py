"""El enlace del cuaderno de Colab de cada caso coincide en sus tres lugares (encargo E-13).

Run: python -m pytest harness/tests/test_cuaderno_enlace.py -q
"""

from __future__ import annotations

from pathlib import Path

import pytest

from harness import validate
from harness.config import HarnessError

URL_A = "https://colab.research.google.com/drive/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
URL_B = "https://colab.research.google.com/drive/BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"


def _alumno(root: Path, cuadernos: dict[str, str], en_pagina: dict[str, str] | None = None) -> None:
    def objeto(pares: dict[str, str]) -> str:
        return "{ " + ", ".join(f'"{k}": "{v}"' for k, v in pares.items()) + " }"

    path = root / "site" / "alumno.js"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        "(() => {\n"
        "  // Cuadernos de cada caso en Drive.\n"
        f"  const CUADERNOS = {objeto(cuadernos)};\n"
        f"  const EN_PAGINA = {objeto(en_pagina or {})};\n"
        "})();\n",
        encoding="utf-8",
    )


def _caso(root: Path, carpeta: str, colab: str | None, noscript: str | None) -> Path:
    case_dir = root / "site" / "casos" / carpeta
    case_dir.mkdir(parents=True, exist_ok=True)
    campo = f"    colab: '{colab}',\n" if colab is not None else "    resolver: 'caso.html',\n"
    (case_dir / "escenas.js").write_text(
        "(function () {\n  window.CASO = {\n    id: '" + carpeta.replace("-", ".") + "',\n" + campo + "    medios: 'medios.json',\n  };\n})();\n",
        encoding="utf-8",
    )
    enlace = f'<p><a href="{noscript}">Abrir el caso en Colab</a></p>' if noscript else '<p><a href="caso.html">Resolver el caso</a></p>'
    (case_dir / "index.html").write_text(
        f"<!doctype html><html lang=\"es\"><body><main><noscript>\n<h1>CASO</h1>\n{enlace}\n</noscript></main></body></html>\n",
        encoding="utf-8",
    )
    return case_dir


def _errores(root: Path) -> str:
    return "\n".join(validate.validate_notebook_links(root))


def test_el_enlace_coincide_en_los_tres_lugares(tmp_path: Path) -> None:
    _alumno(tmp_path, {"9.1": URL_A})
    _caso(tmp_path, "9-1", URL_A, URL_A)
    assert validate.validate_notebook_links(tmp_path) == []


@pytest.mark.parametrize(
    ("escenas", "noscript", "alumno"),
    [(URL_B, URL_A, URL_A), (URL_A, URL_B, URL_A), (URL_A, URL_A, URL_B), (None, URL_A, URL_A), (URL_A, None, URL_A), (URL_A, URL_A, None), ("", URL_A, URL_A)],
    ids=["escenas-distinto", "noscript-distinto", "alumno-distinto", "falta-en-escenas", "falta-en-noscript", "falta-en-alumno", "colab-vacio"],
)
def test_un_enlace_distinto_o_ausente_en_un_lugar_falla(tmp_path: Path, escenas: str | None, noscript: str | None, alumno: str | None) -> None:
    _alumno(tmp_path, {"9.1": alumno} if alumno else {})
    _caso(tmp_path, "9-1", escenas, noscript)
    errores = _errores(tmp_path)
    assert "caso 9.1 (site/casos/9-1): el enlace del cuaderno de Colab no coincide" in errores
    assert "sin enlace" in errores or URL_B in errores
    for lugar in validate.NOTEBOOK_PLACES:
        assert lugar in errores


def test_un_caso_sin_cuaderno_en_ningun_lugar_pasa(tmp_path: Path) -> None:
    _alumno(tmp_path, {"9.1": URL_A})
    _caso(tmp_path, "9-1", URL_A, URL_A)
    _caso(tmp_path, "9-2", None, None)
    assert validate.validate_notebook_links(tmp_path) == []


def test_un_caso_de_pagina_sin_enlace_pasa(tmp_path: Path) -> None:
    _alumno(tmp_path, {}, {"9.3": "casos/9-3/caso.html"})
    _caso(tmp_path, "9-3", None, None)
    assert validate.validate_notebook_links(tmp_path) == []


@pytest.mark.parametrize(
    ("escenas", "noscript", "alumno"),
    [(URL_A, None, None), (None, URL_A, None), (None, None, URL_A), (URL_A, URL_A, URL_A)],
    ids=["en-escenas", "en-noscript", "en-alumno", "en-los-tres"],
)
def test_un_caso_de_pagina_con_enlace_de_colab_falla(tmp_path: Path, escenas: str | None, noscript: str | None, alumno: str | None) -> None:
    _alumno(tmp_path, {"9.3": alumno} if alumno else {}, {"9.3": "casos/9-3/caso.html"})
    _caso(tmp_path, "9-3", escenas, noscript)
    errores = _errores(tmp_path)
    assert "caso 9.3 (site/casos/9-3): se resuelve en la página" in errores
    assert "no debe tener enlace de Colab" in errores
    assert URL_A in errores


def test_un_enlace_en_un_comentario_no_cuenta(tmp_path: Path) -> None:
    _alumno(tmp_path, {})
    case_dir = _caso(tmp_path, "9-2", None, None)
    escenas = case_dir / "escenas.js"
    escenas.write_text(escenas.read_text(encoding="utf-8").replace("    resolver:", f"    /* colab: '{URL_A}', */\n    // colab: '{URL_A}',\n    resolver:"), encoding="utf-8")
    assert validate.validate_notebook_links(tmp_path) == []


def test_un_cuaderno_en_alumno_sin_carpeta_de_intro_no_exige_los_otros_lugares(tmp_path: Path) -> None:
    _alumno(tmp_path, {"9.9": URL_A})
    assert validate.validate_notebook_links(tmp_path) == []


def test_sin_la_constante_cuadernos_la_revision_avisa(tmp_path: Path) -> None:
    _alumno(tmp_path, {"9.1": URL_A})
    alumno = tmp_path / "site" / "alumno.js"
    alumno.write_text(alumno.read_text(encoding="utf-8").replace("const CUADERNOS", "const LIBRETAS"), encoding="utf-8")
    _caso(tmp_path, "9-1", URL_A, URL_A)
    errores = _errores(tmp_path)
    assert "no se encontró la constante CUADERNOS" in errores
    assert "caso 9.1" in errores


def test_validate_run_incluye_la_revision(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.setattr(validate, "validate_notebook_links", lambda root=None: ["caso 9.1: enlace de prueba"])
    with pytest.raises(HarnessError, match="caso 9.1: enlace de prueba"):
        validate.run()


def test_los_casos_actuales_tienen_el_enlace_consistente() -> None:
    assert validate.validate_notebook_links() == []
