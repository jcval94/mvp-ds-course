from harness.seo import SOCIAL_IMAGE, PageMetadata, portability_text, social_tags

BASE = "https://ejemplo.test"
HTML = """<!doctype html><html><head><title>Inscripción · Curso</title>
<meta name="description" content="Inscríbete al curso.">
<meta property="og:title" content="Título propio">
<meta name="twitter:card" content="summary">
</head><body><h1>Inscripción</h1></body></html>"""


def test_respeta_lo_propio_y_fija_url_e_imagen():
    tags = social_tags(BASE, "inscripcion.html", PageMetadata(HTML))
    assert tags["og:title"] == "Título propio"
    assert tags["og:description"] == "Inscríbete al curso."
    assert tags["og:url"] == f"{BASE}/inscripcion.html"
    assert tags["og:image"] == f"{BASE}/{SOCIAL_IMAGE}"
    assert tags["twitter:card"] == "summary_large_image"


def test_portabilidad_solo_enmascara_los_huecos_autorizados():
    head = (f'<head><link rel="canonical" href="{BASE}/">'
            f'<meta property="og:url" content="{BASE}/">'
            f'<meta property="og:image" content="{BASE}/{SOCIAL_IMAGE}"></head><body>{BASE}/otra</body>')
    limpio = portability_text(head, "index.html", BASE)
    assert 'property="og:url"' not in limpio and 'property="og:image"' not in limpio
    assert f"{BASE}/otra" in limpio
