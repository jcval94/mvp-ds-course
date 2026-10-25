"""Remove instructor-only material from the *copied* level, never from generated/.

This is a publication boundary, not an authorization or access-control mechanism.
The instructor build keeps the untouched source for offline use.
"""
from __future__ import annotations

import json
import re
import shutil
from pathlib import Path


# Only the student build uses these layout overrides. No original theme is edited.
STUDENT_LAYOUT = {
    1: """
@media (min-width:1181px){.app-layout{grid-template-columns:248px minmax(0,1fr)}}
@media (min-width:921px) and (max-width:1180px){.app-layout{grid-template-columns:210px minmax(0,1fr)}}
""",
    2: "@media (min-width:1101px){.layout{grid-template-columns:220px minmax(0,1fr)}}",
}
CONTINUOUS_LAYOUT = "@media (min-width:1181px){.level-shell{grid-template-columns:220px minmax(0,1fr)}}"
TEACHER_ASIDE = re.compile(r'<aside class="teacher(?:-panel)?"[^>]*>.*?</aside>', re.S)
GUIDE_LINK = re.compile(r'<a\b[^>]*href="README\.md"[^>]*>.*?</a>', re.S)


def _replace_once(text: str, old: str, new: str, *, label: str) -> str:
    if text.count(old) != 1:
        raise ValueError(f"{label}: se esperaba una aparición, hay {text.count(old)}")
    return text.replace(old, new, 1)


def _remove_teacher_ui(script: str, level: int) -> str:
    # Templates are defined in app.js. Remove the sidebar at its source, not
    # with CSS-only hiding or a runtime MutationObserver that leaks content.
    script, count = TEACHER_ASIDE.subn("", script)
    if count != 1:
        raise ValueError(f"Nivel {level}: shell docente desconocido ({count} asides)")
    if level == 1:
        script, count = GUIDE_LINK.subn("", script)
        if count != 1:
            raise ValueError("Nivel 1: enlace a guía en app.js no encontrado")
        script = _replace_once(script, "let teacherEnabled = true;", "let teacherEnabled = false;", label="L1")
        # The function is kept as a no-op because the learning renderer invokes it.
        script, count = re.subn(
            r"(?ms)^  function renderTeacher\(lesson\) \{.*?(?=^  function bindOptionEvents\()",
            "  function renderTeacher() {}\n\n", script, count=1,
        )
        if count != 1:
            raise ValueError("Nivel 1: renderTeacher cambió de estructura")
        # The help dialog should no longer direct students to an absent mode.
        script = _replace_once(
            script,
            " y usa el modo docente solo para preparar la clase en vivo.",
            ".", label="L1 ayuda",
        )
    elif level == 2:
        script = _replace_once(
            script, 'let teacherEnabled = params.get("teacher") === "1";',
            "let teacherEnabled = false;", label="L2"
        )
        script, count = re.subn(
            r"(?ms)^  function renderTeacher\(\) \{.*?(?=^  function bindExercise\()",
            "  function renderTeacher() {}\n\n", script, count=1,
        )
        if count != 1:
            raise ValueError("Nivel 2: renderTeacher cambió de estructura")
    else:
        script = _replace_once(
            script, 'teacher = params.get("teacher") === "1"',
            "teacher = false", label=f"L{level}"
        )
        script, count = re.subn(
            r"(?m)^  function renderTeacher\(mode\)\{[^\n]*\}$",
            "  function renderTeacher() {}", script, count=1,
        )
        if count != 1:
            raise ValueError(f"Nivel {level}: renderTeacher cambió de estructura")
    if "liveTeachingPack" in script or "Modo docente oculto" in script:
        raise ValueError(f"Nivel {level}: quedan materiales docentes en app.js")
    return script


def _student_curriculum(path: Path, level: int) -> None:
    text = path.read_text(encoding="utf-8")
    if level == 1:
        # The first level is hand-written JavaScript, not a JSON literal.
        # Remove only instructor factories and lesson-level instructor fields.
        text, count = re.subn(
            r"(?s)  const liveDatasets = \{.*?\n  \};\n\n  const datasetIdFor = .*?\n  \};\n\n",
            "", text, count=1,
        )
        if count != 1:
            raise ValueError("Nivel 1: bloque de fuentes docentes no encontrado")
        text, count = re.subn(
            r"(?s)  const livePackFor = .*?\n  \};\n\n(?=  const lesson = )",
            "", text, count=1,
        )
        if count != 1:
            raise ValueError("Nivel 1: fábrica de guion docente no encontrada")
        text = _replace_once(
            text, "      liveTeachingPack: livePackFor(title, objective, visualSpec),\n",
            "", label="L1 liveTeachingPack",
        )
        text, count = re.subn(
            r"(?ms)^      prompts: \{\n.*?^      \}\n",
            "", text, count=1,
        )
        if count != 1:
            raise ValueError("Nivel 1: prompts docentes no encontrados")
    else:
        prefix = "window.DCF_LEVEL2 = " if level == 2 else "window.DCF_LEVEL = "
        if not text.startswith(prefix):
            raise ValueError(f"Nivel {level}: curriculum.js no contiene JSON esperado")
        data = json.loads(text[len(prefix):].strip().removesuffix(";"))

        removed = [0]
        def scrub(node: object) -> None:
            if isinstance(node, dict):
                for key in ("liveTeachingPack", "prompts"):
                    if key in node:
                        del node[key]
                        removed[0] += 1
                for child in node.values():
                    scrub(child)
            elif isinstance(node, list):
                for child in node:
                    scrub(child)

        scrub(data)
        if not removed[0]:
            raise ValueError(f"Nivel {level}: faltan packs docentes; revisar contrato")
        text = prefix + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n"
    if "liveTeachingPack" in text or "teacherScript" in text:
        raise ValueError(f"Nivel {level}: curriculum.js conserva guion docente")
    path.write_text(text, encoding="utf-8")


def studentize_level(destination: Path, level: int) -> None:
    """Apply a fail-closed student publication profile to one copied level."""
    for name in ("README.md", "validation.json", "manifest.json"):
        (destination / name).unlink(missing_ok=True)
    for name in ("docs", "evals"):
        if (destination / name).exists():
            shutil.rmtree(destination / name)

    _student_curriculum(destination / "assets" / "curriculum.js", level)
    app = destination / "assets" / "app.js"
    app.write_text(_remove_teacher_ui(app.read_text(encoding="utf-8"), level), encoding="utf-8")

    if level in (1, 2):
        bridge = destination / "assets" / "level-shell-v1.js"
        bridge_text = bridge.read_text(encoding="utf-8")
        bridge_text, count = re.subn(
            r"(?m)^  const teacherPanel = .*\n|^  teacherPanel\?\.setAttribute\(.*\);\n|^  const live = .*\n|^  if \(live\) live.hidden = !teacher;\n",
            "", bridge_text,
        )
        if count != 4:
            raise ValueError(f"Nivel {level}: bridge docente desconocido ({count})")
        bridge_text = _replace_once(bridge_text, 'const teacher = params.get("teacher") === "1";', 'const teacher = false;', label="bridge")
        bridge.write_text(bridge_text, encoding="utf-8")

    for html in destination.glob("*.html"):
        text = html.read_text(encoding="utf-8")
        text, count = GUIDE_LINK.subn("", text)
        if count > 1:
            raise ValueError(f"{html}: enlaces a guías inesperados")
        if "</head>" not in text:
            raise ValueError(f"{html}: sin head para layout público")
        rules = STUDENT_LAYOUT.get(level, CONTINUOUS_LAYOUT)
        text = text.replace("</head>", f"<style data-student-layout>{rules}</style></head>", 1)
        html.write_text(text, encoding="utf-8")
