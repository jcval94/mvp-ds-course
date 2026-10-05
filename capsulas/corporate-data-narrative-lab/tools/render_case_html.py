from __future__ import annotations

import argparse
import html
import re
from pathlib import Path

try:
    from tools.validate_case_structure import parse_story
except ModuleNotFoundError:  # Direct script execution from the repository root.
    from validate_case_structure import parse_story


CSS = """
:root { color-scheme: light; }
* { box-sizing: border-box; }
body {
  margin: 0;
  background: #f4f1ea;
  color: #1d242b;
  font-family: Arial, Helvetica, sans-serif;
}
main {
  width: min(760px, calc(100% - 28px));
  margin: 0 auto;
  padding: 32px 0 64px;
}
h1 { font-size: clamp(2rem, 7vw, 3.4rem); line-height: 1.02; margin: 0 0 30px; }
h2 { font-size: 1.25rem; margin: 0 0 18px; }
section { border-top: 2px solid #1d242b; padding: 24px 0 12px; }
p { line-height: 1.6; }
blockquote {
  margin: 10px 0;
  padding: 12px 14px;
  background: #fff;
  border-left: 5px solid #32726c;
  line-height: 1.45;
}
blockquote strong { display: block; margin-bottom: 3px; color: #255b57; }
.learning-pause { border-left-color: #bd4d32; background: #fff7ef; }
.explanation { background: #fff; padding: 14px; border: 1px solid #cfc8bb; }
.rule { font-size: 1.08rem; border-top: 2px solid #bd4d32; padding-top: 16px; }
svg {
  width: 100%;
  height: auto;
  display: block;
  margin: 22px 0;
  background: #fff;
  border: 1px solid #cfc8bb;
}
@media (max-width: 520px) {
  main { width: min(100% - 20px, 760px); padding-top: 22px; }
  blockquote { margin: 8px 0; }
}
"""


def inline_markup(value: str) -> str:
    escaped = html.escape(value, quote=False)
    return re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", escaped)


def strip_story_comment(markdown: str) -> str:
    return re.sub(r"<!--\s*story\s*.*?-->", "", markdown, flags=re.DOTALL | re.IGNORECASE)


def render_markdown(markdown: str) -> str:
    content = strip_story_comment(markdown)
    lines = content.splitlines()
    output: list[str] = []
    paragraph: list[str] = []
    section_open = False
    next_dialogue_is_pause = False

    def flush_paragraph() -> None:
        if not paragraph:
            return
        text = " ".join(item.strip() for item in paragraph)
        css_class = ""
        if text.lower().startswith("**lo que muestra:**"):
            css_class = ' class="explanation"'
        elif text.lower().startswith("**regla:**"):
            css_class = ' class="rule"'
        output.append(f"<p{css_class}>{inline_markup(text)}</p>")
        paragraph.clear()

    index = 0
    while index < len(lines):
        line = lines[index].rstrip()
        stripped = line.strip()
        if not stripped:
            flush_paragraph()
            index += 1
            continue
        if stripped == "<!-- learning:pause -->":
            flush_paragraph()
            next_dialogue_is_pause = True
            index += 1
            continue
        if stripped.startswith("# "):
            flush_paragraph()
            output.append(f"<h1>{html.escape(stripped[2:].strip())}</h1>")
            index += 1
            continue
        if stripped.startswith("## "):
            flush_paragraph()
            if section_open:
                output.append("</section>")
            output.append("<section>")
            output.append(f"<h2>{html.escape(stripped[3:].strip())}</h2>")
            section_open = True
            index += 1
            continue
        if stripped.startswith("> "):
            flush_paragraph()
            match = re.match(r'>\s+\*\*([^*]+):\*\*\s+"(.+)"\s*$', stripped)
            if match:
                css = ' class="learning-pause"' if next_dialogue_is_pause else ""
                output.append(
                    f"<blockquote{css}><strong>{html.escape(match.group(1))}:</strong>"
                    f"<span>{html.escape(match.group(2))}</span></blockquote>"
                )
                next_dialogue_is_pause = False
            index += 1
            continue
        if stripped == ">":
            flush_paragraph()
            index += 1
            continue
        if stripped.lower().startswith("<svg"):
            flush_paragraph()
            svg_lines = [line]
            while "</svg>" not in lines[index].lower():
                index += 1
                svg_lines.append(lines[index])
            output.append("\n".join(svg_lines))
            index += 1
            continue
        if stripped.startswith("<!--"):
            index += 1
            continue
        paragraph.append(stripped)
        index += 1

    flush_paragraph()
    if section_open:
        output.append("</section>")
    return "\n".join(output)


def build_html(markdown: str) -> str:
    title_match = re.search(r"^#\s+(.+)$", markdown, re.MULTILINE)
    title = title_match.group(1).strip() if title_match else "Historia con datos"
    story = parse_story(markdown)
    punchline = story.get("punchline", "")
    body = render_markdown(markdown)
    return f"""<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{html.escape(title)}</title>
  <style>{CSS}</style>
</head>
<body data-story-standard="absurd-office-data" data-punchline="{html.escape(punchline, quote=True)}">
  <main>
{body}
  </main>
</body>
</html>
"""


def main() -> int:
    parser = argparse.ArgumentParser(description="Render a canonical Markdown story as simple HTML.")
    parser.add_argument("case_path", type=Path)
    parser.add_argument("output_path", type=Path)
    args = parser.parse_args()

    markdown = args.case_path.read_text(encoding="utf-8")
    result = build_html(markdown)
    args.output_path.parent.mkdir(parents=True, exist_ok=True)
    args.output_path.write_text(result, encoding="utf-8")
    print(f"Wrote {args.output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
