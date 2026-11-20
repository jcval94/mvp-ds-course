/* Caso 2.4 (E29 del catálogo) · «Las firmas de Hyde» (Hyde, 1977-1998) — intro corta de 3 escenas (formato del costo del error).
   Solo la intro: gancho público. La apuesta, la tabla, la suma y la revelación viven en caso.html.
   Hechos verificados (casos/staging/shipman-hyde-1977.json): de 1977 a 1998 un médico de familia de Hyde atendía a unos
   3,000 pacientes; la auditoría de 2001 (Baker) contó 499 certificados de defunción suyos en Hyde, y el que más firmó de
   los médicos de comparación del pueblo llegó a 210; el 31 de enero de 2000 lo condenaron por 15 asesinatos.
   Prueba de spoiler: la intro no compara contra lo esperado, no suma nada año con año ni nombra herramientas.
   Caso con homicidios reales (docs/GUIA_CASOS.md): sin personas, sin nombres, sin sonido ni destello en las cifras.
   Dirección de arte: cielo tramado al atardecer, 5 capas con parallax, humo que sube, farol con cono de luz escalonado,
   foco del archivo con penumbra, marcos de HUD para las cifras y golpes con anticipación sin destello. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  function tramado(id, a, b, nivel) {
    var s = '<pattern id="' + id + '" width="4" height="4" patternUnits="userSpaceOnUse">' + R(0, 0, 4, 4, a);
    for (var k = 0; k < 16; k++) if (BAYER[k] / 16 < nivel) s += R(k % 4, Math.floor(k / 4), 1, 1, b);
    return s + '</pattern>';
  }
  function cielo(pre, y0, y1, a, b, x, w) {
    var s = '<defs>', n = 5, h = (y1 - y0) / n; x = x == null ? -80 : x; w = w || 320;
    for (var i = 0; i < n; i++) s += tramado(pre + i, a, b, (i + 0.5) / n);
    s += '</defs>';
    for (i = 0; i < n; i++) s += R(x, y0 + Math.round(i * h), w, Math.min(Math.ceil(h) + 1, y1 - y0 - Math.round(i * h)), 'url(#' + pre + i + ')');
    return s;
  }
  /* marco de HUD con bisel (luz arriba a la izquierda), remaches, scanlines y cartucho */
  function marco(x, y, w, h, cartucho) {
    var s = R(x, y, w, h, 'var(--tq-panel)') + R(x, y, w, 1, 'var(--tq-piedra)') + R(x, y, 1, h, 'var(--tq-piedra)') +
      R(x, y + h - 1, w, 1, 'var(--tq-sombra)') + R(x + w - 1, y, 1, h, 'var(--tq-sombra)');
    [[x + 2, y + 2], [x + w - 3, y + 2], [x + 2, y + h - 3], [x + w - 3, y + h - 3]].forEach(function (p) { s += R(p[0], p[1], 1, 1, 'var(--tq-oro)'); });
    for (var yy = y + 3; yy < y + h - 2; yy += 2) s += R(x + 2, yy, w - 4, 1, 'var(--tq-tinta)', 'opacity=".5"');
    if (cartucho) s += R(x + 3, y - 4, Math.round(cartucho.length * 3.6) + 6, 5, 'var(--tq-comal)') + T(x + 6, y - 0.6, cartucho, 3.6, 'var(--tq-comal-texto)', 'start');
    return s;
  }
  /* golpe sin destello ni sonido (cifras de un caso con víctimas): anticipación, caída, aplastar, polvo y rebote */
  function golpe(g, el, fin) {
    var bb = el.getBBox(), cx = bb.x + bb.width / 2, cy = bb.y + bb.height, base = el.getAttribute('transform') || '';
    var tr = function (dy, sx, sy) { el.setAttribute('transform', base + ' translate(' + cx + ' ' + (cy + dy) + ') scale(' + sx.toFixed(3) + ' ' + sy.toFixed(3) + ') translate(' + (-cx) + ' ' + (-cy) + ')'); };
    var listo = function () { if (base) el.setAttribute('transform', base); else el.removeAttribute('transform'); el.setAttribute('opacity', 1); if (fin) fin(); };
    if (g.reducir) { listo(); return; }
    el.setAttribute('opacity', 1);
    g.anim(90, function (t) { tr(-3 * t, 1 - 0.12 * t, 1 - 0.12 * t); }, g.E.sal, function () {
      g.anim(120, function (t) { tr(-14 + 14 * t, 0.88 + 0.12 * t, 0.88 + 0.12 * t); }, g.E.ent, function () {
        g.chispas(cx, cy, { n: 10, color: 'var(--tq-papel-sombra)', v: 16, g: 6, vida: 420, ang: Math.PI, abre: Math.PI });
        g.sacudir();
        g.anim(160, function (t) { var k = Math.sin(t * Math.PI) * Math.pow(1 - t, 2); tr(0, 1 + 0.18 * k, 1 - 0.18 * k); }, g.E.lin, listo);
      });
    });
  }
  /* luz del foco: velo de penumbra con un hueco escalonado que parpadea a pasos */
  function velo(pre) {
    var hueco = P.disco(0, 0, 34, 'var(--tq-gris)') + P.disco(0, 0, 25, 'var(--tq-pared)') + P.disco(0, 0, 17, 'var(--tq-negro)');
    return '<defs><mask id="' + pre + '" maskUnits="userSpaceOnUse" x="-60" y="-40" width="280" height="170">' +
      R(-60, -40, 280, 170, 'var(--tq-blanco)') + P.g(pre + '-hueco', 0, 0, '<g data-id="' + pre + '-esc">' + hueco + '</g>') + '</mask></defs>' +
      R(-60, -40, 280, 170, 'var(--tq-noche)', 'opacity=".65" mask="url(#' + pre + ')" style="mix-blend-mode:multiply" pointer-events="none"');
  }
  function parpadeo(g, esc, base) {
    if (g.reducir) return;
    var niv = [1, 1, 0.96, 1, 1, 0.92, 1, 0.98, 1, 1, 0.9, 1];
    g.cada(110, function (n) { if (Math.random() < 0.7) return; esc.setAttribute('transform', 'scale(' + (base * niv[n % niv.length]).toFixed(3) + ')'); });
  }
  /* ladrillo aparejado: hileras de 3 unidades, juntas cada 6 con medio ladrillo de desfase y variación por semilla */
  function ladrillo(x, y, w, h, semilla) {
    var s = R(x, y, w, h, 'var(--tq-ladrillo)');
    for (var f = 0, yy = y + 2; yy < y + h; yy += 3, f++) {
      s += R(x, yy, w, 1, 'var(--tq-ladrillo-oscuro)');
      for (var xx = x + (f % 2 ? 3 : 0); xx < x + w; xx += 6) {
        s += R(xx, yy - 2, 1, 2, 'var(--tq-ladrillo-oscuro)');
        if ((xx * 7 + f * 13 + semilla) % 11 === 0) s += R(xx + 1, yy - 2, 5, 2, 'var(--tq-ladrillo-oscuro)', 'opacity=".45"');
      }
    }
    return s + R(x, y, 1, h, 'var(--tq-salsa-clara)', 'opacity=".25"');     // canto con luz a la izquierda
  }

  /* ---------- escena 1: Hyde al atardecer ---------- */
  function pueblo() {
    var s = P.capa(0.25, cielo('c24-e1-c', -10, 50, 'var(--tq-noche)', 'var(--tq-morado-claro)') +
      P.estrellas([[8, 5], [30, 10], [58, 4], [96, 7], [140, 5], [178, 9], [-16, 8]]));
    var lomas = '';                                                          // los Peninos, lejanos y en un solo tono
    for (var x = -70; x < 250; x += 4) { var h = Math.round(8 + 5 * Math.sin(x / 23) + 3 * Math.sin(x / 9 + 1)); lomas += R(x, 38 - h, 4, h + 10, 'var(--tq-morado)'); }
    s += P.capa(0.5, lomas);
    var fila = '';                                                           // casas en hilera con chimeneas
    for (x = -70; x < 250; x += 22) {
      fila += R(x, 38, 22, 20, 'var(--tq-ladrillo-oscuro)') + R(x, 36, 22, 2, 'var(--tq-piedra-oscura)') + R(x, 38, 1, 20, 'var(--tq-ladrillo)');
      fila += R(x + 15, 31, 4, 5, 'var(--tq-piedra-oscura)') + R(x + 15, 31, 4, 1, 'var(--tq-piedra)');
      fila += R(x + 4, 42, 4, 5, 'var(--tq-ventana-noche)', 'data-v="1"') + R(x + 13, 42, 4, 5, 'var(--tq-ventana-noche)', 'data-v="1"');
    }
    for (var i = 0; i < 4; i++) fila += P.g('humo' + i, 0, 0, R(-48 + i * 66 + 15, 28, 3, 2, 'var(--tq-gris)', 'opacity=".6"') + R(-48 + i * 66 + 16, 25, 3, 2, 'var(--tq-gris)', 'opacity=".4"') + R(-48 + i * 66 + 18, 22, 2, 2, 'var(--tq-gris)', 'opacity=".25"'));
    s += P.capa(0.8, fila + R(-80, 58, 320, 4, 'var(--tq-piedra-oscura)'));
    // la calle y el consultorio
    var c = R(-80, 62, 320, 30, 'var(--tq-suelo)') + R(-80, 62, 320, 2, 'var(--tq-piedra)') + R(-80, 64, 320, 1, 'var(--tq-piedra-oscura)', 'opacity=".6"');
    for (x = -70; x < 240; x += 16) c += R(x, 76, 8, 1, 'var(--tq-papel-sombra)', 'opacity=".35"');
    c += ladrillo(74, 24, 56, 38, 3) + R(72, 22, 60, 3, 'var(--tq-piedra)') + R(72, 24, 60, 1, 'var(--tq-piedra-oscura)');
    [[80, 28], [96, 28], [112, 28], [80, 49], [112, 49]].forEach(function (v, k) {
      c += R(v[0], v[1], 8, 9, 'var(--tq-piedra)') + R(v[0] + 1, v[1] + 1, 6, 7, 'var(--tq-ventana-noche)', 'data-c="' + k + '"') + R(v[0] + 4, v[1] + 1, 1, 7, 'var(--tq-piedra)');
    });
    c += R(97, 48, 10, 14, 'var(--tq-cafe-oscuro)') + R(97, 48, 10, 1, 'var(--tq-madera)') + R(97, 48, 1, 14, 'var(--tq-madera)') + R(105, 55, 1, 1, 'var(--tq-oro)');
    c += R(78, 39, 48, 7, 'var(--tq-papel)') + R(78, 45, 48, 1, 'var(--tq-papel-sombra)') + R(78, 39, 48, 1, 'var(--tq-blanco)', 'opacity=".5"') + T(102, 44, 'CONSULTORIO', 3.6, 'var(--tq-comal-texto)');
    // el farol: poste, cono escalonado y charco de luz que parpadean
    c += R(62, 30, 2, 33, 'var(--tq-negro)') + R(59, 28, 8, 3, 'var(--tq-negro)') + R(60, 31, 6, 2, 'var(--tq-luz)');
    var cono = '';
    for (var k = 0; k < 6; k++) cono += R(59 - 2 * k, 33 + 5 * k, 8 + 4 * k, 5, 'var(--tq-luz)', 'opacity="' + (0.24 - 0.025 * k).toFixed(3) + '"');
    c += P.g('cono', 0, 0, cono + R(48, 62, 30, 3, 'var(--tq-luz)', 'opacity=".25"') + R(44, 65, 38, 2, 'var(--tq-luz)', 'opacity=".12"'), 'pointer-events="none"');
    c += R(66, 63, 7, 1, 'var(--tq-negro)', 'opacity=".45"');                // sombra dura del poste
    s += P.capa(1, c);
    var reja = function (x0, n) { var r = R(x0, 68, n * 4, 1, 'var(--tq-anil-gris)') + R(x0, 82, n * 4, 1, 'var(--tq-anil-gris)'); for (var k = 0; k < n; k++) r += R(x0 + k * 4, 66, 1, 26, 'var(--tq-anil-gris)') + R(x0 + k * 4, 65, 1, 1, 'var(--tq-gris)'); return r; };
    s += P.capa(1.35, reja(-70, 18) + reja(150, 22));
    return s;
  }

  /* ---------- escena 2: el archivo ---------- */
  function cajon(id, y, letra, etiqueta) {
    var d = R(60, y, 40, 16, 'var(--tq-gris)') + R(60, y, 40, 1, 'var(--tq-piedra)') + R(60, y, 1, 16, 'var(--tq-piedra)') +
      R(60, y + 15, 40, 1, 'var(--tq-sombra)') + R(99, y, 1, 16, 'var(--tq-sombra)');
    d += R(74, y + 9, 12, 2, 'var(--tq-oro)') + R(74, y + 11, 12, 1, 'var(--tq-sombra)');
    d += R(75, y + 3, 10, 5, 'var(--tq-papel)') + T(80, y + 7, letra, 3.6, 'var(--tq-comal-texto)');
    var carpetas = '';
    for (var k = 0; k < 6; k++) carpetas += R(63 + k * 6, y + (k % 2), 5, 3 - (k % 2), k % 3 ? 'var(--tq-manila)' : 'var(--tq-manila-clara)');
    return P.hot(id, etiqueta, 58, y - 4, 44, 20,
      P.g(id + '-dentro', 0, 0, carpetas, 'opacity="0"') + P.g(id + '-frente', 0, 0, d));
  }
  function archivo() {
    var s = P.capa(0.4, R(-60, 0, 280, 66, 'var(--tq-pared)') + R(14, 8, 28, 22, 'var(--tq-piedra-oscura)') +
      cielo('c24-e2-c', 10, 28, 'var(--tq-noche)', 'var(--tq-morado-claro)', 16, 24) + R(27, 10, 2, 18, 'var(--tq-piedra-oscura)') + R(16, 18, 24, 1, 'var(--tq-piedra-oscura)'));
    var est = '';                                                            // estantes con cajas de archivo
    for (var x = -50; x < 220; x += 34) {
      if (x > 0 && x < 46) continue;
      est += R(x, 18, 28, 2, 'var(--tq-madera)') + R(x, 40, 28, 2, 'var(--tq-madera)');
      for (var k = 0; k < 3; k++) est += R(x + 2 + k * 9, 9 + (k % 2), 7, 9 - (k % 2), 'var(--tq-manila)') + R(x + 2 + k * 9, 9 + (k % 2), 1, 9 - (k % 2), 'var(--tq-manila-clara)') +
        R(x + 2 + k * 9, 31, 7, 9, 'var(--tq-manila)') + R(x + 4 + k * 9, 34, 3, 2, 'var(--tq-papel)');
    }
    s += P.capa(0.6, est);
    var m = R(-60, 66, 280, 30, 'var(--tq-madera)') + R(-60, 66, 280, 1, 'var(--tq-madera-clara)');
    for (var y = 70; y < 92; y += 5) m += R(-60, y, 280, 1, 'var(--tq-cafe)', 'opacity=".6"');
    m += R(64, 66, 40, 2, 'var(--tq-sombra)', 'opacity=".5"');              // sombra del archivero en el piso
    m += R(58, 22, 44, 44, 'var(--tq-piedra-oscura)') + R(58, 22, 44, 1, 'var(--tq-piedra)') + R(58, 22, 1, 44, 'var(--tq-piedra)');
    m += cajon('cajonA', 26, 'A', 'Tocar el cajón A') + cajon('cajonB', 46, 'B', 'Tocar el cajón B');
    m += R(79, 0, 1, 8, 'var(--tq-negro)') + R(77, 8, 5, 3, 'var(--tq-oro)') + R(78, 11, 3, 1, 'var(--tq-luz)');   // el foco
    m += P.g('flecha', 0, 0, P.flecha(80, 17));
    s += P.capa(1, m + velo('c24-e2-m'));
    s += P.g('hudA', 0, 0, marco(3, 26, 52, 24, 'ESTE MEDICO') + T(29, 39, '0', 6, 'var(--tq-comal)', 'middle', 'data-id="numA"') + T(29, 46, 'CERTIFICADOS', 3.6, 'var(--tq-crema)'), 'opacity="0"');
    s += P.g('hudB', 0, 0, marco(105, 26, 52, 24, 'OTRO MEDICO') + T(131, 39, '0', 6, 'var(--tq-comal)', 'middle', 'data-id="numB"') + T(131, 46, 'CERTIFICADOS', 3.6, 'var(--tq-crema)'), 'opacity="0"');
    s += P.capa(1.3, R(166, 0, 20, 90, 'var(--tq-madera)') + R(166, 0, 2, 90, 'var(--tq-madera-clara)') + R(-30, 0, 18, 90, 'var(--tq-madera)') + R(-14, 0, 2, 90, 'var(--tq-cafe-oscuro)'));
    return s;
  }

  window.CASO = {
    id: '2.4',
    transiciones: { 1: 'periodico', 2: 'titulo' }, /* cómo se entra a cada escena (motor.js, TRANS) */
    titulo: 'LAS FIRMAS DE HYDE',
    volver: '../../index.html',
    resolver: 'caso.html',
    duracionIntro: '~40 s',
    duracionCaso: '~25 min',
    medios: 'medios.json',
    herramientasOcultas: 2,
    aviso: 'El caso trata de un médico que mató a sus pacientes. No mostramos personas ni nombres de víctimas.',
    despues: ['Abres el expediente aquí mismo, sin cambiar de página.', 'Apuestas antes de ver los años uno por uno.', 'Firmas tu decisión antes de saber qué pasó.'],
    fuentes: [
      { t: 'Baker, R. (2001). Harold Shipman’s Clinical Practice 1974-1998 (resumen oficial)', u: 'https://gosportpanel.independent.gov.uk/media/panel_documents/IMI000470.pdf',
        n: 'Los 499 certificados de defunción en Hyde y los 210 del médico de comparación que más firmó.' },
      { t: 'The National Archives, catálogo de la investigación pública', u: 'https://discovery.nationalarchives.gov.uk/details/r/C16350',
        n: 'La condena del 31 de enero de 2000 por 15 asesinatos.' }
    ],
    escenas: [
      { alt: 'Hyde al atardecer: los Peninos al fondo, casas de ladrillo en hilera con chimeneas que echan humo y, en la calle, un consultorio de ladrillo junto a un farol encendido. Las ventanas se van encendiendo.',
        camara: { x: 0, y: 0, w: 160 },
        arte: pueblo,
        montar: function (g) {
          var humos = [0, 1, 2, 3].map(function (i) { return g.q('humo' + i); }), cono = g.q('cono');
          if (!g.reducir) {
            g.cada(140, function (n) { humos.forEach(function (h, i) { g.pos(h, 0, -((n + i * 5) % 12)); g.op(h, 1 - ((n + i * 5) % 12) / 14); }); });
            g.cada(110, function () { if (Math.random() < 0.8) return; g.op(cono, Math.random() < 0.5 ? 0.75 : 1); g.espera(110, function () { g.op(cono, 1); }); });
          }
          g.qa('[data-v]').forEach(function (v, i) { if (i % 3 !== 1) g.espera(g.reducir ? 0 : 400 + i * 90, function () { v.setAttribute('fill', 'var(--tq-ventana)'); }); });
        },
        lineas: [
          { t: 'Hyde, cerca de Mánchester, 1977 a 1998.', al: function (g) { g.portada('1977', 'HYDE', function () { g.archivo('hyde-werneth-low', { lado: 'centro' }); }); } },
          { t: 'Un médico de familia atiende a unos 3,000 pacientes.', al: function (g) {
            g.quitarArchivo();
            g.camara(52, 16, 96, 2600, g.E.sua);
            g.qa('[data-c]').forEach(function (v, i) { g.espera(g.reducir ? 0 : 900 + i * 260, function () { v.setAttribute('fill', 'var(--tq-ventana)'); }); });
          } }
        ] },
      { alt: 'Un cuarto de archivo con estantes de cajas y un archivero de metal bajo un foco. Al tocar el cajón A sale un marcador: este médico, 499 certificados de defunción. Al tocar el cajón B, otro médico del pueblo, el que más firmó: 210.',
        interactiva: true,
        camara: { x: 8, y: 4, w: 144 },
        arte: archivo,
        montar: function (g) {
          var esc = g.q('c24-e2-m-esc'), hueco = g.q('c24-e2-m-hueco'), visto = {};
          g.pos(hueco, 80, 40); esc.setAttribute('transform', 'scale(2.2)');
          parpadeo(g, esc, 2.2);
          var DATO = { cajonA: ['hudA', 'numA', 499, 'Este médico firmó 499 certificados de defunción en Hyde.'],
            cajonB: ['hudB', 'numB', 210, 'De los otros médicos del pueblo, el que más firmó llegó a 210.'] };
          g.enTocar(function (id) {
            var d = DATO[id]; if (!d || visto[id]) return; visto[id] = true;
            g.op(g.q('flecha'), 0);
            g.mover(g.q(id + '-frente'), 0, 3, 220, g.E.sal); g.aparecer(g.q(id + '-dentro'), 220);
            golpe(g, g.q(d[0]), function () {
              g.contar(g.q(d[1]), 0, d[2], g.reducir ? 0 : 1200, function (v) { return String(v); }, g.E.sal);
            });
            if (visto.cajonA && visto.cajonB) { g.decir(d[3] + ' 499 contra 210.'); g.camara(0, 0, 160, 1200, g.E.sua); g.listo(); }
            else g.decir(d[3] + ' Falta el otro cajón.');
          });
        },
        lineas: [
          { t: 'Después, una auditoría oficial cuenta sus certificados de defunción.', al: function () {} },
          { t: 'Toca los dos cajones del archivo.', al: function (g) { g.sfx('pop'); } }
        ] },
      C.final({
        codigo: '2.4',
        lineas: ['En 2000 lo condenaron por matar a 15 pacientes.', 'Nadie vigilaba las muertes de los pacientes de cada médico.', '¿Cuántas muertes de más hacen falta para que alguien lo note?']
      })
    ]
  };
})();
