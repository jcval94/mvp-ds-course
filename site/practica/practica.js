/* practica.js — práctica tipo Duolingo con micro-casos (alumno) · The Agentic Data Scientist
   La página nunca conoce las claves: practica_sesion() entrega los micro-casos sin respuesta y practica_responder()
   califica en la base y regresa el resultado, la clave y la explicación. Las reglas (nivel por hábito, repaso
   espaciado, tope de 15 bits por semana) viven en la base (esquema 0.15). window.Micro también lo usa vivo.html. */
(function () {
  'use strict';

  const HABITOS = {
    faltan: '¿Qué falta en mis datos?', mide: '¿Qué mide este número?', verificar: '¿Cómo lo verifico?',
    comparar: '¿Contra qué lo comparo?', decision: '¿Qué decisión cambia?', simple: '¿Alcanza con algo simple?',
    incertidumbre: '¿Cuánto me puedo equivocar?', fuera: '¿Funciona fuera de mis datos?', quien: '¿Quién paga el error?',
    firmar: '¿Quién firma la decisión?'
  };
  // Textos en letra pixel sin acentos en mayúscula: la fuente Press Start 2P no los trae.
  const CORTO = { faltan: 'QUE FALTA', mide: 'QUE MIDE', verificar: 'VERIFICAR', comparar: 'COMPARAR', decision: 'DECISION',
    simple: 'SIMPLE', incertidumbre: 'INCERTIDUMBRE', fuera: 'FUERA DE MUESTRA', quien: 'QUIEN PAGA', firmar: 'FIRMAR' };
  const TIPOS = { opcion: 'ELIGE', vf: 'VERDADERO O FALSO', numero: 'CALCULA', orden: 'ORDENA', error: 'ENCUENTRA EL ERROR', pares: 'EMPAREJA' };

  const el = (tag, cls, txt) => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; };
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16)));

  /* ---------- Renderizadores: cada tipo devuelve { valor(), mostrar(clave), bloquear() } ---------- */
  function radios(zona, items, alCambiar, clase) {
    const grupo = el('div', clase || 'zona'); grupo.setAttribute('role', 'radiogroup');
    let elegido = null;
    const botones = items.map((it, k) => {
      const b = el('button', it.cls || 'op'); b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('aria-checked', 'false');
      if (it.k) { const s = el('span', 'k', it.k); s.setAttribute('aria-hidden', 'true'); b.appendChild(s); }
      b.appendChild(el('span', null, it.texto));
      b.addEventListener('click', () => { elegido = k; botones.forEach((x, j) => x.setAttribute('aria-checked', String(j === k))); alCambiar(); });
      grupo.appendChild(b); return b;
    });
    zona.appendChild(grupo);
    return { botones, elegido: () => elegido, elegir: (k) => botones[k] && botones[k].click() };
  }

  const R = {
    opcion(item, zona, cambio) {
      const ops = item.contenido.opciones || [];
      const r = radios(zona, ops.map((o, k) => ({ texto: o.texto, k: String(k + 1) })), cambio);
      return {
        teclas: (k) => r.elegir(k),
        valor: () => r.elegido() == null ? null : { i: ops[r.elegido()].i },
        mostrar(clave) { r.botones.forEach((b, k) => { b.disabled = true; if (ops[k].i === clave.i) b.classList.add('correcta'); else if (k === r.elegido()) b.classList.add('incorrecta'); }); },
        texto: (clave) => (ops.find((o) => o.i === clave.i) || {}).texto
      };
    },
    vf(item, zona, cambio) {
      const r = radios(zona, [{ texto: 'VERDADERO' }, { texto: 'FALSO' }], cambio, 'vf');
      return {
        teclas: (k) => r.elegir(k),
        valor: () => r.elegido() == null ? null : { v: r.elegido() === 0 },
        mostrar(clave) { r.botones.forEach((b, k) => { b.disabled = true; if ((k === 0) === clave.v) b.classList.add('correcta'); else if (k === r.elegido()) b.classList.add('incorrecta'); }); },
        texto: (clave) => clave.v ? 'Verdadero' : 'Falso'
      };
    },
    numero(item, zona, cambio) {
      const fila = el('div', 'numero');
      const inp = el('input'); inp.type = 'text'; inp.inputMode = 'decimal'; inp.autocomplete = 'off'; inp.setAttribute('aria-label', 'Tu respuesta');
      inp.placeholder = 'Tu número';
      inp.addEventListener('input', cambio);
      fila.appendChild(inp);
      const u = (item.contenido || {}).unidad; if (u) fila.appendChild(el('span', 'unidad', u));
      zona.appendChild(fila);
      // Calculadora 8 bits, opcional.
      const abrir = el('button', 'btn sec', 'CALCULADORA'); abrir.type = 'button'; abrir.setAttribute('aria-expanded', 'false');
      const calc = el('div', 'calc'); calc.hidden = true;
      const pant = el('div', 'pantalla', '0'); pant.setAttribute('aria-live', 'polite'); calc.appendChild(pant);
      let expr = '';
      '7 8 9 ÷ 4 5 6 × 1 2 3 − 0 . = +'.split(' ').concat(['C', '←', 'USAR']).forEach((t) => {
        const b = el('button', null, t); b.type = 'button';
        if (t === 'USAR') { b.style.gridColumn = 'span 2'; }
        b.addEventListener('click', () => {
          if (t === 'C') expr = '';
          else if (t === '←') expr = expr.slice(0, -1);
          else if (t === '=') expr = evaluar(expr);
          else if (t === 'USAR') { const v = evaluar(expr); if (v !== 'ERROR' && v !== '') { inp.value = v; cambio(); } return; }
          else expr += t;
          pant.textContent = expr || '0';
        });
        calc.appendChild(b);
      });
      abrir.addEventListener('click', () => { calc.hidden = !calc.hidden; abrir.setAttribute('aria-expanded', String(!calc.hidden)); });
      zona.appendChild(abrir); zona.appendChild(calc);
      setTimeout(() => inp.focus(), 50);
      return {
        valor: () => { const t = inp.value.trim().replace(/\s/g, ''); return /^-?[0-9]+([.,][0-9]+)?$/.test(t.replace(/,(?=\d{3}\b)/g, '')) ? { n: t.replace(/,(?=\d{3}\b)/g, '') } : null; },
        mostrar(clave, ok) { inp.disabled = true; inp.style.borderColor = ok ? 'var(--anil)' : 'var(--salsa)'; abrir.hidden = true; calc.hidden = true; },
        texto: (clave) => String(clave.n).replace('.', '.') + (u ? ' ' + u : '')
      };
    },
    orden(item, zona, cambio) {
      const pasos = item.contenido.pasos || [];
      const linea = el('div', 'linea'); linea.setAttribute('aria-label', 'Tu orden');
      const banco = el('div', 'banco');
      let puestos = [];
      function pintar() {
        linea.innerHTML = ''; banco.innerHTML = '';
        puestos.forEach((id, k) => {
          const p = pasos.find((x) => x.id === id);
          const b = el('button', 'ficha sel'); b.type = 'button';
          b.appendChild(el('span', 'n', String(k + 1))); b.appendChild(el('span', null, p.texto));
          b.setAttribute('aria-label', 'Paso ' + (k + 1) + ': ' + p.texto + '. Tocar para quitarlo');
          b.addEventListener('click', () => { puestos = puestos.filter((x) => x !== id); pintar(); cambio(); });
          linea.appendChild(b);
        });
        pasos.filter((p) => puestos.indexOf(p.id) < 0).forEach((p) => {
          const b = el('button', 'ficha'); b.type = 'button'; b.appendChild(el('span', null, p.texto));
          b.setAttribute('aria-label', 'Agregar: ' + p.texto);
          b.addEventListener('click', () => { puestos.push(p.id); pintar(); cambio(); });
          banco.appendChild(b);
        });
      }
      zona.appendChild(linea); zona.appendChild(el('p', 'nota', 'Toca un paso para ponerlo en el siguiente lugar; tócalo otra vez para quitarlo.')); zona.appendChild(banco);
      pintar();
      return {
        valor: () => puestos.length === pasos.length ? { orden: puestos.slice() } : null,
        mostrar(clave) {
          [...linea.children].forEach((b, k) => { b.disabled = true; b.classList.add(puestos[k] === clave.orden[k] ? 'correcta' : 'incorrecta'); });
        },
        texto: (clave) => clave.orden.map((id, k) => (k + 1) + '. ' + (pasos.find((p) => p.id === id) || {}).texto).join('  ')
      };
    },
    error(item, zona, cambio) {
      const partes = item.contenido.partes || [];
      const caja = el('div', 'reporte');
      caja.appendChild(el('span', 'sello-mini', 'BORRADOR DEL ASISTENTE'));
      zona.appendChild(caja);
      const r = radios(caja, partes.map((p) => ({ texto: p, cls: 'parte' })), cambio, 'zona');
      return {
        valor: () => r.elegido() == null ? null : { i: r.elegido() },
        mostrar(clave) { r.botones.forEach((b, k) => { b.disabled = true; if (k === clave.i) b.classList.add('correcta'); else if (k === r.elegido()) b.classList.add('incorrecta'); }); },
        texto: (clave) => '«' + partes[clave.i] + '»'
      };
    },
    pares(item, zona, cambio) {
      const izq = item.contenido.izquierda || [], der = item.contenido.derecha || [];
      const caja = el('div', 'pares'), ci = el('div', 'col'), cd = el('div', 'col');
      caja.appendChild(ci); caja.appendChild(cd); zona.appendChild(caja);
      zona.appendChild(el('p', 'nota', 'Toca uno de la izquierda y luego su pareja de la derecha.'));
      const pares = {}; let activo = null;
      const bi = izq.map((t, k) => { const b = el('button', 'ficha'); b.type = 'button'; b.dataset.k = k; b.appendChild(el('span', 'n', '·')); b.appendChild(el('span', null, t)); ci.appendChild(b); return b; });
      const bd = der.map((d) => { const b = el('button', 'ficha'); b.type = 'button'; b.dataset.id = d.id; b.appendChild(el('span', 'n', '·')); b.appendChild(el('span', null, d.texto)); cd.appendChild(b); return b; });
      function pintar() {
        let n = 0; const num = {};
        izq.forEach((_, k) => { if (pares[k] != null) num[k] = ++n; });
        bi.forEach((b, k) => { b.classList.toggle('sel', pares[k] != null || activo === k); b.querySelector('.n').textContent = num[k] || (activo === k ? '?' : '·');
          b.setAttribute('aria-pressed', String(activo === k)); });
        bd.forEach((b) => { const k = Object.keys(pares).find((x) => pares[x] === b.dataset.id); b.classList.toggle('sel', k != null); b.querySelector('.n').textContent = k != null ? num[k] : '·'; });
      }
      bi.forEach((b, k) => b.addEventListener('click', () => { if (pares[k] != null) { delete pares[k]; activo = null; } else activo = activo === k ? null : k; pintar(); cambio(); }));
      bd.forEach((b) => b.addEventListener('click', () => {
        const ya = Object.keys(pares).find((x) => pares[x] === b.dataset.id);
        if (ya != null) { delete pares[ya]; }
        if (activo != null) { pares[activo] = b.dataset.id; activo = null; }
        pintar(); cambio();
      }));
      pintar();
      return {
        valor: () => Object.keys(pares).length === izq.length ? { pares: Object.fromEntries(Object.entries(pares).map(([k, v]) => [String(k), v])) } : null,
        mostrar(clave) {
          bi.forEach((b, k) => { b.disabled = true; b.classList.add(pares[k] === clave.pares[String(k)] ? 'correcta' : 'incorrecta'); });
          bd.forEach((b) => { b.disabled = true; });
        },
        texto: (clave) => izq.map((t, k) => t + ' → ' + (der.find((d) => d.id === clave.pares[String(k)]) || {}).texto).join(' · ')
      };
    }
  };

  function evaluar(expr) {
    const limpio = String(expr).replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    if (!limpio) return '';
    if (!/^[0-9+\-*/. ()]+$/.test(limpio)) return 'ERROR';
    try {
      const v = Function('"use strict";return (' + limpio + ')')();
      if (!isFinite(v)) return 'ERROR';
      return String(Math.round(v * 10000) / 10000);
    } catch (_) { return 'ERROR'; }
  }

  function chips(caja, item) {
    caja.innerHTML = '';
    const a = el('span', 'chip', CORTO[item.habito] || item.habito); a.title = HABITOS[item.habito] || ''; caja.appendChild(a);
    caja.appendChild(el('span', 'chip', TIPOS[item.tipo] || item.tipo));
    caja.appendChild(el('span', 'chip', '★'.repeat(item.nivel) + '☆'.repeat(3 - item.nivel)));
    if (item.repaso) caja.appendChild(el('span', 'chip repaso', 'REPASO'));
  }

  window.Micro = { R, HABITOS, CORTO, TIPOS, el, uuid, chips };

  /* ---------- Aplicación del alumno (solo en practica/index.html) ---------- */
  if (!document.getElementById('vInicio')) return;
  const $ = (s) => document.querySelector(s);
  const vistas = ['vEntrar', 'vInicio', 'vJuego', 'vFin', 'vVivo'];
  const ver = (id) => { vistas.forEach((v) => { $('#' + v).hidden = v !== id; }); $('#pie').hidden = !(id === 'vJuego' || id === 'vVivo'); window.scrollTo(0, 0); };
  const S = { estado: null, sesion: null, items: [], i: 0, res: [], actual: null, comprobado: false, enviando: false, bits: 0 };
  const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function error(msg) { const e = $('#error'); e.textContent = msg; e.hidden = !msg; }
  function errorDe(e) {
    if (e && (e.message === 'sesion' || e.status === 401)) { TDD.olvidar(); ver('vEntrar'); return 'Tu sesión expiró. Vuelve a entrar con Google.'; }
    return (e && e.message) || 'No se pudo conectar. Revisa tu internet y vuelve a intentar.';
  }

  function pintarEstado(est) {
    S.estado = est;
    $('#racha').textContent = est.racha; $('#rachaTxt').textContent = est.racha === 1 ? 'día' : 'días';
    $('#bitsSemana').textContent = est.bits_semana; $('#tope').textContent = est.tope_semana;
    $('#repasos').textContent = est.repasos;
    const niv = $('#niveles'); niv.innerHTML = '';
    const habs = Object.keys(est.por_habito || {});
    ['faltan', 'mide', 'verificar', 'comparar'].forEach((h) => { if (habs.indexOf(h) < 0 && est.niveles[h] == null && h !== 'comparar') habs.push(h); });
    habs.forEach((h) => {
      const n = est.niveles[h] || 1, ph = (est.por_habito || {})[h] || { vistos: 0, acertados: 0 };
      const f = el('div', 'nivel'); const b = el('b', null, HABITOS[h] || h);
      const st = el('span', 'estrellas'); st.setAttribute('role', 'img'); st.setAttribute('aria-label', 'Nivel ' + n + ' de 3');
      for (let k = 1; k <= 3; k++) st.appendChild(el('i', k <= n ? 'on' : null));
      const m = el('div', 'medidor'); m.setAttribute('aria-hidden', 'true'); const sp = el('span'); sp.style.width = (ph.vistos ? Math.round(100 * ph.acertados / ph.vistos) : 0) + '%'; m.appendChild(sp);
      f.appendChild(b); f.appendChild(st); f.appendChild(m);
      f.appendChild(el('span', 'nota', ph.vistos ? ph.acertados + ' de ' + ph.vistos + ' bien la última vez' : 'Sin practicar todavía'));
      niv.appendChild(f);
    });
    $('#disponibles').textContent = est.disponibles ? 'Tienes ' + est.disponibles + ' micro-casos abiertos de las clases que ya tomaste.' : 'Todavía no hay micro-casos abiertos: se abren al terminar cada clase.';
    $('#empezar').disabled = !est.disponibles;
  }

  async function inicio() {
    error('');
    ver('vInicio');
    try {
      const [est, vivo] = await Promise.all([TDD.rpc('mi_practica'), TDD.rpc('vivo_actual').catch(() => null)]);
      pintarEstado(est);
      $('#avisoVivo').hidden = !vivo;
    } catch (e) { error(errorDe(e)); }
  }

  async function empezar() {
    error(''); $('#empezar').disabled = true;
    try {
      const s = await TDD.rpc('practica_sesion', {});
      if (!s.items.length) { error('Todavía no hay micro-casos abiertos para ti.'); $('#empezar').disabled = false; return; }
      Object.assign(S, { sesion: s.sesion, items: s.items, i: 0, res: [], bits: 0 });
      pintarEstado(s.estado);
      ver('vJuego'); mostrar();
    } catch (e) { error(errorDe(e)); $('#empezar').disabled = false; }
  }

  function pasos() {
    const p = $('#pasos'); p.innerHTML = '';
    S.items.forEach((_, k) => p.appendChild(el('i', k < S.res.length ? (S.res[k].acierto ? 'ok' : 'mal') : k === S.i ? 'ahora' : null)));
    $('#contador').textContent = (S.i + 1) + '/' + S.items.length;
  }

  function mostrar() {
    const item = S.items[S.i];
    S.comprobado = false; S.idCliente = uuid();
    pasos(); Micro.chips($('#chips'), item);
    $('#situacion').textContent = item.situacion; $('#tPregunta').textContent = item.pregunta;
    const zona = $('#zona'); zona.innerHTML = '';
    S.actual = R[item.tipo](item, zona, actualizarBoton);
    const pie = $('#pie'); pie.className = 'pie'; $('#veredicto').textContent = ''; $('#pieTexto').textContent = '';
    $('#accion').textContent = 'COMPROBAR'; actualizarBoton(); holgura();
    $('#tPregunta').focus && $('#tPregunta').setAttribute('tabindex', '-1');
    $('#tPregunta').focus();
  }
  // Que la hoja de abajo nunca tape el micro-caso: el contenido deja libre su altura.
  function holgura() { requestAnimationFrame(() => { $('#app').style.paddingBottom = ($('#pie').hidden ? 40 : $('#pie').offsetHeight + 24) + 'px'; }); }
  function actualizarBoton() { if (!S.comprobado) $('#accion').disabled = !S.actual || !S.actual.valor() || S.enviando; }

  async function comprobar() {
    const item = S.items[S.i], valor = S.actual.valor();
    if (!valor || S.enviando) return;
    S.enviando = true; actualizarBoton(); $('#accion').textContent = 'CALIFICANDO…';
    let r;
    try {
      r = await TDD.rpc('practica_responder', { p_microcaso: item.id, p_respuesta: valor, p_sesion: S.sesion, p_id_cliente: S.idCliente });
    } catch (e) {
      S.enviando = false; $('#accion').textContent = 'REINTENTAR'; $('#accion').disabled = false;
      $('#veredicto').textContent = ''; $('#pieTexto').textContent = errorDe(e) + ' Tu respuesta no se perdió: toca REINTENTAR.';
      return;
    }
    S.enviando = false; S.comprobado = true;
    S.res.push({ item, acierto: r.acierto, bits: r.bits, clave: r.clave, texto: S.actual.texto(r.clave) });
    S.bits += r.bits || 0;
    S.actual.mostrar(r.clave, r.acierto);
    const pie = $('#pie'); pie.className = 'pie ' + (r.acierto ? 'bien' : 'mal');
    const v = $('#veredicto'); v.textContent = r.acierto ? '¡BIEN!' : 'CASI';
    if (r.acierto && r.bits) { const b = el('span', 'bit', '+' + r.bits + ' BIT'); v.appendChild(b); }
    v.classList.remove('pop'); void v.offsetWidth; if (!reducir) v.classList.add('pop');
    if (!r.acierto && !reducir) { $('#zona').classList.remove('temblor'); void $('#zona').offsetWidth; $('#zona').classList.add('temblor'); }
    const t = $('#pieTexto'); t.innerHTML = '';
    if (!r.acierto) { const c = el('p', 'clave', 'Respuesta: ' + S.actual.texto(r.clave)); t.appendChild(c); }
    t.appendChild(el('p', null, r.explicacion));
    if (r.acierto && !r.primer_intento) t.appendChild(el('p', 'nota', 'Ya lo habías intentado antes: los bits cuentan solo a la primera.'));
    else if (r.acierto && !r.bits) t.appendChild(el('p', 'nota', 'Ya juntaste los ' + r.tope_semana + ' bits de la semana. Sigue practicando: el nivel sí sube.'));
    pasos(); holgura();
    $('#accion').textContent = S.i + 1 < S.items.length ? 'CONTINUAR' : 'TERMINAR'; $('#accion').disabled = false; $('#accion').focus();
  }

  async function fin() {
    ver('vFin');
    const ok = S.res.filter((x) => x.acierto).length;
    $('#finAciertos').textContent = ok; $('#finTotal').textContent = S.res.length; $('#finBits').textContent = S.bits;
    $('#selloFin').textContent = ok === S.res.length ? 'SESION PERFECTA' : 'SESION COMPLETA';
    const ul = $('#finLista'); ul.innerHTML = '';
    S.res.forEach((x) => {
      const li = el('li'); li.appendChild(el('span', 'm ' + (x.acierto ? 'ok' : 'no'), x.acierto ? 'BIEN' : 'REPASO'));
      const d = el('div'); d.appendChild(el('b', null, x.item.pregunta));
      if (!x.acierto) d.appendChild(el('p', 'nota', 'Vuelve en tu siguiente sesión. Respuesta: ' + x.texto));
      li.appendChild(d); ul.appendChild(li);
    });
    try { const est = await TDD.rpc('mi_practica'); pintarEstado(est); $('#finRacha').textContent = est.racha; } catch (_) {}
  }

  $('#accion').addEventListener('click', () => {
    if ($('#vVivo').hidden === false) return Vivo.accion();
    if (!S.comprobado) return comprobar();
    if (S.i + 1 < S.items.length) { S.i++; mostrar(); } else fin();
  });
  document.addEventListener('keydown', (e) => {
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName) && e.key !== 'Enter') return;
    if (!$('#vJuego').hidden && !S.comprobado && S.actual && S.actual.teclas && /^[1-3]$/.test(e.key)) { S.actual.teclas(Number(e.key) - 1); }
    if (e.key === 'Enter' && !$('#pie').hidden && !$('#accion').disabled && document.activeElement !== $('#accion')) { e.preventDefault(); $('#accion').click(); }
  });
  $('#empezar').addEventListener('click', empezar);
  $('#otra').addEventListener('click', empezar);
  $('#dejar').addEventListener('click', () => { if (!S.res.length || confirmarSalida()) inicio(); });
  function confirmarSalida() { return S.res.length >= S.items.length || window.confirm('¿Dejar la sesión? Lo que ya contestaste sí cuenta.'); }
  $('#entrar').addEventListener('click', TDD.entrar);
  $('#salir').addEventListener('click', async () => { await TDD.cerrar(); location.reload(); });
  $('#entrarVivo').addEventListener('click', () => Vivo.entrar());

  /* ---------- Ronda en vivo (alumno) ---------- */
  const Vivo = {
    timer: null, estado: null, itemId: null, enviado: false, actual: null, idCliente: null,
    entrar() { ver('vVivo'); $('#pie').hidden = true; this.itemId = null; this.consultar(); },
    salir() { clearTimeout(this.timer); this.timer = null; inicio(); },
    async consultar() {
      clearTimeout(this.timer);
      let v;
      try { v = await TDD.rpc('vivo_actual'); } catch (e) { $('#vivoEstado').textContent = errorDe(e); this.timer = setTimeout(() => this.consultar(), 5000); return; }
      if (!v) { $('#vivoEstado').textContent = 'La ronda terminó. ¡Gracias por jugar!'; $('#vivoItem').hidden = true; $('#pie').hidden = true;
        this.timer = setTimeout(() => this.salir(), 3500); return; }
      this.estado = v;
      if (v.terminado || !v.item) { $('#vivoEstado').textContent = 'Espera la siguiente pregunta…'; $('#vivoItem').hidden = true; }
      else {
        if (v.item.id !== this.itemId) this.pintar(v);
        this.resultado(v);
      }
      this.timer = setTimeout(() => this.consultar(), document.hidden ? 6000 : 2500);
    },
    pintar(v) {
      this.itemId = v.item.id; this.enviado = !!v.mia; this.idCliente = uuid();
      $('#vivoItem').hidden = false;
      $('#vivoEstado').textContent = 'Pregunta ' + (v.actual + 1) + ' de ' + v.total;
      Micro.chips($('#vivoChips'), v.item);
      $('#vivoSituacion').textContent = v.item.situacion; $('#vivoPregunta').textContent = v.item.pregunta;
      const z = $('#vivoZona'); z.innerHTML = '';
      this.actual = R[v.item.tipo](v.item, z, () => { if (!this.enviado) $('#accion').disabled = !this.actual.valor(); });
      $('#pie').hidden = false; $('#pie').className = 'pie'; $('#veredicto').textContent = ''; $('#pieTexto').textContent = '';
      $('#accion').textContent = this.enviado ? 'ENVIADA' : 'ENVIAR'; $('#accion').disabled = true; $('#accion').hidden = false;
      if (this.enviado) $('#pieTexto').textContent = 'Ya contestaste. Espera a que tu profesor muestre la respuesta.';
      holgura();
    },
    async accion() {
      if (this.enviado || !this.actual) return;
      const valor = this.actual.valor(); if (!valor) return;
      $('#accion').disabled = true; $('#accion').textContent = 'ENVIANDO…';
      try {
        await TDD.rpc('practica_responder', { p_microcaso: this.itemId, p_respuesta: valor, p_sesion: this.idCliente, p_id_cliente: this.idCliente, p_vivo: this.estado.id });
        this.enviado = true; this.mia = valor; $('#accion').textContent = 'ENVIADA';
        $('#pieTexto').textContent = 'Listo. Espera a que tu profesor muestre la respuesta.';
      } catch (e) { $('#accion').disabled = false; $('#accion').textContent = 'ENVIAR'; $('#pieTexto').textContent = errorDe(e); }
    },
    resultado(v) {
      if (!v.revelado || !v.resultado || this.revelado === v.item.id + ':' + v.actual) return;
      this.revelado = v.item.id + ':' + v.actual;
      const clave = v.resultado.clave, mia = v.mia || this.mia;
      const ok = mia ? acierta(v.item.tipo, clave, v.resultado.tolerancia, mia) : null;
      this.actual.mostrar(clave, ok);
      $('#pie').className = 'pie ' + (ok ? 'bien' : 'mal');
      $('#veredicto').textContent = ok == null ? 'RESPUESTA' : ok ? '¡BIEN!' : 'CASI';
      const t = $('#pieTexto'); t.innerHTML = '';
      t.appendChild(el('p', 'clave', 'Respuesta: ' + this.actual.texto(clave)));
      t.appendChild(el('p', null, v.resultado.explicacion));
      if (v.contestaron) t.appendChild(el('p', 'nota', 'Acertó ' + Math.round(100 * v.resultado.aciertos / v.contestaron) + ' % del grupo (' + v.contestaron + ' respuestas).'));
      $('#accion').textContent = 'ESPERA LA SIGUIENTE'; $('#accion').disabled = true; holgura();
    }
  };
  function acierta(tipo, clave, tol, mia) {
    if (tipo === 'numero') return Math.abs(parseFloat(String(mia.n).replace(',', '.')) - Number(clave.n)) <= Number(tol || 0);
    return JSON.stringify(mia) === JSON.stringify(clave) || (tipo === 'pares' && Object.keys(clave.pares).every((k) => (mia.pares || {})[k] === clave.pares[k]));
  }

  /* ---------- Arranque ---------- */
  const ret = TDD.tomarRetorno();
  if (ret.error) error('No se pudo entrar: ' + ret.error);
  if (TDD.iniciar()) {
    $('#salir').hidden = false;
    if (/[?&]vivo\b/.test(location.search)) Vivo.entrar(); else inicio();
  } else ver('vEntrar');
})();
