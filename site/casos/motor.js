/* motor.js v2 — cinemática jugable · The Agentic Data Scientist
   Lee window.CASO (definido en casos/<id>/escenas.js) y arma la intro tipo videojuego:
   líneas de narración que avanzan solas, cámara con parallax, transiciones de persiana,
   partículas, sacudidas, contadores, sonido 8 bits (apagado por defecto) e interacciones.
   Sin dependencias, sin cuentas, sin guardar nada: lo que el alumno elige aquí no sale de su navegador.
   La hipótesis que cuenta para calificar se registra en el cuaderno de Colab, no aquí.
   Movimiento reducido (prefers-reduced-motion): sin animación, sin avance automático, estados finales al instante.
   Material real del caso: si CASO.medios apunta a un medios.json, las escenas muestran fotos, recortes, documentos
   y video con g.archivo(id) y g.video(id); la ficha final lista sus créditos (ver casos/README.md). */
(function () {
  'use strict';

  var C = window.CASO;
  var raiz = document.getElementById('juego');
  if (!C || !raiz) return;

  var NS = 'http://www.w3.org/2000/svg';
  var reducir = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var auto = !reducir, sonidoOn = false, audio = null;
  var idx = 0, S = null, token = 0, tweens = [], parts = [], ultimo = 0;
  var MED = {}, MED_LISTA = [];
  var ETIQUETA = { foto: 'FOTO REAL', grabado: 'IMAGEN DE EPOCA', recorte: 'NOTICIA REAL', documento: 'DOCUMENTO REAL', video: 'VIDEO REAL' };
  var CERRAR = '<button type="button" class="archivo-x" aria-label="Cerrar el material de archivo">X</button>';

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }

  /* ---------- curvas de movimiento ---------- */
  var E = {
    lin: function (t) { return t; },
    sal: function (t) { return 1 - Math.pow(1 - t, 3); },
    ent: function (t) { return t * t * t; },
    sua: function (t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; },
    reb: function (t) { var c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
    muelle: function (t) { return 1 - Math.exp(-6 * t) * Math.cos(14 * t); }
  };

  /* ---------- sonido 8 bits (apagado por defecto) ---------- */
  var SFX = {
    tic: [[880, 0.03, 'square']],
    paso: [[200, 0.04, 'square']],
    pop: [[520, 0.05, 'square'], [780, 0.06, 'square', 0.05]],
    puerta: [[130, 0.14, 'sawtooth'], ['r', 0.18, 0.05, 500, 0.02]],
    ok: [[523, 0.08, 'square'], [784, 0.14, 'square', 0.08]],
    mal: [[196, 0.12, 'square'], [147, 0.2, 'square', 0.1]],
    revela: [[392, 0.1, 'square'], [523, 0.1, 'square', 0.1], [659, 0.18, 'square', 0.2]],
    golpe: [[70, 0.22, 'square'], ['r', 0.25, 0.09, 600]],
    sello: [[60, 0.3, 'square'], ['r', 0.3, 0.12, 900]],
    whoosh: [['r', 0.35, 0.05, 1800]],
    pregunta: [[330, 0.12, 'square'], [392, 0.12, 'square', 0.12], [494, 0.24, 'square', 0.24]],
    moneda: [[988, 0.05, 'square'], [1319, 0.1, 'square', 0.05]]
  };
  function asegurarAudio() {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
  }
  function tono(f, d, tipo, retraso) {
    if (!sonidoOn) return;
    try {
      asegurarAudio();
      var t0 = audio.currentTime + (retraso || 0);
      var o = audio.createOscillator(), g = audio.createGain();
      o.type = tipo || 'square'; o.frequency.value = f;
      g.gain.setValueAtTime(0.035, t0);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
      o.connect(g); g.connect(audio.destination);
      o.start(t0); o.stop(t0 + d);
    } catch (e) { /* sin audio: no pasa nada */ }
  }
  function ruido(d, vol, filtro, retraso) {
    try {
      asegurarAudio();
      var sr = audio.sampleRate, buf = audio.createBuffer(1, Math.max(1, Math.floor(sr * d)), sr), ch = buf.getChannelData(0);
      for (var i = 0; i < ch.length; i++) ch[i] = (Math.random() * 2 - 1) * (1 - i / ch.length);
      var s = audio.createBufferSource(), g = audio.createGain(), f = audio.createBiquadFilter();
      s.buffer = buf; g.gain.value = vol; f.type = 'lowpass'; f.frequency.value = filtro || 800;
      s.connect(f); f.connect(g); g.connect(audio.destination);
      s.start(audio.currentTime + (retraso || 0));
    } catch (e) { /* sin audio */ }
  }
  function sfx(n) {
    if (!sonidoOn || !SFX[n]) return;
    SFX[n].forEach(function (p) {
      if (p[0] === 'r') ruido(p[1], p[2], p[3], p[4]); else tono(p[0], p[1], p[2], p[3]);
    });
  }

  /* ---------- armazón ---------- */
  raiz.innerHTML =
    '<div class="sup">' +
      '<a class="mini" id="volver" href="' + esc(C.volver) + '" aria-label="Volver al sitio">&lt; SITIO</a>' +
      '<div class="fila">' +
        '<button class="mini" id="aut" type="button" aria-pressed="false">AUTO: SI</button>' +
        '<button class="mini" id="snd" type="button" aria-pressed="false">SONIDO: NO</button>' +
      '</div>' +
    '</div>' +
    '<div class="meta">' +
      '<div><h1 class="titulo">' + esc(C.titulo) + '</h1>' +
      '<div class="sub">CASO ' + esc(C.id) + ' &middot; INTRO ' + esc(C.duracionIntro) + '</div></div>' +
      '<div class="pips" id="pips" aria-hidden="true"></div>' +
    '</div>' +
    '<section class="escenario" id="escenario" aria-label="Escena"><div class="lienzo" id="lienzo"></div></section>' +
    '<section class="caja" id="caja" aria-label="Narración">' +
      '<p class="texto" id="texto" aria-hidden="true"><span class="vis"></span><span class="fan"></span></p>' +
      '<p class="sr" id="sr" aria-live="polite"></p>' +
      '<div class="cuenta" id="cuenta" aria-hidden="true"><i></i></div>' +
      '<div class="extra" id="extra"></div>' +
      '<nav class="nav" aria-label="Escenas">' +
        '<button class="btn sec" id="atras" type="button" aria-label="Escena anterior">&lt; ATRAS</button>' +
        '<button class="btn sec" id="saltar" type="button" aria-label="Saltar al final de la intro">SALTAR &gt;&gt;</button>' +
        '<button class="btn" id="sig" type="button" aria-label="Siguiente">SIGUIENTE &gt;</button>' +
      '</nav>' +
    '</section>' +
    '<p class="pie">Augmented Learning Labs &middot; The Agentic Data Scientist</p>';

  var $ = function (id) { return document.getElementById(id); };
  var esce = $('escenario'), lienzo = $('lienzo'), caja = $('caja'), extra = $('extra'), sr = $('sr'), pips = $('pips');
  var cuenta = $('cuenta'), vis = caja.querySelector('.vis'), fan = caja.querySelector('.fan');
  var atras = $('atras'), sig = $('sig'), saltar = $('saltar'), snd = $('snd'), aut = $('aut');
  aut.textContent = 'AUTO: ' + (auto ? 'SI' : 'NO');
  aut.setAttribute('aria-pressed', String(auto));
  C.escenas.forEach(function () { pips.appendChild(document.createElement('span')).className = 'pip'; });

  /* ---------- bucle de animación ---------- */
  function bucle(now) {
    requestAnimationFrame(bucle);
    var dt = Math.min(100, now - (ultimo || now)); ultimo = now;
    for (var i = tweens.length - 1; i >= 0; i--) {
      var tw = tweens[i];
      var p = Math.min(1, (now - tw.t0) / tw.dur);
      tw.fn(tw.ease(p), p);
      if (p >= 1) { tweens.splice(i, 1); if (tw.fin) tw.fin(); }
    }
    for (var j = parts.length - 1; j >= 0; j--) {
      var q = parts[j];
      q.t += dt;
      if (q.t >= q.vida) { if (q.el.parentNode) q.el.parentNode.removeChild(q.el); parts.splice(j, 1); continue; }
      q.vy += q.g * dt / 1000;
      q.x += q.vx * dt / 1000; q.y += q.vy * dt / 1000;
      q.el.setAttribute('x', Math.round(q.x)); q.el.setAttribute('y', Math.round(q.y));
      q.el.setAttribute('opacity', (1 - q.t / q.vida).toFixed(2));
    }
  }
  requestAnimationFrame(bucle);

  /* ---------- texto con máquina de escribir ---------- */
  function terminarTecleo() {
    if (!S || !S.tecleo) return;
    clearInterval(S.tecleo); S.tecleo = null; vis.textContent = S.texto;
    var f = S.alTerminar; S.alTerminar = null; if (f) f();
  }
  function escribir(t, alTerminar) {
    if (S.tecleo) { clearInterval(S.tecleo); S.tecleo = null; }
    S.texto = t; S.alTerminar = alTerminar || null;
    vis.textContent = ''; fan.textContent = t; sr.textContent = t;
    if (reducir) { vis.textContent = t; if (alTerminar) alTerminar(); S.alTerminar = null; return; }
    var i = 0, tok = S.tok;
    S.tecleo = setInterval(function () {
      if (!S || S.tok !== tok) return;
      i += 1; vis.textContent = t.slice(0, i);
      if (i % 4 === 0) tono(740, 0.02);
      if (i >= t.length) terminarTecleo();
    }, 17);
  }
  $('texto').addEventListener('click', function () { if (S && S.tecleo) terminarTecleo(); else siguiente(); });

  /* ---------- cámara con parallax ---------- */
  function aplicarCam() {
    var c = S.cam, w = Math.round(c.w), x = Math.round(c.x), y = Math.round(c.y);
    S.svg.setAttribute('viewBox', x + ' ' + y + ' ' + w + ' ' + (w * 9 / 16));
    S.capas.forEach(function (l) {
      l.el.setAttribute('transform', 'translate(' + (x * (1 - l.f)).toFixed(1) + ' ' + (y * (1 - l.f)).toFixed(1) + ')');
    });
  }

  /* ---------- interfaz que reciben las escenas ---------- */
  var g = {
    E: E,
    get reducir() { return reducir; },
    get extra() { return extra; },
    get svg() { return S.svg; },
    q: function (id) {
      var el = S.svg.querySelector('[data-id="' + id + '"]');
      if (el && el._x === undefined) {
        var m = /translate\(\s*(-?[\d.]+)[ ,]+(-?[\d.]+)\s*\)/.exec(el.getAttribute('transform') || '');
        el._x = m ? parseFloat(m[1]) : 0; el._y = m ? parseFloat(m[2]) : 0;
      }
      return el;
    },
    qa: function (sel) { return [].slice.call(S.svg.querySelectorAll(sel)); },
    sfx: sfx,
    tono: tono,

    anim: function (ms, fn, ease, fin) {
      if (reducir || ms <= 0) { fn(1, 1); if (fin) fin(); return null; }
      var tok = S.tok;
      var tw = { t0: performance.now(), dur: ms, fn: function (a, b) { if (S && S.tok === tok) fn(a, b); }, ease: ease || E.lin, fin: function () { if (fin && S && S.tok === tok) fin(); } };
      tweens.push(tw);
      return tw;
    },
    espera: function (ms, fn) {
      var tok = S.tok;
      if (reducir) { fn(); return 0; }
      var id = setTimeout(function () { if (S && S.tok === tok) fn(); }, ms);
      S.timers.push(id); return id;
    },
    cada: function (ms, fn) {
      if (reducir) return 0;
      var tok = S.tok, n = 0;
      var id = setInterval(function () { if (S && S.tok === tok) fn(n++); }, ms);
      S.timers.push(id); return id;
    },

    camara: function (x, y, w, ms, ease, fin) {
      var c = S.cam, a = { x: c.x, y: c.y, w: c.w };
      if (S.camTw) { var k = tweens.indexOf(S.camTw); if (k >= 0) tweens.splice(k, 1); S.camTw = null; }
      S.camTw = g.anim(ms, function (t) {
        c.x = a.x + (x - a.x) * t; c.y = a.y + (y - a.y) * t; c.w = a.w + (w - a.w) * t; aplicarCam();
      }, ease || E.sua, fin);
    },
    fijarCamara: function (x, y, w) { S.cam.x = x; S.cam.y = y; S.cam.w = w; aplicarCam(); },

    pos: function (el, x, y) { el._x = x; el._y = y; el.setAttribute('transform', 'translate(' + Math.round(x) + ' ' + Math.round(y) + ')'); },
    mover: function (el, x, y, ms, ease, fin) {
      var x0 = el._x || 0, y0 = el._y || 0;
      g.anim(ms, function (t) { g.pos(el, x0 + (x - x0) * t, y0 + (y - y0) * t); }, ease || E.sal, fin);
    },
    op: function (el, v) { el.setAttribute('opacity', v); },
    aparecer: function (el, ms) { g.anim(ms || 300, function (t) { el.setAttribute('opacity', t); }, E.lin); },
    pop: function (el, ms, fin) {
      var bb = el.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height, base = el.getAttribute('transform') || '';
      el.setAttribute('opacity', 1);
      g.anim(ms || 380, function (t) {
        var s = Math.max(0.01, t);
        el.setAttribute('transform', base + ' translate(' + cx + ' ' + cy + ') scale(' + s.toFixed(3) + ') translate(' + (-cx) + ' ' + (-cy) + ')');
      }, E.reb, function () { if (base) el.setAttribute('transform', base); else el.removeAttribute('transform'); if (fin) fin(); });
      sfx('pop');
    },
    /* sello que cae: empieza grande y transparente y golpea */
    golpear: function (el, ms, fin) {
      var bb = el.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2, base = el.getAttribute('transform') || '';
      el.setAttribute('opacity', 0);
      g.anim(ms || 260, function (t) {
        var s = 3 - 2 * t;
        el.setAttribute('opacity', Math.min(1, t * 2.5));
        el.setAttribute('transform', base + ' translate(' + cx + ' ' + cy + ') scale(' + s.toFixed(3) + ') translate(' + (-cx) + ' ' + (-cy) + ')');
      }, E.ent, function () {
        if (base) el.setAttribute('transform', base); else el.removeAttribute('transform');
        el.setAttribute('opacity', 1);
        g.sacudir(); g.destello('var(--tq-blanco)', 0.5); sfx('sello');
        if (fin) fin();
      });
    },
    vaiven: function (el, dx, periodo, fase) {
      if (reducir) return;
      var t0 = performance.now();
      var base = el._x || 0, by = el._y || 0;
      g.cada(80, function () {
        var s = Math.sin(((performance.now() - t0) / periodo + (fase || 0)) * 6.2832);
        g.pos(el, base + Math.round(s * dx), by);
      });
    },
    sacudir: function () {
      if (reducir) return;
      esce.classList.remove('tiembla'); void esce.offsetWidth; esce.classList.add('tiembla');
    },
    destello: function (color, alfa) {
      if (reducir) return;
      var d = document.createElement('div');
      d.className = 'flash'; d.style.background = color || '#fff'; d.style.opacity = alfa == null ? 0.8 : alfa;
      esce.appendChild(d);
      setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 420);
    },
    chispas: function (x, y, o) {
      if (reducir || !S.parG) return;
      o = o || {};
      var n = o.n || 8, cols = [].concat(o.color || 'var(--tq-papel)');
      for (var i = 0; i < n && parts.length < 160; i++) {
        var r = document.createElementNS(NS, 'rect'), tam = o.tam || 1;
        r.setAttribute('width', tam); r.setAttribute('height', tam); r.setAttribute('fill', cols[i % cols.length]);
        S.parG.appendChild(r);
        var ang = (o.ang != null ? o.ang : Math.random() * 6.2832) + (o.abre ? (Math.random() - 0.5) * o.abre : 0);
        var v = (o.v || 22) * (0.5 + Math.random());
        parts.push({ el: r, x: x, y: y, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, g: o.g == null ? 45 : o.g, vida: (o.vida || 700) * (0.6 + Math.random() * 0.6), t: 0 });
      }
    },
    contar: function (el, de, a, ms, fmt, ease) {
      var ult = null;
      g.anim(ms, function (t) {
        var v = Math.round(de + (a - de) * t);
        if (v !== ult) { ult = v; el.textContent = fmt ? fmt(v) : String(v); }
      }, ease || E.lin);
    },
    portada: function (l1, l2, fin) {
      if (reducir) { if (fin) fin(); return; }
      var p = document.createElement('div');
      p.className = 'portada';
      p.innerHTML = '<b style="--n:' + l1.length + '">' + esc(l1) + '</b><b class="n2" style="--n:' + l2.length + '">' + esc(l2) + '</b>';
      esce.appendChild(p);
      sfx('revela');
      g.espera(1900, function () {
        p.classList.add('sale');
        setTimeout(function () { if (p.parentNode) p.parentNode.removeChild(p); }, 520);
        if (fin) fin();
      });
    },

    /* texto, controles y flujo */
    decir: function (t) {
      if (S.timerLinea) { clearTimeout(S.timerLinea); S.timerLinea = 0; }
      pararCuenta();
      escribir(t);
    },
    enTocar: function (fn) { S.alTocar = fn; },
    html: function (h) { var d = document.createElement('div'); d.innerHTML = h; extra.appendChild(d.firstChild); },
    boton: function (txt, fn, cls) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'btn late ' + (cls || ''); b.textContent = txt;
      b.addEventListener('click', function () { b.classList.remove('late'); fn(b); });
      extra.appendChild(b); return b;
    },
    opciones: function (lista, fn) {
      var gr = document.createElement('div');
      gr.className = 'opciones'; gr.setAttribute('role', 'group'); gr.setAttribute('aria-label', 'Elige una opción');
      lista.forEach(function (t, i) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'opcion'; b.setAttribute('aria-pressed', 'false'); b.textContent = t;
        b.addEventListener('click', function () {
          [].forEach.call(gr.children, function (o) { o.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          sfx('ok');
          fn(i, t);
        });
        gr.appendChild(b);
      });
      extra.appendChild(gr);
    },
    eco: function (txt) {
      var p = extra.querySelector('.eco');
      if (!p) { p = document.createElement('p'); p.className = 'eco'; p.setAttribute('role', 'status'); extra.appendChild(p); }
      p.textContent = txt;
    },
    /* ---------- material real del caso (medios.json) ----------
       Sin el medio (no existe, no está "listo" o no cargó), la escena sigue igual: devuelve null. */
    medio: function (id) { return MED[id] || null; },
    archivo: function (id, o) {
      o = o || {};
      var m = MED[id];
      if (!m || m.tipo === 'video') return null;
      g.quitarArchivo(true);
      var f = document.createElement('figure');
      f.className = 'archivo ' + (o.lado || 'der') + ' t-' + m.tipo + (reducir ? ' quieto' : '');
      f.innerHTML = '<span class="archivo-tag">' + ETIQUETA[m.tipo] + '</span>' + CERRAR +
        '<div class="archivo-marco"><img src="' + esc(m.archivo) + '" alt="' + esc(m.alt) + '" decoding="async"></div>' +
        '<figcaption>' + (m.pie ? '<b>' + esc(m.pie) + '</b>' : '') + '<small>' + esc(m.credito) + ' &middot; ' + esc(m.licencia) + '</small></figcaption>';
      if (o.ancho) f.style.setProperty('--ancho', o.ancho);
      f.querySelector('.archivo-x').addEventListener('click', function () { g.quitarArchivo(); });
      esce.appendChild(f);
      sfx('pop');
      /* con movimiento reducido se queda hasta que la persona la cierra o cambia la escena */
      if (o.ms && !reducir) g.espera(o.ms, function () { g.quitarArchivo(); });
      return f;
    },
    /* video: fachada con póster local; YouTube (modo de privacidad mejorada) solo se carga si la persona lo pide */
    video: function (id, o) {
      o = o || {};
      var m = MED[id];
      if (!m || m.tipo !== 'video') return null;
      g.quitarArchivo(true);
      var f = document.createElement('figure');
      f.className = 'archivo video ' + (o.lado || 'centro') + (reducir ? ' quieto' : '');
      f.innerHTML = '<span class="archivo-tag">' + ETIQUETA.video + '</span>' + CERRAR +
        '<div class="archivo-marco"><button type="button" class="archivo-play" aria-label="Reproducir el video: ' + esc(m.alt) + '">' +
          '<img src="' + esc(m.poster) + '" alt="" decoding="async"><span aria-hidden="true">&#9654;</span></button></div>' +
        '<figcaption>' + (m.pie ? '<b>' + esc(m.pie) + '</b>' : '') + '<small>' + esc(m.credito) + ' &middot; ' + esc(m.licencia) +
          ' &middot; al reproducir se carga YouTube</small></figcaption>';
      if (o.ancho) f.style.setProperty('--ancho', o.ancho);
      f.querySelector('.archivo-x').addEventListener('click', function () { g.quitarArchivo(); });
      f.querySelector('.archivo-play').addEventListener('click', function () {
        /* quien pone el video decide cuándo seguir: la escena deja de avanzar sola */
        if (S) { S.tocado = true; if (S.timerLinea) { clearTimeout(S.timerLinea); S.timerLinea = 0; } pararCuenta(); }
        var fr = document.createElement('iframe');
        fr.src = m.video + (m.video.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';
        fr.title = m.alt; fr.allow = 'autoplay; encrypted-media; picture-in-picture'; fr.allowFullscreen = true;
        fr.referrerPolicy = 'strict-origin-when-cross-origin';
        this.parentNode.replaceChild(fr, this);
        sig.classList.add('late');
      });
      esce.appendChild(f);
      sfx('pop');
      return f;
    },
    quitarArchivo: function (ya) {
      [].forEach.call(esce.querySelectorAll('.archivo'), function (a) {
        if (ya || reducir) { a.parentNode.removeChild(a); return; }
        a.classList.add('sale');
        setTimeout(function () { if (a.parentNode) a.parentNode.removeChild(a); }, 420);
      });
    },

    /* la escena interactiva terminó: ya se puede seguir (el alumno decide cuándo) */
    listo: function (sinAuto) {
      S.listo = true;
      if (S.e.final) return;
      sig.classList.remove('sec');
      sig.classList.add('late');
      if (auto && !sinAuto) preparaAvance();
    }
  };

  /* ---------- narración por líneas ---------- */
  function dwell(t) { return 1000 + t.length * 38; }

  function pararCuenta() {
    if (S.timerCuenta) { clearTimeout(S.timerCuenta); S.timerCuenta = 0; }
    var i = cuenta.firstChild; i.style.transition = 'none'; i.style.width = '0';
    cuenta.classList.remove('on');
  }

  function mostrarLinea(i) {
    var l = S.e.lineas[i];
    S.linea = i;
    if (S.e.final) sig.hidden = i >= S.e.lineas.length - 1;
    if (S.timerLinea) { clearTimeout(S.timerLinea); S.timerLinea = 0; }
    var tok = S.tok;
    escribir(l.t, function () {
      var ultima = S.e.lineas.length - 1;
      if (S.e.final && i >= Math.min(auto ? 1 : 0, ultima) && !extra.querySelector('.ficha')) fichaFinal();
      if (i < ultima) {
        if (auto) S.timerLinea = setTimeout(function () { if (S && S.tok === tok) mostrarLinea(i + 1); }, dwell(l.t));
      } else {
        S.fin = true;
        if (S.e.final) return;
        if (!S.e.interactiva && !S.tocado) preparaAvance(); else if (S.listo || S.tocado) sig.classList.add('late');
      }
    });
    if (l.al) l.al(g);
  }

  function preparaAvance() {
    if (!auto) { sig.classList.add('late'); return; }
    var tok = S.tok, ms = Math.max(2200, dwell(S.texto) * 0.6);
    var i = cuenta.firstChild;
    cuenta.classList.add('on');
    i.style.transition = 'none'; i.style.width = '0'; void i.offsetWidth;
    i.style.transition = 'width ' + ms + 'ms steps(24)'; i.style.width = '100%';
    S.timerCuenta = setTimeout(function () { if (S && S.tok === tok) ir(idx + 1); }, ms);
  }

  function siguiente() {
    if (!S || S.trans) return;
    if (S.tecleo) { terminarTecleo(); return; }
    pararCuenta();
    if (S.linea < S.e.lineas.length - 1) { mostrarLinea(S.linea + 1); return; }
    ir(idx + 1);
  }

  /* ---------- escena final: ficha y botón a Colab ---------- */
  function fichaFinal() {
    var herr = '';
    if (C.herramientas && C.herramientas.length) {
      herr = '<div><p class="herr-t">HERRAMIENTAS QUE PRACTICARAS</p><ul class="herr">' +
        C.herramientas.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul></div>';
    } else if (C.herramientasOcultas) {
      var n = C.herramientasOcultas, b = '';
      for (var i = 0; i < n; i++) b += '<li class="bloq" aria-hidden="true">? ? ?</li>';
      herr = '<div><p class="herr-t">HERRAMIENTAS</p><ul class="herr">' + b + '</ul>' +
        '<p class="nota" style="margin-top:8px">Este caso guarda en secreto sus herramientas: se revelan al resolverlo.</p></div>';
    }
    var fuentes = (C.fuentes || []).map(function (f) {
      return '<li><a href="' + esc(f.u) + '" target="_blank" rel="noopener noreferrer">' + esc(f.t) + '</a>' + (f.n ? ' &mdash; ' + esc(f.n) : '') + '</li>';
    }).join('');
    var creditos = MED_LISTA.map(function (m) {
      return '<li><a href="' + esc(m.fuente) + '" target="_blank" rel="noopener noreferrer">' + esc(m.pie || m.alt) + '</a> &mdash; ' +
        esc(m.credito) + ' (' + esc(m.licencia) + ')</li>';
    }).join('');
    var d = document.createElement('div');
    d.className = 'ficha entra';
    d.innerHTML =
      '<dl class="tiempos"><div><dt>INTRO</dt><dd>' + esc(C.duracionIntro) + '</dd></div>' +
      '<div><dt>CUADERNO</dt><dd>' + esc(C.duracionCuaderno) + '</dd></div></dl>' + herr +
      '<a class="btn grande" id="cta" href="' + esc(C.colab) + '" target="_blank" rel="noopener noreferrer">' +
        'ABRIR EL CASO EN COLAB &gt;<span class="sr"> (se abre en una pestaña nueva)</span></a>' +
      '<p class="nota">El caso completo se resuelve en Google Colab, y ahí se registra tu avance. Esta página no guarda nada.</p>' +
      (fuentes ? '<details class="fuentes"><summary>Fuentes de las cifras</summary><ul>' + fuentes + '</ul></details>' : '') +
      (creditos ? '<details class="fuentes"><summary>Material de archivo y créditos</summary><ul>' + creditos + '</ul></details>' : '') +
      '<button class="enlace" id="repetir" type="button">Ver la intro otra vez</button>';
    extra.appendChild(d);
    $('repetir').addEventListener('click', function () { ir(0); });
  }

  /* ---------- escenas y transiciones ---------- */
  function limpiar() {
    tweens.length = 0;
    parts.forEach(function (q) { if (q.el.parentNode) q.el.parentNode.removeChild(q.el); });
    parts.length = 0;
    if (S) {
      S.timers.forEach(function (id) { clearTimeout(id); clearInterval(id); });
      if (S.tecleo) clearInterval(S.tecleo);
      if (S.timerLinea) clearTimeout(S.timerLinea);
      if (S.timerCuenta) clearTimeout(S.timerCuenta);
    }
    [].forEach.call(esce.querySelectorAll('.flash,.portada,.archivo'), function (n) { n.parentNode.removeChild(n); });
    esce.classList.remove('tiembla');
  }

  function montarEscena(n, desdeCortina) {
    token += 1;
    limpiar();
    idx = n;
    var e = C.escenas[n];
    if (!e.lineas) e.lineas = [{ t: e.texto }];
    var cam = e.camara || { x: 0, y: 0, w: 160 };
    S = { n: n, e: e, tok: token, timers: [], linea: -1, tecleo: null, alTerminar: null, listo: false, fin: false, trans: false,
      cam: { x: cam.x, y: cam.y, w: cam.w }, alTocar: null, texto: '', timerLinea: 0, timerCuenta: 0 };
    lienzo.innerHTML = '<svg viewBox="0 0 160 90" role="img" aria-label="' + esc(e.alt) + '" preserveAspectRatio="xMidYMid meet">' +
      e.arte() + '<g data-parts="1"></g></svg>';
    S.svg = lienzo.firstChild;
    S.parG = S.svg.querySelector('[data-parts]');
    S.capas = [].map.call(S.svg.querySelectorAll('[data-capa]'), function (el) { return { el: el, f: parseFloat(el.getAttribute('data-capa')) }; });
    aplicarCam();
    extra.innerHTML = '';
    pararCuenta();
    sig.classList.remove('late');
    sig.classList.toggle('sec', !!e.interactiva);
    [].forEach.call(pips.children, function (p, i) { p.className = 'pip' + (i < n ? ' hecho' : '') + (i === n ? ' activo' : ''); });
    atras.hidden = n === 0;
    sig.hidden = !!e.final && (reducir || e.lineas.length <= 1);
    saltar.hidden = !!e.final;
    if (e.montar) e.montar(g);
    var empezar = function () {
      if (reducir) {
        escribir(e.lineas.map(function (l) { return l.t; }).join(' '));
        e.lineas.forEach(function (l) { if (l.al) l.al(g); });
        S.fin = true;
        if (!e.final && !e.interactiva) sig.classList.add('late');
      } else {
        mostrarLinea(0);
      }
      if (e.final && reducir) fichaFinal();
    };
    if (desdeCortina) g.espera(260, empezar); else empezar();
  }

  function cortina(dir, fin) {
    var c = esce.querySelector('.cortina');
    if (!c) {
      c = document.createElement('div'); c.className = 'cortina';
      for (var i = 0; i < 16; i++) { var b = document.createElement('i'); b.style.setProperty('--i', i); c.appendChild(b); }
      esce.appendChild(c);
    }
    c.className = 'cortina ' + dir;
    setTimeout(function () { if (dir === 'abre' && c.parentNode) c.parentNode.removeChild(c); if (fin) fin(); }, 320 + 16 * 14);
  }

  function ir(n) {
    if (n < 0 || n >= C.escenas.length) return;
    if (S && S.trans) return;
    if (!S || reducir) { montarEscena(n, false); return; }
    S.trans = true;
    pararCuenta();
    sfx('whoosh');
    cortina('cierra', function () { montarEscena(n, true); cortina('abre'); });
  }

  /* ---------- toques sobre el dibujo (ratón, dedo o teclado) ---------- */
  function tocar(n) {
    if (!S || !S.alTocar) return;
    /* si la persona se pone a explorar, la escena deja de avanzar sola: ella decide cuándo seguir */
    S.tocado = true;
    pararCuenta();
    if (S.fin && !S.e.final) sig.classList.add('late');
    S.alTocar(n.getAttribute('data-hot'), n);
  }
  esce.addEventListener('click', function (e) {
    var n = e.target.closest && e.target.closest('[data-hot]');
    if (n) tocar(n);
  });
  esce.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var n = e.target.closest && e.target.closest('[data-hot]');
    if (n) { e.preventDefault(); tocar(n); }
  });

  /* ---------- controles ---------- */
  sig.addEventListener('click', siguiente);
  atras.addEventListener('click', function () { ir(idx - 1); });
  saltar.addEventListener('click', function () { ir(C.escenas.length - 1); });
  snd.addEventListener('click', function () {
    sonidoOn = !sonidoOn;
    snd.textContent = 'SONIDO: ' + (sonidoOn ? 'SI' : 'NO');
    snd.setAttribute('aria-pressed', String(sonidoOn));
    sfx('pop');
  });
  aut.addEventListener('click', function () {
    auto = !auto;
    aut.textContent = 'AUTO: ' + (auto ? 'SI' : 'NO');
    aut.setAttribute('aria-pressed', String(auto));
    if (!auto) {
      if (S.timerLinea) { clearTimeout(S.timerLinea); S.timerLinea = 0; }
      pararCuenta();
      if (S.fin && !S.e.final) sig.classList.add('late');
    } else if (S && !S.tecleo) {
      if (S.fin && !S.e.interactiva && !S.e.final) preparaAvance();
      else if (!S.fin) { var l = S.e.lineas[S.linea]; var tok = S.tok; S.timerLinea = setTimeout(function () { if (S && S.tok === tok) mostrarLinea(S.linea + 1); }, dwell(l.t)); }
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test((e.target.tagName || ''))) return;
    if (e.key === 'ArrowRight' && !sig.hidden) siguiente();
    else if (e.key === 'ArrowLeft' && !atras.hidden) ir(idx - 1);
  });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) ultimo = 0; });

  /* para pruebas automáticas: window.__intro.ir(n) */
  window.__intro = { ir: ir, g: g, estado: function () { return S; }, medios: function () { return MED_LISTA.slice(); } };

  /* arranque: si el caso declara su material real, se carga antes de la primera escena (máximo 1.5 s de espera) */
  var arrancado = false;
  function arrancar() { if (arrancado) return; arrancado = true; ir(0); }
  if (C.medios && window.fetch) {
    var espera = setTimeout(arrancar, 1500);
    fetch(C.medios).then(function (r) { return r.ok ? r.json() : null; }).then(function (m) {
      ((m && m.items) || []).forEach(function (it) {
        if (it && it.estado === 'listo' && it.id) { MED[it.id] = it; MED_LISTA.push(it); }
      });
    }).catch(function () { /* sin material: la intro sigue igual */ }).then(function () { clearTimeout(espera); arrancar(); });
  } else {
    arrancar();
  }
})();
