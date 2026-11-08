// Pestañas «Store» y «Clases grabadas» del área del alumno, y los adornos del Top 5.
// La base decide todo (esquema 0.16): saldo, precios, existencias, si puedes canjear y qué enlace recibes.
// Gastar bits no cambia el ranking: el marcador usa los bits ganados; la Store, el saldo.
(function () {
  const { rpc } = TDD;
  const TZ = "America/Mexico_City";
  const $ = (s) => document.querySelector(s);
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const num = (n) => Number(n || 0).toLocaleString("es-MX");
  const fecha = (iso) => new Date(iso).toLocaleDateString("es-MX", { timeZone: TZ, day: "numeric", month: "short", year: "numeric" });
  const fechaLarga = (iso) => new Date(iso).toLocaleString("es-MX", { timeZone: TZ, weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", hour12: false });

  const CATEGORIAS = [["", "Todo"], ["carrera", "Carrera"], ["contenido", "Contenido exclusivo"], ["influencia", "Influye en el curso"], ["cosmetico", "Cosméticos 8 bits"], ["studio", "Augmented Studio"]];
  // Colores del alias: nombres de la base → variables de design/tokens (y si el texto va claro u oscuro encima).
  const COLORES = {
    comal: ["Comal", "--tq-comal", "oscuro"], anil: ["Añil", "--tq-anil", "claro"], rosa: ["Rosa", "--tq-rosa", "oscuro"],
    salsa: ["Salsa", "--tq-salsa", "claro"], vidrio: ["Vidrio", "--tq-vidrio", "oscuro"], oro: ["Oro", "--tq-oro", "oscuro"], morado: ["Morado", "--tq-morado-claro", "claro"],
  };
  // Doce avatares de 8 × 8 píxeles. Cada letra es un color de la paleta de la Taquería (. = transparente).
  const PALETA = { k: "--tq-noche", c: "--tq-comal", r: "--tq-salsa", p: "--tq-piel", b: "--tq-cafe", m: "--tq-madera", a: "--tq-anil", v: "--tq-vidrio", w: "--tq-crema", o: "--tq-oro", g: "--tq-gris", s: "--tq-rosa", l: "--tq-luz", n: "--tq-negro" };
  const AVATARES = {
    a01: ["Taquero", "..wwww..|.wwwwww.|..pppp..|.pkppkp.|..pppp..|.rrrrrr.|rrwrrwrr|.rr..rr."],
    a02: ["Detective", "..bbbb..|.bbbbbb.|bbbbbbbb|..pppp..|.pnppnp.|..pppp..|.gggggg.|gg.gg.gg"],
    a03: ["Robot", "...oo...|.vvvvvv.|.vkvvkv.|.vvvvvv.|..vvvv..|avvvvvva|.a.vv.a.|..a..a.."],
    a04: ["Gato", "k......k|kk....kk|kkkkkkkk|kckkkkck|kkkkkkkk|.kksskk.|..kkkk..|.k.kk.k."],
    a05: ["Astronauta", "..wwww..|.wvvvvw.|.wvkkvw.|.wvvvvw.|..wwww..|.wwrrww.|.wwwwww.|.ww..ww."],
    a06: ["Hongo", "..rrrr..|.rwrrwr.|rrrrrrrr|rwrrrrwr|..pppp..|..pkkp..|..pppp..|...pp..."],
    a07: ["Búho", ".m....m.|.mmmmmm.|mwwmmwwm|mwkmmkwm|mmmccmmm|.mmmmmm.|.mmmmmm.|..c..c.."],
    a08: ["Fantasma", "..wwww..|.wwwwww.|wwkwwkww|wwwwwwww|wwwkkwww|wwwwwwww|wwwwwwww|w.ww.ww."],
    a09: ["Cactus", "...cc...|..aaaa..|a.aaaa.a|aaaaaaaa|..aaaa..|..aaaa..|.mmmmmm.|..mmmm.."],
    a10: ["Corona", "o..o..o.|oo.oo.oo|oooooooo|osoosooo|oooooooo|........|........|........"],
    a11: ["Calavera", "..wwww..|.wwwwww.|wkkwwkkw|wkkwwkkw|wwwkkwww|.wwwwww.|..w.w.w.|........"],
    a12: ["Rayo", "....ll..|...ll...|..ll....|.llllll.|....ll..|...ll...|..ll....|.l......"],
  };

  const S = { datos: null, tienda: null, filtro: "", cargando: null, adornosGrupo: null, articulo: null, marcador: null };

  // ---------- Piezas visuales ----------
  function sprite(id, tam = 32) {
    const ns = "http://www.w3.org/2000/svg", svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 8 8"); svg.setAttribute("width", tam); svg.setAttribute("height", tam);
    svg.setAttribute("class", "sprite"); svg.setAttribute("aria-hidden", "true"); svg.setAttribute("shape-rendering", "crispEdges");
    ((AVATARES[id] || [])[1] || "").split("|").forEach((fila, y) => [...fila].forEach((c, x) => {
      if (!PALETA[c]) return;
      const r = document.createElementNS(ns, "rect");
      r.setAttribute("x", x); r.setAttribute("y", y); r.setAttribute("width", 1); r.setAttribute("height", 1); r.style.fill = `var(${PALETA[c]})`;
      svg.append(r);
    }));
    return svg;
  }
  // Alias con sus adornos (color, avatar, título). Lo usan el Top 5, la cabecera de la Store y las vistas previas.
  function aliasCon(alias, ad = {}) {
    const w = el("span", "alias-ad");
    if (ad.avatar) w.append(sprite(ad.avatar, 20));
    const nombre = el("span", "alias-nombre", alias || "Participante");
    if (ad.color && COLORES[ad.color]) {
      nombre.classList.add("pintado", COLORES[ad.color][2] === "claro" ? "texto-claro" : "texto-oscuro");
      nombre.style.setProperty("--alias-color", `var(${COLORES[ad.color][1]})`);
    }
    w.append(nombre);
    if (ad.titulo) w.append(el("span", "alias-titulo", `Resolvió ${ad.titulo}`));
    return w;
  }
  function aplicarTema(ad) { document.body.classList.toggle("tema-pixel", !!(ad && ad.tema)); }

  // ---------- Top 5 con adornos ----------
  async function decorarTop5() {
    if (!S.adornosGrupo) S.adornosGrupo = rpc("adornos_grupo").then((f) => new Map((f || []).map((x) => [x.alias, x.adornos || {}]))).catch(() => new Map());
    const mapa = await S.adornosGrupo;
    document.querySelectorAll("#top5 li").forEach((li) => {
      const who = li.querySelector(".who"); if (!who || who.dataset.adornado) return;
      const alias = who.textContent, ad = mapa.get(alias);
      if (!ad) return;
      who.replaceChildren(aliasCon(alias, ad)); who.dataset.adornado = "1"; who.title = alias;
      li.classList.toggle("marco-pixel", !!ad.marco);
    });
  }
  document.addEventListener("tdd:marcador", (ev) => { S.marcador = ev.detail; decorarTop5(); });

  // ---------- Store ----------
  async function cargarTienda(forzar) {
    if (S.cargando && !forzar) return S.cargando;
    S.cargando = rpc("mi_tienda").then((t) => { S.tienda = t; return t; });
    return S.cargando;
  }

  function pintarCabecera(t) {
    $("#storeSaldo").textContent = num(t.saldo);
    $("#storeGanados").textContent = num(t.ganados);
    $("#storeGastado").textContent = num(t.gastado);
    const yo = $("#storeYo"); yo.replaceChildren(aliasCon((S.marcador && S.marcador.alias) || "Tú", t.adornos || {}));
    const nota = $("#storeNota");
    if (!t.puede) nota.textContent = t.cerrada || "La Store no está disponible para tu cuenta.";
    else nota.textContent = `Vas en la clase ${t.clase || 0}. Algunos artículos se abren más adelante.${t.cierre ? ` Puedes canjear hasta el ${fecha(`${t.cierre}T12:00:00`)}.` : ""}`;
    aplicarTema(t.adornos);
  }

  function pintarMetas(t) {
    const m = t.metas || {}, lista = m.lista || [], sec = $("#storeMetas");
    sec.hidden = !lista.length; if (!lista.length) return;
    $("#metasNota").textContent = `Promedio de bits ganados en tu grupo: ${num(m.promedio)}. Si llegan a la meta, todo el grupo recibe el premio. Gastar no los aleja.`;
    const ol = $("#metasLista"); ol.replaceChildren();
    const tope = Math.max(...lista.map((x) => x.umbral));
    lista.forEach((x) => {
      const li = el("li", x.alcanzada ? "ok" : "");
      const barra = el("div", "meta-barra"), relleno = el("i");
      relleno.style.width = `${Math.min(100, (m.promedio / x.umbral) * 100)}%`; barra.append(relleno);
      const txt = el("div", "meta-txt"); txt.append(el("b", null, x.premio), el("small", null, x.alcanzada ? "¡Desbloqueado!" : `Promedio de ${num(x.umbral)} bits · faltan ${num(Math.max(0, x.umbral - m.promedio))}`));
      li.append(txt, barra); li.style.setProperty("--peso", String(x.umbral / tope)); ol.append(li);
    });
  }

  function pintarFiltros() {
    const cont = $("#storeFiltros"); if (cont.childElementCount) return;
    CATEGORIAS.forEach(([k, t]) => {
      const b = el("button", "chip-filtro", t); b.type = "button"; b.dataset.cat = k; b.setAttribute("aria-pressed", String(k === S.filtro));
      b.addEventListener("click", () => { S.filtro = k; cont.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.cat === k))); pintarGrid(S.tienda); });
      cont.append(b);
    });
  }

  const ETIQ_CAT = Object.fromEntries(CATEGORIAS);
  function pintarGrid(t) {
    const grid = $("#storeGrid"); grid.replaceChildren();
    const lista = (t.articulos || []).filter((a) => !S.filtro || a.categoria === S.filtro);
    lista.forEach((a) => {
      const card = el("article", `item cat-${a.categoria}${a.motivo ? " bloqueado" : ""}`);
      const top = el("div", "item-top");
      top.append(el("span", "item-cat", ETIQ_CAT[a.categoria] || a.categoria), el("span", "item-precio", `${num(a.precio)} bits`));
      card.append(top, vistaPrevia(a), el("h3", null, a.nombre), el("p", "item-desc", a.descripcion));
      const meta = el("p", "item-meta");
      if (a.existencias != null) meta.append(el("span", a.restantes ? "" : "agotado", a.por_clase ? `Quedan ${a.restantes} de ${a.existencias} para la próxima clase` : `Quedan ${a.restantes} de ${a.existencias}`));
      if (a.desde_clase > (t.clase || 0)) meta.append(el("span", null, `Desde la clase ${a.desde_clase}`));
      if (meta.childElementCount) card.append(meta);
      const pie = el("div", "item-pie");
      const sinOpcion = a.requiere_caso && !(a.casos || []).filter((c) => !(a.mios || []).some((m) => m.caso === c.id)).length;
      const motivo = a.motivo || (a.requiere_caso && sinOpcion ? (a.casos && a.casos.length ? "Ya lo tienes para tus casos completos" : "Completa un caso para canjearlo") : null)
        || (a.opciones && a.opciones.length && !a.opciones.some((o) => !(a.mios || []).some((m) => m.eleccion === o)) ? "Ya tienes todas las opciones" : null);
      if (motivo) pie.append(el("span", "item-motivo", motivo));
      else { const b = el("button", "btn btn-accent btn-sm", "Canjear"); b.type = "button"; b.addEventListener("click", () => abrirCanje(a)); pie.append(b); }
      card.append(pie); grid.append(card);
    });
    if (!lista.length) grid.append(el("p", "store-vacia", "No hay artículos en esta categoría todavía."));
  }

  function vistaPrevia(a) {
    const v = el("div", "item-visual");
    if (a.adorno === "color") { (a.opciones || []).slice(0, 7).forEach((o) => { const sw = el("i", "swatch"); if (COLORES[o]) sw.style.background = `var(${COLORES[o][1]})`; v.append(sw); }); }
    else if (a.adorno === "avatar") ["a01", "a03", "a07", "a04"].forEach((id) => v.append(sprite(id, 28)));
    else if (a.adorno === "marco") v.append(el("span", "marco-demo", "1"));
    else if (a.adorno === "titulo") v.append(el("span", "alias-titulo", "Resolvió Semmelweis"));
    else if (a.adorno === "tema") v.append(el("span", "tema-demo"));
    else v.append(el("span", `icono-cat icono-${a.categoria}`));
    return v;
  }

  function campo(etiqueta, control, nota) {
    const l = el("label", "canje-campo"); l.append(el("span", null, etiqueta), control); if (nota) l.append(el("small", null, nota)); return l;
  }
  function abrirCanje(a) {
    S.articulo = a;
    const t = S.tienda, cont = $("#canjeCampos"); cont.replaceChildren();
    $("#canjeKicker").textContent = `${ETIQ_CAT[a.categoria] || "Store"} · ${num(a.precio)} bits`;
    $("#canjeTitle").textContent = a.nombre; $("#canjeDesc").textContent = a.descripcion;
    if (a.requiere_caso) {
      const sel = el("select"); sel.name = "caso"; sel.required = true;
      (a.casos || []).filter((c) => !(a.mios || []).some((m) => m.caso === c.id)).forEach((c) => sel.append(new Option(`Caso ${c.id} · ${c.titulo}`, c.id)));
      cont.append(campo("¿De qué caso?", sel, "Solo aparecen los casos que ya completaste."));
    }
    if (a.opciones && a.opciones.length) {
      const grupo = el("div", `opciones op-${a.adorno || "lista"}`); grupo.setAttribute("role", "radiogroup"); grupo.setAttribute("aria-label", "Elige una opción");
      let primero = true;
      a.opciones.forEach((o) => {
        const ya = (a.mios || []).some((m) => m.eleccion === o);
        const l = el("label", `opcion${ya ? " ya" : ""}`), r = el("input"); r.type = "radio"; r.name = "eleccion"; r.value = o; r.disabled = ya; r.required = true;
        if (!ya && primero) { r.checked = true; primero = false; }
        if (a.adorno === "color" && COLORES[o]) { const sw = el("i", "swatch"); sw.style.background = `var(${COLORES[o][1]})`; l.append(r, sw, el("span", null, COLORES[o][0] + (ya ? " · ya es tuyo" : ""))); }
        else if (a.adorno === "avatar") { l.append(r, sprite(o, 40), el("span", null, (AVATARES[o] || [o])[0])); l.title = ya ? "Ya es tuyo" : (AVATARES[o] || [o])[0]; }
        else l.append(r, el("span", null, o + (ya ? " · ya votaste" : "")));
        grupo.append(l);
      });
      cont.append(grupo);
    }
    if (a.pide_texto) {
      const ta = el("textarea"); ta.name = "texto"; ta.rows = 3; ta.maxLength = 500; ta.required = true; ta.minLength = 3;
      cont.append(campo(a.pide_texto, ta, a.entrega === "manual" ? "Lo recibe tu profesor junto con tu canje." : null));
    }
    const queda = t.saldo - a.precio;
    $("#canjeCuenta").replaceChildren(document.createTextNode("Tu saldo pasa de "), el("b", null, `${num(t.saldo)}`), document.createTextNode(" a "), el("b", null, `${num(queda)} bits`), document.createTextNode("."));
    $("#canjeMsg").textContent = a.entrega === "manual" ? "Tu profesor te contacta para entregártelo." : a.entrega === "archivo" ? "Recibes el enlace en cuanto canjeas." : "Se aplica al momento.";
    $("#canjeMsg").className = "fine";
    $("#canjeOk").disabled = false; $("#canjeOk").textContent = `Canjear por ${num(a.precio)} bits`;
    $("#canjeForm").dataset.id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2);
    $("#dlgCanje").showModal();
  }
  $("#canjeCerrar").addEventListener("click", () => $("#dlgCanje").close());
  $("#canjeForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const f = ev.currentTarget, a = S.articulo, b = $("#canjeOk"), msg = $("#canjeMsg");
    if (!f.reportValidity() || b.disabled) return;
    b.disabled = true; msg.className = "fine"; msg.textContent = "Canjeando…";
    try {
      const r = await rpc("canjear", { p_articulo: a.id, p_id_cliente: f.dataset.id, p_caso: f.caso ? f.caso.value : null,
        p_eleccion: f.querySelector("[name=eleccion]:checked")?.value || null, p_texto: f.texto ? f.texto.value : null });
      $("#dlgCanje").close();
      S.adornosGrupo = null;
      await refrescarTienda();
      avisoStore(r.url ? "Listo. Tu enlace está en «Lo que has canjeado»." : a.entrega === "manual" ? "Listo. Tu profesor ya lo ve en su panel y te contactará." : "Listo. Ya se aplicó.", false);
      if (r.url) window.open(r.url, "_blank", "noopener");
      if (a.categoria === "cosmetico") document.querySelectorAll("#top5 .who").forEach((w) => { delete w.dataset.adornado; });
      decorarTop5();
    } catch (e) {
      msg.className = "fine is-error"; msg.textContent = e.message && !/^HTTP/.test(e.message) ? e.message : "No se pudo canjear. Intenta de nuevo.";
      b.disabled = false;
    }
  });

  function avisoStore(texto, error) {
    const n = $("#storeError"); n.hidden = !texto; n.className = `notice ${error ? "is-error" : "is-ok"}`; n.textContent = texto || "";
  }

  const ESTADOS = { pendiente: ["Pendiente de entregar", "pend"], entregado: ["Entregado", "ok"], anulado: ["Anulado · saldo devuelto", "anul"] };
  function pintarMios(t) {
    const ul = $("#storeMios"); ul.replaceChildren();
    (t.canjes || []).forEach((c) => {
      const li = el("li", `mio est-${c.estado}`), info = el("div", "mio-info");
      let titulo = c.nombre;
      if (c.adorno === "color" && COLORES[c.eleccion]) titulo += ` · ${COLORES[c.eleccion][0]}`;
      else if (c.adorno === "avatar") titulo += ` · ${(AVATARES[c.eleccion] || [c.eleccion])[0]}`;
      else if (c.eleccion) titulo += ` · ${c.eleccion}`;
      if (c.caso) titulo += ` · Caso ${c.caso}`;
      info.append(el("b", null, titulo), el("small", null, `${fecha(c.creado)} · ${num(c.precio)} bits${c.nota ? ` · ${c.nota}` : ""}`));
      if (c.texto) info.append(el("small", "mio-texto", `«${c.texto}»`));
      const acc = el("div", "mio-acc");
      const [et, cls] = ESTADOS[c.estado] || [c.estado, ""];
      if (c.url) { const a = el("a", "btn btn-line btn-sm", "Abrir"); a.href = c.url; a.target = "_blank"; a.rel = "noopener"; acc.append(a); }
      if (c.adorno && c.estado !== "anulado") {
        const puesto = !!c.puesto;
        const b = el("button", "btn btn-line btn-sm", puesto ? "Quitármelo" : "Ponérmelo"); b.type = "button";
        b.addEventListener("click", async () => {
          b.disabled = true;
          try { await rpc("equipar_adorno", { p_tipo: c.adorno, p_canje: puesto ? null : c.id }); S.adornosGrupo = null; await refrescarTienda();
            document.querySelectorAll("#top5 .who").forEach((w) => { delete w.dataset.adornado; }); decorarTop5(); }
          catch (e) { avisoStore(e.message, true); b.disabled = false; }
        });
        acc.append(b);
      } else if (!c.url) acc.append(el("span", `pill-est ${cls}`, et));
      li.append(info, acc); ul.append(li);
    });
    if (!(t.canjes || []).length) ul.append(el("li", "vacio", "Aún no canjeas nada. Tus bits se quedan contigo hasta que decidas."));
  }

  async function refrescarTienda() {
    try {
      const t = await cargarTienda(true);
      if (!t || !t.inscrito) { avisoStore("La Store es para alumnos inscritos en una generación.", true); return; }
      pintarCabecera(t); pintarMetas(t); pintarFiltros(); pintarGrid(t); pintarMios(t);
    } catch (e) {
      avisoStore(/mi_tienda|function|404|PGRST/i.test(`${e.message} ${e.code}`) ? "La Store se activa cuando tu profesor actualice la base del curso. Vuelve pronto." : "No pudimos cargar la Store. Recarga la página para intentar de nuevo.", true);
    }
  }

  // ---------- Clases grabadas ----------
  function drivePreview(u) {
    const m = /drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]{10,})/.exec(u || "");
    return m ? `https://drive.google.com/file/d/${m[1]}/preview` : null;
  }
  function pintarGrabadas() {
    const lista = (S.datos && S.datos.clases) || [], ahora = new Date();
    const q = $("#grabadasBuscar").value.trim().toLowerCase();
    const ol = $("#grabadasLista"); ol.replaceChildren();
    const pasadas = lista.filter((k) => new Date(k.fin) < ahora).reverse()
      .filter((k) => !q || `clase ${k.numero} ${k.tema} ${k.caso || ""}`.toLowerCase().includes(q));
    const futuras = lista.filter((k) => new Date(k.fin) >= ahora).length;
    const listas = lista.filter((k) => new Date(k.fin) < ahora && k.grabacion_url).length;
    $("#grabadasNota").textContent = lista.length
      ? `${listas === 1 ? "1 grabación lista" : `${listas} grabaciones listas`}${futuras ? ` · ${futuras === 1 ? "falta 1 clase" : `faltan ${futuras} clases`}` : ""}. Cada una se queda 12 meses desde la fecha de su clase.`
      : "Cuando empiecen las clases de tu generación, aquí aparece cada grabación al terminar.";
    pasadas.forEach((k) => {
      const li = el("li", `grabada${k.grabacion_url ? "" : " sin"}`);
      const num_ = el("span", "grabada-n", String(k.numero));
      const info = el("div", "grabada-info");
      info.append(el("b", null, k.tema), el("small", null, `${fecha(k.inicio)}${k.caso ? ` · Caso ${k.caso}` : ""}${k.grabacion_url ? ` · disponible hasta el ${fecha(k.grabacion_hasta)}` : ""}`));
      li.append(num_, info);
      if (k.grabacion_url) {
        const b = el("button", "btn btn-accent btn-sm", "Ver aquí"); b.type = "button"; b.addEventListener("click", () => reproducir(k));
        const a = el("a", "btn btn-line btn-sm", "Drive"); a.href = k.grabacion_url; a.target = "_blank"; a.rel = "noopener"; a.setAttribute("aria-label", `Abrir la clase ${k.numero} en Google Drive`);
        const acc = el("div", "grabada-acc"); acc.append(b, a); li.append(acc);
      } else li.append(el("span", "pend", new Date(k.grabacion_hasta) < ahora ? "Ya no disponible" : "Grabación en proceso"));
      ol.append(li);
    });
    if (!pasadas.length) ol.append(el("li", "vacio", q ? "Ninguna clase coincide con tu búsqueda." : "Después de tu primera clase, aquí aparece su grabación."));
  }
  function reproducir(k) {
    const marco = $("#playerMarco"), prev = drivePreview(k.grabacion_url);
    marco.replaceChildren();
    if (prev) {
      const f = el("iframe"); f.src = prev; f.allow = "autoplay; fullscreen"; f.allowFullscreen = true; f.title = `Grabación de la clase ${k.numero}`; f.loading = "lazy";
      marco.append(f);
    } else marco.append(el("p", "player-sin", "Esta grabación se abre en Google Drive."));
    $("#playerKicker").textContent = `Clase ${k.numero} · ${fechaLarga(k.inicio)}`;
    $("#playerTitulo").textContent = k.tema + (k.caso ? ` · Caso ${k.caso}` : "");
    $("#playerNota").textContent = "Si no carga, entra con el mismo Gmail del curso o ábrela en Drive.";
    $("#playerDrive").href = k.grabacion_url;
    $("#grabadasPlayer").hidden = false;
    $("#grabadasPlayer").scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $("#grabadasBuscar").addEventListener("input", pintarGrabadas);

  // ---------- Arranque ----------
  document.addEventListener("tdd:datos", (ev) => {
    S.datos = ev.detail;
    if (S.datos.docente) { $("#tabStore").hidden = true; }  // las cuentas del equipo no compran
    else cargarTienda().then((t) => { if (t && t.inscrito) { aplicarTema(t.adornos); } }).catch(() => {});
    pintarGrabadas();
  });
  document.addEventListener("tdd:pestana", (ev) => {
    if (ev.detail === "store") refrescarTienda();
    if (ev.detail === "clases") pintarGrabadas();
  });
})();
