/* Caso 4.2 · «44 contra 35» (admisiones de posgrado en Berkeley, 1973) — versión 2, cinemática jugable
   Solo la intro: gancho público. El giro, la solución y la rúbrica viven en el cuaderno de Colab.
   Cifras: cerca de 44 % de los hombres y 35 % de las mujeres que solicitaron fueron admitidos.
   Decisión de diseño: la pregunta detonadora del temario («¿puede cada departamento ser justo y el total no?»)
   revela el giro, así que aquí se usa una más suave; la original queda para el cuaderno. Tampoco se muestran
   las herramientas del caso (herramientasOcultas), porque nombrarlas también lo revelaría.
   Las filas de la ventanilla no marcan quién entra y quién no: ese dato solo aparece en el tablero. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;

  /* ---------- gente ---------- */
  var HOMBRE = { h: 'var(--tq-cafe-oscuro)', s: 'var(--tq-piel)', t: 'var(--tq-anil)', j: 'var(--tq-traje)', b: 'var(--tq-negro)' };
  var MUJER = { h: 'var(--tq-cafe)', s: 'var(--tq-piel)', t: 'var(--tq-comal)', j: 'var(--tq-traje)', b: 'var(--tq-negro)' };
  var CUERPO_H = ['..hhhh..', '.hhhhhh.', '.hssssh.', '..ssss..', '.tttttt.', 'tttttttt', 'tttttttt', 'tttttttt',
    '.tttttt.', '.jjjjjj.', '.jj..jj.', '.jj..jj.'];
  var CUERPO_M = ['..hhhh..', '.hhhhhh.', 'hhsssshh', 'hh.ss.hh', 'hhtttthh', 'tttttttt', 'tttttttt', 'tttttttt',
    '.tttttt.', '.jjjjjj.', '.jj..jj.', '.jj..jj.'];
  var PIE_A = '.bb..bb.', PIE_B = 'bb....bb';

  /* ---------- campus al atardecer (mundo de 160 x 90) ---------- */
  var VENT = [26, 35, 44, 53, 62, 98, 107, 116, 125];

  function sobre(x, n, esSi) {
    var col = esSi ? 'var(--nopal)' : 'var(--salsa)';
    var pts = esSi ? [[0, 3], [1, 4], [2, 5], [3, 4], [4, 3], [5, 2], [6, 1], [7, 0]]
      : [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [5, 0], [4, 1], [3, 2], [1, 4], [0, 5]];
    var marca = '';
    pts.forEach(function (p) { marca += R(x + (esSi ? 4.5 : 5.5) + p[0], 71.5 + p[1], 1.6, 1.6, col); });
    var solapaCerrada = '';
    for (var r = 0; r < 6; r++) solapaCerrada += R(x + r, 78 + r, 16 - 2 * r, 1, 'var(--tq-papel-pliegue)');
    solapaCerrada += R(x + 7, 83, 2, 2, 'var(--salsa)');
    var solapaAbierta = '';
    for (var q = 0; q < 6; q++) solapaAbierta += R(x + q, 77 - q, 16 - 2 * q, 1, 'var(--tq-crema-suave)');
    var papel = P.g('pp' + n, 0, 12,
      R(x + 2, 66, 12, 14, 'var(--tq-blanco)') + R(x + 4, 68, 8, 1, 'var(--tq-crema-suave)') + R(x + 4, 69.5, 6, 1, 'var(--tq-crema-suave)') +
      P.g('mk' + n, 0, 0, marca, 'opacity="0"'));
    var dentro = '<clipPath id="cp' + n + '"><rect x="' + (x - 4) + '" y="40" width="24" height="48"/></clipPath>' +
      P.g('fo' + n, 0, 0, solapaAbierta, 'opacity="0"') + '<g clip-path="url(#cp' + n + ')">' + papel + '</g>' +
      R(x, 78, 16, 10, 'var(--tq-papel)') + R(x, 88, 16, 1, 'var(--tq-papel-sombra)') + P.g('fc' + n, 0, 0, solapaCerrada);
    return P.g('s' + n, 190, 0, P.hot(String(n), 'Abrir el sobre ' + n, x - 3, 62, 22, 29, dentro + P.flecha(x + 8, 71)));
  }

  function campus() {
    var s = R(0, 0, 160, 15, 'var(--tq-cielo-bajo)') + R(0, 15, 160, 15, 'var(--tq-morado)') + R(0, 30, 160, 12, 'var(--tq-morado-claro)') +
      R(0, 42, 160, 10, 'var(--tq-rosa-oscuro)') + R(0, 52, 160, 22, 'var(--tq-naranja)') + R(0, 74, 160, 16, 'var(--suelo)');
    // nubes de atardecer (lejanas, se desplazan solas)
    s += P.capa(0.6, P.g('nubes', 0, 0,
      R(20, 20, 30, 2, 'var(--tq-rosa)', 'opacity=".55"') + R(26, 22, 22, 2, 'var(--tq-rosa)', 'opacity=".4"') +
      R(96, 30, 36, 2, 'var(--tq-rosa)', 'opacity=".5"') + R(104, 32, 24, 2, 'var(--tq-rosa)', 'opacity=".35"') +
      R(64, 12, 24, 2, 'var(--tq-rosa)', 'opacity=".45"')));
    // el sol se hunde detrás del edificio
    s += P.g('sol', 0, 0, P.disco(118, 38, 9, 'var(--tq-ventana)') + P.disco(118, 38, 6, 'var(--tq-luz)'));
    s += P.g('noche', 0, 0, R(0, 0, 160, 74, 'var(--tq-cielo)'), 'opacity="0"');
    // pájaros
    var ave = function (id, y) {
      var pal = { x: 'var(--tq-cielo-bajo)' };
      return P.g(id, 175, y, P.sprite(['x...x', '.x.x.', '..x..'], pal, 0, 0, 1, 'fa') + P.sprite(['..x..', '.x.x.', 'x...x'], pal, 0, 0, 1, 'fb'));
    };
    s += ave('av0', 14) + ave('av1', 22) + ave('av2', 9);
    // edificio largo
    s += R(20, 48, 120, 26, 'var(--piedra)') + R(18, 46, 124, 3, 'var(--tq-piedra-oscura)');
    VENT.forEach(function (x, i) {
      s += R(x, 54, 5, 8, 'var(--tq-suelo)') + R(x + 1, 55, 3, 6, 'var(--tq-gris)') + R(x + 1, 55, 3, 6, 'var(--ventana)', 'data-id="w' + i + '" opacity="0"');
    });
    // torre con reloj
    s += R(72, 28, 16, 46, 'var(--tq-arena)') + R(74, 20, 12, 8, 'var(--tq-arena)') + R(77, 12, 6, 8, 'var(--tq-arena)') + R(79, 6, 2, 6, 'var(--tq-piedra-oscura)') +
      R(70, 26, 20, 3, 'var(--tq-piedra-oscura)') + P.disco(80, 36, 5, 'var(--tq-papel)') + R(80, 33, 1, 3, 'var(--tq-comal-texto)') +
      R(80, 32, 1, 4, 'var(--tq-comal-texto)', 'data-id="mano"') +
      R(78, 50, 4, 8, 'var(--tq-suelo)') + R(78, 62, 4, 12, 'var(--tq-cafe)');
    // árboles
    [[10, 66], [150, 66]].forEach(function (a) {
      s += R(a[0] - 1, a[1], 3, 9, 'var(--tq-cafe)') + P.disco(a[0], a[1] - 3, 7, 'var(--tq-gris)') + P.disco(a[0] - 2, a[1] - 5, 3, 'var(--tq-anil-gris)');
    });
    // sobres tocables (entran deslizándose desde la derecha)
    [[28, 1, true], [58, 2, false], [88, 3, true], [118, 4, false]].forEach(function (e) { s += sobre(e[0], e[1], e[2]); });
    return s;
  }

  /* ---------- las filas y la ventanilla ---------- */
  var HX = [12, 25, 38, 51];       // hombres: del fondo (0) a la ventanilla (3)
  var MX = [136, 123, 110, 97];    // mujeres: del fondo (0) a la ventanilla (3)
  var YF = 52;

  function fila(prefijo, cuerpo, pal, xs, desde) {
    var s = '';
    xs.forEach(function (x, i) {
      s += P.g(prefijo + i, desde(x), YF, '<g>' + P.andante(cuerpo, PIE_A, PIE_B, pal, 1.5) + '</g>');
    });
    return s;
  }

  function sellado(id) {
    var rect = R(0, 0, 10, 7, 'var(--tq-papel)') + R(0, 6, 10, 1, 'var(--tq-papel-sombra)');
    for (var r = 0; r < 4; r++) rect += R(r, r, 10 - 2 * r, 1, 'var(--tq-papel-pliegue)');
    return P.g(id, 75, 51, rect + R(4, 4, 2, 2, 'var(--salsa)'), 'opacity="0"');
  }

  function ventanilla() {
    var s = R(0, 0, 160, 15, 'var(--tq-cielo-bajo)') + R(0, 15, 160, 15, 'var(--tq-morado)') + R(0, 30, 160, 12, 'var(--tq-morado-claro)') +
      R(0, 42, 160, 10, 'var(--tq-rosa-oscuro)') + R(0, 52, 160, 22, 'var(--tq-naranja)') + R(0, 74, 160, 16, 'var(--suelo)') + R(0, 74, 160, 2, 'var(--tq-cielo)');
    // la ventanilla
    s += R(68, 34, 24, 40, 'var(--madera)') + R(66, 32, 28, 3, 'var(--tq-cafe)') + R(72, 40, 16, 12, 'var(--tq-noche)') + R(74, 42, 12, 8, 'var(--ventana)') +
      R(72, 40, 16, 12, 'var(--tq-cafe)', 'data-id="per"') + R(70, 56, 20, 3, 'var(--tq-cafe)') + R(77, 58, 6, 1, 'var(--tq-papel)');
    s += fila('ho', CUERPO_H, HOMBRE, HX, function (x) { return x - 70; });
    s += fila('mu', CUERPO_M, MUJER, MX, function (x) { return x + 70; });
    s += sellado('eh0') + sellado('eh1') + sellado('em0') + sellado('em1');
    s += P.g('lh', 0, 0, T(37, 46, 'HOMBRES', 4.5, 'var(--tinta)'), 'opacity="0"');
    s += P.g('lm', 0, 0, T(123, 46, 'MUJERES', 4.5, 'var(--tinta)'), 'opacity="0"');
    return s;
  }

  /* un ciclo: cada fila recibe un sobre cerrado en la ventanilla; quien lo recibe se va y los demás avanzan */
  function ciclo(g, k) {
    var j = 3 - k, h = g.q('ho' + j), m = g.q('mu' + j), eh = g.q('eh' + k), em = g.q('em' + k);
    g.sfx('pop');
    g.op(eh, 1); g.op(em, 1);
    g.mover(eh, HX[j] + 9, 57, 450, g.E.sal);
    g.mover(em, MX[j] - 8, 57, 450, g.E.sal, function () {
      g.sfx('paso');
      g.mover(h, HX[j] - 34, 94, 1100, g.E.ent); g.mover(eh, HX[j] - 25, 99, 1100, g.E.ent);
      g.mover(m, MX[j] + 34, 94, 1100, g.E.ent); g.mover(em, MX[j] + 26, 99, 1100, g.E.ent);
      for (var i = 0; i < j; i++) {
        g.mover(g.q('ho' + i), HX[i + k + 1], YF, 600, g.E.sua);
        g.mover(g.q('mu' + i), MX[i + k + 1], YF, 600, g.E.sua);
      }
    });
  }

  /* ---------- la balanza (muelle físico: la viga oscila hasta asentarse) ---------- */
  var B = {};
  function moneda(id, x, y) {
    return P.g(id, x, y, R(0, 0, 4, 3, 'var(--comal)') + R(0, 0, 4, 1, 'var(--tq-luz)'), 'opacity="0"');
  }
  function platillo(id, lado, n) {
    var s = R(-8, 0, 1, 14, 'var(--tq-papel-sombra)') + R(8, 0, 1, 14, 'var(--tq-papel-sombra)') + R(-12, 14, 25, 2, 'var(--tq-oro)') + R(-10, 16, 21, 2, 'var(--tq-madera-clara)');
    for (var j = 0; j < n; j++) s += moneda('c' + lado + j, -10 + (j % 5) * 4, -40);
    var nombre = lado === 'L' ? 'Poner las cifras de los hombres en la balanza' : 'Poner las cifras de las mujeres en la balanza';
    return P.g(id, lado === 'L' ? 42 : 118, 30, P.hot(lado, nombre, -15, -12, 31, 34, s + P.flecha(0, -10)));
  }
  function balanza() {
    var s = R(0, 0, 160, 90, 'var(--tq-panel)') + R(0, 78, 160, 12, 'var(--suelo)');
    s += R(66, 74, 28, 4, 'var(--tq-ladrillo-oscuro)') + R(70, 70, 20, 4, 'var(--tq-madera)') + R(78, 28, 4, 44, 'var(--tq-madera-clara)');
    s += P.g('viga', 0, 0, R(42, 27, 76, 3, 'var(--tq-oro)') + R(42, 26, 3, 5, 'var(--tq-madera-clara)') + R(115, 26, 3, 5, 'var(--tq-madera-clara)'));
    s += P.disco(80, 28, 4, 'var(--comal)');
    s += platillo('pl', 'L', 9) + platillo('pr', 'R', 7);
    s += T(42, 64, 'HOMBRES', 4.5, 'var(--tinta-suave)') + T(118, 64, 'MUJERES', 4.5, 'var(--tinta-suave)');
    s += P.g('n44', 42, 14, T(0, 0, '44', 9, 'var(--comal)'), 'opacity="0" pointer-events="none"');
    s += P.g('n35', 118, 14, T(0, 0, '35', 9, 'var(--comal)'), 'opacity="0" pointer-events="none"');
    return s;
  }
  function colocarBalanza(g) {
    var rad = B.ang * Math.PI / 180, c = Math.cos(rad), s = Math.sin(rad);
    B.viga.setAttribute('transform', 'rotate(' + B.ang.toFixed(2) + ' 80 28)');
    g.pos(B.pl, 80 - 38 * c, 28.5 - 38 * s);
    g.pos(B.pr, 80 + 38 * c, 28.5 + 38 * s);
  }
  function coinFinal(j) { return { x: -10 + (j % 5) * 4, y: 11 - 3 * Math.floor(j / 5) }; }

  /* Cada platillo recibe sus monedas (una por cada ~5 puntos: 9 para 44, 7 para 35); la viga reacciona a cada una. */
  function soltarMonedas(g, lado, fin) {
    var n = lado === 'L' ? 9 : 7, pan = lado === 'L' ? B.pl : B.pr;
    function inclinar() { B.meta = Math.max(-14, Math.min(14, -4.5 * (B.nL - B.nR))); }
    if (g.reducir) {
      for (var j = 0; j < n; j++) { var c0 = g.q('c' + lado + j), f0 = coinFinal(j); g.pos(c0, f0.x, f0.y); g.op(c0, 1); }
      if (lado === 'L') B.nL = n; else B.nR = n;
      inclinar(); B.ang = B.meta; colocarBalanza(g);
      fin();
      return;
    }
    for (var i = 0; i < n; i++) (function (j) {
      g.espera(j * 200, function () {
        var c = g.q('c' + lado + j), f = coinFinal(j);
        g.op(c, 1);
        g.mover(c, f.x, f.y, 330, g.E.ent, function () {
          if (lado === 'L') B.nL += 1; else B.nR += 1;
          inclinar();
          B.vel += lado === 'L' ? -10 : 10;
          g.tono(900 + j * 30, 0.04);
          g.chispas(pan._x + f.x + 2, pan._y + f.y, { n: 3, color: ['var(--tq-luz)', 'var(--tq-comal)'], v: 14, vida: 400, g: 40 });
          if (j === n - 1) g.espera(250, fin);
        });
      });
    })(i);
  }

  /* ---------- guion ---------- */
  window.CASO = {
    id: '4.2',
    titulo: '44 CONTRA 35',
    volver: '../../index.html',
    colab: 'https://colab.research.google.com/drive/1dTrByn08HxKMfNRSDoy44FqGrCGS97qG',
    duracionIntro: '~1 min',
    duracionCuaderno: '~50 min',
    herramientasOcultas: 4,
    fuentes: [
      { t: 'Bickel, Hammel y O\'Connell (1975), «Sex Bias in Graduate Admissions: Data from Berkeley»',
        u: 'https://homepage.stat.uiowa.edu/~mbognar/1030/Bickel-Berkeley.pdf',
        n: 'Posgrados de Berkeley, otoño de 1973: cerca de 44 % de los hombres y 35 % de las mujeres que solicitaron fueron admitidos.' }
    ],
    escenas: [

      /* 1 · el campus: cae la tarde, el reloj corre, se encienden las ventanas y llegan los sobres */
      {
        alt: 'Atardecer en un campus universitario con una torre con reloj, un sol que se oculta y cuatro sobres en el suelo.',
        interactiva: true,
        arte: campus,
        montar: function (g) {
          g.qa('.pista').forEach(function (p) { p.style.visibility = 'hidden'; });
          var esSi = { '1': true, '2': false, '3': true, '4': false }, abiertos = {};
          g.enTocar(function (id, nodo) {
            if (abiertos[id]) return;
            abiertos[id] = true;
            nodo.classList.add('abierta');
            var si = esSi[id], x = [0, 28, 58, 88, 118][+id];
            nodo.setAttribute('aria-label', 'Sobre ' + id + ' abierto: ' + (si ? 'admitido' : 'no admitido'));
            g.sfx('pop');
            g.q('fc' + id).setAttribute('opacity', 0);
            g.q('fo' + id).setAttribute('opacity', 1);
            g.mover(g.q('pp' + id), 0, 1, 380, g.E.sal, function () {
              g.pop(g.q('mk' + id), 320);
              g.sfx(si ? 'ok' : 'mal');
              g.chispas(x + 8, 72, { n: 12, color: si ? ['var(--tq-anil)', 'var(--tq-luz)', 'var(--tq-ventana)'] : ['var(--tq-salsa)', 'var(--tq-salsa-clara)'], v: 28, vida: 800, g: 40 });
            });
            if (Object.keys(abiertos).length === 4) {
              g.decir('Miles de sobres así. Y una pregunta incómoda: ¿discrimina la universidad a las mujeres?');
              g.listo();
            } else {
              g.decir((si ? 'Admitido.' : 'No admitido.') + ' Cada solicitud termina en un sí o en un no.');
            }
          });
        },
        lineas: [
          { t: 'Berkeley, California. Otoño de 1973.', al: function (g) {
            g.portada('BERKELEY', '1973');
            var sol = g.q('sol'), noche = g.q('noche'), nubes = g.q('nubes'), mano = g.q('mano');
            g.anim(11000, function (t) { g.pos(sol, 0, 22 * t); g.op(noche, 0.6 * t); }, g.E.lin);
            g.anim(60000, function (t) { g.pos(nubes, -70 * t, 0); }, g.E.lin);
            var P4 = [[80, 32, 1, 4], [80, 36, 4, 1], [80, 36, 1, 4], [77, 36, 4, 1]];
            g.cada(110, function (n) {
              if (n > 40) return;
              var p = P4[n % 4];
              mano.setAttribute('x', p[0]); mano.setAttribute('y', p[1]); mano.setAttribute('width', p[2]); mano.setAttribute('height', p[3]);
            });
            ['av0', 'av1', 'av2'].forEach(function (id, i) {
              g.espera(2200 + i * 1100, function () { g.mover(g.q(id), -30, g.q(id)._y, 7000, g.E.lin); });
            });
          } },
          { t: 'Miles de personas esperan una respuesta: sí o no.', al: function (g) {
            VENT.forEach(function (_, i) {
              g.espera(200 + i * 190, function () { g.op(g.q('w' + i), 1); g.tono(420 + i * 45, 0.04); });
            });
            g.espera(500, function () { g.camara(24, 27, 112, 2000, g.E.sua); });
            [1, 2, 3, 4].forEach(function (n, i) {
              g.espera(900 + i * 380, function () { g.mover(g.q('s' + n), 0, 0, 700, g.E.reb); g.sfx('pop'); });
            });
          } },
          { t: 'Cada solicitud termina en un sobre. Ábrelos.', al: function (g) {
            g.qa('.pista').forEach(function (p) { p.style.visibility = 'visible'; });
            g.sfx('pop');
          } }
        ]
      },

      /* 2 · las filas: dos colas reciben un sobre cerrado en la ventanilla */
      {
        alt: 'Dos filas de solicitantes, hombres a la izquierda y mujeres a la derecha, reciben un sobre cerrado en una ventanilla.',
        arte: ventanilla,
        lineas: [
          { t: 'Dos filas: los hombres a un lado, las mujeres al otro.', al: function (g) {
            [0, 1, 2, 3].forEach(function (i) {
              g.espera(i * 220, function () {
                g.mover(g.q('ho' + i), HX[i], YF, 1600, g.E.sal);
                g.mover(g.q('mu' + i), MX[i], YF, 1600, g.E.sal);
              });
            });
            g.sfx('paso');
            g.espera(1900, function () { g.pop(g.q('lh'), 320); g.pop(g.q('lm'), 320); });
          } },
          { t: 'Todos esperan lo mismo: un sobre cerrado.', al: function (g) {
            g.camara(8, 9, 144, 1500, g.E.sua);
            var per = g.q('per');
            g.anim(700, function (t) { per.setAttribute('height', (12 * (1 - t)).toFixed(2)); }, g.E.sal);
            g.sfx('whoosh');
            g.espera(900, function () { ciclo(g, 0); });
            g.espera(3300, function () { ciclo(g, 1); });
          } },
          { t: 'Dentro de cada uno: un sí o un no.', al: function (g) {
            g.camara(32, 22, 96, 2200, g.E.sua);
            g.op(g.q('lh'), 0); g.op(g.q('lm'), 0);
            g.espera(1200, function () { g.destello('var(--tq-ventana)', 0.25); g.sfx('revela'); });
          } }
        ]
      },

      /* 3 · el tablero: cien personas por grupo; se abren los sobres y cuentan los admitidos */
      {
        alt: 'Dos tableros de cien cuadros. Cada cuadro dorado es una persona admitida.',
        interactiva: true,
        arte: function () {
          return C.tablero({
            titulo: 'SOLICITANTES - 100 POR GRUPO', unidad: 'PERSONAS',
            izq: { etq: 'HOMBRES', n: 44, parcial: 0, base: 'var(--vacio)', marca: 'var(--comal)', conMarca: false, semilla: 44 },
            der: { etq: 'MUJERES', n: 35, parcial: 0, base: 'var(--vacio)', marca: 'var(--comal)', conMarca: false, semilla: 35 }
          }) + P.g('mas9', 0, 0, T(80, 49, '+9', 14, 'var(--salsa)') + T(80, 58, 'PUNTOS', 4, 'var(--tinta-suave)'), 'opacity="0"');
        },
        montar: function (g) {
          g.qa('[data-b]').forEach(function (r) { r.setAttribute('opacity', 0); });
        },
        lineas: [
          { t: 'Cada cuadro es una persona que solicitó entrar a un posgrado.', al: function (g) {
            C.entrarTablero(g, 'PERSONAS', 1600);
          } },
          { t: 'Abre los sobres y cuenta cuántos entraron.', al: function (g) {
            g.html('<div class="leyenda"><span><i class="c adm"></i>Admitido</span><span><i class="c no"></i>No admitido</span></div>');
            g.boton('> ABRIR LOS SOBRES', function (b) {
              b.disabled = true;
              var cL = g.q('cL'), cR = g.q('cR');
              g.sfx('whoosh');
              C.revelar(g, 4200, 'var(--comal)', function (l, d) {
                cL.textContent = 'ADMITIDOS: ' + l;
                cR.textContent = 'ADMITIDOS: ' + d;
              }, function () {
                cL.textContent = '44 DE 100';
                cR.textContent = '35 DE 100';
                g.pop(g.q('mas9'), 450);
                g.sacudir(); g.destello('var(--tq-comal)', 0.35); g.sfx('revela');
                g.decir('De cada 100 hombres que solicitaron, 44 fueron admitidos. De cada 100 mujeres, 35. Son nueve puntos de diferencia.');
                g.listo();
              }, g.E.sua);
            });
          } }
        ]
      },

      /* 4 · la balanza: caen las monedas, la viga oscila y se inclina */
      {
        alt: 'Una balanza con dos platillos, hombres y mujeres. Al tocarlos caen monedas: 44 de un lado y 35 del otro, y la balanza se inclina hacia los hombres.',
        interactiva: true,
        arte: balanza,
        montar: function (g) {
          B = { ang: 0, vel: 0, meta: 0, nL: 0, nR: 0, viga: g.q('viga'), pl: g.q('pl'), pr: g.q('pr'), listos: {} };
          colocarBalanza(g);
          g.qa('.pista').forEach(function (p) { p.style.visibility = 'hidden'; });
          g.enTocar(function (lado, nodo) {
            if (B.listos[lado] !== undefined) return;
            B.listos[lado] = false;
            nodo.classList.add('abierta');
            nodo.setAttribute('aria-label', lado === 'L' ? 'Hombres: 44 de cada 100 admitidos' : 'Mujeres: 35 de cada 100 admitidas');
            soltarMonedas(g, lado, function () {
              B.listos[lado] = true;
              g.pop(g.q(lado === 'L' ? 'n44' : 'n35'), 380); g.sfx('moneda');
              if (B.listos.L === true && B.listos.R === true) {
                g.decir('44 contra 35: nueve puntos de diferencia.');
                g.listo();
              } else {
                g.decir(lado === 'L' ? 'Hombres: 44 de cada 100. Falta el otro platillo.' : 'Mujeres: 35 de cada 100. Falta el otro platillo.');
              }
            });
          });
          g.cada(33, function () {
            B.vel += (60 * (B.meta - B.ang) - 7 * B.vel) * 0.033;
            B.ang += B.vel * 0.033;
            colocarBalanza(g);
          });
        },
        lineas: [
          { t: 'Ponle números a la balanza: toca cada platillo.', al: function (g) {
            g.qa('.pista').forEach(function (p) { p.style.visibility = 'visible'; });
          } }
        ]
      },

      /* 5 · el expediente sin resolver */
      C.final({
        codigo: '4.2',
        lineas: ['Un número no basta para condenar a nadie.', 'Tu turno, analista.', 'Antes de decidir, ¿qué le preguntarías a los datos?']
      })
    ]
  };
})();
