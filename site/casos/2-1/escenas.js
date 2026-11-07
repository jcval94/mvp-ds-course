/* Caso 2.1 · «La bomba de la calle» (Londres, 1854) — intro de 5 escenas (formato completo).
   Solo la intro: gancho público. La apuesta, el mapa, la tabla del sur de Londres y la revelación viven en caso.html.
   Hechos verificados (casos/staging/john-snow-colera-1854.json): en Soho se sacaba el agua de bombas de calle; el brote
   estalló el jueves 31 de agosto de 1854; Snow escribió que hubo más de quinientos ataques mortales en diez días; la mayoría
   de los médicos atribuía el cólera al aire (miasma); Snow habló con la junta de la parroquia de St James el 7 de septiembre.
   Caso con muertes reales: sin enfermos, cuerpos ni carrozas; la cifra se dice una vez, sin sonido ni destello.
   Regla de spoilers: aquí no aparecen el mapa, las compañías de agua, la tabla del sur, qué pidió Snow ni qué pasó después. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;

  function casa(x, y, w, h, ventanas) {
    var s = R(x, y, w, h, 'var(--tq-ladrillo)') + R(x, y, w, 2, 'var(--tq-ladrillo-oscuro)');
    (ventanas || []).forEach(function (v) { s += R(x + v[0], y + v[1], 3, 4, 'var(--tq-ventana-noche)'); });
    return s;
  }
  function bomba(x, y) {
    return R(x, y, 4, 14, 'var(--tq-gris)') + R(x - 2, y, 8, 3, 'var(--tq-gris)') + R(x + 4, y + 4, 4, 2, 'var(--tq-gris)') +
      R(x - 1, y + 14, 6, 2, 'var(--tq-piedra-oscura)');
  }
  function persona(x, y, color) {
    return R(x + 1, y, 3, 3, 'var(--tq-piel)') + R(x, y + 3, 5, 6, color) + R(x + 1, y + 9, 1, 3, 'var(--tq-traje)') + R(x + 3, y + 9, 1, 3, 'var(--tq-traje)');
  }

  /* 1 · la calle y la bomba */
  function calle() {
    var s = R(0, 0, 160, 90, 'var(--tq-cielo)') + R(0, 60, 160, 30, 'var(--tq-piedra)');
    s += casa(4, 22, 34, 38, [[4, 6], [14, 6], [24, 6], [4, 20], [24, 20]]) + casa(42, 16, 30, 44, [[4, 6], [14, 6], [4, 22], [20, 22]]);
    s += casa(110, 20, 46, 40, [[4, 6], [16, 6], [30, 6], [4, 22], [30, 22]]);
    s += bomba(88, 46);
    s += P.g('fila', 0, 0, persona(74, 50, 'var(--tq-anil-gris)') + persona(98, 50, 'var(--tq-morado)') + R(104, 58, 4, 4, 'var(--tq-madera)'));
    s += T(80, 86, 'SOHO, LONDRES', 4, 'var(--tinta-suave)');
    return s;
  }
  /* 2 · el médico de la libreta */
  function medico() {
    var s = R(0, 0, 160, 90, 'var(--tq-pared)') + R(0, 64, 160, 26, 'var(--tq-madera)') + R(0, 64, 160, 2, 'var(--tq-madera-clara)');
    s += R(16, 12, 36, 28, 'var(--tq-ventana)') + R(33, 12, 2, 28, 'var(--tq-pared)') + R(16, 25, 36, 2, 'var(--tq-pared)');
    s += P.g('libreta', 96, 44, R(0, 0, 30, 20, 'var(--tq-papel)') + R(0, 0, 30, 3, 'var(--tq-papel-sombra)') +
      R(4, 7, 20, 1, 'var(--tq-gris)') + R(4, 11, 16, 1, 'var(--tq-gris)') + R(4, 15, 22, 1, 'var(--tq-gris)'));
    s += P.g('nube', 60, 8, R(0, 6, 34, 10, 'var(--tq-crema-suave)') + R(6, 0, 20, 8, 'var(--tq-crema-suave)') +
      T(17, 13, 'AIRE?', 4, 'var(--tq-comal-texto)'), 'opacity="0"');
    return s;
  }
  /* 3 · la manzana: ventanas encendidas que se apagan, sin personas */
  var VENTANAS = [];
  (function () { for (var f = 0; f < 4; f++) for (var c = 0; c < 9; c++) VENTANAS.push([22 + c * 13, 18 + f * 13]); })();
  function manzana() {
    var s = R(0, 0, 160, 90, 'var(--tq-noche)') + P.estrellas([[8, 6], [40, 10], [120, 5], [150, 12]]);
    s += R(16, 12, 128, 60, 'var(--tq-ladrillo-oscuro)') + R(0, 72, 160, 18, 'var(--tq-piedra-oscura)');
    VENTANAS.forEach(function (v, i) { s += R(v[0], v[1], 6, 7, 'var(--tq-luz)', 'data-v="' + i + '"'); });
    return s;
  }
  /* 4 · el plano: varias bombas iguales */
  var BOMBAS = [['b1', 'Broad Street', 70, 40], ['b2', 'Rupert Street', 120, 60], ['b3', 'Bridle Lane', 84, 66],
                ['b4', 'Marlborough Street', 34, 22], ['b5', 'Warwick Street', 40, 62]];
  function plano() {
    var s = R(0, 0, 160, 90, 'var(--tq-papel)');
    [[0, 34, 160, 4], [0, 56, 160, 4], [26, 0, 4, 90], [62, 0, 4, 90], [98, 0, 4, 90], [130, 0, 4, 90]].forEach(function (r) { s += R(r[0], r[1], r[2], r[3], 'var(--tq-manila)'); });
    BOMBAS.forEach(function (b) {
      s += P.hot(b[0], 'Bomba de ' + b[1], b[2] - 4, b[3] - 4, 12, 12, R(b[2], b[3], 4, 4, 'var(--tq-anil)') + R(b[2] - 1, b[3] - 1, 6, 1, 'var(--tq-anil)'));
      s += P.g('n-' + b[0], 0, 0, T(b[2] + 2, b[3] + 11, b[1].toUpperCase(), 2.6, 'var(--tq-comal-texto)'), 'opacity="0"');
    });
    return s;
  }

  window.CASO = {
    id: '2.1',
    titulo: 'LA BOMBA DE LA CALLE',
    volver: '../../index.html',
    resolver: 'caso.html',
    duracionIntro: '~1 min',
    duracionCaso: '~40 min',
    medios: 'medios.json',
    herramientasOcultas: 4,
    aviso: 'El caso trata sobre muertes reales por cólera en Londres en 1854. Trabajamos con conteos, no con historias personales.',
    despues: ['Abres el expediente aquí mismo, sin cambiar de página.', 'Apuestas antes de ver los datos.', 'Firmas tu decisión antes de saber qué pasó.'],
    fuentes: [
      { t: 'John Snow, «On the Mode of Communication of Cholera», 2.ª edición (1855)', u: 'https://www.gutenberg.org/ebooks/72894',
        n: 'Las bombas de calle de Soho, el brote de finales de agosto y los más de quinientos ataques mortales en diez días.' },
      { t: 'R. R. Frerichs, «John Snow», UCLA: el brote de Broad Street', u: 'https://epi-snow.ph.ucla.edu/Stream2_BSPoutbreak_f.html',
        n: 'La explicación del aire (miasma) y la junta de la parroquia del 7 de septiembre.' }
    ],
    escenas: [
      { alt: 'Una calle de Soho en 1854: casas de ladrillo y una bomba de agua en la acera, con gente que espera con cubetas.',
        arte: calle,
        lineas: [
          { t: 'Londres, finales de agosto de 1854.', al: function (g) { g.portada('1854', 'LONDRES', function () { g.archivo('tamesis', { lado: 'der', ms: 4200 }); }); } },
          { t: 'En Soho, mucha gente saca el agua de bombas en la calle.', al: function (g) { g.aparecer(g.q('fila'), 500); } }
        ] },
      { alt: 'Un cuarto con una ventana y una libreta sobre la mesa. Aparece una nube con la palabra aire.',
        arte: medico,
        lineas: [
          { t: 'John Snow es médico y vive cerca.', al: function (g) { g.archivo('retrato', { lado: 'izq', ms: 4200 }); } },
          { t: 'Casi todos sus colegas creen que el cólera viaja en el aire sucio.', al: function (g) { g.aparecer(g.q('nube'), 500); } }
        ] },
      { alt: 'Una manzana de noche con muchas ventanas encendidas que se van apagando una por una. Queda una sola encendida.',
        arte: manzana,
        montar: function (g) {
          var vs = g.qa('[data-v]'), orden = vs.map(function (_, i) { return i; }).filter(function (i) { return i !== 22; });
          for (var k = orden.length - 1; k > 0; k--) { var j = (k * 7 + 3) % (k + 1), x = orden[k]; orden[k] = orden[j]; orden[j] = x; }
          g.anim(5200, function (t) { var n = Math.round(t * orden.length); for (var i = 0; i < n; i++) vs[orden[i]].setAttribute('opacity', 0); }, g.E.lin);
        },
        lineas: [
          { t: 'El jueves 31 de agosto estalla un brote en unas cuantas manzanas.', al: function () {} },
          { t: 'En diez días mueren más de quinientas personas.', al: function () {} }
        ] },
      { alt: 'Un plano de calles con cinco bombas iguales. Al tocar cada una aparece el nombre de su calle.',
        interactiva: true,
        arte: plano,
        montar: function (g) {
          var vistas = {};
          g.enTocar(function (id, nodo) {
            if (vistas[id]) return; vistas[id] = true;
            var b = BOMBAS.filter(function (x) { return x[0] === id; })[0];
            nodo.setAttribute('aria-label', 'Bomba de ' + b[1] + ': vista');
            g.aparecer(g.q('n-' + id), 300);
            var n = Object.keys(vistas).length;
            g.decir(n < 2 ? 'La bomba de ' + b[1] + '. Por fuera, todas se ven iguales.' : 'La bomba de ' + b[1] + '.');
            if (n >= 2) g.listo();
          });
        },
        lineas: [
          { t: 'En el barrio hay varias bombas, y por fuera todas se ven iguales.', al: function () {} },
          { t: 'Toca dos bombas para ver en qué calle está cada una.', al: function (g) { g.sfx('pop'); } }
        ] },
      C.final({
        codigo: '2.1',
        lineas: ['El 7 de septiembre, Snow pide hablar con la junta de la parroquia.', 'Trae una petición que a casi todos les parece rara.',
          '¿Qué tendrías que ver para creerle?']
      })
    ]
  };
})();
