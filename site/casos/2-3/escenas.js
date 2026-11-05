/* Caso 2.3 · «La víspera» (Challenger, 1986) — intro corta de 3 escenas (formato del costo del error).
   Solo la intro: gancho público. La apuesta, la gráfica, el registro y la revelación viven en caso.html.
   Hechos verificados (casos/staging/challenger-1986.json, Comisión Rogers vol. I, caps. 3 y 5): el Challenger esperaba
   en la plataforma B; se pronosticaban unos 26 °F para la hora del lanzamiento (28 de enero) y hubo hielo en la plataforma; la noche del 27 hubo
   teleconferencias entre NASA y Morton Thiokol, y sus ingenieros recomendaron no lanzar por debajo de 53 °F.
   Caso con víctimas: la intro no muestra el lanzamiento ni el accidente, ni personas. Sin herramientas ni gráficas. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;

  function plataforma() {
    var s = R(0, 0, 160, 90, 'var(--tq-noche)') + P.estrellas([[10, 8], [36, 14], [120, 6], [146, 16], [90, 10]]);
    s += R(0, 74, 160, 16, 'var(--tq-suelo)');
    s += R(60, 20, 6, 54, 'var(--tq-gris)');                                                     // torre
    for (var y = 24; y < 72; y += 8) s += R(60, y, 14, 1, 'var(--tq-gris)');
    s += R(78, 26, 8, 48, 'var(--tq-naranja)') + R(76, 34, 3, 40, 'var(--tq-papel)') + R(85, 34, 3, 40, 'var(--tq-papel)'); // tanque y cohetes
    s += R(88, 40, 6, 26, 'var(--tq-papel)') + R(92, 62, 6, 4, 'var(--tq-papel-sombra)');       // orbitador
    s += P.hot('canal', 'Tocar el agua de la plataforma', 100, 72, 50, 8, R(100, 74, 50, 4, 'var(--tq-ventana-noche)') +
      P.g('hielo', 0, 0, R(104, 73, 8, 2, 'var(--tq-crema)') + R(118, 73, 12, 2, 'var(--tq-crema)') + R(136, 73, 9, 2, 'var(--tq-crema)'), 'opacity="0"'));
    s += P.g('temp', 0, 0, T(30, 18, '26 F', 6, 'var(--tq-vidrio)'), 'opacity="0"');
    return s;
  }
  function llamada() {
    var s = R(0, 0, 160, 90, 'var(--tq-pared)') + R(0, 60, 160, 30, 'var(--tq-madera)') + R(0, 60, 160, 2, 'var(--tq-madera-clara)');
    s += R(20, 12, 40, 26, 'var(--tq-ventana-noche)') + R(22, 14, 36, 22, 'var(--tq-noche)');
    s += P.hot('telefono', 'Tocar el teléfono para ver la hora de la llamada', 66, 46, 30, 16,
      R(68, 52, 26, 10, 'var(--tq-negro)') + R(66, 47, 30, 5, 'var(--tq-negro)') + R(76, 54, 10, 6, 'var(--tq-gris)'));
    s += P.g('hora', 0, 0, T(81, 42, '8:45 PM', 4, 'var(--comal)'), 'opacity="0"');
    s += P.g('nota', 108, 26, R(0, 0, 40, 28, 'var(--tq-papel)') + T(20, 9, 'NO LANZAR', 3.4, 'var(--tq-salsa)') +
      T(20, 16, 'DEBAJO DE', 3, 'var(--tq-comal-texto)') + T(20, 23, '53 F', 4.4, 'var(--tq-comal-texto)'), 'opacity="0"');
    return s;
  }

  window.CASO = {
    id: '2.3',
    titulo: 'LA VISPERA',
    volver: '../../index.html',
    resolver: 'caso.html',
    duracionIntro: '~40 s',
    duracionCaso: '~25 min',
    medios: 'medios.json',
    herramientasOcultas: 2,
    aviso: 'El caso trata sobre el accidente del transbordador Challenger, en el que murieron siete personas. No mostramos el accidente.',
    despues: ['Abres el expediente aquí mismo, sin cambiar de página.', 'Apuestas antes de ver los vuelos.', 'Firmas tu decisión antes de saber qué pasó.'],
    fuentes: [
      { t: 'Comisión Presidencial sobre el Accidente del Transbordador Challenger (1986), vol. I, cap. 5', u: 'https://www.nasa.gov/history/rogersrep/v1ch5.htm',
        n: 'La llamada de las 8:45 p. m., el pronóstico de 26 °F, el hielo en la plataforma y la recomendación de no lanzar por debajo de 53 °F.' }
    ],
    escenas: [
      { alt: 'De noche, el transbordador en la plataforma, junto a su torre. Al tocar el agua de la plataforma aparece hielo y la temperatura pronosticada: 26 grados Fahrenheit.',
        interactiva: true,
        arte: plataforma,
        montar: function (g) {
          var visto = false;
          g.enTocar(function () {
            if (visto) return; visto = true;
            g.aparecer(g.q('hielo'), 400); g.aparecer(g.q('temp'), 400);
            g.decir('Esa noche, el agua de la plataforma se congela.');
            g.listo();
          });
        },
        lineas: [
          { t: 'Florida, enero de 1986. El Challenger espera en la plataforma.', al: function (g) { g.portada('1986', 'FLORIDA', function () { g.archivo('plataforma-hielo-1986', { lado: 'der', ms: 4200 }); }); } },
          { t: 'Para la hora del lanzamiento se pronostican unos 26 °F.', al: function () {} },
          { t: 'Ningún vuelo había despegado con tanto frío. Toca el agua.', al: function (g) { g.sfx('pop'); } }
        ] },
      { alt: 'Una oficina de noche con un teléfono. Al tocarlo aparece la hora, 8:45 de la noche, y una nota: no lanzar por debajo de 53 grados.',
        interactiva: true,
        arte: llamada,
        montar: function (g) {
          var visto = false;
          g.enTocar(function () {
            if (visto) return; visto = true;
            g.aparecer(g.q('hora'), 300);
            g.decir('Sus ingenieros piden no lanzar por debajo de 53 °F, la del vuelo más frío hasta entonces.');
            g.aparecer(g.q('nota'), 500);
            g.listo();
          });
        },
        lineas: [
          { t: '27 de enero, de noche. NASA llama a Morton Thiokol, que fabrica los cohetes.', al: function () {} },
          { t: 'Toca el teléfono para ver la hora de la llamada.', al: function () {} }
        ] },
      C.final({
        codigo: '2.3',
        lineas: ['Hay un historial de vuelos anteriores.', 'La decisión se toma esta noche.', '¿Qué tendrías que ver antes de decir sí o no?']
      })
    ]
  };
})();
