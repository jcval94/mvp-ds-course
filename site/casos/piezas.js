/* piezas.js — piezas que se repiten en los casos que se resuelven en la página (docs/CASO_EN_PAGINA.md).
   caso.js las agrega a ctx en cada sección: ctx.apuesta(...), ctx.verificacion(...), ctx.cierre(...), etc.
   Solo arman la interfaz y usan las funciones del motor (hipotesis, responder, completar, registrar): no guardan
   nada por su cuenta. Lo propio de cada caso (escenas, gráficas, retos) sigue en su caso-escenas.js. */
(function () {
  'use strict';

  window.CasoPiezas = function (ctx, cuerpo) {
    var aqui = function (d) { return d || cuerpo; };
    function mal(g, texto) { g.className = 'guardado mal'; g.textContent = texto; }
    function lista(items) {
      var u = document.createElement('ul');
      items.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; u.appendChild(li); });
      return u;
    }

    return {
      lista: lista,

      /* Recuadro de aviso («Datos reales», «Aviso de contenido»…). html es texto del caso, nunca del alumno. */
      aviso: function (html, dentro) { var a = ctx.el('div', 'aviso'); a.innerHTML = html; aqui(dentro).appendChild(a); return a; },

      /* Tabla. Las celdas pueden ser texto o nodos. Con o.caja (su etiqueta) va dentro de una caja desplazable y
         enfocable, para tablas que no caben en el celular. Devuelve el elemento sin agregarlo. */
      tabla: function (cabeza, filas, o) {
        o = o || {};
        var t = document.createElement('table'); t.className = o.cls || (o.caja ? 'tabla' : 'tabla-t');
        t.innerHTML = '<thead><tr>' + cabeza.map(function (c) { return '<th scope="col">' + c + '</th>'; }).join('') + '</tr></thead>';
        var tb = document.createElement('tbody');
        filas.forEach(function (f) {
          var tr = document.createElement('tr');
          f.forEach(function (c) { var td = document.createElement('td'); if (c && c.nodeType) td.appendChild(c); else td.textContent = c; tr.appendChild(td); });
          tb.appendChild(tr);
        });
        t.appendChild(tb);
        if (!o.caja) return t;
        var caja = ctx.el('div', 'tabla-caja'); caja.tabIndex = 0; caja.setAttribute('role', 'region'); caja.setAttribute('aria-label', o.caja + ', desplazable');
        caja.appendChild(t); return caja;
      },

      /* Libreta de notas del alumno: notas es la lista inicial (normalmente leída de ctx.controles). */
      libreta: function (notas, dentro, vacia) {
        var lib = ctx.el('div', 'libreta'); lib.appendChild(ctx.el('h3', null, 'TU LIBRETA')); var ul = ctx.el('ul'); lib.appendChild(ul);
        function pintar() {
          ul.innerHTML = '';
          notas.forEach(function (t) { ul.appendChild(ctx.el('li', null, t)); });
          if (!notas.length) ul.appendChild(ctx.el('li', 'vacia', vacia || 'Todavía no anotas nada.'));
        }
        aqui(dentro).appendChild(lib); pintar();
        return { anotar: function (t) { if (notas.indexOf(t) < 0) notas.push(t); pintar(); ctx.anunciar(t); }, pintar: pintar, notas: notas };
      },

      /* El expediente: un botón que lo abre y las piezas [titulo, texto, esBorrador]. */
      expediente: function (piezas, o) {
        o = o || {};
        var exp = ctx.el('div', 'expediente'); aqui(o.dentro).appendChild(exp);
        function abrir() {
          exp.innerHTML = '';
          piezas.forEach(function (p, i) {
            var d = ctx.el('div', 'pieza' + (p[2] ? ' borrador' : '')); d.style.setProperty('--i', i);
            d.appendChild(ctx.el('b', null, p[0])); d.appendChild(ctx.el('p', null, p[1]));
            if (p[2]) d.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
            exp.appendChild(d);
          });
          ctx.datos.abierto = true; ctx.guardar(); ctx.listo();
          if (o.anuncio) ctx.anunciar(o.anuncio);
        }
        if (ctx.datos.abierto) abrir();
        else { var b = ctx.boton('ABRIR EL EXPEDIENTE', function () { b.remove(); abrir(); }, '', o.dentro); }
        return exp;
      },

      /* La apuesta: elegir una opción, escribir la razón y anotarla (tdd: hipotesis). cola completa el sello. */
      apuesta: function (opciones, cola) {
        var anotar;
        var sel = ctx.opciones({ lista: opciones.map(function (x) { return [x, x]; }), clave: 'opcion', etiqueta: 'Tu apuesta',
          alCambiar: function (v) { anotar.disabled = !v[0]; } });
        if (ctx.S.hip && !ctx.datos.opcion) sel.poner([ctx.S.hip]);
        ctx.campo({ id: 'razon', etiqueta: '¿Por qué? Una o dos frases.', renglones: 3, max: 600, inicial: ctx.S.respuestas.hipotesis_razon || '' });
        var res = ctx.el('div'), g;
        anotar = ctx.boton('ANOTAR MI APUESTA', function () {
          var x = sel.valor()[0]; if (!x) return;
          var ok = ctx.hipotesis(x, ctx.datos.razon || '');
          res.innerHTML = ''; ctx.sello('APUESTA ANOTADA', 'Tu apuesta: ' + x.toLowerCase() + (cola || '.'), 'comal', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        anotar.disabled = !sel.valor()[0] && !ctx.S.hip;
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.hip) { ctx.sello('APUESTA ANOTADA', 'Tu apuesta: ' + ctx.S.hip.toLowerCase() + '.', 'comal', res); ctx.listo(); }
        return sel;
      },

      /* Verificar: dos comprobaciones independientes (tdd: respuesta «verificacion», etapa «verificar»).
         o.sinIntro: el caso ya puso su propia entrada (cuando VERIFICA es la sección entera) y la pieza no agrega título ni texto. */
      verificacion: function (o) {
        o = o || {};
        var d = aqui(o.dentro);
        if (!o.sinIntro) {
          d.appendChild(ctx.el('h3', null, 'VERIFICA'));
          d.appendChild(ctx.el('p', null, o.texto || 'Escribe qué revisaste para confiar en tus cifras y qué encontraste. Busca dos comprobaciones distintas.'));
        }
        ctx.campo({ id: 'c1', etiqueta: 'Comprobación 1: qué revisé y qué encontré', renglones: 3, max: 900, inicial: ctx.S.respuestas.verificacion || '', dentro: o.dentro });
        ctx.campo({ id: 'c2', etiqueta: 'Comprobación 2: qué revisé y qué encontré', renglones: 3, max: 900, dentro: o.dentro });
        var g;
        ctx.boton('ANOTAR MI VERIFICACION', function () {
          var t1 = (ctx.datos.c1 || '').trim(), t2 = (ctx.datos.c2 || '').trim();
          if (!t1 && !t2) { mal(g, 'Escribe al menos una comprobación.'); return; }
          ctx.marcarGuardado(g, ctx.responder('verificacion', t2 ? '1) ' + t1 + ' 2) ' + t2 : t1, 'verificar')); ctx.listo();
        }, '', o.dentro);
        g = ctx.guardado(o.dentro);
        if (ctx.S.respuestas.verificacion) ctx.listo();
      },

      /* La herramienta se nombra después de usarla: párrafos (html del caso) y el laboratorio para practicar. */
      nombre: function (parrafos, lab, dentro) {
        var t = ctx.el('div', 'tarjeta nombre'); t.appendChild(ctx.el('h3', null, 'LO QUE ACABAS DE USAR TIENE NOMBRE'));
        parrafos.forEach(function (h) { var p = ctx.el('p'); p.innerHTML = h; t.appendChild(p); });
        if (lab) {
          var l = ctx.el('p', 'nota');
          l.innerHTML = 'Para practicar lo que acabas de usar: <a href="' + lab[0] + '">' + lab[1] + '</a>. Es opcional y no cuenta para la calificación.';
          t.appendChild(l);
        }
        aqui(dentro).appendChild(t); return t;
      },

      /* Tarjeta de la revelación con filas [título en letra pixel, texto]. */
      verificado: function (titulo, filas, dentro) {
        var t = ctx.el('div', 'tarjeta verificado'); t.appendChild(ctx.el('h3', null, titulo));
        var dl = ctx.el('dl');
        filas.forEach(function (f) { var a = document.createElement('div'); a.appendChild(ctx.el('dt', 'px', f[0])); a.appendChild(ctx.el('dd', null, f[1])); dl.appendChild(a); });
        t.appendChild(dl); aqui(dentro).appendChild(t); return t;
      },

      /* Desplegable «Fuentes» o «Glosario»: items de texto o [url, texto]. */
      desplegable: function (titulo, items, dentro) {
        var d = document.createElement('details'); d.className = 'mas';
        d.appendChild(ctx.el('summary', null, titulo));
        var u = document.createElement('ul');
        items.forEach(function (it) {
          var li = document.createElement('li');
          if (Array.isArray(it)) { var a = ctx.el('a', null, it[1]); a.href = it[0]; a.target = '_blank'; a.rel = 'noopener noreferrer'; li.appendChild(a); }
          else li.textContent = it;
          u.appendChild(li);
        });
        d.appendChild(u); aqui(dentro).appendChild(d); return d;
      },

      /* Cierre: la pieza de «Mi decisión», el sello del caso, los bits y el criterio en una frase.
         o: { codigo, pregunta (html), etiqueta, frase (html), siguiente: [href, texto] } */
      cierre: function (o) {
        ctx.h3('MI DECISION');
        ctx.p(o.pregunta);
        ctx.campo({ id: 'mi', etiqueta: o.etiqueta, renglones: 4, max: 1500, inicial: ctx.S.respuestas.mi_decision || '' });
        var fin = ctx.el('div'), g;
        ctx.boton('ENTREGAR Y CERRAR EL CASO', function () {
          var texto = (ctx.datos.mi || '').trim();
          if (!texto) { mal(g, 'Escribe tu pieza de Mi decisión para cerrar el caso.'); return; }
          var ok = ctx.responder('mi_decision', texto, 'cierre'); ctx.completar(); ctx.marcarGuardado(g, ok); cerrar();
        });
        g = ctx.guardado(); cuerpo.appendChild(fin);
        function cerrar() {
          fin.innerHTML = ''; ctx.sello('CASO ' + o.codigo + ' RESUELTO', null, 'comal', fin);
          var bits = Object.keys(ctx.S.retos).reduce(function (s, k) { return s + (ctx.S.retos[k].bits || 0); }, 0);
          if (ctx.M.modo === 'alumno') fin.appendChild(ctx.el('p', null, 'Bits de este caso: ' + bits + '. Tu marcador completo está en Mi avance.'));
          var f = ctx.el('p', 'frase'); f.innerHTML = '<b>El criterio en una frase:</b> ' + o.frase; fin.appendChild(f);
          if (o.siguiente) { var s = ctx.el('p'); s.innerHTML = 'Siguiente caso de la clase: <a href="' + o.siguiente[0] + '">' + o.siguiente[1] + '</a>'; fin.appendChild(s); }
          ctx.listo();
        }
        if (ctx.S.completo) cerrar();
      }
    };
  };
})();
