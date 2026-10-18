/* comun.js — escenas y piezas que se repiten en todos los casos (tablero de dos rejillas, escena final).
   Cada caso nuevo solo escribe lo que lo hace distinto (su apertura, su gente, su acertijo) y reutiliza esto. */
(function () {
  'use strict';
  var P = window.Px, R = P.R, T = P.texto;

  var Comun = {

    /* ---------- tablero: dos rejillas de 100 cuadros comparables ----------
       o = { titulo, unidad, izq: {etq, n, parcial, base, marca, conMarca, semilla}, der: {...} }
       Los cuadros marcados (data-r) se encienden con Comun.revelar. */
    tablero: function (o) {
      var s = R(0, 0, 160, 90, 'var(--tq-panel)');
      s += T(80, 11, o.titulo, 4.5, 'var(--tinta)', 'middle', 'data-id="tit"');
      s += P.rejilla(15, 17, 'L', o.izq) + P.rejilla(95, 17, 'R', o.der);
      s += T(40, 76, o.izq.etq, 4.5, 'var(--tinta-suave)') + T(120, 76, o.der.etq, 4.5, 'var(--tinta-suave)');
      s += T(40, 86, '', 5, 'var(--tinta)', 'middle', 'data-id="cL"') + T(120, 86, '', 5, 'var(--tinta)', 'middle', 'data-id="cR"');
      return s;
    },

    /* Los 200 cuadros de fondo entran en cascada de abajo hacia arriba, con un contador de personas. */
    entrarTablero: function (g, unidad, ms, fin) {
      var b = g.qa('[data-b]'), cL = g.q('cL'), cR = g.q('cR'), f0 = -1;
      b.forEach(function (r, i) { r._f = Math.floor((i % 100) / 10); r.setAttribute('opacity', 0); });
      g.sfx('whoosh');
      g.anim(ms, function (t) {
        var f = Math.min(10, Math.floor(t * 10.999));
        cL.textContent = cR.textContent = Math.round(t * 100) + ' ' + unidad;
        if (f === f0) return;
        f0 = f;
        b.forEach(function (r) { r.setAttribute('opacity', r._f < f ? 1 : 0); });
        g.tono(220 + f * 40, 0.04);
      }, g.E.lin, function () {
        b.forEach(function (r) { r.setAttribute('opacity', 1); });
        cL.textContent = cR.textContent = '100 ' + unidad;
        if (fin) fin();
      });
    },

    /* Enciende los cuadros marcados de las dos rejillas a la vez (cada una a su ritmo, terminan juntas).
       alCambio(cuadrosIzq, cuadrosDer) permite actualizar los contadores. */
    revelar: function (g, ms, color, alCambio, fin) {
      var L = g.qa('[data-r="L"]'), D = g.qa('[data-r="R"]'), iL = 0, iD = 0;
      function celda(el, k) {
        el.style.opacity = 1;
        g.chispas(+el.getAttribute('data-x') + 2, +el.getAttribute('data-y') + 2, { n: 3, color: color, v: 20, vida: 500, g: 20 });
        if (k % 2 === 0) g.tono(200 + (iL + iD) * 9, 0.04);
      }
      g.anim(ms, function (t) {
        var nl = Math.round(t * L.length), nd = Math.round(t * D.length);
        while (iL < nl) { celda(L[iL], iL); iL++; }
        while (iD < nd) { celda(D[iD], iD); iD++; }
        alCambio(iL, iD, t);
      }, g.E.sua, fin);
    },

    /* ---------- escena final: el expediente "sin resolver" ----------
       o = { codigo, alt, lineas: [t1, t2, t3] } — el sello cae en la segunda línea. */
    final: function (o) {
      return {
        final: true,
        alt: o.alt || ('Un expediente cerrado sobre un escritorio, con la etiqueta Caso ' + o.codigo + ', un sello rojo que dice sin resolver y una lupa.'),
        arte: function () { return P.expediente(o.codigo); },
        montar: function (g) {
          g.pos(g.q('carpeta'), 130, 0);
          g.op(g.q('sello'), 0);
          g.pos(g.q('lupa'), 70, -10);
          var luz = g.q('luz'), seq = [1, 0.4, 1, 1, 0.7, 1, 0.5, 1, 1, 1];
          g.cada(240, function (n) { g.op(luz, seq[n % seq.length]); });
        },
        lineas: [
          { t: o.lineas[0], al: function (g) {
            g.sfx('whoosh');
            g.mover(g.q('carpeta'), 0, 0, 900, g.E.sal);
          } },
          { t: o.lineas[1], al: function (g) {
            g.espera(350, function () { g.golpear(g.q('sello'), 280); });
          } },
          { t: o.lineas[2], al: function (g) {
            var lupa = g.q('lupa');
            g.mover(lupa, 0, 0, 800, g.E.sal, function () {
              if (g.reducir) return;
              (function barrer(ida) {
                g.mover(lupa, ida ? -62 : 0, ida ? -6 : 0, 1500, g.E.sua, function () { g.espera(300, function () { barrer(!ida); }); });
              })(true);
            });
          } }
        ]
      };
    }
  };

  window.Comun = Comun;
})();
