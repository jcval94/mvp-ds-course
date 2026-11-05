/* Caso 13.11 · «Vuelo 143» (Air Canada, 1983) — intro corta de 3 escenas (formato del costo del error).
   Solo la intro: gancho público. La apuesta, la hoja de carga, el visto bueno del asistente y la revelación viven en caso.html.
   Hechos verificados (casos/staging/gimli-glider-1983.json, informe Lockwood 1985, pp. 41-42): 23 de julio de 1983, Boeing
   767-233 C-GAUN, Montreal-Ottawa-Edmonton; los indicadores de combustible de la cabina estaban en blanco y se midió con
   varillas: 7,682 litros en los tanques; el plan pedía un mínimo de 22,300 kg.
   Regla de spoilers: aquí no aparecen el 1.77, la hoja, libras, densidad, conversión ni rango, ni qué pasó en vuelo. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;

  function plataforma() {
    var s = R(0, 0, 160, 90, 'var(--tq-cielo)') + R(0, 66, 160, 24, 'var(--tq-piedra)') + R(0, 66, 160, 1, 'var(--tq-piedra-oscura)');
    for (var x = 6; x < 160; x += 24) s += R(x, 77, 12, 1, 'var(--tq-crema)');
    var avion = R(26, 44, 104, 12, 'var(--tq-blanco)') + R(130, 46, 8, 8, 'var(--tq-blanco)') + R(136, 48, 4, 4, 'var(--tq-anil-gris)') +
      R(30, 30, 10, 14, 'var(--tq-salsa)') + R(26, 50, 104, 2, 'var(--tq-salsa)') + R(66, 54, 34, 4, 'var(--tq-anil-gris)') +
      R(72, 58, 8, 5, 'var(--tq-gris)') + R(90, 58, 8, 5, 'var(--tq-gris)');
    for (var v = 50; v < 126; v += 6) avion += R(v, 46, 2, 2, 'var(--tq-ventana)');
    s += P.hot('avion', 'Tocar el avión para ver su matrícula', 24, 28, 118, 38, avion);
    s += P.g('matricula', 0, 0, R(54, 18, 52, 9, 'var(--tq-papel)') + T(80, 25, 'C-GAUN', 5, 'var(--tq-comal-texto)'), 'opacity="0"');
    return s;
  }
  function cabina() {
    var s = R(0, 0, 160, 90, 'var(--tq-tinta)') + R(0, 58, 160, 32, 'var(--tq-panel)');
    for (var i = 0; i < 3; i++) s += R(36 + i * 22, 64, 16, 12, 'var(--tq-negro)') + T(44 + i * 22, 72, '- - -', 3, 'var(--tq-gris)');
    s += T(66, 84, 'COMBUSTIBLE', 3, 'var(--tinta-suave)');
    s += P.hot('varilla', 'Tocar la varilla para leerla', 112, 8, 12, 62, R(116, 10, 4, 58, 'var(--tq-gris)') + R(114, 8, 8, 4, 'var(--tq-gris)') +
      R(116, 40, 4, 28, 'var(--tq-oro)'));
    s += P.g('lectura', 0, 0, R(126, 30, 32, 12, 'var(--tq-papel)') + T(142, 38, '7,682 L', 4, 'var(--tq-comal-texto)'), 'opacity="0"');
    s += P.g('plan', 4, 8, R(0, 0, 44, 30, 'var(--tq-papel)') + R(0, 0, 44, 5, 'var(--tq-papel-sombra)') + T(22, 4, 'PLAN DE VUELO', 2.8, 'var(--tq-comal-texto)') +
      T(22, 14, 'MINIMO', 3, 'var(--tq-comal-texto)') + T(22, 24, '22,300 KG', 4.4, 'var(--tq-comal-texto)'), 'opacity="0"');
    return s;
  }

  window.CASO = {
    id: '13.11',
    titulo: 'VUELO 143',
    volver: '../../index.html',
    resolver: 'caso.html',
    duracionIntro: '~40 s',
    duracionCaso: '~30 min',
    medios: 'medios.json',
    herramientasOcultas: 2,
    despues: ['Abres el expediente aquí mismo, sin cambiar de página.', 'Apuestas antes de revisar la hoja.', 'Firmas qué revisarías antes de despegar.'],
    fuentes: [
      { t: 'Final Report of the Board of Inquiry, Air Canada Boeing 767 C-GAUN (G. H. Lockwood, 1985), pp. 41-42', u: 'https://archive.org/details/31761116358912',
        n: 'Los indicadores en blanco, la medición con varilla (7,682 litros) y el mínimo del plan de vuelo (22,300 kg).' }
    ],
    escenas: [
      { alt: 'Un avión de pasajeros en la plataforma, de día. Al tocarlo aparece su matrícula: C-GAUN.',
        interactiva: true,
        arte: plataforma,
        montar: function (g) {
          var visto = false;
          g.enTocar(function () {
            if (visto) return; visto = true;
            g.aparecer(g.q('matricula'), 400);
            g.decir('Es el C-GAUN, de Air Canada. Hoy es el vuelo 143.');
            g.listo();
          });
        },
        lineas: [
          { t: 'Montreal, 23 de julio de 1983.', al: function (g) { g.portada('1983', 'MONTREAL', function () {}); } },
          { t: 'Un Boeing 767 va a volar a Edmonton, con escala en Ottawa.', al: function () {} },
          { t: 'Toca el avión para ver su matrícula.', al: function (g) { g.sfx('pop'); } }
        ] },
      { alt: 'La cabina: los tres indicadores de combustible en blanco. Junto a ellos, una varilla; al tocarla se lee 7,682 litros. Aparece el plan de vuelo: mínimo 22,300 kilos.',
        interactiva: true,
        arte: cabina,
        montar: function (g) {
          var visto = false;
          g.enTocar(function () {
            if (visto) return; visto = true;
            g.aparecer(g.q('lectura'), 300);
            g.decir('La varilla, convertida con la tabla: 7,682 litros en los tanques.');
            g.aparecer(g.q('plan'), 600);
            g.archivo('informe-lockwood-1985', { lado: 'izq', ms: 4200 });
            g.listo();
          });
        },
        lineas: [
          { t: 'En la cabina, los indicadores de combustible están en blanco.', al: function () {} },
          { t: 'Se mide a mano, con una varilla. El plan de vuelo pide 22,300 kilos.', al: function () {} },
          { t: 'Toca la varilla para leerla.', al: function () {} }
        ] },
      C.final({
        codigo: '13.11',
        lineas: ['Alguien tiene que decidir cuánto cargar.', 'Y alguien tiene que firmar.', '¿Con qué comprobarías una cuenta que ya hizo otra persona?']
      })
    ]
  };
})();
