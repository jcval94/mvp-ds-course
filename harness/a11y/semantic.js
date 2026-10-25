/* Non-visual accessibility repairs applied to the published copy, never generated/.
 * No CSS, text-node edits, layout changes, or focus styling.
 */
(() => {
  "use strict";
  if (window.__allA11yInstalled) return;
  window.__allA11yInstalled = true;

  const visible = el => !!(el && !el.hidden && !el.closest("[hidden],[inert]") &&
    el.getClientRects().length && getComputedStyle(el).visibility !== "hidden");
  const focusable = root => [...root.querySelectorAll(
    'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),' +
    'textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
  )].filter(el => visible(el) && el.tabIndex >= 0);
  const activeDialog = () => [...document.querySelectorAll('dialog[open],[role="dialog"]')]
    .reverse().find(visible);

  function nameFrom(el) {
    const id = el.id;
    const label = id ? document.querySelector('label[for="' + CSS.escape(id) + '"]') : null;
    const sibling = el.closest("label");
    if (label || sibling) return "";
    const text = (el.getAttribute("placeholder") || el.getAttribute("title") ||
      el.getAttribute("data-label") || el.getAttribute("name") || id || "").trim();
    return text.replace(/[_-]+/g, " ");
  }

  function repair() {
    if (!document.documentElement.lang) document.documentElement.lang = "es";
    // SVG pictograms adjacent to a real textual label should not repeat the label.
    document.querySelectorAll("a svg:not([role]),button svg:not([role])").forEach(svg => {
      if (!svg.hasAttribute("aria-label") && !svg.querySelector("title"))
        svg.setAttribute("aria-hidden", "true");
    });
    document.querySelectorAll("img:not([alt])").forEach(img => {
      const caption = img.closest("figure")?.querySelector("figcaption")?.textContent?.trim();
      const label = img.getAttribute("aria-label") || caption ||
        img.getAttribute("title") || "";
      img.setAttribute("alt", label);
    });
    document.querySelectorAll("input,select,textarea").forEach(el => {
      if (el.type === "hidden" || el.getAttribute("aria-label") ||
          el.getAttribute("aria-labelledby") || el.labels?.length) return;
      const name = nameFrom(el);
      if (name) el.setAttribute("aria-label", name);
    });
    document.querySelectorAll("button, a[href], [role='button']").forEach(el => {
      if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") ||
          el.textContent.trim() || el.querySelector("img[alt]:not([alt=''])")) return;
      const title = el.getAttribute("title") || el.getAttribute("data-label") ||
        el.querySelector("svg title")?.textContent?.trim();
      if (title) el.setAttribute("aria-label", title);
    });
    // Mobile layouts hide the visible caption for these icon controls.
    // The explicit accessible name survives responsive display:none.
    document.querySelectorAll("#helpButton").forEach(el => {
      el.setAttribute("aria-label", "Ayuda");
    });
    document.querySelectorAll('a[href$="README.md"]').forEach(el => {
      if (!el.getAttribute("aria-label")) el.setAttribute("aria-label", "Guía docente");
    });
    // An overflow container with no keyboard access is a serious axe failure.
    // Make only the documented learning surfaces reachable by Tab; no CSS edits.
    for (const [selector, label] of [
      [".learning-path", "Ruta de aprendizaje"],
      [".tool-section .prompt-box", "Instrucciones de práctica"],
      ["#visualArea", "Representación interactiva"],
      ["#visual", "Representación interactiva"]
    ]) {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "0");
        if (!el.hasAttribute("role")) el.setAttribute("role", "region");
        if (!el.hasAttribute("aria-label") && !el.hasAttribute("aria-labelledby"))
          el.setAttribute("aria-label", label);
      });
    }
    // A named region does not need to alter the site's markup or its geometry.
    document.querySelectorAll('nav:not([aria-label]):not([aria-labelledby])').forEach(nav => {
      nav.setAttribute("aria-label", "Navegación");
    });
    // Fix only the announced heading level. Keeping the original HTML tag
    // preserves CSS selectors, font sizes, spacing, and visible copy.
    let previousLevel = 0;
    document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(heading => {
      const visualLevel = Number(heading.tagName.slice(1));
      const announced = previousLevel ? Math.min(visualLevel, previousLevel + 1) : 1;
      if (announced !== visualLevel) {
        heading.setAttribute("role", "heading");
        heading.setAttribute("aria-level", String(announced));
      }
      previousLevel = announced;
    });
    document.querySelectorAll('[aria-haspopup="true"],[aria-haspopup="menu"]').forEach(trigger => {
      const menuId = trigger.getAttribute("aria-controls") ||
        (trigger.id === "perfilBtn" ? "perfilMenu" : "");
      const menu = menuId && document.getElementById(menuId);
      if (!menu) return;
      if (!trigger.hasAttribute("aria-controls")) trigger.setAttribute("aria-controls", menuId);
      trigger.setAttribute("aria-expanded", String(visible(menu)));
    });
  }

  let previousFocus = null;
  let lastDialog = null;
  function handleDialogs() {
    const dialog = activeDialog();
    if (dialog && dialog !== lastDialog) {
      previousFocus = document.activeElement;
      const initial = focusable(dialog)[0] || dialog;
      if (!initial.hasAttribute("tabindex") && initial === dialog)
        initial.setAttribute("tabindex", "-1");
      initial.focus({ preventScroll: true });
    }
    if (!dialog && lastDialog && previousFocus?.isConnected) {
      previousFocus.focus({ preventScroll: true });
      previousFocus = null;
    }
    lastDialog = dialog;
  }

  document.addEventListener("keydown", event => {
    const dialog = activeDialog();
    if (event.key === "Escape") {
      if (dialog) {
        event.preventDefault();
        if (dialog.tagName === "DIALOG") dialog.close();
        else {
          dialog.hidden = true;
          dialog.setAttribute("aria-hidden", "true");
        }
        handleDialogs();
        return;
      }
      const open = [...document.querySelectorAll('[role="menu"],[id$="Menu"]')].find(visible);
      if (open) {
        const trigger = [...document.querySelectorAll('[aria-controls]')].find(
          el => el.getAttribute("aria-controls") === open.id);
        open.hidden = true;
        if (trigger) {
          trigger.setAttribute("aria-expanded", "false");
          trigger.focus({ preventScroll: true });
        }
        event.preventDefault();
      }
    }
    if (event.key !== "Tab" || !dialog) return;
    const items = focusable(dialog);
    if (!items.length) {
      event.preventDefault();
      dialog.focus({ preventScroll: true });
    } else if (event.shiftKey && (document.activeElement === items[0] || !dialog.contains(document.activeElement))) {
      event.preventDefault();
      items.at(-1).focus({ preventScroll: true });
    } else if (!event.shiftKey && (document.activeElement === items.at(-1) || !dialog.contains(document.activeElement))) {
      event.preventDefault();
      items[0].focus({ preventScroll: true });
    }
  }, true);
  let scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      repair();
      handleDialogs();
    });
  }
  const start = () => {
    repair();
    handleDialogs();
    const observer = new MutationObserver(schedule);
    observer.observe(document.body, {
      childList: true, subtree: true, attributes: true,
      attributeFilter: ["hidden", "open", "class", "disabled"]
    });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();