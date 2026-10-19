/* Caso 4.1 · «Las dos salas» (Semmelweis, Viena 1847) — versión 2, cinemática jugable
   Solo la intro: gancho público. El giro, la solución y la rúbrica viven en el cuaderno de Colab.
   Cifras (1846): clínica 1, 459 de 4,010 madres (11.4 %); clínica 2, 105 de 3,754 (2.8 %).
   En pantalla se muestran redondeadas: «cerca de 11» y «menos de 3» de cada 100.
   Regla de spoilers: aquí no aparece la causa, la solución ni las herramientas. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;

  /* ---------- gente ---------- */
  var DOCTOR = { h: 'var(--tq-cafe-oscuro)', s: 'var(--tq-piel)', k: 'var(--tq-traje)', w: 'var(--tq-papel)', b: 'var(--tq-negro)' };
  var ESTUD = { h: 'var(--tq-madera)', s: 'var(--tq-piel)', k: 'var(--tq-gris)', w: 'var(--tq-papel)', b: 'var(--tq-negro)' };
  var PARTERA = { c: 'var(--tq-papel)', s: 'var(--tq-piel)', h: 'var(--tq-cafe-oscuro)', d: 'var(--tq-anil-gris)', a: 'var(--tq-papel)', b: 'var(--tq-negro)' };
  var CUERPO_MEDICO = ['..hhhh..', '.hssssh.', '.hssssh.', '..ssss..', '.kkwwkk.', 'kkkwwkkk', 'kkkwwkkk', 'kkkkkkkk',
    'kkkkkkkk', '.kkkkkk.', '.kk..kk.', '.kk..kk.'];
  var CUERPO_PARTERA = ['..cccc..', '.cssssc.', '.hssssh.', '..ssss..', '.ddaadd.', 'ddaaaadd', 'ddaaaadd', 'ddaaaadd',
    'dddaaddd', 'ddaaaadd', 'dddddddd', '.dddddd.'];
  var PIE_A = '.bb..bb.', PIE_B = 'bb....bb';

  /* persona tocable: grupo posicionable (id) con su etiqueta oculta */
  function persona(id, cuerpo, pal, x, y, rotulo, nombre) {
    var burbuja = P.g('et_' + id, 0, 0,
      R(-12, -11, 40, 9, 'var(--tq-papel)') + R(6, -2, 4, 2, 'var(--tq-papel)') + T(8, -4, rotulo, 3.6, 'var(--tq-comal-texto)'), 'opacity="0"');
    return P.g(id, x, y, P.hot(id, nombre, -2, -3, 20, 32, P.andante(cuerpo, PIE_A, PIE_B, pal, 2)) + burbuja);
  }

  /* ---------- fachada del hospital (mundo alto: el cielo llega hasta y = -100) ---------- */
  var ESTRELLAS = [[10, 8], [28, 16], [46, 6], [64, 12], [96, 8], [118, 16], [150, 24], [22, 26], [128, 30], [86, 4],
    [14, -14], [40, -22], [66, -8], [92, -18], [120, -10], [146, -26], [30, -32], [104, -34], [76, -20], [58, -2], [8, -30], [136, -6]];

  function puerta(cx, n, tocable) {
    var x = cx - 8;
    var interior = R(x, 54, 16, 20, 'var(--comal)') + R(x + 2, 69, 8, 3, 'var(--tq-ladrillo-oscuro)') + R(x + 2, 66, 3, 3, 'var(--tq-ladrillo-oscuro)') +
      R(x + 11, 58, 3, 3, 'var(--tq-comal-texto)') + R(x + 10, 61, 5, 11, 'var(--tq-comal-texto)');
    var panel = P.g('pn' + n, 0, 0, R(x, 54, 16, 20, 'var(--madera)') + R(x + 7, 54, 2, 20, 'var(--tq-cafe)') +
      R(x + 3, 63, 2, 2, 'var(--comal)') + R(x + 11, 63, 2, 2, 'var(--comal)'));
    var marco = R(x - 2, 52, 20, 22, 'var(--piedra)');
    if (!tocable) return marco + R(x, 54, 16, 20, 'var(--madera)') + R(x + 7, 54, 2, 20, 'var(--tq-cafe)');
    var resplandor = R(x, 74, 16, 5, 'var(--comal)', 'data-id="lz' + n + '" opacity="0"');
    return P.hot(String(n), 'Abrir la puerta de la clínica ' + n, x - 3, 51, 22, 32,
      marco + interior + panel + resplandor + P.flecha(cx, 79, true));
  }

  function fachada(modo) {
    var intro = modo === 'intro';
    var s = R(0, -100, 160, 50, 'var(--tq-sombra)') + R(0, -50, 160, 50, 'var(--tq-sombra)') + R(0, 0, 160, 28, 'var(--tq-noche)') + R(0, 28, 160, 22, 'var(--tq-cielo)') +
      R(0, 50, 160, 26, 'var(--tq-cielo-bajo)') + R(0, 74, 160, 16, 'var(--suelo)');
    s += P.capa(0.35, P.estrellas(ESTRELLAS)) + P.capa(0.5, P.luna(138, 14));
    var h = R(14, 34, 132, 40, 'var(--ladrillo)');
    for (var y = 38; y < 74; y += 4) h += R(14, y, 132, 1, 'var(--ladrillo-osc)');
    h += R(12, 30, 136, 4, 'var(--piedra)') + R(68, 18, 24, 4, 'var(--piedra)') + R(60, 22, 40, 4, 'var(--piedra)') + R(52, 26, 56, 4, 'var(--piedra)');
    [20, 36, 52, 100, 116, 132].forEach(function (x, i) {
      h += R(x, 38, 8, 9, 'var(--tq-noche)') + R(x + 1, 39, 6, 7, 'var(--ventana)', 'data-id="v' + i + '"' + (intro ? ' opacity="0"' : ''));
    });
    h += P.disco(80, 46, 6, 'var(--tq-papel)') + R(80, 41, 1, 5, 'var(--tq-comal-texto)') + R(80, 46, 4, 1, 'var(--tq-comal-texto)');
    h += R(52, 48, 8, 5, 'var(--piedra)') + T(56, 52, '1', 4, 'var(--tq-comal-texto)') + R(100, 48, 8, 5, 'var(--piedra)') + T(104, 52, '2', 4, 'var(--tq-comal-texto)');
    h += R(40, 74, 32, 2, 'var(--tq-pared)') + R(88, 74, 32, 2, 'var(--tq-pared)');
    h += puerta(56, 1, intro) + puerta(104, 2, intro);
    return s + h;
  }

  /* ---------- las dos salas ---------- */
  function sala(x0, rotulo) {
    var s = R(x0, 18, 68, 58, 'var(--pared)') + R(x0, 72, 68, 4, 'var(--suelo)') +
      R(x0, 18, 68, 2, 'var(--tq-noche)') + R(x0, 74, 68, 2, 'var(--tq-noche)') + R(x0, 18, 2, 58, 'var(--tq-noche)') + R(x0 + 66, 18, 2, 58, 'var(--tq-noche)');
    s += R(x0 + 12, 20, 44, 9, 'var(--tq-noche)') + R(x0 + 13, 21, 42, 7, 'var(--comal)') + T(x0 + 34, 26.5, rotulo, 4, 'var(--tq-comal-texto)');
    s += R(x0 + 27, 31, 14, 10, 'var(--tq-noche)') + R(x0 + 28, 32, 12, 8, 'var(--tq-ventana-noche)') + R(x0 + 33, 32, 2, 8, 'var(--tq-noche)') + R(x0 + 28, 35, 12, 1, 'var(--tq-noche)');
    [x0 + 5, x0 + 41].forEach(function (bx) {
      s += R(bx, 42, 22, 2, 'var(--madera)') + R(bx, 36, 2, 10, 'var(--madera)') + R(bx + 20, 38, 2, 8, 'var(--madera)') +
        R(bx + 2, 40, 18, 3, 'var(--tq-papel)') + R(bx + 9, 38, 11, 4, 'var(--tq-anil-gris)') + R(bx + 2, 38, 6, 3, 'var(--tq-papel)') + R(bx + 3, 36, 4, 3, 'var(--tq-piel)');
    });
    return s;
  }

  var FINAL = { m0: 14, m1: 34, m2: 54, p0: 90, p1: 110, p2: 130 };
  var ROTULO = { m0: 'MEDICO', m1: 'MEDICO', m2: 'ESTUDIANTE', p0: 'PARTERA', p1: 'PARTERA', p2: 'PARTERA' };

  function salas() {
    return R(0, 0, 160, 90, 'var(--tq-panel)') + sala(8, 'CLINICA 1') + sala(84, 'CLINICA 2') + R(2, 82, 156, 1, 'var(--tq-vacio)') +
      persona('m0', CUERPO_MEDICO, DOCTOR, FINAL.m0, 45, ROTULO.m0, 'Médico de la clínica 1') +
      persona('m1', CUERPO_MEDICO, DOCTOR, FINAL.m1, 45, ROTULO.m1, 'Médico de la clínica 1') +
      persona('m2', CUERPO_MEDICO, ESTUD, FINAL.m2, 45, ROTULO.m2, 'Estudiante de medicina de la clínica 1') +
      persona('p0', CUERPO_PARTERA, PARTERA, FINAL.p0, 45, ROTULO.p0, 'Partera de la clínica 2') +
      persona('p1', CUERPO_PARTERA, PARTERA, FINAL.p1, 45, ROTULO.p1, 'Partera de la clínica 2') +
      persona('p2', CUERPO_PARTERA, PARTERA, FINAL.p2, 45, ROTULO.p2, 'Partera de la clínica 2');
  }

  /* ---------- enigma ---------- */
  function numero(id, x, rotulo, arriba, num) {
    return P.g(id, x, 24, T(0, 0, rotulo, 5, 'var(--comal)') + T(0, 10, arriba, 4, 'var(--tinta-suave)') +
      T(0, 36, num, 24, 'var(--salsa)') + T(0, 46, 'DE CADA 100', 3.6, 'var(--tinta-suave)'));
  }
  function enigma() {
    return fachada('oscuro') + R(0, 0, 160, 90, 'var(--tq-noche)', 'opacity=".9"') +
      T(80, 10, 'UN HOSPITAL. DOS RESULTADOS.', 4.5, 'var(--tinta)') +
      numero('n1', -60, 'CLINICA 1', 'CERCA DE', '11') +
      numero('n2', 220, 'CLINICA 2', 'MENOS DE', '3') +
      P.g('vs', 0, 0, T(80, 50, 'VS', 9, 'var(--comal)'), 'opacity="0"') +
      P.g('int', 0, 0, '<g class="pulsa">' + T(80, 82, '?', 20, 'var(--comal)') + '</g>', 'opacity="0"');
  }

  /* ---------- guion ---------- */
  window.CASO = {
    id: '4.1',
    titulo: 'LAS DOS SALAS',
    volver: '../../index.html',
    colab: 'https://colab.research.google.com/drive/1FNfm7Lf5e69Lw3ER5BM8L4jQMrdbyAgQ',
    duracionIntro: '~1 min',
    duracionCuaderno: '~50 min',
    herramientas: ['Comparación de proporciones', 'Prueba chi cuadrada', 'Descarte sistemático de hipótesis', 'Comparación antes y después'],
    fuentes: [
      { t: 'Ignaz Semmelweis (Wikipedia)', u: 'https://en.wikipedia.org/wiki/Ignaz_Semmelweis',
        n: 'Mortalidad materna de 1846: clínica 1, 459 de 4,010 (11.4 %); clínica 2, 105 de 3,754 (2.8 %).' }
    ],
    escenas: [

      /* 1 · la fachada: la cámara baja desde las estrellas, se encienden las ventanas, se abren las puertas */
      {
        alt: 'Fachada nocturna de un hospital con dos puertas numeradas, 1 y 2, bajo la luna.',
        camara: { x: 0, y: -58, w: 160 },
        interactiva: true,
        arte: function () { return fachada('intro'); },
        montar: function (g) {
          g.qa('.pista').forEach(function (p) { p.style.visibility = 'hidden'; });
          var abiertas = {};
          g.enTocar(function (id, nodo) {
            if (abiertas[id]) return;
            abiertas[id] = true;
            nodo.classList.add('abierta');
            nodo.setAttribute('aria-label', 'Puerta de la clínica ' + id + ' abierta');
            var x = id === '1' ? 48 : 96, pn = g.q('pn' + id), lz = g.q('lz' + id);
            g.sfx('puerta');
            g.anim(450, function (t) {
              pn.setAttribute('transform', 'translate(' + x + ' 0) scale(' + (1 - 0.8 * t).toFixed(3) + ' 1) translate(' + (-x) + ' 0)');
              lz.setAttribute('opacity', (0.4 * t).toFixed(2));
            }, g.E.sal);
            g.chispas(x + 8, 63, { n: 10, color: ['var(--tq-luz)', 'var(--tq-comal)'], v: 18, vida: 800, g: 4 });
            if (Object.keys(abiertas).length === 2) {
              g.decir('Dos salas, un mismo hospital. Vamos a verlas por dentro.');
              g.listo();
            } else {
              g.decir('Clínica ' + id + ': una sala de maternidad. Te falta la otra puerta.');
            }
          });
        },
        lineas: [
          { t: 'Viena, 1847. Un hospital enorme, de noche.', al: function (g) {
            g.portada('VIENA', '1847', function () { g.sfx('whoosh'); g.camara(0, 0, 160, 2600, g.E.sua); });
          } },
          { t: 'Dentro hay dos salas de maternidad.', al: function (g) {
            for (var i = 0; i < 6; i++) (function (k) {
              g.espera(250 + k * 240, function () { g.op(g.q('v' + k), 1); g.tono(480 + k * 70, 0.05); });
            })(i);
            g.espera(1700, function () { g.camara(32, 30, 96, 2200, g.E.sua); });
          } },
          { t: 'Elige una y cruza la puerta: toca la 1 o la 2.', al: function (g) {
            g.qa('.pista').forEach(function (p) { p.style.visibility = 'visible'; });
            g.sfx('pop');
          } }
        ]
      },

      /* 2 · las salas: la cámara pasa de una a otra, la gente entra caminando y se puede tocar */
      {
        alt: 'Dos salas lado a lado. En la clínica 1 hay médicos y estudiantes con abrigos oscuros; en la clínica 2, parteras con delantal blanco.',
        camara: { x: 4, y: 18, w: 96 },
        arte: salas,
        montar: function (g) {
          Object.keys(FINAL).forEach(function (id) {
            g.pos(g.q(id), id.charAt(0) === 'm' ? FINAL[id] - 48 : FINAL[id] + 64, 45);
          });
          g.enTocar(function (id) {
            Object.keys(FINAL).forEach(function (o) { g.op(g.q('et_' + o), 0); });
            g.pop(g.q('et_' + id), 320);
            g.espera(2600, function () { g.op(g.q('et_' + id), 0); });
          });
        },
        lineas: [
          { t: 'Clínica 1: la atienden médicos y estudiantes de medicina.', al: function (g) {
            ['m0', 'm1', 'm2'].forEach(function (id, i) {
              g.espera(i * 280, function () {
                var el = g.q(id);
                g.mover(el, FINAL[id], 45, 1700, g.E.sal, function () { g.vaiven(el, 3, 1700 + i * 300, i * 0.3); });
              });
            });
            g.sfx('paso');
          } },
          { t: 'Clínica 2: la atienden parteras.', al: function (g) {
            g.camara(64, 18, 96, 1500, g.E.sua);
            ['p0', 'p1', 'p2'].forEach(function (id, i) {
              g.espera(500 + i * 280, function () {
                var el = g.q(id);
                g.mover(el, FINAL[id], 45, 1700, g.E.sal, function () { g.vaiven(el, 3, 1900 + i * 300, i * 0.3); });
              });
            });
          } },
          { t: 'Mismo hospital, dos equipos distintos. Toca a las personas.', al: function (g) {
            g.camara(0, 0, 160, 1600, g.E.sua);
            g.sfx('whoosh');
          } }
        ]
      },

      /* 3 · 1846: letrero que cae, 200 cuadros que entran en cascada y el botón JUGAR */
      {
        alt: 'Dos tableros de cien cuadros. Cada cuadro es una madre; los rojos son las que murieron en 1846.',
        interactiva: true,
        arte: function () {
          return C.tablero({
            titulo: '1846 - 100 MADRES POR SALA', unidad: 'MADRES',
            izq: { etq: 'CLINICA 1', n: 11, parcial: 0, base: 'var(--anil)', marca: 'var(--salsa)', conMarca: true, semilla: 11 },
            der: { etq: 'CLINICA 2', n: 2, parcial: 0.8, base: 'var(--anil)', marca: 'var(--salsa)', conMarca: true, semilla: 29 }
          }) + P.g('anio', 0, 0, R(0, 0, 160, 90, 'var(--tq-sombra)', 'opacity=".9"') + T(80, 52, '1846', 30, 'var(--comal)'));
        },
        montar: function (g) {
          g.qa('[data-b]').forEach(function (r) { r.setAttribute('opacity', 0); });
        },
        lineas: [
          { t: 'Año 1846. Cada cuadro es una madre que ingresa al hospital.', al: function (g) {
            var anio = g.q('anio');
            g.espera(250, function () {
              g.golpear(anio, 300, function () {
                g.espera(1100, function () {
                  g.anim(300, function (t) { g.op(anio, 1 - t); }, g.E.lin, function () {
                    anio.style.display = 'none';
                    C.entrarTablero(g, 'MADRES', 1500);
                  });
                });
              });
            });
          } },
          { t: 'Cien madres en cada sala. Pulsa JUGAR y mira qué pasó.', al: function (g) {
            g.html('<div class="leyenda"><span><i class="c vivo"></i>Sobrevivió</span><span><i class="c muerto"></i>Murió</span></div>');
            g.boton('> JUGAR 1846', function (b) {
              b.disabled = true;
              var cL = g.q('cL'), cR = g.q('cR');
              g.sfx('golpe');
              C.revelar(g, 3800, 'var(--salsa)', function (l, d) {
                cL.textContent = 'MUEREN: ' + l;
                cR.textContent = 'MUEREN: ' + Math.min(d, 2);
              }, function () {
                cL.textContent = 'CERCA DE 11';
                cR.textContent = 'MENOS DE 3';
                g.sacudir(); g.destello('var(--tq-salsa)', 0.4); g.sfx('mal');
                g.decir('Clínica 1: cerca de 11 madres de cada 100 murieron. Clínica 2: menos de 3.');
                g.listo();
              }, g.E.sua);
            });
          } }
        ]
      },

      /* 4 · el enigma: dos cifras que chocan y un signo de interrogación */
      {
        alt: 'El hospital, oscurecido. A la izquierda, 11 de cada 100; a la derecha, menos de 3 de cada 100; y debajo, un signo de interrogación.',
        arte: enigma,
        lineas: [
          { t: 'Un hospital. Dos resultados.', al: function (g) {
            g.sfx('whoosh');
            g.mover(g.q('n1'), 38, 24, 800, g.E.sal);
            g.mover(g.q('n2'), 122, 24, 800, g.E.sal, function () {
              g.golpear(g.q('vs'), 260);
            });
          } },
          { t: 'Por cada madre que moría en la clínica 2, morían unas cuatro en la clínica 1.', al: function (g) {
            g.espera(900, function () { g.pop(g.q('int'), 450); g.sfx('pregunta'); });
          } },
          { t: 'En 1847, nadie en Viena sabía por qué.', al: function (g) {
            g.sfx('golpe');
          } }
        ]
      },

      /* 5 · el expediente sin resolver */
      C.final({
        codigo: '4.1',
        lineas: ['Este caso sigue sin resolverse.', 'Tu turno, detective.', '¿Puedes encontrar la causa con los mismos datos que tuvieron en 1847?']
      })
    ]
  };
})();
