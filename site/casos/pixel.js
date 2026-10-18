/* pixel.js v2 — primitivas para dibujar escenas 8 bits en SVG (lienzo de 160 x 90 unidades).
   Los colores son variables CSS de motor.css, así la paleta se cambia en un solo lugar.
   Convención de animación: lo que se mueve va dentro de un <g data-id="..."> (Px.g), dibujado en coordenadas
   locales; el motor lo desplaza con transform="translate()". Lo que lleva animación CSS (bob, fa/fb, parp)
   va en un <g> interior, porque una transformación CSS reemplaza al atributo transform del mismo elemento. */
(function () {
  'use strict';

  function atr(x) { return x ? ' ' + x : ''; }

  var Px = {
    R: function (x, y, w, h, c, extra) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + c + '"' + atr(extra) + '/>';
    },

    /* grupo posicionable y animable por id */
    g: function (id, x, y, contenido, extra) {
      return '<g data-id="' + id + '" transform="translate(' + x + ' ' + y + ')"' + atr(extra) + '>' + contenido + '</g>';
    },

    /* capa de parallax: f = 1 se mueve con el mundo; f = 0 se queda fija en pantalla; entre 0 y 1, más lejana */
    capa: function (f, contenido) {
      return '<g data-capa="' + f + '">' + contenido + '</g>';
    },

    /* círculo pixelado (filas de rectángulos) */
    disco: function (cx, cy, r, c, extra) {
      var s = '';
      for (var dy = -r; dy <= r; dy++) {
        var w = Math.round(Math.sqrt(r * r - dy * dy));
        if (w > 0) s += Px.R(cx - w, cy + dy, 2 * w, 1, c, extra);
      }
      return s;
    },

    /* texto en letra pixel. Sin acentos ni eñe (la fuente pixel no los lleva bien). */
    texto: function (x, y, t, tam, c, ancla, extra) {
      return '<text class="px" x="' + x + '" y="' + y + '" font-size="' + tam + '" fill="' + c +
        '" text-anchor="' + (ancla || 'middle') + '"' + atr(extra) + '>' + t + '</text>';
    },

    /* sprite desde filas de caracteres; '.' es transparente. s = tamaño de cada pixel */
    sprite: function (filas, pal, x, y, s, clase, estilo) {
      s = s || 1;
      var out = '<g' + (clase ? ' class="' + clase + '"' : '') + (estilo ? ' style="' + estilo + '"' : '') + '>';
      filas.forEach(function (fila, j) {
        var i = 0;
        while (i < fila.length) {
          var ch = fila.charAt(i);
          if (ch === '.' || !pal[ch]) { i++; continue; }
          var k = i;
          while (k < fila.length && fila.charAt(k) === ch) k++;
          out += Px.R(x + i * s, y + j * s, (k - i) * s, s, pal[ch]);
          i = k;
        }
      });
      return out + '</g>';
    },

    /* personaje que camina: dos cuadros que se alternan solos (clases fa / fb de motor.css).
       cuerpo = filas comunes; pasoA / pasoB = última fila (los pies) en cada cuadro. */
    andante: function (cuerpo, pasoA, pasoB, pal, s) {
      return Px.sprite(cuerpo.concat([pasoA]), pal, 0, 0, s, 'fa') + Px.sprite(cuerpo.concat([pasoB]), pal, 0, 0, s, 'fb');
    },

    estrellas: function (lista) {
      return lista.map(function (p, i) {
        return Px.R(p[0], p[1], 1, 1, 'var(--tq-papel)', 'class="parp" style="animation-delay:' + ((i * 0.37) % 2).toFixed(2) + 's"');
      }).join('');
    },

    luna: function (cx, cy) {
      return Px.disco(cx, cy, 5, 'var(--tq-papel)') + Px.R(cx + 1, cy - 2, 2, 2, 'var(--tq-arena)') + Px.R(cx - 3, cy + 1, 2, 2, 'var(--tq-arena)');
    },

    /* flecha que parpadea sobre algo tocable */
    flecha: function (cx, y, arriba) {
      var c = 'var(--comal)';
      var f = arriba
        ? Px.R(cx, y, 1, 1, c) + Px.R(cx - 1, y + 1, 3, 1, c) + Px.R(cx - 2, y + 2, 5, 1, c)
        : Px.R(cx - 2, y, 5, 1, c) + Px.R(cx - 1, y + 1, 3, 1, c) + Px.R(cx, y + 2, 1, 1, c);
      return '<g class="pista parp">' + f + '</g>';
    },

    /* área tocable accesible: <g> con marco de foco. alto/ancho incluyen el margen */
    hot: function (id, etiqueta, x, y, w, h, contenido) {
      return '<g class="hot" data-hot="' + id + '" tabindex="0" role="button" aria-label="' + etiqueta + '">' +
        '<rect class="marco" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="transparent" stroke-width="1"/>' +
        contenido + '</g>';
    },

    /* rejilla de 100 cuadros (10 x 10).
       Dibuja los cuadros de fondo (data-b, en orden de abajo hacia arriba, para la cascada de entrada) y, aparte, los
       cuadros "marcados" (data-r), en orden aleatorio reproducible (semilla) para que el motor los encienda de uno en uno.
       o = { n: cuadros llenos, parcial: fracción del siguiente (0..1), base, marca, conMarca, semilla } */
    rejilla: function (x0, y0, id, o) {
      var idx = [], k, s = '';
      for (k = 0; k < 100; k++) idx.push(k);
      var sd = o.semilla || 7;
      for (var i = 99; i > 0; i--) {
        sd = (sd * 1664525 + 1013904223) >>> 0;
        var j = sd % (i + 1), t = idx[i]; idx[i] = idx[j]; idx[j] = t;
      }
      function xy(kk) { return [x0 + (kk % 10) * 5, y0 + (9 - Math.floor(kk / 10)) * 5]; }
      for (k = 0; k < 100; k++) {
        var p = xy(k);
        s += Px.R(p[0], p[1], 4, 4, o.base, 'data-b="' + id + '"');
      }
      var cuantos = o.n + (o.parcial > 0 ? 1 : 0);
      for (var q = 0; q < cuantos; q++) {
        var c = xy(idx[q]), llena = q < o.n;
        var w = llena ? 4 : +(4 * o.parcial).toFixed(2);
        s += '<g data-r="' + id + '" data-x="' + c[0] + '" data-y="' + c[1] + '" style="opacity:0">' + Px.R(c[0], c[1], w, 4, o.marca) +
          ((llena && o.conMarca) ? Px.R(c[0] + 1, c[1] + 1, 2, 2, 'var(--fondo)') : '') + '</g>';
      }
      return s;
    },

    /* escena final común: el expediente cerrado sobre el escritorio, con partes animables:
       luz (parpadea), carpeta (entra deslizándose), sello (cae de golpe) y lupa (barre el expediente). */
    expediente: function (codigo) {
      var s = Px.R(0, 0, 160, 90, 'var(--tq-cielo)') + Px.R(0, 0, 160, 40, 'var(--tq-panel)');
      // ventana con lluvia de estrellas lejanas
      s += Px.R(110, 6, 36, 24, 'var(--tq-noche)') + Px.R(112, 8, 32, 20, 'var(--tq-ventana-noche)') + Px.R(127, 8, 2, 20, 'var(--tq-noche)') + Px.R(112, 17, 32, 2, 'var(--tq-noche)');
      s += Px.estrellas([[116, 11], [136, 13], [120, 23], [140, 22], [132, 10]]);
      // escritorio
      s += Px.R(0, 62, 160, 28, 'var(--madera)') + Px.R(0, 62, 160, 2, 'var(--tq-madera-clara)');
      for (var x = 0; x < 160; x += 20) s += Px.R(x, 66, 1, 24, 'var(--tq-ladrillo-oscuro)');
      // lámpara y su luz
      s += Px.R(14, 52, 2, 14, 'var(--tq-suelo)') + Px.R(8, 66, 14, 2, 'var(--tq-suelo)') + Px.R(8, 44, 16, 6, 'var(--comal)');
      s += Px.g('luz', 0, 0, Px.R(10, 50, 12, 2, 'var(--tq-luz)') + Px.R(8, 52, 16, 2, 'var(--tq-luz)', 'opacity=".16"') +
        Px.R(6, 54, 20, 2, 'var(--tq-luz)', 'opacity=".10"') + Px.R(4, 56, 24, 2, 'var(--tq-luz)', 'opacity=".06"'));
      // carpeta
      s += Px.g('carpeta', 0, 0,
        Px.R(46, 28, 26, 6, 'var(--tq-oro)') + Px.R(44, 32, 70, 36, 'var(--manila)') + Px.R(44, 32, 70, 2, 'var(--tq-manila-clara)') +
        Px.R(44, 66, 70, 2, 'var(--tq-oro)') + Px.R(52, 40, 46, 12, 'var(--papel)') + Px.texto(75, 49, 'CASO ' + codigo, 4.5, 'var(--tq-comal-texto)'));
      // sello (envuelto: el motor le aplica escala al caer)
      s += Px.g('sello', 0, 0, '<g transform="rotate(-10 96 58)">' +
        Px.R(72, 52, 48, 1, 'var(--salsa)') + Px.R(72, 63, 48, 1, 'var(--salsa)') +
        Px.R(72, 52, 1, 12, 'var(--salsa)') + Px.R(119, 52, 1, 12, 'var(--salsa)') +
        Px.texto(96, 61, 'SIN RESOLVER', 3.6, 'var(--salsa)') + '</g>');
      // lupa
      var lupa = Px.disco(132, 48, 9, 'var(--tq-papel)') + Px.disco(132, 48, 7, 'var(--tq-vidrio)') + Px.R(128, 43, 3, 2, 'var(--tq-blanco)');
      for (var i = 0; i < 10; i++) lupa += Px.R(138 + i, 55 + i, 3, 3, 'var(--tq-cafe-oscuro)');
      s += Px.g('lupa', 0, 0, lupa);
      return s;
    }
  };

  window.Px = Px;
})();
