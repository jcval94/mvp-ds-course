from pathlib import Path

from harness.marcas import CURSO, limpiar, limpiar_texto, revisar


def test_quita_descripcion_que_solo_dice_la_marca():
    html = '<head>\n  <meta name="description" content="DataClass Forge">\n<title>DataClass Forge</title></head>'
    limpio = limpiar_texto(html)
    assert 'name="description"' not in limpio
    assert f"<title>{CURSO}</title>" in limpio


def test_contextos_propios_antes_del_reemplazo_general():
    assert limpiar_texto("<small>powered by DataClass Forge</small>") == ""
    assert limpiar_texto("validado por la fábrica DataClass Forge.") == "validado por la fábrica de niveles del curso."
    assert limpiar_texto('<a class="brand">Corporate Data Narrative Lab</a>') == f'<a class="brand">{CURSO}</a>'
    assert limpiar_texto("`${lesson.title} | DataClass Forge`") == f"`${{lesson.title}} | {CURSO}`"


def test_limpiar_y_revisar(tmp_path: Path):
    (tmp_path / "a.html").write_text("<p>DataClass Forge</p>", encoding="utf-8")
    (tmp_path / "b.png").write_bytes(b"DataClass Forge")
    assert revisar(tmp_path) == ["a.html: muestra la marca vieja «DataClass Forge»"]
    assert limpiar(tmp_path) == 1
    assert revisar(tmp_path) == []
    assert (tmp_path / "b.png").read_bytes() == b"DataClass Forge"


def test_dist_publicado_sin_marcas():
    dist = Path(__file__).resolve().parents[2] / "dist"
    if (dist / "index.html").is_file():
        assert revisar(dist) == []
