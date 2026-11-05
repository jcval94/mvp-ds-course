/* Caso 1.2 · «2.4 millones de boletas» (Nueva York, 1936) — intro de formato completo (5 escenas).
   Solo la intro: gancho público. La apuesta, la bitácora del correo, los que no contestaron, la otra encuesta y la
   revelación viven en caso.html. Hechos verificados (casos/staging/literary-digest-1936.json): conteo publicado el
   31 de octubre de 1936 (Landon 1,293,669; Roosevelt 972,897; 2,376,523 en total) y pronóstico de victoria de Landon.
   Regla de spoilers: aquí no aparecen cuántas boletas salieron, de dónde salieron los nombres, otras encuestas,
   el resultado ni la herramienta. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto, C = window.Comun;

  function saco(x, y) { return R(x, y + 2, 12, 10, 'var(--tq-manila)') + R(x + 3, y, 6, 3, 'var(--tq-manila-clara)') + R(x + 1, y + 6, 10, 1, 'var(--tq-suadero)'); }
  function ciudad() {
    var s = R(0, 0, 160, 90, 'var(--tq-cielo)') + P.estrellas([[10, 8], [40, 5], [70, 12], [120, 6], [150, 14]]);
    [[0, 30, 20, 60], [22, 20, 18, 70], [42, 36, 16, 54], [100, 26, 22, 64], [124, 14, 16, 76], [142, 34, 18, 56]].forEach(function (b) {
      s += R(b[0], b[1], b[2], b[3], 'var(--tq-pared)');
      for (var yy = b[1] + 4; yy < 84; yy += 7) for (var xx = b[0] + 3; xx < b[0] + b[2] - 3; xx += 5) s += R(xx, yy, 2, 3, 'var(--tq-ventana)', 'class="parp" style="animation-delay:' + ((xx * yy) % 9) / 10 + 's"');
    });
    s += R(60, 40, 38, 50, 'var(--tq-ladrillo)') + R(64, 44, 30, 6, 'var(--tq-papel)') + T(79, 48.5, 'LA REVISTA', 3, 'var(--tq-comal-texto)');
    s += R(72, 70, 14, 20, 'var(--tq-cafe-oscuro)') + R(0, 88, 160, 2, 'var(--tq-suelo)');
    s += P.g('pila', 0, 0, saco(62, 76) + saco(84, 76) + saco(73, 66), 'opacity="0"');
    return s;
  }
  function redaccion() {
    var s = R(0, 0, 160, 90, 'var(--tq-pared)') + R(0, 62, 160, 28, 'var(--tq-madera)');
    s += R(14, 12, 30, 20, 'var(--tq-papel)') + T(29, 21, 'ROOSEVELT', 2.6, 'var(--anil)') + T(29, 27, '1936', 2.6, 'var(--tq-comal-texto)');
    s += R(116, 12, 30, 20, 'var(--tq-papel)') + T(131, 21, 'LANDON', 2.6, 'var(--tq-salsa)') + T(131, 27, '1936', 2.6, 'var(--tq-comal-texto)');
    for (var i = 0; i < 6; i++) s += R(20 + i * 22, 56, 14, 6, 'var(--tq-papel-sombra)') + R(24 + i * 22, 50, 6, 6, 'var(--tq-piel)');
    return s;
  }
  function torres() {
    var s = R(0, 0, 160, 90, 'var(--tq-panel)') + R(0, 80, 160, 10, 'var(--tq-madera)');
    s += P.g('tL', 0, 0, R(40, 20, 24, 60, 'var(--tq-papel)') + T(52, 86, 'LANDON', 3, 'var(--tq-crema)'), 'opacity="0"');
    s += P.g('tR', 0, 0, R(96, 35, 24, 45, 'var(--tq-papel)') + T(108, 86, 'ROOSEVELT', 3, 'var(--tq-crema)'), 'opacity="0"');
    s += T(80, 12, '', 5, 'var(--comal)', 'middle', 'data-id="cnt"');
    return s;
  }
  function sacos() {
    var s = R(0, 0, 160, 90, 'var(--tq-panel)') + R(0, 70, 160, 20, 'var(--tq-madera)');
    s += P.hot('saco', 'Abrir un saco de correo', 64, 34, 32, 34, saco(64, 40) + R(64, 40, 32, 28, 'var(--tq-manila)') + R(74, 34, 12, 6, 'var(--tq-manila-clara)'));
    s += P.g('post', 0, 0, T(80, 22, '', 4, 'var(--tinta)', 'middle', 'data-id="rep"'), '');
    return s;
  }

  window.CASO = {
    id: '1.2',
    titulo: '2.4 MILLONES DE BOLETAS',
    volver: '../../index.html',
    resolver: 'caso.html',
    duracionIntro: '~1 min',
    duracionCaso: '~40 min',
    medios: 'medios.json',
    herramientasOcultas: 3,
    despues: ['Abres el expediente aquí mismo, sin cambiar de página.', 'Apuestas antes de ver los datos.', 'Firmas tu decisión antes de saber qué pasó.'],
    fuentes: [
      { t: 'History Matters (GMU): «Landon, 1,293,669; Roosevelt, 972,897», The Literary Digest, 31 de octubre de 1936', u: 'https://historymatters.gmu.edu/d/5168',
        n: 'El conteo final y el pronóstico de la revista.' }
    ],
    escenas: [
      { alt: 'Una ciudad de noche con ventanas encendidas. Frente a la puerta de una revista se apilan sacos de correo.',
        arte: ciudad,
        lineas: [
          { t: 'Nueva York, otoño de 1936.', al: function (g) { g.portada('1936', 'NUEVA YORK'); } },
          { t: 'Cada mañana llegan más sacos de correo a una revista.', al: function (g) { g.aparecer(g.q('pila'), 600); g.sfx('golpe'); } },
          { t: 'Adentro vienen postales con una sola pregunta: ¿por quién vas a votar?', al: function () {} }
        ] },
      { alt: 'Una redacción con mesas largas y gente abriendo sobres. En la pared, dos carteles: Roosevelt y Landon, 1936.',
        arte: redaccion,
        lineas: [
          { t: 'Se elige presidente: Franklin D. Roosevelt, que busca reelegirse, contra Alf Landon, gobernador de Kansas.', al: function (g) { g.archivo('campana', { lado: 'der', ms: 4200 }); } },
          { t: 'La revista hace esta encuesta desde hace años, y en las últimas elecciones acertó.', al: function () {} }
        ] },
      { alt: 'Las postales forman dos torres: la de Landon más alta que la de Roosevelt. Un contador sube hasta 2,376,523.',
        arte: torres,
        lineas: [
          { t: 'El conteo final: 2,376,523 boletas.', al: function (g) {
            g.aparecer(g.q('tL'), 400); g.aparecer(g.q('tR'), 400);
            var c = g.q('cnt'); g.anim(1800, function (t) { c.textContent = Math.round(t * 2376523).toLocaleString('en-US'); }, g.E.sua, function () { c.textContent = '2,376,523'; });
          } },
          { t: 'Landon, 1,293,669. Roosevelt, 972,897.', al: function (g) { g.archivo('titular', { lado: 'izq', ms: 4200 }); } },
          { t: 'Una cifra enorme para cualquier encuesta.', al: function () {} }
        ] },
      { alt: 'Un saco de correo sobre la mesa. Al tocarlo, suelta postales: de cada 100, unas 54 para Landon, 41 para Roosevelt y 5 para otros.',
        interactiva: true,
        arte: sacos,
        montar: function (g) {
          var visto = false;
          g.enTocar(function () {
            if (visto) return; visto = true;
            g.q('rep').textContent = '54 LANDON · 41 ROOSEVELT · 5 OTROS';
            g.chispas(80, 40, { n: 20, color: ['var(--tq-papel)'], v: 30, vida: 900, g: 30 });
            g.decir('De cada 100 postales, unas 54 son para Landon.');
            g.listo();
          });
        },
        lineas: [{ t: 'Toca un saco para ver qué trae.', al: function (g) { g.sfx('pop'); } }] },
      C.final({
        codigo: '1.2',
        lineas: ['El 31 de octubre la revista publica su pronóstico: gana Landon.', 'Faltan unos días para la elección.', '¿Qué harías tú con este expediente?']
      })
    ]
  };
})();
