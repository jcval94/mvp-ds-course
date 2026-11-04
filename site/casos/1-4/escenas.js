/* Caso 1.4 · «La isla a oscuras» (Puerto Rico, 2017) — intro corta de 3 escenas (formato del costo del error).
   Solo la intro: gancho público. La apuesta, la regla del conteo, el registro y la revelación viven en caso.html.
   Hechos verificados (casos/staging/puerto-rico-maria-2017.json): el huracán María cruzó Puerto Rico el 20 de septiembre
   de 2017; en diciembre de 2017 la cifra oficial de muertes era 64; el 18 de diciembre el gobernador ordenó revisar las
   muertes ocurridas desde el huracán (NBC News).
   Caso con muertes reales: sin personas, daños ni escenas de dolor; ningún sonido ni destello alrededor de la cifra.
   Regla de spoilers: aquí no aparecen cómo se contó el 64, el registro mensual, la herramienta ni otras cifras. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;

  /* Isla en pixeles (silueta aproximada, alargada de este a oeste) y luces de pueblos */
  var FILAS = ['......XXXXXXXXXXXXXXXXXXXXXX.........', '...XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX....', '.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.',
    'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', '.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', '..XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX..',
    '....XXXXXXXXXXXXXXXXXXXXXXXXXXXXX....', '.........XXXXXXXXXXXXXXXXXXX.........'];
  var IX = 24, IY = 34, IS = 3;
  function luces() {
    var celdas = [], sd = 2017, s = '';
    FILAS.forEach(function (f, j) { for (var i = 0; i < f.length; i++) if (f.charAt(i) === 'X') celdas.push([i, j]); });
    for (var n = 0; n < 70; n++) {
      sd = (sd * 1664525 + 1013904223) >>> 0;
      var c = celdas[sd % celdas.length], fija = n % 12 === 0;
      s += R(IX + c[0] * IS + 1, IY + c[1] * IS + 1, 1, 1, 'var(--tq-luz)', 'data-luz="' + (fija ? 'f' : 'v') + '"');
    }
    return s;
  }
  function isla() {
    var s = R(0, 0, 160, 90, 'var(--tq-noche)');
    s += P.estrellas([[12, 8], [30, 14], [52, 6], [88, 11], [120, 7], [146, 15], [70, 20], [134, 24]]);
    s += R(0, 62, 160, 28, 'var(--tq-ventana-noche)');
    var tierra = '';
    FILAS.forEach(function (f, j) { for (var i = 0; i < f.length; i++) if (f.charAt(i) === 'X') tierra += R(IX + i * IS, IY + j * IS, IS, IS, 'var(--tq-tinta)'); });
    s += P.hot('isla', 'Ver la isla antes y después del huracán', IX - 2, IY - 2, FILAS[0].length * IS + 4, FILAS.length * IS + 4, tierra + luces());
    s += T(80, 82, 'PUERTO RICO', 4, 'var(--tinta-suave)') + P.g('estado', 0, 0, T(80, 26, 'ANTES', 4.5, 'var(--comal)'));
    return s;
  }
  function escritorio() {
    var s = R(0, 0, 160, 90, 'var(--tq-pared)') + R(0, 58, 160, 32, 'var(--tq-madera)') + R(0, 58, 160, 2, 'var(--tq-madera-clara)');
    s += P.g('nota', 46, 20, R(0, 0, 68, 34, 'var(--tq-papel)') + R(0, 0, 68, 5, 'var(--tq-papel-sombra)') +
      T(34, 4, 'CIFRA OFICIAL', 3, 'var(--tq-comal-texto)') + T(34, 26, '64', 16, 'var(--tq-comal-texto)'), 'opacity="0"');
    s += P.hot('carpeta', 'Abrir la carpeta para ver la fecha', 118, 60, 30, 20,
      R(118, 62, 30, 18, 'var(--tq-manila)') + R(120, 60, 12, 3, 'var(--tq-manila)') + P.g('fecha', 0, 0, T(133, 74, '18 DIC 2017', 2.6, 'var(--tq-comal-texto)'), 'opacity="0"'));
    return s;
  }

  window.CASO = {
    id: '1.4',
    titulo: 'LA ISLA A OSCURAS',
    volver: '../../index.html',
    resolver: 'caso.html',
    duracionIntro: '~40 s',
    duracionCaso: '~25 min',
    medios: 'medios.json',
    herramientasOcultas: 2,
    aviso: 'El caso trata sobre muertes reales después del huracán María. Trabajamos con conteos, no con historias personales.',
    despues: ['Abres el expediente aquí mismo, sin cambiar de página.', 'Apuestas antes de ver el registro.', 'Firmas tu cifra antes de saber qué pasó.'],
    fuentes: [
      { t: 'NOAA · National Hurricane Center, informe del ciclón tropical María (AL152017)', u: 'https://www.nhc.noaa.gov/data/tcr/AL152017_Maria.pdf',
        n: 'El huracán María tocó tierra en Puerto Rico el 20 de septiembre de 2017.' },
      { t: 'NBC News, diciembre de 2017', u: 'https://www.nbcnews.com/storyline/puerto-rico-crisis/puerto-rico-governor-orders-review-death-count-after-hurricane-maria-n830761',
        n: 'La cifra oficial de 64 y la orden de revisar las muertes desde el huracán.' }
    ],
    escenas: [

      /* 1 · la isla a oscuras */
      {
        alt: 'Puerto Rico de noche visto desde arriba, con las luces de sus pueblos. Al tocar la isla, casi todas las luces se apagan.',
        interactiva: true,
        arte: isla,
        montar: function (g) {
          var visto = false;
          g.enTocar(function () {
            if (visto) return;
            visto = true;
            var ls = g.qa('[data-luz="v"]');
            g.anim(1600, function (t) { var n = Math.round(t * ls.length); for (var i = 0; i < n; i++) ls[i].setAttribute('opacity', 0); }, g.E.lin, function () {
              ls.forEach(function (l) { l.setAttribute('opacity', 0); });
              g.q('estado').querySelector('text').textContent = 'DESPUES';
              g.decir('Una semana después, así se ve la isla de noche.');
              g.listo();
            });
          });
        },
        lineas: [
          { t: '20 de septiembre de 2017. El huracán María cruza Puerto Rico.', al: function (g) {
            g.portada('2017', 'PUERTO RICO', function () { g.archivo('luces-pr-2017', { lado: 'der', ms: 4200 }); });
          } },
          { t: 'Toca la isla para ver el antes y el después.', al: function (g) { g.sfx('pop'); } }
        ]
      },

      /* 2 · el número que no cuadra */
      {
        alt: 'Un escritorio. Cae una nota con la cifra oficial: 64. Junto a ella, una carpeta con una fecha.',
        interactiva: true,
        arte: escritorio,
        montar: function (g) {
          var visto = false;
          g.enTocar(function (id, nodo) {
            if (visto) return;
            visto = true;
            nodo.setAttribute('aria-label', 'Carpeta abierta: 18 de diciembre de 2017');
            g.aparecer(g.q('fecha'), 300);
            g.decir('El 18 de diciembre, el gobernador ordena revisar todas las muertes desde el huracán.');
            g.archivo('titular-revision-2017', { lado: 'izq', ms: 4200 });
            g.listo();
          });
        },
        lineas: [
          { t: 'En diciembre, la cifra oficial de muertes es 64.', al: function (g) { g.aparecer(g.q('nota'), 500); } },
          { t: 'Toca la carpeta para ver qué pasó después.', al: function () {} }
        ]
      },

      /* 3 · el expediente del costo */
      C.final({
        codigo: '1.4',
        lineas: ['Un número oficial. Un registro de defunciones.', 'Nadie sabe todavía cuál dice la verdad.',
          '¿Qué tendrías que revisar antes de creerle a una cifra oficial?']
      })
    ]
  };
})();
