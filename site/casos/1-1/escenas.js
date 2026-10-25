/* Caso 1.1 · «El mapa de agujeros» (los aviones de 1943) — cinemática jugable, formato completo
   Solo la intro: gancho público. La apuesta, el giro, la herramienta y la revelación viven en el cuaderno de Colab.
   Hechos verificados (casos/staging/wald-bombers.json): en la Segunda Guerra Mundial un grupo de matemáticos de la
   Universidad de Columbia, en Nueva York (Statistical Research Group), estudió el daño de los aviones que regresaban.
   Los agujeros del mapa son DATOS SIMULADOS (casos/data/wald-bombers, semilla 1943): 1,481 impactos en los aviones
   que volvieron; motores 132, cabina 58, fuselaje 277, alas 698, cola 316. Un punto = unos 10 agujeros.
   Regla de spoilers: aquí no aparecen el nombre del matemático, cuántos aviones salieron ni cuántos no volvieron,
   la herramienta ni la solución. La ficha oculta las herramientas. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;

  /* ---------- avión pequeño (vista desde arriba, nariz arriba) ---------- */
  var MINI = ['........C........', '.......CCC.......', '.......CFC.......', '...EE..FFF..EE...', '...EE..FFF..EE...',
    'WWWEEWWFFFWWEEWWW', 'WWWWWWWFFFWWWWWWW', '.WWWWWWFFFWWWWWW.', '.......FFF.......', '.......FFF.......',
    '.......FFF.......', '.....TTFFFTT.....', '....TTTTTTTTT....', '.......TTT.......'];
  var MS = 1.2;                                        /* escala del avión pequeño: 20 x 17 unidades */
  var PAL_MINI = { C: 'var(--tq-vidrio)', F: 'var(--tq-papel-sombra)', E: 'var(--tq-piedra-oscura)', W: 'var(--tq-papel)', T: 'var(--tq-papel)' };
  /* agujeros de cada avión revisado (coordenadas dentro del sprite) */
  var HOYOS = {
    a1: [[1, 6], [14, 5], [11, 7], [4, 6]],
    a2: [[5, 12], [11, 12], [8, 8], [8, 10]],
    a3: [[0, 6], [15, 6], [8, 13], [8, 4], [12, 7]]
  };
  var DICHO = {
    a1: 'Este trae agujeros en las alas. Mañana vuelve a volar.',
    a2: 'Este, en la cola y en el fuselaje.',
    a3: 'Y este, en las alas, la cola y el fuselaje.'
  };
  var PUESTO = { a1: 28, a2: 70, a3: 112 };

  /* ---------- avión grande del mapa (parametros.json de casos/data/wald-bombers) ---------- */
  var AVION = ['................C................', '...............CCC...............', '...............CCC...............',
    '...............CCC...............', '...............CCC...............', '...............CCC...............',
    '...............FFF...............', '......EE...EE..FFF..EE...EE......', '......EE...EE..FFF..EE...EE......',
    '.....WEEWWWEEWWFFFWWEEWWWEEW.....', '...WWWEEWWWEEWWFFFWWEEWWWEEWWW...', '.WWWWWEEWWWEEWWFFFWWEEWWWEEWWWWW.',
    '.WWWWWWWWWWWWWWFFFWWWWWWWWWWWWWW.', '..WWWWWWWWWWWWWFFFWWWWWWWWWWWWW..', '...............FFF...............',
    '...............FFF...............', '...............FFF...............', '...............FFF...............',
    '...............FFF...............', '...............FFF...............', '............TTTTTTTTT............',
    '..........TTTTTTTTTTTTT..........', '..........TTTTTTTTTTTTT..........', '...............TTT...............',
    '...............TTT...............', '...............TTT...............', '................T................'];
  var PAL_AVION = { C: 'var(--tq-vidrio)', F: 'var(--tq-gris)', E: 'var(--tq-piedra-oscura)', W: 'var(--tq-piedra)', T: 'var(--tq-piedra)' };
  var AX = 47, AY = 14, AS = 2;                       /* esquina y escala del avión grande */
  /* puntos por sección: impactos simulados en los aviones que volvieron, divididos entre 10 */
  var PUNTOS = { E: 13, C: 6, F: 28, W: 70, T: 32 };

  function puntosDelMapa() {
    var celdas = { E: [], C: [], F: [], W: [], T: [] }, sd = 1943, s = '';
    AVION.forEach(function (fila, j) {
      for (var i = 0; i < fila.length; i++) if (celdas[fila.charAt(i)]) celdas[fila.charAt(i)].push([i, j]);
    });
    var todos = [];
    Object.keys(PUNTOS).forEach(function (k) {
      var lista = celdas[k].slice();
      for (var n = 0; n < PUNTOS[k]; n++) {
        sd = (sd * 1664525 + 1013904223) >>> 0;
        var c = lista.splice(sd % lista.length, 1)[0];
        todos.push(c);
      }
    });
    /* orden de aparición mezclado (reproducible) */
    for (var q = todos.length - 1; q > 0; q--) {
      sd = (sd * 1664525 + 1013904223) >>> 0;
      var r = sd % (q + 1), t = todos[q]; todos[q] = todos[r]; todos[r] = t;
    }
    todos.forEach(function (c) {
      s += R(AX + c[0] * AS + 0.4, AY + c[1] * AS + 0.4, 1.2, 1.2, 'var(--tq-salsa)', 'data-d="1" style="opacity:0"');
    });
    return s;
  }

  function avionGrande(conPuntos) {
    return P.sprite(AVION, PAL_AVION, AX, AY, AS) + (conPuntos ? puntosDelMapa() : '');
  }

  function rotulo(id, x, y, t) {
    return P.g(id, 0, 0, R(x - t.length * 1.6 - 1.5, y - 4, t.length * 3.2 + 3, 5.5, 'var(--tq-sombra)') +
      T(x, y, t, 3.2, 'var(--tinta)'), 'opacity="0" pointer-events="none"');
  }

  /* ---------- 1 · la base aérea, vista desde arriba ---------- */
  function base() {
    var s = R(0, 0, 160, 90, 'var(--tq-suelo)');
    for (var y = 3; y < 60; y += 6) s += R(0, y, 66, 3, 'var(--tq-cielo-bajo)') + R(94, y, 66, 3, 'var(--tq-cielo-bajo)');
    s += R(66, 0, 28, 64, 'var(--tq-piedra-oscura)');
    for (var k = 2; k < 62; k += 10) s += R(79, k, 2, 5, 'var(--tq-papel)');
    s += R(0, 62, 160, 28, 'var(--tq-tinta)') + R(0, 62, 160, 1, 'var(--tq-piedra)');
    for (var m = 22; m < 160; m += 42) s += R(m, 84, 26, 1, 'var(--tq-piedra-oscura)');
    s += R(6, 8, 30, 20, 'var(--ladrillo)') + R(6, 8, 30, 3, 'var(--ladrillo-osc)') + R(14, 18, 14, 10, 'var(--tq-sombra)');
    s += R(124, 10, 12, 12, 'var(--tq-piedra)') + R(126, 12, 8, 4, 'var(--tq-ventana)') + R(129, 4, 2, 6, 'var(--tq-gris)');
    ['a1', 'a2', 'a3'].forEach(function (id) {
      var hoyos = HOYOS[id].map(function (h) {
        return R(+(h[0] * MS).toFixed(1), +(h[1] * MS).toFixed(1), MS, MS, 'var(--tq-negro)');
      }).join('');
      var cuerpo = P.sprite(MINI, PAL_MINI, 0, 0, MS) + P.g('h' + id, 0, 0, hoyos, 'opacity="0"') +
        '<g class="pista">' + P.flecha(10, 18, true).replace('class="pista parp"', 'class="parp"') + '</g>';
      s += P.g(id, 70, -24, P.hot(id, 'Revisar el avión ' + id.charAt(1), -2, -2, 24, 24, cuerpo));
    });
    s += P.g('mec', -12, 84, P.andante(['.hh.', 'hssh', '.kk.', 'kkkk', '.kk.'], '.b.b', 'b..b',
      { h: 'var(--tq-cafe-oscuro)', s: 'var(--tq-piel)', k: 'var(--tq-traje)', b: 'var(--tq-negro)' }, 1));
    return s;
  }

  /* ---------- 2 · Nueva York de noche ---------- */
  var ESTRELLAS = [[8, 6], [22, 14], [38, 4], [56, 10], [96, 6], [118, 14], [146, 8], [70, 2], [132, 3], [30, -10], [88, -14], [140, -8]];
  function ciudad() {
    var s = R(0, -40, 160, 50, 'var(--tq-sombra)') + R(0, 10, 160, 30, 'var(--tq-noche)') + R(0, 40, 160, 50, 'var(--tq-cielo)');
    s += P.capa(0.3, P.estrellas(ESTRELLAS)) + P.capa(0.45, P.luna(136, 12));
    var lejos = '';
    [[0, 44, 14, 46], [16, 36, 10, 54], [28, 48, 12, 42], [118, 40, 12, 50], [132, 30, 9, 60], [143, 46, 17, 44]].forEach(function (b) {
      lejos += R(b[0], b[1], b[2], b[3], 'var(--tq-piedra-oscura)');
      for (var yy = b[1] + 3; yy < 86; yy += 5) lejos += R(b[0] + 2, yy, 2, 2, 'var(--tq-ventana-noche)');
    });
    s += P.capa(0.6, lejos);
    s += R(46, 30, 68, 50, 'var(--piedra)') + R(44, 26, 72, 5, 'var(--tq-piedra-oscura)') + R(62, 18, 36, 9, 'var(--piedra)');
    s += T(80, 25, 'UNIVERSIDAD', 3.4, 'var(--tq-comal-texto)');
    for (var i = 0; i < 6; i++) {
      var x = 52 + i * 10;
      s += R(x, 36, 6, 8, 'var(--tq-noche)') + R(x + 1, 37, 4, 6, 'var(--ventana)', 'data-id="v' + i + '" opacity="0"');
      if (i !== 1 && i !== 2) s += R(x, 50, 6, 8, 'var(--tq-noche)');
    }
    s += R(74, 64, 12, 16, 'var(--madera)') + R(79, 64, 2, 16, 'var(--tq-cafe)');
    var interior = R(62, 49, 10, 10, 'var(--ventana)') + R(63, 50, 8, 6, 'var(--tq-anil-gris)') +
      P.sprite(MINI, { C: 'var(--tq-papel)', F: 'var(--tq-papel)', E: 'var(--tq-papel)', W: 'var(--tq-papel)', T: 'var(--tq-papel)' }, 63.6, 50.4, 0.46) +
      R(66, 57, 2, 2, 'var(--tq-cafe-oscuro)');
    s += P.hot('ventana', 'Asomarse a la ventana iluminada', 60, 47, 14, 14, interior + P.g('pv', 0, 0, P.flecha(67, 61, true)));
    s += R(0, 80, 160, 10, 'var(--suelo)');
    s += P.g('cartero', -14, 72, P.andante(['.hh.', 'hssh', '.kk.', 'kmmk', '.kk.'], '.b.b', 'b..b',
      { h: 'var(--tq-negro)', s: 'var(--tq-piel)', k: 'var(--tq-traje)', m: 'var(--manila)', b: 'var(--tq-negro)' }, 1.3));
    return s;
  }

  /* ---------- 3 · el mapa de agujeros ---------- */
  function mapa() {
    var s = R(0, 0, 160, 90, 'var(--tq-panel)');
    for (var x = 0; x < 160; x += 8) s += R(x, 0, 1, 90, 'var(--tq-tinta)');
    for (var y = 0; y < 90; y += 8) s += R(0, y, 160, 1, 'var(--tq-tinta)');
    s += T(80, 9, 'EL MAPA DE AGUJEROS', 4.5, 'var(--tinta)');
    s += P.g('avion', 0, 0, avionGrande(true));
    s += rotulo('rA', 22, 45, 'ALAS') + rotulo('rM', 34, 31, 'MOTORES') + rotulo('rF', 106, 56, 'FUSELAJE') +
      rotulo('rC', 102, 20, 'CABINA') + rotulo('rT', 120, 70, 'COLA');
    s += T(80, 85, '', 4.5, 'var(--tinta)', 'middle', 'data-id="cnt"');
    s += R(3, 78, 2, 2, 'var(--tq-salsa)') + T(7, 80, '= 10 AGUJEROS', 2.8, 'var(--tinta-suave)', 'start');
    return s;
  }

  /* ---------- 4 · el blindaje ---------- */
  function placa(id, x, y) {
    return P.g(id, x, y, R(0, 0, 14, 8, 'var(--tq-gris)') + R(0, 0, 14, 1, 'var(--tq-papel-sombra)') + R(0, 7, 14, 1, 'var(--tq-piedra-oscura)') +
      R(1, 1, 1, 1, 'var(--tq-piedra-oscura)') + R(12, 1, 1, 1, 'var(--tq-piedra-oscura)') + R(1, 6, 1, 1, 'var(--tq-piedra-oscura)') +
      R(12, 6, 1, 1, 'var(--tq-piedra-oscura)'), 'opacity="0"');
  }
  function blindaje() {
    var s = R(0, 0, 160, 90, 'var(--tq-panel)');
    for (var x = 0; x < 160; x += 8) s += R(x, 0, 1, 90, 'var(--tq-tinta)');
    s += T(80, 9, 'EL BLINDAJE PESA', 4.5, 'var(--tinta)');
    s += P.sprite(AVION, PAL_AVION, AX, AY, AS);
    s += puntosDelMapa().replace(/style="opacity:0"/g, '');
    s += placa('pl1', 10, 30) + placa('pl2', 136, 30);
    s += P.g('kg', 0, 0, T(17, 46, 'PESO', 3, 'var(--tinta-suave)') + T(143, 46, 'PESO', 3, 'var(--tinta-suave)'), 'opacity="0"');
    s += P.g('duda', 0, 0, '<g class="pulsa">' + T(80, 86, '?', 9, 'var(--comal)') + '</g>', 'opacity="0"');
    return s;
  }

  /* ---------- guion ---------- */
  window.CASO = {
    id: '1.1',
    titulo: 'EL MAPA DE AGUJEROS',
    volver: '../../index.html',
    /* Pendiente: CUADERNO_URL del caso 1.1 cuando el cuaderno se suba a Drive. Mientras, la guía de Colab. */
    colab: 'https://colab.research.google.com/drive/1tYM1tqtzOwyx_3a8nRrLgBEPduVlqAsi',
    duracionIntro: '~1 min',
    duracionCuaderno: '~50 min',
    medios: 'medios.json',
    herramientasOcultas: 2,
    fuentes: [
      { t: 'Bill Casselman, «The Legend of Abraham Wald» (AMS Feature Column, 2016)', u: 'https://www.ams.org/samplings/feature-column/fc-2016-06',
        n: 'El grupo de matemáticos de la Universidad de Columbia y su trabajo sobre el daño de los aviones que regresaban.' },
      { t: 'Datos simulados del caso (CC0)', u: 'https://github.com/jcval94/mvp-ds-course/tree/main/casos/data/wald-bombers',
        n: 'Los agujeros del mapa no son cifras históricas: son una simulación para mostrar el mecanismo.' }
    ],
    escenas: [

      /* 1 · la base: los aviones aterrizan uno por uno y se pueden revisar */
      {
        alt: 'Una base aérea vista desde arriba: una pista, un hangar y tres aviones que aterrizan y se estacionan.',
        interactiva: true,
        arte: base,
        montar: function (g) {
          g.qa('.pista').forEach(function (p) { p.style.visibility = 'hidden'; });
          var vistos = {};
          g.enTocar(function (id, nodo) {
            if (vistos[id]) return;
            vistos[id] = true;
            nodo.setAttribute('aria-label', 'Avión ' + id.charAt(1) + ' revisado');
            nodo.querySelector('.pista').style.visibility = 'hidden';
            g.aparecer(g.q('h' + id), 300);
            g.chispas(PUESTO[id] + 10, 76, { n: 8, color: ['var(--tq-salsa)', 'var(--tq-papel)'], v: 18, vida: 600, g: 30 });
            g.sfx('golpe');
            if (Object.keys(vistos).length === 3) {
              g.decir('Los mecánicos anotan cada agujero en un registro.');
              g.listo();
            } else {
              g.decir(DICHO[id]);
            }
          });
        },
        lineas: [
          { t: '1943. Los aviones vuelven de su misión.', al: function (g) {
            g.portada('1943', 'DE REGRESO', function () { g.archivo('belle', { lado: 'der', ms: 4200 }); });
            ['a1', 'a2', 'a3'].forEach(function (id, i) {
              var el = g.q(id);
              g.espera(2100 + i * 1100, function () {
                g.sfx('whoosh');
                g.mover(el, 70, 42, 900, g.E.sal, function () { g.mover(el, PUESTO[id], 66, 700, g.E.sua); });
              });
            });
          } },
          { t: 'Los mecánicos revisan cada uno al aterrizar.', al: function (g) {
            g.mover(g.q('mec'), 150, 84, 9000, g.E.lin);
          } },
          { t: 'Toca cada avión para revisarlo.', al: function (g) {
            ['a1', 'a2', 'a3'].forEach(function (id) { g.pos(g.q(id), PUESTO[id], 66); });
            g.qa('.pista').forEach(function (p) { p.style.visibility = 'visible'; });
            g.sfx('pop');
          } }
        ]
      },

      /* 2 · Nueva York: llega el registro a un grupo de matemáticos */
      {
        alt: 'Una ciudad de noche. Un edificio universitario con ventanas que se encienden y un mensajero que llega con una carpeta.',
        camara: { x: 0, y: -38, w: 160 },
        interactiva: true,
        arte: ciudad,
        montar: function (g) {
          g.qa('.pista').forEach(function (p) { p.style.visibility = 'hidden'; });
          var visto = false;
          g.enTocar(function (id, nodo) {
            if (visto) return;
            visto = true;
            nodo.classList.add('abierta');
            nodo.setAttribute('aria-label', 'Ventana: un pizarrón con un avión dibujado');
            g.op(g.q('pv'), 0);
            g.sfx('pregunta');
            g.camara(43, 36, 48, 1400, g.E.sua);
            g.decir('En el pizarrón, un avión. Y una pregunta: dónde poner el blindaje.');
            g.listo();
          });
        },
        lineas: [
          { t: 'En Nueva York, un grupo de matemáticos trabaja para la guerra.', al: function (g) {
            g.portada('NUEVA YORK', 'MATEMATICOS', function () { g.camara(0, 0, 160, 2600, g.E.sua); });
          } },
          { t: 'Del ejército les llegan preguntas con datos.', al: function (g) {
            for (var i = 0; i < 6; i++) (function (k) {
              g.espera(200 + k * 220, function () { g.op(g.q('v' + k), 1); g.tono(520 + k * 60, 0.05); });
            })(i);
            g.mover(g.q('cartero'), 72, 72, 3200, g.E.lin);
          } },
          { t: 'Esta vez llega el registro de los agujeros. Asómate a la ventana.', al: function (g) {
            g.qa('.pista').forEach(function (p) { p.style.visibility = 'visible'; });
          } }
        ]
      },

      /* 3 · el mapa: cada punto son unos 10 agujeros de los aviones que volvieron */
      {
        alt: 'Un avión visto desde arriba, dibujado en un pizarrón. Al marcar, se llena de puntos rojos: muchos en las alas, el fuselaje y la cola; pocos en los motores y la cabina.',
        interactiva: true,
        arte: mapa,
        lineas: [
          { t: 'Cada agujero de los aviones que volvieron va a un mapa.', al: function (g) {
            g.pop(g.q('avion'), 450);
          } },
          { t: 'Pulsa MARCAR para ponerlos todos.', al: function (g) {
            g.boton('> MARCAR LOS AGUJEROS', function (b) {
              b.disabled = true;
              var puntos = g.qa('[data-d]'), cnt = g.q('cnt'), n = 0, fmt = function (v) { return v.toLocaleString('en-US'); };
              g.sfx('whoosh');
              g.anim(4200, function (t) {
                var meta = Math.round(t * puntos.length);
                while (n < meta) {
                  puntos[n].style.opacity = 1;
                  if (n % 6 === 0) g.tono(240 + (n % 30) * 12, 0.03);
                  n++;
                }
                cnt.textContent = 'AGUJEROS: ' + fmt(Math.round(t * 1481));
              }, g.E.sua, function () {
                puntos.forEach(function (p) { p.style.opacity = 1; });
                cnt.textContent = 'AGUJEROS: 1,481';
                ['rA', 'rF', 'rT', 'rM', 'rC'].forEach(function (id, i) { g.espera(i * 260, function () { g.pop(g.q(id), 300); }); });
                g.sacudir(); g.sfx('revela');
                g.decir('Alas, fuselaje y cola, llenos de agujeros. Motores y cabina, casi limpios.');
                g.listo();
              });
            });
          } }
        ]
      },

      /* 4 · el blindaje pesa: la idea obvia, sin decidir todavía */
      {
        alt: 'El mismo mapa de agujeros con dos placas de blindaje a los lados que caen con fuerza y se acercan a las alas y la cola. Abajo, un signo de interrogación.',
        arte: blindaje,
        lineas: [
          { t: 'El blindaje pesa: solo alcanza para unas pocas zonas.', al: function (g) {
            g.espera(300, function () { g.golpear(g.q('pl1'), 260); });
            g.espera(900, function () { g.golpear(g.q('pl2'), 260); g.aparecer(g.q('kg'), 300); });
          } },
          { t: 'La idea más obvia: ponerlo donde hay más agujeros.', al: function (g) {
            g.op(g.q('kg'), 0);
            g.mover(g.q('pl1'), 52, 37, 1100, g.E.sua);
            g.mover(g.q('pl2'), 74, 59, 1300, g.E.sua);
            g.sfx('paso');
          } },
          { t: 'Antes de ordenarlo, conviene mirar los datos otra vez.', al: function (g) {
            g.pop(g.q('duda'), 400);
            g.sfx('pregunta');
          } }
        ]
      },

      /* 5 · el expediente sin resolver */
      C.final({
        codigo: '1.1',
        lineas: ['El blindaje alcanza para pocas zonas.', 'Tu turno, analista.', 'Tienes el mapa de cada agujero. ¿Te alcanza para decidir?']
      })
    ]
  };
})();
