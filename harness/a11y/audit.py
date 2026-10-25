"""Playwright + axe-core 4.10.3: reproducible WCAG AA and keyboard audit.

Run after build. AXE_PATH may point to a pinned axe.min.js; otherwise install
the pinned npm package with:
  npm install --prefix harness/a11y --no-save --no-package-lock --ignore-scripts axe-core@4.10.3

Only pre-existing, explicitly justified color-contrast nodes can remain as
serious/critical. The baseline cannot gain entries once main has one.
"""
from __future__ import annotations

import json
import os
import re
import subprocess
from collections import Counter
from pathlib import Path

from harness.config import ROOT, HarnessError

AXE_VERSION = "4.10.3"
HERE = Path(__file__).resolve().parent
BASELINE = HERE / "contrast-baseline.jsonl"
VIEWPORTS = ((1440, 900), (390, 844))
IMPACTS = ("minor", "moderate", "serious", "critical")
MAIN = (
    "index.html", "inscripcion.html", "colab.html", "placement.html",
    "terminos.html", "aviso-privacidad.html", "acceso.html", "alumno.html",
)


def routes(dist: Path) -> list[str]:
    entries = [p for p in MAIN if (dist / p).is_file()]
    for level in (1, 2):
        entries += [p.relative_to(dist).as_posix()
                    for p in sorted((dist / "labs" / f"level-{level}").glob("*.html"))]
    entries += [p.relative_to(dist).as_posix()
                for p in sorted((dist / "capsulas").rglob("*.html"))]
    if not entries:
        raise HarnessError("A11Y: no hay páginas que auditar en dist/")
    return list(dict.fromkeys(entries))


def _axe_source() -> Path:
    candidate = Path(os.environ.get("AXE_PATH", HERE / "node_modules" / "axe-core" / "axe.min.js"))
    if not candidate.is_file():
        raise HarnessError(
            "Falta axe-core fijado a 4.10.3; ejecuta npm install --prefix harness/a11y "
            "--no-save --no-package-lock --ignore-scripts axe-core@4.10.3."
        )
    return candidate


def load_baseline(path: Path = BASELINE) -> dict[str, dict]:
    if not path.exists():
        raise HarnessError("A11Y: falta la lista de contraste versionada: " + str(path))
    rows = {}
    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), start=1):
        if not line.strip():
            continue
        try:
            row = json.loads(line)
        except ValueError as exc:
            raise HarnessError(f"A11Y baseline línea {line_number}: JSON inválido") from exc
        expected = {"page", "viewport", "id", "target", "reason"}
        if set(row) != expected or row["id"] != "color-contrast" or not isinstance(row["reason"], str) or len(row["reason"].strip()) < 25:
            raise HarnessError(f"A11Y baseline línea {line_number}: solo contraste justificado es admisible")
        key = fingerprint(row)
        if key in rows:
            raise HarnessError(f"A11Y baseline duplicada: {key}")
        rows[key] = row
    return rows


def fingerprint(item: dict) -> str:
    return json.dumps([item["page"], item["viewport"], item["id"], item["target"]], ensure_ascii=False, separators=(",", ":"))


def enforce_monotonic(rows: dict[str, dict], root: Path = ROOT) -> None:
    """On later PRs the checked-in baseline can only shrink vs main."""
    try:
        old = subprocess.run(
            ["git", "show", "origin/main:harness/a11y/contrast-baseline.jsonl"],
            cwd=root, capture_output=True, text=True, check=True,
        ).stdout
    except (OSError, subprocess.CalledProcessError):
        # Initial creation in the first PR; subsequent PRs compare to main.
        return
    previous = {}
    for line in old.splitlines():
        if line.strip():
            row = json.loads(line)
            previous[fingerprint(row)] = row
    excess = sorted(set(rows) - set(previous))
    if excess:
        raise HarnessError("A11Y: la base versionada creció respecto a main; prohibido: " + ", ".join(excess[:4]))


def _tokens(root: Path) -> dict[str, list[str]]:
    source = root / "design" / "tokens" / "tokens.css"
    if not source.is_file():
        return {}
    matches: dict[str, list[str]] = {}
    for name, value in re.findall(r"(--[\w-]+)\s*:\s*(#[0-9a-fA-F]{6})", source.read_text(encoding="utf-8")):
        matches.setdefault(value.lower(), []).append(name)
    return matches


def _contrast(node: dict, tokens: dict[str, list[str]]) -> dict:
    checks = [c for group in ("any", "all", "none") for c in node.get(group, [])
              if c.get("id") == "color-contrast"]
    details = checks[0].get("data") or {} if checks else {}
    fg = str(details.get("fgColor") or "").lower()
    bg = str(details.get("bgColor") or "").lower()
    return {"foreground": fg, "background": bg,
            "actual": details.get("contrastRatio"), "required": details.get("expectedContrastRatio"),
            "tokens": sorted(set(tokens.get(fg, []) + tokens.get(bg, []))),
            "summary": node.get("failureSummary", "")}


def _keyboard(page) -> dict:
    # A deterministic Tab pass over all visible native controls. It does not
    # activate submit, payment, login, or destructive controls.
    expected = page.evaluate("""() => [...document.querySelectorAll(
      'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
    )].filter(e => e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden' &&
      !e.closest('[hidden],[inert]') && e.tabIndex >= 0).map(e => {
        if (!e.dataset.a11yTabId) e.dataset.a11yTabId = 'a11y-' + Math.random().toString(36).slice(2);
        return e.dataset.a11yTabId;
    })""")
    reached = []
    invisible = []
    # A generous bound permits wraps and responsive navigation.
    for _ in range(min(500, len(expected) * 2 + 6)):
        page.keyboard.press("Tab")
        state = page.evaluate("""() => {
            let e = document.activeElement;
            if (!e || !e.dataset.a11yTabId) return null;
            const s = getComputedStyle(e);
            return {id: e.dataset.a11yTabId,
                    focusVisible: e.matches(':focus-visible'),
                    signal: (s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0) ||
                      s.boxShadow !== 'none' || s.borderStyle !== 'none'};
        }""")
        if state:
            reached.append(state["id"])
            if state["focusVisible"] and not state["signal"]:
                invisible.append(state["id"])
        if expected and set(expected).issubset(reached):
            break
    missing = sorted(set(expected) - set(reached))
    # Keyboard-dead faux controls are not in the native tab order.
    dead = page.evaluate("""() => [...document.querySelectorAll('[role="button"],[role="menuitem"],[onclick]')]
      .filter(e => e.getClientRects().length && e.tabIndex < 0 &&
        !e.closest('[hidden],[inert]')).length""")
    return {"controls": len(expected), "reached": len(set(reached)),
            "not_reached": len(missing), "focus_without_signal": len(set(invisible)),
            "non_tab_faux_controls": dead}


def _escape(page) -> dict:
    result = {"menus_tested": 0, "menus_closed": 0, "dialogs_tested": 0, "dialogs_closed": 0}
    for trigger in page.locator('[aria-haspopup="menu"],[aria-haspopup="true"]').all()[:5]:
        try:
            if not trigger.is_visible() or not trigger.is_enabled():
                continue
            menu_id = trigger.get_attribute("aria-controls")
            if not menu_id:
                continue
            trigger.click(timeout=800)
            menu = page.locator("#" + menu_id)
            if menu.count() and menu.is_visible():
                result["menus_tested"] += 1
                page.keyboard.press("Escape")
                if not menu.is_visible():
                    result["menus_closed"] += 1
        except Exception:
            continue
    for dialog in page.locator("dialog[open]").all():
        result["dialogs_tested"] += 1
        page.keyboard.press("Escape")
        if not dialog.is_visible():
            result["dialogs_closed"] += 1
    return result


def collect(page, base: str, dist: Path, root: Path = ROOT, *, keyboard_audit: bool = True) -> tuple[list[dict], dict]:
    from playwright.sync_api import TimeoutError as PlaywrightTimeoutError

    script = _axe_source()
    tokens = _tokens(root)
    findings = []
    keyboard = {}
    for url in routes(dist):
        for w, h in VIEWPORTS:
            viewport = f"{w}x{h}"
            page.set_viewport_size({"width": w, "height": h})
            try:
                page.goto(base + url, wait_until="domcontentloaded", timeout=20000)
                page.wait_for_timeout(160)
                page.add_script_tag(path=str(script))
                actual_version = page.evaluate("axe.version")
                if actual_version != AXE_VERSION:
                    raise HarnessError(f"axe-core no coincide: {actual_version} != {AXE_VERSION}")
                result = page.evaluate("""async () => axe.run(document, {
                    runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa','best-practice']}
                })""")
            except PlaywrightTimeoutError:
                findings.append({"page": url, "viewport": viewport, "id": "audit-timeout",
                                 "impact": "critical", "target": "document", "summary": "navigation timeout"})
                continue
            for violation in result["violations"]:
                for node in violation["nodes"]:
                    row = {"page": url, "viewport": viewport, "id": violation["id"],
                           "impact": violation.get("impact") or "moderate",
                           "target": " ".join(node["target"]),
                           "summary": node.get("failureSummary", "")}
                    if violation["id"] == "color-contrast":
                        row["contrast"] = _contrast(node, tokens)
                    findings.append(row)
            if keyboard_audit:
                keyboard[url + "|" + viewport] = {"tab": _keyboard(page), "escape": _escape(page)}
    return findings, keyboard


def report(findings: list[dict], keyboard: dict, root: Path = ROOT) -> Path:
    folder = Path(os.environ.get("A11Y_REPORT_DIR", root / "output" / "a11y"))
    folder.mkdir(parents=True, exist_ok=True)
    path = folder / "audit.json"
    path.write_text(json.dumps({"axe_version": AXE_VERSION, "violations": findings,
                                "keyboard": keyboard}, ensure_ascii=False, indent=2), encoding="utf-8")
    by_page = {}
    for row in findings:
        counts = by_page.setdefault((row["page"], row["viewport"]), Counter())
        counts[row["impact"]] += 1
    for (page, viewport), counts in sorted(by_page.items()):
        print("A11Y|" + page + "|" + viewport + "|" +
              "|".join(str(counts[k]) for k in IMPACTS))
    print("A11Y report:", path)
    return path


def candidate_baseline(findings: list[dict]) -> list[dict]:
    reason = ("Contraste heredado; decisión visual pendiente del autor. "
              "No se alterarán colores ni tokens hasta su aprobación.")
    return [{"page": row["page"], "viewport": row["viewport"], "id": row["id"],
             "target": row["target"], "reason": reason}
            for row in findings if row["id"] == "color-contrast" and row["impact"] in ("serious", "critical")]


def gate(findings: list[dict], baseline: dict[str, dict], root: Path = ROOT) -> dict:
    enforce_monotonic(baseline, root)
    observed = {fingerprint(row): row for row in findings if row["impact"] in ("serious", "critical")}
    unknown = [row for key, row in observed.items() if key not in baseline]
    # A removed issue must never be masked by an expanded baseline.
    if unknown:
        details = [f'{x["page"]} {x["viewport"]} {x["id"]} {x["target"]}' for x in unknown[:20]]
        raise HarnessError("A11Y: violaciones serious/critical nuevas (" + str(len(unknown)) +
                           "):\n- " + "\n- ".join(details))
    return {"audited": len(set(x["page"] for x in findings)), "serious_critical_pending": len(observed),
            "contrast_pending": sum(x["id"] == "color-contrast" for x in observed),
            "baseline_remaining": len(baseline) - len(set(baseline) & set(observed))}


def run(page, base: str, dist: Path, root: Path = ROOT) -> dict:
    findings, keyboard = collect(page, base, dist, root)
    report(findings, keyboard, root)
    if os.environ.get("A11Y_COMPARE") == "1":
        before_page = page.context.new_page()
        # Disable ONLY the injected behavior before any page script executes.
        before_page.add_init_script("window.__allA11yInstalled = true;")
        try:
            before, _ = collect(before_page, base, dist, root, keyboard_audit=False)
        finally:
            before_page.close()
        before_counts = {}
        after_counts = {}
        for row, mapping in ((x, before_counts) for x in before):
            mapping.setdefault(row["page"], Counter())[row["impact"]] += 1
        for row in findings:
            after_counts.setdefault(row["page"], Counter())[row["impact"]] += 1
        table = []
        for path in routes(dist):
            item = {"page": path,
                    "before": {impact: before_counts.get(path, Counter())[impact] for impact in IMPACTS},
                    "after": {impact: after_counts.get(path, Counter())[impact] for impact in IMPACTS}}
            table.append(item)
            print("A11Y-COMPARE|" + path + "|" +
                  ",".join(str(item["before"][i]) for i in IMPACTS) + "|" +
                  ",".join(str(item["after"][i]) for i in IMPACTS))
        destination = Path(os.environ.get("A11Y_REPORT_DIR", root / "output" / "a11y"))
        (destination / "before-after.json").write_text(
            json.dumps({"pages": table, "before_findings": before, "after_findings": findings},
                       ensure_ascii=False, indent=2), encoding="utf-8")
    if os.environ.get("A11Y_SNAPSHOT") == "1":
        rows = candidate_baseline(findings)
        path = root / "output" / "a11y" / "candidate-baseline.jsonl"
        path.write_text("".join(json.dumps(row, ensure_ascii=False) + "\n" for row in rows), encoding="utf-8")
        print("A11Y contrast candidate:", path, "entries", len(rows))
        return {"snapshot": True, "findings": len(findings), "contrast": len(rows)}
    return gate(findings, load_baseline(root / "harness" / "a11y" / "contrast-baseline.jsonl"), root)
