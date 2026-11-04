// Tableros del panel: solo datos autorizados por la sesión; sin persistir identidades.
(function () {
  const DIA = 86400000, TZ = "America/Mexico_City";
  const texto = (s) => String(s || "").replace(/_/g, " ");
  const fecha = (s) => new Date(s).toLocaleString("es-MX", { timeZone: TZ, day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const dia = (s) => new Date(s).toLocaleDateString("en-CA", { timeZone: TZ });
  const orden = (a, b) => new Date(a.creado) - new Date(b.creado) || Number(a.id) - Number(b.id);
  const unicos = (filas) => [...new Map(filas.map((x) => [String(x.id), x])).values()];
  function modelo({ alumnos, casos, eventos, respuestas, intentos, mensajes, desde, hasta, caso, retos = [] }) {
    const ids = new Set(alumnos.map((a) => a.id));
    const dentro = (x) => ids.has(x.usuario) && (!caso || x.caso === caso) && new Date(x.creado) >= desde && new Date(x.creado) < hasta;
    const E = unicos(eventos).filter(dentro).sort(orden), R = unicos(respuestas).filter(dentro).sort(orden);
    const I = unicos(intentos).filter(dentro).sort(orden);
    const C = casos.filter((c) => !caso || c.id === caso);
    const filas = alumnos.map((a) => {
      const ev = E.filter((e) => e.usuario === a.id), resp = R.filter((r) => r.usuario === a.id), ints = I.filter((i) => i.usuario === a.id);
      const porReto = new Map(); ints.forEach((i) => { const k = `${i.caso}|${i.reto}`; if (!porReto.has(k)) porReto.set(k, []); porReto.get(k).push(i); });
      const errores = [...porReto.values()].filter((is) => is.length >= 3 && !is.some((i) => i.acierto === true)).length;
      const ms = mensajes.filter((m) => m.alumno === a.id && m.de_alumno && !m.leido && (!caso || !m.caso || m.caso === caso) && new Date(m.creado) < hasta);
      const ultima = [...ev, ...resp, ...ints].sort(orden).at(-1)?.creado || null;
      const actividad = ev.length + resp.length + ints.length > 0;
      const completas = C.filter((c) => ev.some((e) => e.caso === c.id && e.tipo === "completo")).length;
      return { a, ev, resp, ints, porReto, errores, mensajes: ms.length, ultima, actividad, completas };
    });
    const primeros = I.filter((i) => Number(i.intento) === 1);
    return { filas, retos, eventos: E, respuestas: R, intentos: I, casos: C, primeros,
      participantes: filas.filter((f) => f.actividad).length,
      completos: filas.filter((f) => C.length && f.completas === C.length).length,
      aciertos: primeros.filter((i) => i.acierto === true).length };
  }

  function crear({ raiz, estado, abrirFicha, escribirA, visible }) {
    const el = (tag, cls, t) => { const e = document.createElement(tag); if (cls) e.className = cls; if (t != null) e.textContent = t; return e; };
    const btn = (t, fn, cls = "btn btn-line btn-sm") => { const b = el("button", cls, t); b.type = "button"; b.addEventListener("click", fn); return b; };
    const select = (label) => { const l = el("label", "field"), s = el("select"); s.setAttribute("aria-label", label); l.append(el("span", null, label), s); return [l, s]; };
    const card = (title, note) => { const c = el("section", "card"), h = el("div", "card-head"); h.append(el("h2", null, title)); if (note) h.append(el("p", null, note)); c.append(h); return c; };
    const controles = el("div", "toolbar"), [lm, modo] = select("Vista"), [lc, clase] = select("Clase"), [lk, caso] = select("Caso"), [lp, periodo] = select("Periodo");
    modo.append(new Option("Clase en vivo", "clase"), new Option("Historial", "historial"));
    [14, 30, 90].forEach((n) => periodo.append(new Option(`Últimos ${n} días`, String(n)))); periodo.value = "30";
    const autoL = el("label", "check-inline"), auto = el("input"); auto.type = "checkbox"; auto.checked = true; autoL.append(auto, " Actualizar cada 30 s");
    const actualizarBtn = btn("Actualizar tablero", () => cargar()), status = el("p", "legend-note"); status.setAttribute("role", "status");
    const contenido = el("div", "vista"), proy = btn("Proyectar sin nombres", () => { proyectar = !proyectar; if (dlg.open) dlg.close(); dlg.replaceChildren(); dibujar(); });
    controles.append(lm, lc, lk, lp, autoL, actualizarBtn, proy); raiz.append(controles, status, contenido);
    let datos = null, alcance = null, firma = "", generacion = 0, distribucionSel = "", proyectar = false, actualizado = null, errorIntentos = false, errorMensajes = false;
    const dlg = el("dialog", "dlg wide tablero-ficha"); dlg.setAttribute("aria-label", "Avance del estudiante en el periodo"); raiz.append(dlg);
    function alcanceActual() {
      const S = estado(), ahora = new Date();
      lc.hidden = modo.value !== "clase"; lp.hidden = modo.value === "clase"; lk.hidden = modo.value === "clase";
      if (modo.value === "clase") {
        const k = S.clases.find((c) => String(c.id) === clase.value);
        if (!k || !k.caso || !S.casos.some((c) => c.id === k.caso)) return null;
        return { desde: new Date(k.inicio), hasta: new Date(Math.min(+ahora + 1, +new Date(k.inicio) + k.duracion_min * 60000)), caso: k.caso, grupo: k.grupo, clase: k };
      }
      return { desde: new Date(+ahora - Number(periodo.value) * DIA), hasta: ahora, caso: caso.value || null, grupo: S.grupoSel || null };
    }
    function vaciar(t) { contenido.replaceChildren(el("p", "empty", t)); }
    function filtros() {
      const S = estado(), elegida = clase.value, prev = caso.value;
      const clases = S.clases.filter((c) => !S.grupoSel || c.grupo === S.grupoSel).sort((a, b) => new Date(b.inicio) - new Date(a.inicio));
      clase.replaceChildren(...clases.map((c) => new Option(`${fecha(c.inicio)} · ${c.tema} · ${c.grupo}`, String(c.id))));
      if (clases.some((c) => String(c.id) === elegida)) clase.value = elegida;
      else { const actual = clases.find((c) => +new Date(c.inicio) <= Date.now()); if (actual) clase.value = String(actual.id); }
      caso.replaceChildren(new Option("Todos los casos", ""), ...S.casos.map((c) => new Option(`${c.id} · ${c.titulo}`, c.id))); caso.value = prev;
      if (!caso.value) caso.value = "";
    }
    async function cargar() {
      if (!visible()) return;
      const a = alcanceActual(), numero = ++generacion; firma = `${estado().grupoSel}|${modo.value}|${clase.value}|${caso.value}|${periodo.value}`;
      datos = null; alcance = a; actualizarBtn.disabled = true;
      if (!a || a.hasta <= a.desde) {
        status.textContent = ""; actualizarBtn.disabled = false;
        vaciar(a ? "Esta clase todavía no comienza." : "Selecciona una clase con un caso asignado. El calendario se administra en la pestaña Clases."); return;
      }
      status.textContent = "Cargando el periodo seleccionado…"; vaciar("Cargando actividad…");
      const q = new URLSearchParams({ creado: `gte.${a.desde.toISOString()}`, order: "id.asc" });
      q.append("creado", `lt.${a.hasta.toISOString()}`); if (a.caso) q.set("caso", `eq.${a.caso}`);
      const iq = new URLSearchParams({ p_desde: a.desde.toISOString(), p_hasta: a.hasta.toISOString(), order: "id.asc" });
      if (a.caso) iq.set("p_caso", a.caso); if (a.grupo && a.grupo !== "__sin__") iq.set("p_grupo", a.grupo);
      try {
        const r = await Promise.allSettled([
          TDD.todo(`/rest/v1/eventos?select=id,usuario,caso,seccion,tipo,valor,creado&${q}`),
          TDD.todo(`/rest/v1/respuestas?select=id,usuario,caso,pregunta,texto,nivel,retro,modelo,creado&${q}`),
          TDD.todo(`/rest/v1/rpc/docente_intentos_tablero?${iq}`),
          TDD.todo("/rest/v1/mensajes_curso?select=id,alumno,de_alumno,leido,caso,creado&de_alumno=eq.true&leido=is.null&order=id.asc"),
          TDD.rpc("docente_alumnos"),
        ]);
        if (numero !== generacion || !visible()) return;
        if (r[0].status === "rejected" || r[1].status === "rejected" || r[4].status === "rejected") throw new Error("No se pudo leer la actividad. Vuelve a actualizar.");
        errorIntentos = r[2].status === "rejected"; errorMensajes = r[3].status === "rejected";
        const roster = r[4].value.filter((s) => s.alumno_id !== "DOCENTE" && (a.grupo === "__sin__" ? !s.grupo : !a.grupo || s.grupo === a.grupo));
        if (r.slice(0, 4).some((x) => x.status === "fulfilled" && x.value?.length >= 200000)) throw new Error("El periodo contiene demasiados registros. Elige un periodo más corto.");
        datos = { alumnos: roster, casos: estado().casos, retos: estado().retos.map(({caso, reto}) => ({caso, reto})), eventos: r[0].value, respuestas: r[1].value,
          intentos: errorIntentos ? [] : r[2].value, mensajes: errorMensajes ? [] : r[3].value, ...a };
        actualizado = new Date(); dibujar();
      } catch (e) { if (numero === generacion) { status.textContent = e.message; vaciar("No hay una lectura completa para este periodo. Los datos no se muestran como ceros."); } }
      finally { if (numero === generacion) actualizarBtn.disabled = false; }
    }
    function barras(c, items, denominador, suffix = "") {
      const lista = el("ol", "hbars");
      items.forEach(([t, n]) => { const li = el("li"), rail = el("span", "rail"), fill = el("i"); fill.style.width = `${denominador ? 100 * n / denominador : 0}%`; rail.append(fill); li.append(el("span", null, t), rail, el("b", null, `${n}/${denominador}${suffix}`)); lista.append(li); }); c.append(lista);
    }
    function indicador(t, n, d, nota) {
      const k = el("div", "kpi"); k.append(el("span", null, t), el("b", null, d ? `${n}/${d}` : "—"), el("small", null, `${d ? Math.round(100 * n / d) + ' % · ' : ''}${nota}`)); return k;
    }
    function abrirAlumno(f, m) {
      if (proyectar) return;
      dlg.replaceChildren();
      const head = el("div", "dlg-head"); head.append(el("h2", null, f.a.nombre), btn("Cerrar", () => dlg.close())); dlg.append(head);
      const body = el("div", "dlg-body");
      body.append(el("p", "legend-note", `${fecha(alcance.desde)} – ${fecha(alcance.hasta)} · ${alcance.caso ? 'Caso ' + alcance.caso : 'Todos los casos'}`));
      const act = el("div", "row"); act.append(btn("Ficha completa", () => { dlg.close(); abrirFicha(f.a.id); }), btn("Escribir mensaje", () => { dlg.close(); escribirA(f.a.id); })); body.append(act);
      const respuestas = card("Razonamiento y retroalimentación");
      if (!f.resp.length) respuestas.append(el("p", "empty", "Sin respuestas abiertas en el periodo."));
      const porPregunta = new Map(); f.resp.forEach((r) => { const k = `${r.caso}|${r.pregunta}`; if (!porPregunta.has(k)) porPregunta.set(k, []); porPregunta.get(k).push(r); });
      porPregunta.forEach((rs) => { const bloque = el("div", "tablero-respuesta"); bloque.append(el("h3", null, `${rs[0].caso} · ${texto(rs[0].pregunta)}`));
        [rs[0], ...(rs.length > 1 ? [rs.at(-1)] : [])].forEach((r, i) => { bloque.append(el("b", null, i ? "Respuesta más reciente" : "Respuesta inicial del periodo"), el("p", null, r.texto), el("small", "muted", r.modelo ? `Nivel ${r.nivel ?? 'sin nivel'} · ${r.retro || 'Sin comentario'}` : "Sin evaluación docente")); }); respuestas.append(bloque); }); body.append(respuestas);
      const intentos = card("Intentos de retos");
      if (errorIntentos) intentos.append(el("p", "empty", "Evaluación de intentos no disponible."));
      else if (!f.ints.length) intentos.append(el("p", "empty", "Sin intentos evaluables en el periodo."));
      f.ints.forEach((i) => intentos.append(el("p", "legend-note", `${texto(i.reto)} · intento ${i.intento} · ${i.respuesta} · ${i.acierto ? 'Acierto' : 'Por revisar'}`))); body.append(intentos);
      const recorrido = card("Recorrido de la clase"), ol = el("ol", "timeline");
      f.ev.slice().reverse().slice(0, 100).forEach((e) => { const li = el("li"); li.append(el("time", null, fecha(e.creado)), el("i"), el("span", null, `${texto(e.tipo)} · ${texto(e.seccion || e.caso)}`)); ol.append(li); });
      if (!f.ev.length) ol.append(el("li", "empty", "Sin eventos en el periodo.")); recorrido.append(ol); if (f.ev.length > 100) recorrido.append(el("p", "legend-note", "Se muestran los 100 eventos más recientes.")); body.append(recorrido); dlg.append(body); if (!dlg.open) dlg.showModal();
    }
    function matriz(m) {
      const c = card("Alumno × actividad", "Visita registrada ≠ comprensión. Selecciona una celda para ver la evidencia.");
      if (!m.filas.length) { c.append(el("p", "empty", "No hay alumnos en este grupo.")); return c; }
      const actividades = m.casos.flatMap((cas) => [
        ...(cas.secciones || []).map((s) => ({ caso: cas.id, id: s, tipo: "seccion", nombre: `${cas.id} · ${texto(s)}` })),
        ...[...new Set([...m.retos.filter((r) => r.caso === cas.id).map((r) => r.reto), ...m.intentos.filter((i) => i.caso === cas.id).map((i) => i.reto)])].map((r) => ({ caso: cas.id, id: r, tipo: "reto", nombre: `${cas.id} · ${texto(r)}` })),
        { caso: cas.id, tipo: "completo", nombre: `${cas.id} · Entrega` },
      ]);
      const wrap = el("div", "table-wrap tablero-matriz"), table = el("table", "tbl"), caption = el("caption", "sr-only", "Avance de cada alumno por actividad en el periodo seleccionado"); table.append(caption);
      const th = el("thead"), row = el("tr"); ["Alumno", ...actividades.map((a) => a.nombre), "Última señal"].forEach((t) => { const h = el("th", null, t); h.scope = "col"; row.append(h); }); th.append(row); table.append(th);
      const tb = el("tbody");
      m.filas.forEach((f) => { const tr = el("tr"), who = el("th"); who.scope = "row"; who.append(btn(f.a.nombre, () => abrirAlumno(f, m))); tr.append(who);
        actividades.forEach((a) => { let label = "— Sin registro", cls = "";
          if (a.tipo === "seccion" && f.ev.some((e) => e.caso === a.caso && e.tipo === "seccion" && e.seccion === a.id)) { label = "◉ Visitada"; cls = "visita"; }
          if (a.tipo === "completo" && f.ev.some((e) => e.caso === a.caso && e.tipo === "completo")) { label = "✓ Entregado"; cls = "acierto"; }
          if (a.tipo === "reto") { const is = f.porReto.get(`${a.caso}|${a.id}`) || []; if (is.length) { const ok = is.some((i) => i.acierto === true); label = ok ? "✓ Acertado" : `↻ ${is.length} intento(s)`; cls = ok ? "acierto" : "revisar"; } }
          const td = el("td"), b = btn(label, () => abrirAlumno(f, m), `tablero-celda ${cls}`); b.setAttribute("aria-label", `${f.a.nombre}, ${a.nombre}: ${label}`); td.append(b); tr.append(td);
        }); tr.append(el("td", "muted", f.ultima ? fecha(f.ultima) : "Sin registro")); tb.append(tr);
      }); table.append(tb); wrap.append(table); c.append(wrap); return c;
    }
    function dibujar() {
      if (!datos) return;
      const m = modelo(datos), n = m.filas.length; contenido.replaceChildren();
      proy.textContent = proyectar ? "Volver a vista docente" : "Proyectar sin nombres";
      status.textContent = `${fecha(alcance.desde)} – ${fecha(alcance.hasta)} · hora CDMX · actualizado ${fecha(actualizado)}${errorIntentos ? ' · Evaluación de retos no disponible: requiere activar la consulta de tableros.' : ''}${errorMensajes ? ' · Mensajes no disponibles.' : ''}`;
      const kpis = el("div", "kpis tablero-kpis"); kpis.append(indicador("Participación", m.participantes, n, "alumnos con actividad / alumnos del grupo"), indicador("Casos entregados", m.completos, n, "alumnos con todos los casos del filtro entregados"), indicador("Acierto al primer intento", m.aciertos, errorIntentos ? 0 : m.primeros.length, "primeros intentos de reto registrados en el periodo")); contenido.append(kpis);
      const grid = el("div", "grid2"), avance = card("Estado del grupo");
      barras(avance, [["Sin registro", n - m.participantes], ["En curso", m.participantes - m.completos], ["Entregado", m.completos]], n); grid.append(avance);
      const dist = card("Distribución de respuestas", "Última respuesta de cada alumno en el reto elegido; sin respuesta se cuenta por separado.");
      const [l, selector] = select("Reto o hipótesis"); const grupos = new Map();
      m.intentos.forEach((i) => { const k = `${i.caso}|${i.reto}`; if (!grupos.has(k)) grupos.set(k, []); grupos.get(k).push(i); });
      m.eventos.filter((e) => e.tipo === "hipotesis" && e.valor?.opcion).forEach((e) => { const k = `${e.caso}|hipotesis`; if (!grupos.has(k)) grupos.set(k, []); grupos.get(k).push({ ...e, respuesta: e.valor.opcion }); });
      const chart = el("div"); grupos.forEach((_, k) => selector.append(new Option(texto(k.replace("|", " · ")), k)));
      selector.value = grupos.has(distribucionSel) ? distribucionSel : selector.value;
      function dibujarDistribucion() { distribucionSel = selector.value; chart.replaceChildren(); const ult = new Map(); (grupos.get(selector.value) || []).forEach((i) => ult.set(i.usuario, i.respuesta)); const counts = new Map(); ult.forEach((v) => counts.set(v, (counts.get(v) || 0) + 1)); barras(chart, [...counts, ["Sin respuesta", n - ult.size]], n); }
      if (grupos.size) { selector.addEventListener("change", dibujarDistribucion); dist.append(l, chart); dibujarDistribucion(); }
      else dist.append(el("p", "empty", "Sin respuestas de retos o hipótesis en este periodo.")); grid.append(dist); contenido.append(grid);
      if (!proyectar) {
        contenido.append(matriz(m));
        const at = card("Atención", "Señales para revisar; no son diagnósticos de aprendizaje ni de conexión."); const ul = el("ul", "alerts");
        m.filas.filter((f) => f.errores || f.mensajes).forEach((f) => { const li = el("li"), d = el("div"); d.append(btn(f.a.nombre, () => abrirAlumno(f, m)), el("small", null, [f.errores ? `${f.errores} reto(s) con 3 o más intentos sin acierto en el periodo` : "", f.mensajes ? `${f.mensajes} mensaje(s) sin leer` : ""].filter(Boolean).join(" · "))); li.append(el("i", null, "!"), d); ul.append(li); });
        if (!ul.children.length) ul.append(el("li", "empty", errorIntentos || errorMensajes ? "Algunas señales no están disponibles." : "Sin señales de atención en la lectura actual.")); at.append(ul); contenido.append(at);
      }
      if (modo.value === "historial") {
        const hist = card("Actividad por día", "Alumnos distintos con actividad; días en hora de Ciudad de México."); const dias = [];
        for (let t = +alcance.desde; t < +alcance.hasta; t += DIA) dias.push(dia(t)); dias.push(dia(+alcance.hasta - 1));
        const items = [...new Set(dias)].map((d) => [d, m.filas.filter((f) => [...f.ev, ...f.resp].some((e) => dia(e.creado) === d)).length]); const chart = el("div", "tablero-dias");
        chart.setAttribute("role", "img"); chart.setAttribute("aria-label", `Actividad diaria: ${items.map(([d, v]) => `${d}: ${v} de ${n}`).join(", ")}`);
        items.forEach(([d, v]) => { const col = el("div", "tablero-dia"), rail = el("div", "tablero-dia-rail"), fill = el("i");
          fill.style.height = `${n ? 100 * v / n : 0}%`; rail.append(fill); col.title = `${d}: ${v} de ${n} alumnos`;
          const label = el("small", null, d.slice(5)); col.append(rail, label); chart.append(col); });
        hist.append(chart); contenido.append(hist);
      }
      contenido.append(el("p", "legend-note", "Una visita no acredita dominio. La ausencia de eventos puede significar que el alumno escucha o trabaja fuera de la página. El periodo usa la hora de recepción del servidor; envíos tardíos pueden aparecer fuera de la clase."));
    }
    [modo, clase, caso, periodo].forEach((s) => s.addEventListener("change", () => { if (dlg.open) dlg.close(); cargar(); }));
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && auto.checked && visible()) cargar(); });
    setInterval(() => { if (auto.checked && visible() && document.visibilityState === "visible" && !document.querySelector("dialog[open]") && !actualizarBtn.disabled) cargar(); }, 30000);
    return {
      actualizar() { filtros(); const actual = `${estado().grupoSel}|${modo.value}|${clase.value}|${caso.value}|${periodo.value}`; if (actual !== firma || !datos || visible()) { if (dlg.open) dlg.close(); if (visible()) cargar(); } },
      limpiar() { generacion++; datos = null; firma = ""; contenido.replaceChildren(); if (dlg.open) dlg.close(); },
    };
  }
  window.TDDTableros = { crear, modelo };
})();
