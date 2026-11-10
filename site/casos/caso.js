/* caso.js — motor de los casos que se resuelven en la página (docs/CASO_EN_PAGINA.md).
   Un caso declara window.CASO_PAGINA = { id, version, titulo, intro, minutos, secciones: [{ id, titulo, render(ctx, cuerpo), puerta?(S) }] }.
   puerta(S) devuelve true cuando la sección se puede abrir (la revelación pide la firma).
   El motor pone la sesión (site/sesion.js), registra en las mismas tablas y con la misma función de retos que los
   cuadernos de Colab, guarda una cola local por si se cae la conexión y reanuda desde la base al volver.
   Nunca hay claves de retos aquí: la página manda lo que el alumno elige y muestra lo que la base contesta. */
(function () {
  'use strict';
  var C = window.CASO_PAGINA, TDD = window.TDD;
  var reducir = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var raiz = document.getElementById('caso');
  var NIVEL = function (i) { return 'NIVEL ' + (i + 1) + '/' + C.secciones.length; };

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var b = new Uint8Array(16); (window.crypto || {}).getRandomValues ? crypto.getRandomValues(b) : b.forEach(function (_, i) { b[i] = Math.random() * 256; });
    b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128;
    var h = [].map.call(b, function (x) { return (x + 256).toString(16).slice(1); }).join('');
    return h.slice(0, 8) + '-' + h.slice(8, 12) + '-' + h.slice(12, 16) + '-' + h.slice(16, 20) + '-' + h.slice(20);
  }
  function el(tag, cls, texto) { var e = document.createElement(tag); if (cls) e.className = cls; if (texto != null) e.textContent = texto; return e; }
  function ls(clave, valor) {
    try {
      if (valor === undefined) return JSON.parse(localStorage.getItem(clave) || 'null');
      if (valor === null) localStorage.removeItem(clave); else localStorage.setItem(clave, JSON.stringify(valor));
    } catch (_) { return null; }
    return null;
  }
  var ahora = function () { return new Date().toISOString(); };
  var fmt = function (n, d) { return Number(n).toLocaleString('es-MX', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };

  /* ---------- estado ---------- */
  var M = { modo: 'invitado', uid: null, nombre: '', sesion: uuid(), descartados: 0 };
  var S = { idx: 0, max: 0, vistas: {}, datos: {}, retos: {}, respuestas: {}, hip: null, completo: false };
  var cola = [], enviando = false, reintento = null;
  var claveLocal = function () { return 'tdd-caso:' + C.id + ':' + (M.uid || 'invitado'); };
  var claveCola = function () { return 'tdd-cola:' + (M.uid || 'invitado'); };
  function guardarLocal() { ls(claveLocal(), { idx: S.idx, max: S.max, vistas: S.vistas, datos: S.datos, retos: S.retos, respuestas: S.respuestas, hip: S.hip, completo: S.completo }); }

  /* ---------- registro (mismo contrato que el paquete del alumno) ---------- */
  function pintarEstado() {
    var e = document.getElementById('estadoReg'); if (!e) return;
    e.className = 'estado-reg';
    var extra = document.getElementById('estadoAccion');
    if (extra) extra.remove();
    if (M.modo === 'invitado' || M.modo === 'sinperfil') {
      e.textContent = M.modo === 'invitado' ? 'SIN GUARDAR' : 'SIN INSCRIPCION · NO CUENTA';
      var a = el(M.modo === 'invitado' ? 'button' : 'a', 'mini', M.modo === 'invitado' ? 'ENTRAR' : 'INSCRIBIRME'); a.id = 'estadoAccion';
      if (M.modo === 'invitado') { a.type = 'button'; a.addEventListener('click', function () { try { sessionStorage.removeItem('tdd-prueba'); } catch (_) {} TDD.entrar(); }); }
      else a.href = '../../inscripcion.html';
      e.parentNode.insertBefore(a, e.nextSibling); return;
    }
    if (M.vencida) { e.classList.add('pend'); e.textContent = 'SESION VENCIDA · ' + cola.length + ' PENDIENTES'; return; }
    if (cola.length) { e.classList.add('pend'); e.textContent = 'PENDIENTE: ' + cola.length; }
    else { e.classList.add('ok'); e.textContent = 'GUARDADO'; }
    if (M.descartados) e.textContent += ' · ' + M.descartados + ' DESCARTADO' + (M.descartados > 1 ? 'S' : '');
  }
  // La cola vive en localStorage por usuario y la pueden tocar varias pestañas: siempre se relee y se fusiona por id_cliente.
  function leerCola() {
    var guardada = (ls(claveCola()) || []).filter(function (x) { return x && x.d && x.d.id_cliente; }), vistos = {};
    cola.concat(guardada).forEach(function (x) { vistos[x.d.id_cliente] = vistos[x.d.id_cliente] || x; });
    cola = Object.keys(vistos).map(function (k) { return vistos[k]; });
  }
  function quitarDeCola(ids) {
    leerCola();
    cola = cola.filter(function (x) { return ids.indexOf(x.d.id_cliente) < 0; });
    ls(claveCola(), cola);
  }
  function encolar(tabla, datos) {
    if (M.modo !== 'alumno') return false;
    var d = Object.assign({ caso: C.id, version: C.version, sesion: M.sesion, creado_cliente: ahora(), id_cliente: uuid() }, datos);
    if (tabla === 'respuestas') delete d.version;
    leerCola(); cola.push({ t: tabla, d: d });
    ls(claveCola(), cola);
    vaciar();
    return true;
  }
  function enviar(tabla, filas) {
    return TDD.api('/rest/v1/' + tabla + '?on_conflict=usuario,id_cliente', {
      method: 'POST', headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' }, body: JSON.stringify(filas) });
  }
  var sesionVencida = function (e) { return e && (e.status === 401 || e.status === 403 || e.message === 'sesion'); };
  var esPermanente = function (e) { return e && e.status >= 400 && e.status < 500 && !sesionVencida(e) && e.status !== 429 && e.status !== 408; };
  function vaciar() {
    if (enviando || M.modo !== 'alumno' || M.vencida) { pintarEstado(); return; }
    leerCola();
    if (!cola.length) { pintarEstado(); return; }
    enviando = true;
    var tabla = cola[0].t, lote = [];
    for (var i = 0; i < cola.length && lote.length < 50 && cola[i].t === tabla; i++) lote.push(cola[i]);
    var ids = function (xs) { return xs.map(function (x) { return x.d.id_cliente; }); };
    enviar(tabla, lote.map(function (x) { return x.d; })).then(function () {
      quitarDeCola(ids(lote)); enviando = false; vaciar();
    }, function (e) {
      if (!esPermanente(e)) { enviando = false; return pausar(e); }
      // Un dato inválido no traba la cola: se prueba uno por uno y solo se descarta el malo (como el paquete del alumno).
      var malos = [], buenos = [], k = 0;
      (function uno() {
        if (k >= lote.length) { M.descartados += malos.length; quitarDeCola(ids(buenos).concat(ids(malos))); enviando = false; vaciar(); return; }
        var x = lote[k++];
        enviar(tabla, [x.d]).then(function () { buenos.push(x); uno(); }, function (e2) {
          if (esPermanente(e2)) { malos.push(x); uno(); return; }
          quitarDeCola(ids(buenos).concat(ids(malos))); M.descartados += malos.length; enviando = false; pausar(e2);
        });
      })();
    });
  }
  function pausar(e) {
    if (sesionVencida(e)) { M.vencida = true; avisoSesion(); }
    pintarEstado();
    clearTimeout(reintento); reintento = setTimeout(vaciar, 15000);
  }
  // La sesión de Google venció a media clase: la cola se conserva (por usuario) y se envía al volver a entrar.
  function avisoSesion() {
    if (document.getElementById('avisoSesion')) return;
    var a = el('div', 'aviso'); a.id = 'avisoSesion'; a.setAttribute('role', 'alert');
    a.appendChild(el('p', null, 'Tu sesión venció. Lo que hiciste está a salvo en este navegador y se envía cuando vuelvas a entrar.'));
    var b = el('button', 'btn', 'ENTRAR CON GOOGLE'); b.type = 'button'; b.addEventListener('click', function () { TDD.entrar(); });
    a.appendChild(b); raiz.insertBefore(a, contenido);
  }
  window.addEventListener('online', vaciar);

  function registrar(seccion, tipo, valor, idCliente) {
    var d = { seccion: seccion, tipo: tipo, valor: valor || {} };
    if (idCliente) d.id_cliente = idCliente;
    return encolar('eventos', d);
  }
  function verSeccion(id) {
    if (S.vistas[id]) return;
    S.vistas[id] = true; guardarLocal();
    registrar(id, 'seccion');
  }
  function responder(pregunta, texto, etapa) {
    texto = String(texto || '').trim().slice(0, 2000);
    if (!texto) return false;
    S.respuestas[pregunta] = texto; guardarLocal();
    if (M.modo !== 'alumno') return false;
    encolar('respuestas', { pregunta: pregunta, texto: texto, etapa: etapa || null });
    registrar(pregunta, 'respuesta', { caracteres: texto.length });
    return true;
  }

  /* ---------- sesión y reanudación ---------- */
  function cargarSesion() {
    var r = TDD.tomarRetorno();
    if (r.error) anunciar('No se pudo entrar con Google: ' + r.error);
    if (!TDD.iniciar()) return Promise.resolve(false);
    return TDD.api('/auth/v1/user').then(function (u) {
      M.uid = u.id;
      return TDD.api('/rest/v1/perfiles?select=alumno_id,nombre&id=eq.' + u.id).then(function (p) {
        var docente = false;
        return TDD.rpc('es_docente').then(function (d) { docente = !!d; }, function () {}).then(function () {
          M.modo = (p && p.length) || docente ? 'alumno' : 'sinperfil';
          M.nombre = (p && p[0] && p[0].nombre) || (u.user_metadata && u.user_metadata.full_name) || u.email || '';
          return true;
        });
      });
    }).catch(function (e) {
      if (sesionVencida(e)) { TDD.olvidar(); M.uid = null; return false; }
      M.sinRed = true; return false;
    });
  }
  function reanudar() {
    var local = ls(claveLocal());
    if (local) Object.assign(S, local);
    cola = (ls(claveCola()) || []).filter(function (x) { return x && x.d && x.d.id_cliente; });
    if (M.modo !== 'alumno') return Promise.resolve();
    var q = '&caso=eq.' + encodeURIComponent(C.id) + '&usuario=eq.' + M.uid + '&order=creado.asc';
    return Promise.all([
      TDD.todo('/rest/v1/eventos?select=seccion,tipo,valor' + q).catch(function () { return []; }),
      TDD.todo('/rest/v1/respuestas?select=pregunta,texto' + q).catch(function () { return []; }),
      TDD.rpc('mis_retos', { p_caso: C.id }).catch(function () { return null; })
    ]).then(function (r) {
      var ids = C.secciones.map(function (s) { return s.id; });
      r[0].forEach(function (e) {
        if (e.tipo === 'seccion' && ids.indexOf(e.seccion) >= 0) { S.vistas[e.seccion] = true; S.max = Math.max(S.max, ids.indexOf(e.seccion)); }
        if (e.tipo === 'hipotesis' && e.valor && e.valor.opcion) S.hip = e.valor.opcion;
        if (e.tipo === 'completo') S.completo = true;
        if (e.tipo === 'control' && e.seccion && e.valor) {
          var lista = S.datos['_c:' + e.seccion] = S.datos['_c:' + e.seccion] || [];
          var k = JSON.stringify(e.valor); if (lista.indexOf(k) < 0) lista.push(k);
        }
      });
      r[1].forEach(function (x) { S.respuestas[x.pregunta] = x.texto; });
      // La base manda: reemplaza lo local (por ejemplo, un intento que quedó «sin comprobar» y ya se calificó).
      if (r[2]) Object.keys(r[2]).forEach(function (k) { if (r[2][k].intentos) S.retos[k] = Object.assign({}, r[2][k], { reanudado: true }); });
      if (!local) S.idx = S.max;
      guardarLocal();
    }).then(limitarPuertas);
  }
  // Una sección con puerta (por ejemplo, la revelación pide la firma) no se abre sin cumplirla, aunque haya eventos
  // anteriores (de Colab o de otra visita) que digan lo contrario.
  function limitarPuertas() {
    C.secciones.forEach(function (sec, i) {
      if (sec.puerta && !sec.puerta(S) && S.max >= i) { S.max = i - 1; S.idx = Math.min(S.idx, i - 1); }
    });
    guardarLocal();
  }

  /* ---------- armazón ---------- */
  raiz.innerHTML =
    '<div class="sup">' +
      '<a class="mini" href="' + C.intro + '">&lt; INTRO</a>' +
      '<span class="estado-reg" id="estadoReg" role="status"></span>' +
    '</div>' +
    '<div class="meta"><div><h1 class="titulo">' + C.titulo + '</h1>' +
      '<div class="sub">CASO ' + C.id + ' &middot; ~' + C.minutos + ' MIN</div></div>' +
      '<div class="pips" id="pips" role="navigation" aria-label="Secciones del caso"></div></div>' +
    '<div id="contenido"></div>' +
    '<p class="sr" id="vivo" aria-live="polite"></p>' +
    '<p class="pie">Augmented Learning Labs &middot; The Agentic Data Scientist</p>';
  var contenido = document.getElementById('contenido'), vivo = document.getElementById('vivo'), pips = document.getElementById('pips');
  function anunciar(t) { vivo.textContent = ''; setTimeout(function () { vivo.textContent = t; }, 30); }

  function pintarPips() {
    pips.innerHTML = '';
    C.secciones.forEach(function (s, i) {
      var b = el('button'); b.type = 'button'; b.appendChild(el('i'));
      b.className = (i < S.idx || S.vistas[s.id] && i !== S.idx ? 'hecho' : '') + (i === S.idx ? ' activo' : '');
      b.disabled = i > S.max;
      b.setAttribute('aria-label', NIVEL(i) + ': ' + s.titulo + (i === S.idx ? ' (aquí estás)' : ''));
      b.addEventListener('click', function () { ir(i); });
      pips.appendChild(b);
    });
  }

  function puertaSesion() {
    contenido.innerHTML = '';
    var c = el('section', 'puerta-sesion');
    c.appendChild(el('h2', null, 'ANTES DE ABRIR EL EXPEDIENTE'));
    c.appendChild(el('p', null, 'Entra con tu cuenta de Google para que tu avance y tus retos cuenten. Si ya empezaste, sigues donde te quedaste.'));
    var f = el('div', 'fila');
    var a = el('button', 'btn', 'ENTRAR CON GOOGLE'); a.type = 'button'; a.addEventListener('click', function () { TDD.entrar(); });
    var b = el('button', 'btn sec', 'PROBAR SIN GUARDAR'); b.type = 'button';
    b.addEventListener('click', function () { try { sessionStorage.setItem('tdd-prueba', '1'); } catch (_) {} arrancar(); });
    f.appendChild(a); f.appendChild(b); c.appendChild(f);
    c.appendChild(el('p', 'nota', 'Sin entrar puedes recorrer todo el caso, pero nada se guarda y los retos no se califican.'));
    contenido.appendChild(c);
    pintarEstado();
  }

  function sinConexion() {
    contenido.innerHTML = '';
    var c = el('section', 'puerta-sesion'); c.setAttribute('role', 'alert');
    c.appendChild(el('h2', null, 'SIN CONEXION CON EL CURSO'));
    c.appendChild(el('p', null, 'No pude revisar tu cuenta. Tu sesión sigue activa: revisa tu internet y vuelve a intentar.'));
    var b = el('button', 'btn', 'REINTENTAR'); b.type = 'button'; b.addEventListener('click', function () { location.reload(); }); c.appendChild(b);
    contenido.appendChild(c);
  }

  /* ---------- secciones ---------- */
  var actual = null;
  function ir(i, enfocar) {
    if (i < 0 || i >= C.secciones.length || i > S.max) return;
    if (C.secciones[i].puerta && !C.secciones[i].puerta(S)) { ir(i - 1, enfocar); return; }
    S.idx = i; guardarLocal();
    var sec = C.secciones[i];
    verSeccion(sec.id);
    contenido.innerHTML = '';
    var caja = el('section', 'seccion'); caja.setAttribute('aria-labelledby', 'tit-' + sec.id);
    var fr = el('div', 'franja');
    var h = el('h2', null, sec.titulo); h.id = 'tit-' + sec.id; h.tabIndex = -1;
    fr.appendChild(h); fr.appendChild(el('span', null, NIVEL(i)));
    var cuerpo = el('div', 'cuerpo');
    caja.appendChild(fr); caja.appendChild(cuerpo);
    var pie = el('div', 'seguir');
    var sig = el('button', 'btn', i === C.secciones.length - 1 ? 'VOLVER A MI AVANCE' : 'SEGUIR >'); sig.type = 'button';
    pie.appendChild(sig);
    contenido.appendChild(caja);
    actual = { sec: sec, sig: sig, listo: false };
    var ctx = contexto(sec, cuerpo);
    sec.render(ctx, cuerpo);
    cuerpo.appendChild(pie);
    sig.disabled = !actual.listo;
    sig.addEventListener('click', function () {
      if (i === C.secciones.length - 1) { location.href = C.miAvance || '../../alumno.html'; return; }
      S.max = Math.max(S.max, i + 1); guardarLocal(); ir(i + 1, true);
    });
    pintarPips();
    if (enfocar !== false) { h.focus({ preventScroll: true }); window.scrollTo({ top: 0, behavior: reducir ? 'auto' : 'smooth' }); }
    pintarEstado();
  }

  /* ---------- contexto que reciben las secciones ---------- */
  function contexto(sec, cuerpo) {
    var datos = S.datos[sec.id] = S.datos[sec.id] || {};
    var mia = actual;   // una respuesta que llega tarde no habilita el SEGUIR de otra sección
    var ctx = {
      C: C, M: M, S: S, datos: datos, reducir: reducir, el: el, fmt: fmt, anunciar: anunciar,
      guardar: guardarLocal,
      listo: function (v) { mia.listo = v !== false; mia.sig.disabled = !mia.listo; },
      registrar: function (control, valor) {
        var lista = S.datos['_c:' + control] = S.datos['_c:' + control] || [];
        var k = JSON.stringify(valor || {}); if (lista.indexOf(k) < 0) lista.push(k);
        guardarLocal(); return registrar(control, 'control', valor);
      },
      controles: function (control) { return (S.datos['_c:' + control] || []).map(function (k) { return JSON.parse(k); }); },
      hipotesis: function (opcion, razon) {
        S.hip = opcion; guardarLocal();
        var ok = registrar('hipotesis', 'hipotesis', { opcion: String(opcion).slice(0, 120), tiene_razon: !!String(razon || '').trim() });
        if (String(razon || '').trim()) responder('hipotesis_razon', razon, 'inicio');
        return ok;
      },
      responder: responder,
      completar: function () { S.completo = true; guardarLocal(); registrar('cierre', 'completo'); vaciar(); },
      p: function (html, cls) { var e = el('p', cls); e.innerHTML = html; cuerpo.appendChild(e); return e; },
      h3: function (t) { return cuerpo.appendChild(el('h3', null, t)); },
      boton: function (texto, fn, cls, dentro) {
        var b = el('button', 'btn' + (cls ? ' ' + cls : ''), texto); b.type = 'button'; b.addEventListener('click', fn);
        (dentro || cuerpo).appendChild(b); return b;
      },
      campo: function (o) {
        var l = el('label', 'campo'); l.appendChild(el('span', null, o.etiqueta));
        var t = el(o.renglones === 1 ? 'input' : 'textarea'); t.maxLength = o.max || 1000;
        if (o.renglones !== 1) t.rows = o.renglones || 3;
        if (o.placeholder) t.placeholder = o.placeholder;
        if (datos[o.id] == null && o.inicial) { datos[o.id] = o.inicial; guardarLocal(); }
        t.value = datos[o.id] != null ? datos[o.id] : '';
        var n = el('span', 'conteo', t.value.length + '/' + t.maxLength);
        t.addEventListener('input', function () { datos[o.id] = t.value; n.textContent = t.value.length + '/' + t.maxLength; guardarLocal(); if (o.alCambiar) o.alCambiar(t.value); });
        l.appendChild(t); l.appendChild(n); (o.dentro || cuerpo).appendChild(l);
        return t;
      },
      /* Opciones como botones (una o varias). o = { lista: [[valor, texto]], max, clave, alCambiar, dentro, clase } */
      opciones: function (o) {
        var cont = el('div', o.clase || 'opciones'); cont.setAttribute('role', 'group'); if (o.etiqueta) cont.setAttribute('aria-label', o.etiqueta);
        var sel = datos[o.clave] || []; if (!Array.isArray(sel)) sel = [sel];
        var bs = o.lista.map(function (par) {
          var b = el('button', 'opcion' + (o.b ? ' b' : ''), par[1]); b.type = 'button'; b.dataset.v = par[0];
          b.setAttribute('aria-pressed', String(sel.indexOf(par[0]) >= 0));
          b.addEventListener('click', function () {
            var i = sel.indexOf(par[0]);
            if (i >= 0) sel.splice(i, 1);
            else { if ((o.max || 1) === 1) sel = []; else if (sel.length >= o.max) sel.shift(); sel.push(par[0]); }
            datos[o.clave] = (o.max || 1) === 1 ? (sel[0] || null) : sel.slice(); guardarLocal();
            bs.forEach(function (x) { x.setAttribute('aria-pressed', String(sel.indexOf(x.dataset.v) >= 0)); });
            if (o.alCambiar) o.alCambiar(sel.slice());
          });
          cont.appendChild(b); return b;
        });
        (o.dentro || cuerpo).appendChild(cont);
        return { valor: function () { return sel.slice(); }, poner: function (v) { sel = v.slice(); bs.forEach(function (x) { x.setAttribute('aria-pressed', String(sel.indexOf(x.dataset.v) >= 0)); }); } };
      },
      guardado: function (dentro) { var g = el('p', 'guardado'); g.setAttribute('role', 'status'); (dentro || cuerpo).appendChild(g); return g; },
      marcarGuardado: function (g, ok) {
        g.className = 'guardado ' + (M.modo !== 'alumno' ? 'mal' : ok ? 'ok' : 'pend');
        g.textContent = M.modo === 'invitado' ? 'Anotado solo en esta pantalla: entra con Google para que cuente.'
          : M.modo === 'sinperfil' ? 'Anotado solo en esta pantalla: tu cuenta no está inscrita en una generación.'
          : cola.length ? 'Anotado. Se está guardando; si se va la conexión, se envía solo al volver.' : 'Anotado y guardado.';
      },
      sello: function (texto, det, clase, dentro) {
        var s = el('div', 'sello' + (clase ? ' ' + clase : ''), texto); s.setAttribute('role', 'img'); s.setAttribute('aria-label', 'Sello: ' + texto);
        (dentro || cuerpo).appendChild(s); if (det) (dentro || cuerpo).appendChild(el('p', 'sello-det', det)); return s;
      },
      contador: function (n, texto, dentro) {
        var c = el('div', 'contador'), b = el('b', null, reducir ? fmt(n) : '0'); c.appendChild(b); c.appendChild(el('span', null, texto));
        (dentro || cuerpo).appendChild(c);
        if (!reducir) { var t0 = performance.now(); (function paso(t) { var k = Math.min(1, (t - t0) / 1400); b.textContent = fmt(Math.round(n * k)); if (k < 1) requestAnimationFrame(paso); })(t0); }
        anunciar(fmt(n) + ' ' + texto); return c;
      },
      /* Barras horizontales. o = { categorias, series: [{ nombre, valores, color, etiquetas? }], decimales, pie, max } */
      barras: function (o, dentro) {
        var cont = el('div', 'barras'), max = o.max || 0;
        o.series.forEach(function (s) { s.valores.forEach(function (v) { if (v != null) max = Math.max(max, v); }); });
        if (o.series.length > 1) {
          var ley = el('div', 'leyenda-b');
          o.series.forEach(function (s) { var x = el('span'); var i = el('i'); i.style.setProperty('--c', s.color); x.appendChild(i); x.appendChild(document.createTextNode(s.nombre)); ley.appendChild(x); });
          cont.appendChild(ley);
        }
        var anchos = [];
        o.categorias.forEach(function (cat, j) {
          var f = el('div', 'fila-b'); f.appendChild(el('span', 'nombre', cat));
          var ps = el('div', 'pistas');
          o.series.forEach(function (s) {
            var v = s.valores[j], p = el('div', 'pista'), b = el('div', 'barra'), i = el('i');
            i.style.setProperty('--c', s.color); b.appendChild(i); p.appendChild(b);
            p.appendChild(el('span', 'valor', s.etiquetas ? s.etiquetas[j] : v == null ? '?' : fmt(v, o.decimales)));
            ps.appendChild(p); anchos.push([i, v == null ? 0 : (100 * v / (max || 1))]);
          });
          f.appendChild(ps); cont.appendChild(f);
        });
        if (o.pie) cont.appendChild(el('p', 'pie', o.pie));
        (dentro || cuerpo).appendChild(cont);
        var poner = function () { anchos.forEach(function (a) { a[0].style.width = a[1] + '%'; }); };
        if (reducir) poner(); else requestAnimationFrame(function () { requestAnimationFrame(poner); });
        return cont;
      },
      reto: function (o) { return reto(o, dentroDe(o, cuerpo)); },
      calculadora: function (dentro) { return calculadora(dentro || cuerpo); }
    };
    // Piezas comunes de los casos (piezas.js): apuesta, verificación, cierre, tablas, libreta…
    if (window.CasoPiezas) { var piezas = window.CasoPiezas(ctx, cuerpo); Object.keys(piezas).forEach(function (k) { if (!(k in ctx)) ctx[k] = piezas[k]; }); }
    return ctx;
  }
  function dentroDe(o, cuerpo) { return o.dentro || cuerpo; }

  /* ---------- reto: la base califica ---------- */
  function monedas(n) { var m = el('span', 'monedas'); m.setAttribute('aria-hidden', 'true'); for (var i = 0; i < Math.min(n, 24); i++) { var x = el('i'); x.style.setProperty('--i', i); m.appendChild(x); } return m; }
  function reto(o, dentro) {
    var caja = el('div', 'reto'); caja.setAttribute('role', 'group'); caja.setAttribute('aria-label', 'Reto: ' + o.pregunta);
    var t = el('div', 'reto-t'); t.appendChild(el('b', null, o.titulo)); t.appendChild(el('span', null, 'Hasta ' + (8 * o.dificultad) + ' bits al primer intento')); caja.appendChild(t);
    caja.appendChild(el('p', 'pregunta', o.pregunta));
    var elegida = null, input = null, enviar;
    if (o.tipo === 'opcion') {
      var ops = el('div', 'opciones');
      var orden = o.opciones.slice();
      for (var j = orden.length - 1; j > 0; j--) { var r = Math.floor(Math.random() * (j + 1)), x = orden[j]; orden[j] = orden[r]; orden[r] = x; }
      var bs = orden.map(function (op) {
        var b = el('button', 'opcion', op); b.type = 'button';
        b.addEventListener('click', function () { elegida = op; bs.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); }); enviar.disabled = false; });
        b.setAttribute('aria-pressed', 'false'); ops.appendChild(b); return b;
      });
      caja.appendChild(ops);
    } else {
      var fila = el('div', 'num'), l = el('label', 'campo'); l.appendChild(el('span', null, o.etiqueta || 'Tu respuesta (un número)'));
      input = el('input'); input.inputMode = 'decimal'; input.autocomplete = 'off'; input.maxLength = 20;
      input.addEventListener('input', function () { enviar.disabled = !input.value.trim(); });
      l.appendChild(input); fila.appendChild(l); caja.appendChild(fila);
    }
    var fila2 = el('div', 'fila');
    enviar = el('button', 'btn', 'COMPROBAR'); enviar.type = 'button'; enviar.disabled = true; fila2.appendChild(enviar);
    var luego = el('button', 'enlace', 'Lo intento después'); luego.type = 'button'; fila2.appendChild(luego);
    var pistaB = null;
    if (o.pista) { pistaB = el('button', 'enlace', 'Ver una pista'); pistaB.type = 'button'; fila2.appendChild(pistaB); }
    caja.appendChild(fila2);
    var pista = el('p', 'nota'); pista.hidden = true; pista.textContent = 'Pista: ' + (o.pista || ''); caja.appendChild(pista);
    var res = el('div', 'reto-res'); res.setAttribute('role', 'status'); caja.appendChild(res);
    dentro.appendChild(caja);

    function pintar(r) {
      res.innerHTML = ''; res.className = 'reto-res';
      if (!r) return;
      if (r.sinComprobar) {
        res.classList.add('pend'); res.appendChild(el('b', null, 'RESPUESTA SIN COMPROBAR'));
        res.appendChild(el('p', null, M.modo === 'invitado' ? 'Sin entrar con Google no puedo decirte si acertaste: la respuesta correcta vive en la base del curso. Puedes seguir con el caso.'
          : M.modo === 'sinperfil' ? 'Tu cuenta no está inscrita en una generación, así que la base no califica tus retos. Puedes seguir con el caso.'
          : r.texto || 'No pude comprobarla ahora. Quedó guardada y se califica sola; vuelve más tarde para ver si acertaste.'));
        return;
      }
      if (r.error) { res.classList.add('no'); res.appendChild(el('p', null, r.error)); return; }
      if (r.existe === false) { res.classList.add('pend'); res.appendChild(el('b', null, 'RESPUESTA GUARDADA')); res.appendChild(el('p', null, 'Tu profesor todavía no activa este reto; tu intento cuenta cuando lo haga.')); return; }
      if (r.acierto) {
        res.classList.add('ok');
        var b = el('b', null, r.bits ? '¡CORRECTO! +' + r.bits + ' BITS ' : '¡CORRECTO!'); if (r.bits) b.appendChild(monedas(r.bits)); res.appendChild(b);
        if (!r.bits) res.appendChild(el('p', null, 'Ya no suma bits (cuenta el primer acierto dentro de los cinco primeros intentos), pero llegaste.'));
      } else {
        res.classList.add('no'); res.appendChild(el('b', null, 'TODAVIA NO · INTENTO ' + (r.intento || r.intentos || '')));
        if (r.siguiente_bits == null) {
          var n = r.intento || r.intentos || 0, d = r.dificultad || o.dificultad;
          r.siguiente_bits = r.primer_acierto || n >= 5 ? 0 : n === 0 ? 8 * d : n === 1 ? 4 * d : 2 * d;
        }
        res.appendChild(el('p', null, r.siguiente_bits ? 'Si aciertas en el siguiente intento, vale ' + r.siguiente_bits + ' bits.' : 'Este reto ya no suma bits, pero puedes seguir intentando.'));
        if (pistaB) pista.hidden = false;
      }
      if (r.explicacion) res.appendChild(el('p', null, r.explicacion));
      if (r.reanudado) res.appendChild(el('p', 'nota', 'Lo respondiste en una visita anterior.'));
    }
    pintar(S.retos[o.id]);
    if (S.retos[o.id]) o.alResponder && o.alResponder(S.retos[o.id]);

    luego.addEventListener('click', function () { (S.datos._luego = S.datos._luego || {})[o.id] = true; guardarLocal(); if (o.alSaltar) o.alSaltar(); else if (o.alResponder) o.alResponder(null); anunciar('Puedes volver a este reto cuando quieras.'); });
    if (pistaB) pistaB.addEventListener('click', function () { pista.hidden = false; registrar(o.id, 'pista'); });
    enviar.addEventListener('click', function () {
      var dada = o.tipo === 'opcion' ? elegida : input.value.trim();
      if (!dada) return;
      if (M.modo !== 'alumno') { S.retos[o.id] = { sinComprobar: true }; guardarLocal(); pintar(S.retos[o.id]); if (o.alResponder) o.alResponder(S.retos[o.id]); return; }
      enviar.disabled = true; var ident = uuid();
      TDD.rpc('intentar_reto', { p_caso: C.id, p_reto: o.id, p_respuesta: String(dada).slice(0, 200), p_id_cliente: ident,
        p_sesion: M.sesion, p_version: C.version, p_creado_cliente: ahora() }).then(function (r) {
        S.retos[o.id] = r || {}; guardarLocal(); pintar(r || {}); anunciar(r && r.acierto ? 'Correcto.' : 'Todavía no.');
        if (o.alResponder) o.alResponder(r);
      }, function (e) {
        if (sesionVencida(e)) { M.vencida = true; avisoSesion(); }
        if (!e || !e.status || e.status >= 500 || sesionVencida(e)) {
          // Sin conexión: el intento se guarda como evento con el mismo id y la base lo califica al llegar.
          registrar(o.id, 'control', { respuesta: String(dada).slice(0, 200) }, ident);
          S.retos[o.id] = { sinComprobar: true, texto: M.vencida ? 'Tu sesión venció. Tu respuesta quedó guardada en este navegador: entra otra vez con Google y se califica sola.' : null };
          pintar(S.retos[o.id]);
        } else { pintar({ error: e.message || 'No se pudo comprobar.' }); }
        guardarLocal(); if (o.alResponder) o.alResponder(S.retos[o.id]);
      }).then(function () { enviar.disabled = o.tipo === 'opcion' ? !elegida : !input.value.trim(); });
    });
    return caja;
  }

  /* ---------- calculadora 8 bits (sin eval) ---------- */
  function calculadora(dentro) {
    var c = el('div', 'calc'); c.setAttribute('role', 'group'); c.setAttribute('aria-label', 'Calculadora');
    var pant = el('div', 'calc-pantalla', '0'); c.appendChild(pant);
    var teclas = el('div', 'calc-teclas'), ac = 0, op = null, nuevo = true, texto = '0';
    function mostrar(t) { texto = t; pant.textContent = t; }
    function valor() { return parseFloat(texto.replace(/,/g, '')) || 0; }
    function operar(a, b, o) { return o === '+' ? a + b : o === '−' ? a - b : o === '×' ? a * b : o === '÷' ? (b === 0 ? NaN : a / b) : b; }
    function salida(x) { if (!isFinite(x)) return 'ERROR'; var r = Math.round(x * 1e6) / 1e6; return String(r); }
    ['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', '.', '=', '+', 'C'].forEach(function (k) {
      var b = el('button', /[0-9.]/.test(k) ? '' : 'op', k); b.type = 'button';
      b.setAttribute('aria-label', { '÷': 'entre', '×': 'por', '−': 'menos', '+': 'más', '=': 'igual', 'C': 'borrar', '.': 'punto' }[k] || k);
      b.addEventListener('click', function () {
        if (/[0-9]/.test(k)) { mostrar(nuevo || texto === '0' ? k : (texto + k).slice(0, 14)); nuevo = false; }
        else if (k === '.') { if (nuevo) { mostrar('0.'); nuevo = false; } else if (texto.indexOf('.') < 0) mostrar(texto + '.'); }
        else if (k === 'C') { ac = 0; op = null; nuevo = true; mostrar('0'); }
        else if (k === '=') { if (op) { mostrar(salida(operar(ac, valor(), op))); op = null; nuevo = true; anunciar('Resultado: ' + texto); } }
        else { if (op && !nuevo) { ac = operar(ac, valor(), op); mostrar(salida(ac)); } else ac = valor(); op = k; nuevo = true; }
      });
      teclas.appendChild(b);
    });
    c.appendChild(teclas); dentro.appendChild(c); return c;
  }

  /* ---------- arranque ---------- */
  function arrancar() {
    contenido.innerHTML = '<p class="nota">Abriendo el expediente…</p>';
    reanudar().then(function () {
      if (M.modo !== 'alumno') limitarPuertas();
      if (M.modo === 'alumno') registrar(null, 'abrio');
      var i = Math.min(S.idx || 0, S.max || 0);
      ir(i, false);
      vaciar();
    });
  }
  cargarSesion().then(function (conSesion) {
    pintarEstado();
    var prueba = false; try { prueba = sessionStorage.getItem('tdd-prueba') === '1'; } catch (_) {}
    if (M.sinRed) { sinConexion(); return; }
    if (!conSesion && !prueba) { puertaSesion(); return; }
    arrancar();
  });
  window.CasoMotor = { estado: function () { return { modo: M.modo, cola: cola.length, S: S }; }, puerta: function () { return S.respuestas; } };
})();
