(() => {
  "use strict";
  const KEY = "all-level-1-literacy-v2-progress";
  const scenes = [
    {
      short: "Observación", tag: "01 — OBSERVACIÓN",
      title: "Todo empieza con un pedido.",
      intro: "Paco ayuda a su papá en la taquería. Tiene una libreta nueva, varios tickets y una pregunta: ¿cómo convertir lo que sucede en datos?",
      juan: "Mijo, todo ese renglón es un pedido. Si lo parte, luego ni quién sepa qué tacos iban juntos.",
      paco: "Va, apá. Empiezo uno nuevo cuando cierro el ticket.",
      question: "Al pasar los tickets a una tabla, ¿qué debería representar cada fila?",
      choices: ["Un taco individual", "Un pedido completo", "Una mesa de la taquería"],
      correct: 1,
      feedback: "Exacto. Definimos la unidad de análisis: un pedido, incluso cuando incluye varios tacos.",
      wrong: "Revisa qué unidad se repite entre los tickets. Un pedido puede incluir varios tacos.",
      hint: "Piensa qué se registra cuando se cierra un ticket, no cuando se prepara un taco.",
      takeaway: "Una observación es el registro de una unidad definida. Aquí, cada fila representa un pedido.",
      recap: "Una fila = un pedido."
    },
    {
      short: "Variable", tag: "02 — VARIABLE",
      title: "Los números no hablan solos.",
      intro: "El inventario de tortillas se está terminando. Don Juan necesita saber cuántos tacos pidieron, no cuántos tickets se imprimieron.",
      juan: "Esta columna me dice cuántos fueron. La otra, cuáles. No las revuelva.",
      paco: "Una pregunta por columna, apá.",
      question: "¿Qué columna le sirve a Paco para calcular la cantidad de tacos?",
      choices: ["pedido_id", "tipo_taco", "num_tacos"],
      correct: 2,
      feedback: "Correcto. num_tacos almacena una cantidad que tiene sentido sumar.",
      wrong: "El identificador distingue pedidos y el tipo indica una categoría. Busca la cantidad.",
      hint: "¿Cuál de estas columnas tiene valores que podrías sumar para planear insumos?",
      takeaway: "Una variable es una característica registrada para cada observación. Una columna debe medir la misma característica en todas las filas.",
      recap: "Una columna = una característica."
    },
    {
      short: "Tabla", tag: "03 — TABLA",
      title: "¿Y ese tres qué significa?",
      intro: "Paco señala un número que quedó anotado al margen. Sin encabezado ni ticket, Don Juan no sabe qué preparar.",
      juan: "Ese tres solito no me dice nada. Puede ser ticket, tacos o mesa.",
      paco: "Con su renglón y encabezado sabemos que son tres tacos del P-002.",
      question: "Con el contexto correcto, ¿qué representa el número 3?",
      choices: ["El número de mesa", "Tres tacos del pedido P-002", "El tercer pedido de la noche"],
      correct: 1,
      feedback: "¡Eso es! Un valor aislado necesita su fila y su columna para tener significado.",
      wrong: "La cifra no basta. Hace falta saber a qué pedido y a qué variable pertenece.",
      hint: "Don Juan necesita tanto el identificador del pedido como el encabezado de la columna.",
      takeaway: "Una tabla organiza observaciones en filas y variables en columnas. Una celda obtiene su sentido de ambas.",
      recap: "La fila y la columna dan contexto."
    },
    {
      short: "Población", tag: "04 — POBLACIÓN",
      title: "La pregunta decide el universo.",
      intro: "Después del turno, Don Juan quiere entender qué se vendió durante el fin de semana. Paco registró pedidos del viernes y del sábado.",
      juan: "Yo pregunté por las dos noches completas, no nomás por la hora en que había lugar para escribir.",
      paco: "Entonces cuentan todos los pedidos de esas dos noches.",
      question: "Si quieres estudiar ambas noches completas, ¿cuál es tu población?",
      choices: ["Solo los pedidos del viernes", "Todos los pedidos del viernes y del sábado", "Los primeros cuatro pedidos registrados"],
      correct: 1,
      feedback: "Exactamente. La población la define la pregunta: todos los pedidos de esas dos noches.",
      wrong: "Esa selección deja fuera pedidos que forman parte de la pregunta.",
      hint: "Busca el conjunto completo, no solo lo que resulta fácil revisar.",
      takeaway: "La población es el conjunto completo sobre el que queremos responder una pregunta; depende del periodo y la unidad definidos.",
      recap: "Población = todos los pedidos de interés."
    },
    {
      short: "Muestra", tag: "05 — MUESTRA",
      title: "El incidente del yogurt.",
      intro: "Un yogurt se derrama sobre la libreta. Solo algunos pedidos siguen legibles... y casi todos son del primer turno.",
      juan: "Ya aprendimos que la mochila no es archivero y el yogurt no es respaldo.",
      paco: "No voy a inventar lo que ya no se ve, apá.",
      question: "¿Puedes usar los pedidos legibles para describir con seguridad toda la noche?",
      choices: ["Sí, son todos los que quedaron", "No: son una muestra que podría no representar al cierre", "Sí, si duplicamos los registros legibles"],
      correct: 1,
      feedback: "Bien pensado. Los registros legibles son una muestra; si faltan más pedidos del cierre, hay sesgo de selección.",
      wrong: "Tener datos no garantiza que representen todo el turno. Piensa qué parte se perdió.",
      hint: "Si se borraron más pedidos del cierre, ¿las ventas de las primeras horas representarían bien toda la noche?",
      takeaway: "Una muestra es una parte de la población. Puede ser engañosa si ciertos pedidos tienen más probabilidad de faltar.",
      recap: "Muestra no significa población."
    }
  ];
  const $ = (id) => document.getElementById(id);
  const validSaved = (() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "null");
      return s && Array.isArray(s.solved) && s.solved.length === scenes.length
        ? { index: Number.isInteger(s.index) && s.index >= 0 && s.index < scenes.length ? s.index : 0,
            solved: s.solved.map(Boolean), completed: s.completed === true }
        : null;
    } catch { return null; }
  })();
  let state = validSaved || { index: 0, solved: scenes.map(() => false), completed: false };
  let lastWrong = -1;
  const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
  const allowedIndex = () => {
    const firstUnsolved = state.solved.findIndex((x) => !x);
    return firstUnsolved < 0 ? scenes.length - 1 : firstUnsolved;
  };
  const labeledRows = (highlight = false) => `<div class="table-sheet"><div class="sheet-meta"><span>LIBRETA / TURNO 01</span><span class="sheet-tag">3 REGISTROS</span></div><table class="data-table"><thead><tr><th scope="col">pedido_id</th><th scope="col">tipo_taco</th><th scope="col">num_tacos</th></tr></thead><tbody><tr><td>P-001</td><td>Pastor</td><td class="${highlight ? "glow-cell" : ""}">2</td></tr><tr><td>P-002</td><td>Bistec</td><td class="${highlight ? "glow-cell" : ""}">3</td></tr><tr><td>P-003</td><td>Suadero</td><td class="${highlight ? "glow-cell" : ""}">1</td></tr></tbody></table><div class="sheet-bottom">${highlight ? "✓ Cantidad total de tacos: 6" : "Cada fila conserva el contexto del pedido."}</div></div>`;
  const visual = (index, solved) => {
    if (index === 0) return `<div class="visual-frame"><div class="visual-caption">TRES TICKETS SOBRE EL MOSTRADOR</div><div class="receipts">
      <div class="receipt"><span class="receipt-label">TICKET</span><div class="receipt-number">P-001</div><div class="receipt-line"><span>Pastor</span><b>× 2</b></div><div class="receipt-sub">21:04 · VIERNES</div></div>
      <div class="receipt"><span class="receipt-label">TICKET</span><div class="receipt-number">P-002</div><div class="receipt-line"><span>Bistec</span><b>× 3</b></div><div class="receipt-sub">21:06 · VIERNES</div></div>
      <div class="receipt"><span class="receipt-label">TICKET</span><div class="receipt-number">P-003</div><div class="receipt-line"><span>Suadero</span><b>× 1</b></div><div class="receipt-sub">21:12 · VIERNES</div></div>
    </div>${solved ? '<div class="context-capsule"><span>3 tickets → 3 observaciones</span></div>' : ""}</div>`;
    if (index === 1) return `<div class="visual-frame"><div class="visual-caption">DE LOS TICKETS A LAS COLUMNAS</div>${labeledRows(solved)}</div>`;
    if (index === 2) return `<div class="visual-frame"><div class="visual-caption">${solved ? "CONTEXTUALIZAMOS EL VALOR" : "PACO SOLO ENCONTRÓ ESTO"}</div>${solved ? labeledRows(true) : '<div class="lonely-number">3</div><div class="lonely-note">¿TRES QUÉ?</div>'}</div>`;
    if (index === 3) return `<div class="visual-frame"><div class="visual-caption">PEDIDOS DE DOS NOCHES</div><div class="two-nights">
      <div class="night"><div class="night-head">Viernes <span>4 pedidos</span></div><div class="order-dots"><div class="order-dot">01</div><div class="order-dot">02</div><div class="order-dot">03</div><div class="order-dot">04</div></div></div>
      <div class="night"><div class="night-head">Sábado <span>4 pedidos</span></div><div class="order-dots"><div class="order-dot">05</div><div class="order-dot">06</div><div class="order-dot">07</div><div class="order-dot">08</div></div></div>
    </div>${solved ? '<div class="context-capsule"><span>Población: los 8 pedidos de estas dos noches</span></div>' : ""}</div>`;
    return `<div class="visual-frame"><div class="visual-caption">LA LIBRETA DESPUÉS DEL ACCIDENTE</div><div class="yogurt-stage"><div class="notebook"><div class="notebook-rows"><span>P-001  Pastor × 2</span><span>P-002  Bistec × 3</span><span>P-003  Suadero × 1</span><span>P-004  Pastor × 2</span><span>P-005  ........</span></div><div class="spill"></div></div></div><div class="sample-key"><span><b></b>4 legibles</span><span><b></b>4 ilegibles</span></div>${solved ? '<div class="context-capsule"><span>¡Atención! Faltan pedidos del cierre</span></div>' : ""}</div>`;
  };
  function drawSteps() {
    const nav = $("step-nav");
    nav.replaceChildren();
    scenes.forEach((scene, i) => {
      const btn = document.createElement("button");
      const finished = state.solved[i];
      btn.type = "button";
      btn.className = "step" + (finished ? " done" : "") + (state.index === i && !state.completed ? " active" : "");
      btn.disabled = i > allowedIndex() && !state.completed;
      btn.setAttribute("aria-label", `Escena ${i + 1}: ${scene.short}${finished ? ", completada" : ""}`);
      if (state.index === i && !state.completed) btn.setAttribute("aria-current", "step");
      const number = document.createElement("span");
      number.className = "step-number";
      number.textContent = finished ? "✓" : String(i + 1);
      const label = document.createElement("span");
      label.className = "step-text";
      label.textContent = scene.short;
      btn.append(number, label);
      btn.addEventListener("click", () => go(i));
      nav.append(btn);
    });
    $("progress-fill").style.width = (state.solved.filter(Boolean).length / scenes.length * 100) + "%";
    $("progress-label").textContent = state.completed ? "Episodio completado" : `Escena ${state.index + 1} de ${scenes.length}`;
  }
  function choose(i) {
    const scene = scenes[state.index];
    if (state.solved[state.index]) return;
    if (i !== scene.correct) {
      lastWrong = i;
      $("feedback").hidden = false;
      $("feedback").className = "feedback";
      $("feedback").textContent = scene.wrong;
      document.querySelectorAll(".choice").forEach((choice, k) => {
        choice.classList.toggle("is-wrong", k === i);
        choice.setAttribute("aria-pressed", String(k === i));
      });
      return;
    }
    lastWrong = -1;
    state.solved[state.index] = true;
    persist();
    renderScene();
    $("feedback").hidden = false;
    $("feedback").className = "feedback good";
    $("feedback").textContent = scene.feedback;
    $("footer-note").textContent = "¡Bien! Puedes avanzar a la siguiente escena.";
  }
  function renderScene() {
    const scene = scenes[state.index];
    const solved = state.solved[state.index];
    $("scene-label").textContent = "ESCENA " + scene.tag;
    $("story-title").textContent = scene.title;
    $("story-intro").textContent = scene.intro;
    $("juan-line").textContent = scene.juan;
    $("paco-line").textContent = scene.paco;
    $("question-title").textContent = scene.question;
    $("question-index").textContent = `${String(state.index + 1).padStart(2, "0")}/05`;
    $("visual-space").innerHTML = visual(state.index, solved);
    $("takeaway").hidden = !solved;
    $("takeaway-text").textContent = scene.takeaway;
    $("feedback").hidden = true;
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("hint-btn").setAttribute("aria-expanded", "false");
    $("hint-text").hidden = true;
    $("hint-text").textContent = scene.hint;
    const choices = $("choices");
    choices.replaceChildren();
    scene.choices.forEach((text, index) => {
      const button = document.createElement("button");
      const correct = index === scene.correct;
      button.type = "button";
      button.className = "choice" + (solved && correct ? " is-correct" : "");
      button.disabled = solved;
      button.setAttribute("aria-pressed", String(solved && correct));
      const n = document.createElement("span");
      n.className = "choice-index";
      n.textContent = ["A", "B", "C"][index];
      const label = document.createElement("span");
      label.className = "choice-label";
      label.textContent = text;
      const mark = document.createElement("span");
      mark.className = "choice-icon";
      mark.setAttribute("aria-hidden", "true");
      mark.textContent = "✓";
      button.append(n, label, mark);
      button.addEventListener("click", () => choose(index));
      choices.append(button);
    });
    if (solved) {
      $("feedback").hidden = false;
      $("feedback").className = "feedback good";
      $("feedback").textContent = scene.feedback;
    }
    $("back-btn").disabled = state.index === 0;
    $("next-btn").disabled = !solved;
    $("next-btn").innerHTML = state.index === scenes.length - 1 ? 'Ver lo aprendido <span aria-hidden="true">→</span>' : 'Siguiente escena <span aria-hidden="true">→</span>';
    $("footer-note").textContent = solved ? "¡Bien! Puedes avanzar a la siguiente escena." : "Explora la evidencia y elige una respuesta.";
    drawSteps();
  }
  function renderEnd() {
    $("story").hidden = true;
    $("end-screen").hidden = false;
    document.querySelector(".bottom-bar").hidden = true;
    const recap = $("recap");
    recap.replaceChildren();
    scenes.forEach((scene, i) => {
      const card = document.createElement("div");
      card.className = "recap-item";
      const no = document.createElement("span");
      no.textContent = `APRENDIZAJE ${String(i + 1).padStart(2, "0")}`;
      const title = document.createElement("strong");
      title.textContent = scene.short;
      const description = document.createElement("p");
      description.textContent = scene.recap;
      card.append(no, title, description);
      recap.append(card);
    });
    drawSteps();
  }
  function go(i) {
    if (i < 0 || i >= scenes.length || i > allowedIndex()) return;
    state.index = i;
    state.completed = false;
    lastWrong = -1;
    persist();
    $("story").hidden = false;
    $("end-screen").hidden = true;
    document.querySelector(".bottom-bar").hidden = false;
    renderScene();
    if (window.matchMedia("(max-width: 900px)").matches) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      $("experiencia").scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
    }
  }
  $("next-btn").addEventListener("click", () => {
    if (!state.solved[state.index]) return;
    if (state.index === scenes.length - 1) {
      state.completed = true;
      persist();
      renderEnd();
      $("end-title").focus?.();
    } else go(state.index + 1);
  });
  $("back-btn").addEventListener("click", () => go(state.index - 1));
  $("hint-btn").addEventListener("click", () => {
    const opening = $("hint-text").hidden;
    $("hint-text").hidden = !opening;
    $("hint-btn").setAttribute("aria-expanded", String(opening));
  });
  $("restart").addEventListener("click", () => {
    state = { index: 0, solved: scenes.map(() => false), completed: false };
    persist(); go(0);
  });
  if (state.completed && state.solved.every(Boolean)) renderEnd();
  else {
    if (state.index > allowedIndex()) state.index = allowedIndex();
    renderScene();
  }
})();
