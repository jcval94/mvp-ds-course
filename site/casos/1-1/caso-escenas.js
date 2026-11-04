/* Caso 1.1 · ¿Dónde conviene blindar los aviones? — se resuelve en la página (docs/CASO_EN_PAGINA.md, sección 6).
   Mismas secciones, retos y preguntas que el caso registrado en la base. Las claves de los retos viven solo en la base.
   DATOS SIMULADOS (CC0, casos/data/wald-bombers): sim.js reproduce generar.py con la semilla 1943, así que el registro
   (736 aviones que volvieron), los 264 que no volvieron y el laboratorio salen de la misma simulación que el resto del
   curso. Regla: la herramienta (cómo se llama este sesgo) se nombra en «Lo que no llegó», después del reto 3. */
(function () {
  'use strict';
  var P = window.WaldParams, SIM = window.WaldSim;
  var ZONAS = P.secciones.map(function (s) { return s.id; });
  var NOMBRE = {}, AREA = {}, PIXEL = {};
  P.secciones.forEach(function (s) { NOMBRE[s.id] = s.nombre; AREA[s.id] = s.area; PIXEL[s.pixel] = s.id; });
  var APUESTA = { motor: 'Los motores', cabina: 'La cabina', fuselaje: 'El fuselaje', alas: 'Las alas', cola: 'La cola' };
  var ANIL = 'var(--anil)', COMAL = 'var(--comal)', SALSA = 'var(--salsa)', SUADERO = 'var(--suadero)';

  var MISION = SIM.simulate(P, []);
  var VOLVIERON = MISION.filter(function (a) { return a.returned; });
  var NO_VOLVIERON = MISION.filter(function (a) { return !a.returned; });
  function agujeros(lista) { var h = {}; ZONAS.forEach(function (z) { h[z] = 0; }); lista.forEach(function (a) { ZONAS.forEach(function (z) { h[z] += a.hits[z]; }); }); return h; }
  var H = agujeros(VOLVIERON), HD = agujeros(NO_VOLVIERON);
  var TOTAL = ZONAS.reduce(function (s, z) { return s + H[z]; }, 0);
  var SALIERON = P.aviones_por_mision;
  var porArea = function (z) { return H[z] / (AREA[z] * 10); };
  var pct = function (x) { return (x * 100).toFixed(1).replace(/\.0$/, '') + '%'; };

  /* Avión limpio (vista desde arriba): cada zona se puede tocar. No es el mapa de agujeros de la intro. */
  function avion(sel, sel2, alTocar) {
    var ns = 'http://www.w3.org/2000/svg', filas = P.avion.filas, w = filas[0].length, h = filas.length;
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '-1 -1 ' + (w + 2) + ' ' + (h + 2)); svg.setAttribute('aria-hidden', 'true');
    var color = { motor: 'var(--tq-piedra-oscura)', cabina: 'var(--tq-vidrio)', fuselaje: 'var(--tq-gris)', alas: 'var(--tq-piedra)', cola: 'var(--tq-papel-sombra)' };
    ZONAS.forEach(function (z) {
      var g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'zona' + (sel.indexOf(z) >= 0 ? ' sel' : '') + (sel2 && sel2.indexOf(z) >= 0 ? ' sel2' : ''));
      g.dataset.z = z;
      filas.forEach(function (fila, j) {
        for (var i = 0; i < fila.length; i++) {
          if (PIXEL[fila.charAt(i)] !== z) continue;
          var r = document.createElementNS(ns, 'rect');
          r.setAttribute('x', i); r.setAttribute('y', j); r.setAttribute('width', 1.02); r.setAttribute('height', 1.02); r.setAttribute('fill', color[z]);
          g.appendChild(r);
        }
      });
      if (alTocar) g.addEventListener('click', function () { alTocar(z); });
      svg.appendChild(g);
    });
    return svg;
  }

  function lista(items) { var u = document.createElement('ul'); items.forEach(function (t) { var li = document.createElement('li'); li.textContent = t; u.appendChild(li); }); return u; }

  window.CASO_PAGINA = {
    id: '1.1', version: 'pagina-1.0', titulo: '¿DONDE BLINDAR LOS AVIONES?', intro: './', minutos: 45,
    secciones: [

      /* 1 · el expediente */
      { id: 'preparacion', titulo: 'EL EXPEDIENTE', render: function (ctx, cuerpo) {
        ctx.p('Llegó el expediente de la misión. Trae tres piezas y una tarea: decidir dónde van <b>dos placas de blindaje</b>.');
        var av = ctx.el('div', 'aviso'); av.innerHTML = '<b>Datos simulados.</b> Los aviones de este caso salen de una simulación hecha para mostrar el mecanismo: no son cifras históricas. La historia real llega al final, con sus fuentes.';
        cuerpo.appendChild(av);
        var exp = ctx.el('div', 'expediente');
        function abrir() {
          exp.innerHTML = '';
          [['EL REGISTRO', 'Avión por avión, los agujeros que encontraron los mecánicos al revisar cada uno.'],
           ['LA BITACORA', 'Cuántos aviones salieron a la misión.'],
           ['EL RESUMEN', 'Un asistente leyó todo y preparó un resumen para ahorrarte tiempo. Todavía no lo abres.']].forEach(function (p, i) {
            var d = ctx.el('div', 'pieza' + (i === 2 ? ' borrador' : '')); d.style.setProperty('--i', i);
            d.appendChild(ctx.el('b', null, p[0])); d.appendChild(ctx.el('p', null, p[1]));
            if (i === 2) d.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
            exp.appendChild(d);
          });
          ctx.datos.abierto = true; ctx.guardar(); ctx.listo();
          ctx.anunciar('Expediente abierto: el registro, la bitácora y el resumen del asistente.');
        }
        cuerpo.appendChild(exp);
        if (ctx.datos.abierto) abrir();
        else { var b = ctx.boton('ABRIR EL EXPEDIENTE', function () { b.remove(); abrir(); }); }
        ctx.p('Antes de abrir un solo número, vas a apostar.', 'nota');
      } },

      /* 2 · la apuesta */
      { id: 'apuesta', titulo: 'TU APUESTA', render: function (ctx, cuerpo) {
        ctx.p('Tienes dos placas. Cada una cubre una zona del avión. <b>¿Dónde pondrías la primera?</b> Toca una zona o elígela en la lista.');
        var cont = ctx.el('div', 'avion-elegir'); cuerpo.appendChild(cont);
        var lado = ctx.el('div'); var der = ctx.el('div'); cont.appendChild(lado); cont.appendChild(der);
        var actual = ctx.datos.zona || (ctx.S.hip ? Object.keys(APUESTA).filter(function (z) { return APUESTA[z] === ctx.S.hip; })[0] : null);
        function pintarAvion() { lado.innerHTML = ''; lado.appendChild(avion(actual ? [actual] : [], null, function (z) { ops.poner([z]); elegir(z); })); }
        function elegir(z) { actual = z; ctx.datos.zona = z; ctx.guardar(); pintarAvion(); anotar.disabled = false; }
        var ops = ctx.opciones({ lista: ZONAS.map(function (z) { return [z, APUESTA[z]]; }), clave: 'zona', clase: 'zonas', etiqueta: 'Zona de la primera placa',
          dentro: der, alCambiar: function (v) { if (v[0]) elegir(v[0]); else { actual = null; pintarAvion(); anotar.disabled = true; } } });
        if (actual) ops.poner([actual]);
        pintarAvion();
        ctx.campo({ id: 'razon', etiqueta: '¿Por qué ahí? Escribe tu razón en una o dos frases.', renglones: 3, max: 600, inicial: ctx.S.respuestas.hipotesis_razon || '' });
        var fila = ctx.el('div', 'fila'); cuerpo.appendChild(fila);
        var anotar = ctx.boton('ANOTAR MI APUESTA', function () {
          if (!actual) return;
          var ok = ctx.hipotesis(APUESTA[actual], ctx.datos.razon || '');
          ctx.datos.anotada = true; ctx.guardar();
          resultado.innerHTML = ''; ctx.sello('APUESTA ANOTADA', 'Tu primera placa: ' + APUESTA[actual].toLowerCase() + '. Al final la vas a comparar con lo que muestren los datos.', 'comal', resultado);
          ctx.marcarGuardado(g, ok); ctx.listo();
        }, '', fila);
        anotar.disabled = !actual;
        var resultado = ctx.el('div'); cuerpo.appendChild(resultado);
        var g = ctx.guardado();
        if (ctx.S.hip) { ctx.sello('APUESTA ANOTADA', 'Tu primera placa: ' + ctx.S.hip.toLowerCase() + '.', 'comal', resultado); ctx.listo(); }
        ctx.p('No hay apuesta mala: nadie la corrige todavía.', 'nota');
      } },

      /* 3 · el registro: la fricción y la herramienta sin nombre */
      { id: 'registro', titulo: 'EL REGISTRO', render: function (ctx, cuerpo) {
        ctx.p('Cada fila es un avión que regresó y que los mecánicos revisaron al aterrizar, con sus agujeros por zona.');
        var caja = ctx.el('div', 'tabla-caja'), t = ctx.el('table', 'tabla'); caja.tabIndex = 0; caja.setAttribute('role', 'region'); caja.setAttribute('aria-label', 'Registro de agujeros, desplazable'); caja.appendChild(t); cuerpo.appendChild(caja);
        t.innerHTML = '<caption class="sr">Registro de agujeros por avión</caption><thead><tr><th scope="col">AVION</th>' +
          ZONAS.map(function (z) { return '<th scope="col">' + NOMBRE[z].toUpperCase() + '</th>'; }).join('') + '</tr></thead>';
        var tb = document.createElement('tbody'); t.appendChild(tb);
        var pag = ctx.el('div', 'pager'); cuerpo.appendChild(pag);
        var desde = 0, N = 8;
        var ant = ctx.boton('< ANTERIOR', function () { desde = Math.max(0, desde - N); llenar(); }, 'sec', pag);
        var info = ctx.el('span', 'nota'); pag.appendChild(info);
        var sig = ctx.boton('SIGUIENTE >', function () { desde = Math.min(VOLVIERON.length - N, desde + N); llenar(); }, 'sec', pag);
        function llenar() {
          tb.innerHTML = '';
          VOLVIERON.slice(desde, desde + N).forEach(function (a, k) {
            var tr = document.createElement('tr'); var th = document.createElement('td'); th.textContent = 'Avión ' + (desde + k + 1); tr.appendChild(th);
            ZONAS.forEach(function (z) { var td = document.createElement('td'); td.textContent = a.hits[z]; tr.appendChild(td); }); tb.appendChild(tr);
          });
          info.textContent = 'Página ' + (Math.floor(desde / N) + 1); ant.disabled = desde === 0; sig.disabled = desde + N >= VOLVIERON.length;
        }
        llenar();
        ctx.h3('AGUJEROS POR ZONA, TODOS LOS AVIONES DEL REGISTRO');
        var zonaBarras = ctx.el('div'); cuerpo.appendChild(zonaBarras);
        var divididas = ctx.controles('dividir_area').map(function (v) { return v.zona; });
        function pintarBarras() {
          zonaBarras.innerHTML = '';
          var listas = ZONAS.every(function (z) { return divididas.indexOf(z) >= 0; });
          ctx.barras({ categorias: ZONAS.map(function (z) { return NOMBRE[z] + (divididas.indexOf(z) >= 0 ? ' ÷' : ''); }),
            series: [{ nombre: 'Agujeros', color: ANIL, valores: ZONAS.map(function (z) { return divididas.indexOf(z) >= 0 ? porArea(z) : H[z]; }),
              etiquetas: ZONAS.map(function (z) { return divididas.indexOf(z) >= 0 ? ctx.fmt(porArea(z), 1) : ctx.fmt(H[z]); }) }],
            pie: listas ? 'Ahora cada barra son los agujeros por cada 10% del área del avión.' : 'Área de cada zona: ' +
              ZONAS.map(function (z) { return NOMBRE[z].toLowerCase() + ' ' + pct(AREA[z]); }).join(', ') + '.' }, zonaBarras);
        }
        pintarBarras();
        ctx.p('Las alas juntan la mayoría de los agujeros. Pero también son la zona más grande del avión: una zona grande recibe más agujeros solo por su tamaño. Para comparar zonas de distinto tamaño, divide los agujeros de cada una entre su área contada en décimos del avión: 16.3% del área son 1.63 décimos.');
        var acc = ctx.el('div', 'acciones'); cuerpo.appendChild(acc);
        var retoCaja = ctx.el('div'); cuerpo.appendChild(retoCaja);
        ZONAS.forEach(function (z) {
          var b = ctx.boton(NOMBRE[z].toUpperCase() + ' ÷ ' + (AREA[z] * 10).toFixed(2).replace(/0$/, ''), function () {
            if (divididas.indexOf(z) >= 0) return;
            divididas.push(z); ctx.registrar('dividir_area', { zona: z });
            b.classList.add('hecha'); b.setAttribute('aria-pressed', 'true'); pintarBarras(); mostrarReto();
            ctx.anunciar(NOMBRE[z] + ': ' + ctx.fmt(porArea(z), 1) + ' agujeros por cada 10% del área.');
          }, divididas.indexOf(z) >= 0 ? 'hecha' : '', acc);
          b.setAttribute('aria-pressed', String(divididas.indexOf(z) >= 0));
        });
        var puesto = false;
        function mostrarReto() {
          if (puesto || !ZONAS.every(function (z) { return divididas.indexOf(z) >= 0; })) return;
          puesto = true;
          ctx.reto({ id: 'reto_menos_area', titulo: '★ RETO 1', dificultad: 1, tipo: 'opcion', dentro: retoCaja,
            pregunta: '¿Qué zona tiene menos agujeros por cada 10% del área?', opciones: ['Motores', 'Cabina', 'Fuselaje', 'Alas', 'Cola'],
            pista: 'Mira las barras ya divididas, no las de agujeros: el área cambia mucho de una zona a otra.',
            alResponder: function () { ctx.listo(); } });
        }
        mostrarReto();
      } },

      /* 4 · el resumen del asistente: el error plantado */
      { id: 'asistente', titulo: 'EL RESUMEN DEL ASISTENTE', render: function (ctx, cuerpo) {
        ctx.p('Para ahorrar tiempo, un asistente leyó la bitácora y el registro y preparó un resumen. <b>Puede tener un error.</b> Revisa antes de usarlo.');
        var exp = ctx.el('div', 'expediente'); cuerpo.appendChild(exp);
        var r = ctx.el('div', 'pieza borrador'); r.appendChild(ctx.el('b', null, 'RESUMEN DEL ASISTENTE')); r.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
        r.appendChild(ctx.el('p', null, 'Qué revisé: los ' + ctx.fmt(SALIERON) + ' aviones de la misión.'));
        r.appendChild(ctx.el('p', null, 'Qué encontré: ' + ctx.fmt(TOTAL) + ' agujeros; las alas concentran casi la mitad (' + ctx.fmt(H.alas) + ').'));
        r.appendChild(ctx.el('p', null, 'Recomendación: blindar alas y cola, donde está la mayor parte del daño.'));
        exp.appendChild(r);
        ctx.h3('TU MESA DE VERIFICACION');
        ctx.p('Elige qué comprobar. Cada resultado queda en tu libreta.', 'nota');
        var COMPROBAR = [
          ['filas', 'CONTAR LAS FILAS DEL REGISTRO', 'El registro tiene ' + ctx.fmt(VOLVIERON.length) + ' filas (un avión por fila).'],
          ['bitacora', 'LEER LA BITACORA', 'Bitácora: salieron ' + ctx.fmt(SALIERON) + ' aviones a la misión.'],
          ['suma', 'SUMAR TODOS LOS AGUJEROS', 'Suma del registro: ' + ctx.fmt(TOTAL) + ' agujeros.'],
          ['alas', 'CONTAR LOS AGUJEROS DE LAS ALAS', 'Alas en el registro: ' + ctx.fmt(H.alas) + ' agujeros.']];
        var acc = ctx.el('div', 'acciones'); cuerpo.appendChild(acc);
        var lib = ctx.el('div', 'libreta'); lib.appendChild(ctx.el('h3', null, 'TU LIBRETA')); var ul = ctx.el('ul'); lib.appendChild(ul); cuerpo.appendChild(lib);
        var hechas = ctx.controles('comprobacion').map(function (v) { return v.accion; });
        function pintarLibreta() {
          ul.innerHTML = '';
          COMPROBAR.forEach(function (c) { if (hechas.indexOf(c[0]) >= 0) ul.appendChild(ctx.el('li', null, c[2])); });
          if (!hechas.length) ul.appendChild(ctx.el('li', 'vacia', 'Todavía no compruebas nada.'));
        }
        COMPROBAR.forEach(function (c) {
          var b = ctx.boton(c[1], function () {
            if (hechas.indexOf(c[0]) < 0) { hechas.push(c[0]); ctx.registrar('comprobacion', { accion: c[0] }); }
            b.classList.add('hecha'); pintarLibreta(); ctx.anunciar(c[2]);
          }, hechas.indexOf(c[0]) >= 0 ? 'hecha' : '', acc);
        });
        pintarLibreta();
        ctx.reto({ id: 'reto_error_resumen', titulo: '★★ RETO 2', dificultad: 2, tipo: 'opcion',
          pregunta: 'Compara el resumen con la bitácora y con el registro. ¿Dónde está el error?',
          opciones: ['Dice que revisó 1,000 aviones, pero el registro tiene 736', 'Dice que hay 1,481 agujeros, pero el registro suma 1,184',
            'Dice que las alas tienen 698 agujeros, pero son 316', 'No tiene ningún error'],
          pista: 'Cuenta cuántas filas tiene el registro y compáralo con lo que el resumen dice que revisó.',
          alResponder: function () { ctx.listo(); } });
      } },

      /* 5 · lo que no llegó: aquí se usa la herramienta y, después del reto, se nombra */
      { id: 'faltantes', titulo: 'LO QUE NO LLEGO', render: function (ctx, cuerpo) {
        ctx.p('Salieron ' + ctx.fmt(SALIERON) + ' aviones y el registro tiene ' + ctx.fmt(VOLVIERON.length) + '. <b>¿Dónde están los demás?</b>');
        var a = ctx.el('div'); cuerpo.appendChild(a);
        var b = ctx.el('div'); cuerpo.appendChild(b);
        var c = ctx.el('div'); cuerpo.appendChild(c);
        var d = ctx.el('div'); cuerpo.appendChild(d);
        function paso1() {
          a.innerHTML = ''; ctx.contador(SALIERON - VOLVIERON.length, 'aviones salieron y no están en el registro: nadie revisó sus agujeros.', a);
          if (!ctx.datos.parejo) { var bt = ctx.boton('¿Y SI LOS AGUJEROS CAYERAN PAREJO?', function () { bt.remove(); ctx.datos.parejo = true; ctx.guardar(); paso2(); }, 'sec', b); }
          else paso2();
        }
        function paso2() {
          b.innerHTML = '';
          b.appendChild(ctx.el('p', null, 'Si los agujeros cayeran parejo sobre el avión, cada zona recibiría una parte del total según su área: con ' +
            ctx.fmt(TOTAL) + ' agujeros, la cola (' + pct(AREA.cola) + ' del área) tendría unos ' + ctx.fmt(TOTAL * AREA.cola) + '.'));
          ctx.barras({ categorias: ZONAS.map(function (z) { return NOMBRE[z]; }), series: [
            { nombre: 'Si cayeran parejo por área', color: SUADERO, valores: ZONAS.map(function (z) { return z === 'motor' ? null : TOTAL * AREA[z]; }),
              etiquetas: ZONAS.map(function (z) { return z === 'motor' ? '?' : ctx.fmt(TOTAL * AREA[z]); }) },
            { nombre: 'En el registro', color: ANIL, valores: ZONAS.map(function (z) { return H[z]; }) }],
            pie: 'El esperado de los motores lo calculas tú.' }, b);
          paso3();
        }
        function paso3() {
          if (c.childNodes.length) return;
          c.appendChild(ctx.el('p', null, 'Calcula cuántos agujeros esperarías en los motores (' + pct(AREA.motor) + ' del área) si cayeran parejo, y réstale los que sí hay en el registro (' + ctx.fmt(H.motor) + ').'));
          ctx.calculadora(c);
          ctx.reto({ id: 'reto_motores_faltan', titulo: '★★★ RETO 3', dificultad: 3, tipo: 'numero', dentro: c,
            pregunta: '¿Cuántos agujeros faltan en los motores?', etiqueta: 'Tu respuesta (un número entero)',
            pista: 'Esperados = total de agujeros × ' + AREA.motor + '. Después resta los agujeros de motores del registro.',
            alResponder: function () { nombrar(); ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        }
        function nombrar() {
          if (d.childNodes.length) return;
          var t = ctx.el('div', 'tarjeta nombre'); t.appendChild(ctx.el('h3', null, 'LO QUE ACABAS DE USAR TIENE NOMBRE'));
          t.appendChild(ctx.el('p', null, 'Los agujeros que faltan en motores y cabina no desaparecieron: estaban en los aviones que no volvieron. Un agujero ahí probablemente derribaba al avión, y por eso casi no aparece en el registro.'));
          var p1 = ctx.el('p'); p1.innerHTML = 'Tus datos solo traen los casos que pasaron un filtro (volver). A eso se le llama <b>sesgo de supervivencia</b>. Y los datos que faltan no faltan al azar: faltan justo los que más importan. Son <b>faltantes no aleatorios</b>.'; t.appendChild(p1);
          var p2 = ctx.el('p', 'nota'); p2.innerHTML = 'Para practicar lo que acabas de usar: <a href="../../labs/level-1/calidad-datos.html">Laboratorio: calidad de datos</a>. Es opcional y no cuenta para la calificación.'; t.appendChild(p2);
          d.appendChild(t);
        }
        if (ctx.datos.buscado) paso1();
        else { var bb = ctx.boton('BUSCAR LOS QUE FALTAN', function () { bb.remove(); ctx.datos.buscado = true; ctx.guardar(); paso1(); }, '', a); }
        if (ctx.S.retos.reto_motores_faltan) nombrar();
        else if ((ctx.S.datos._luego || {}).reto_motores_faltan) ctx.listo();
      } },

      /* 6 · verifica */
      { id: 'verificacion', titulo: 'VERIFICA', render: function (ctx, cuerpo) {
        ctx.p('Antes de decidir, escribe <b>qué revisaste</b> para confiar en lo que encontraste y <b>qué encontraste</b>. Busca dos comprobaciones distintas.');
        var lib = ctx.el('div', 'libreta'); lib.appendChild(ctx.el('h3', null, 'LO QUE YA HICISTE'));
        var hechas = [];
        var div = ctx.controles('dividir_area').length; if (div) hechas.push('Dividiste los agujeros de ' + div + ' zona' + (div > 1 ? 's' : '') + ' entre su área.');
        ctx.controles('comprobacion').forEach(function (v) { hechas.push({ filas: 'Contaste las filas del registro.', bitacora: 'Leíste la bitácora.', suma: 'Sumaste todos los agujeros.', alas: 'Contaste los agujeros de las alas.' }[v.accion] || ''); });
        if ((ctx.S.datos.faltantes || {}).parejo) hechas.push('Comparaste el registro con lo que esperarías si los agujeros cayeran parejo.');
        lib.appendChild(hechas.length ? lista(hechas.filter(Boolean)) : ctx.el('p', 'vacia', 'Aún no hay comprobaciones en tu libreta.'));
        cuerpo.appendChild(lib);
        var previa = ctx.S.respuestas.verificacion || '';
        ctx.campo({ id: 'c1', etiqueta: 'Comprobación 1: qué revisé y qué encontré', renglones: 3, max: 900, inicial: previa });
        ctx.campo({ id: 'c2', etiqueta: 'Comprobación 2: qué revisé y qué encontré', renglones: 3, max: 900 });
        var g;
        ctx.boton('ANOTAR MI VERIFICACION', function () {
          var t1 = (ctx.datos.c1 || '').trim(), t2 = (ctx.datos.c2 || '').trim();
          if (!t1 && !t2) { g.className = 'guardado mal'; g.textContent = 'Escribe al menos una comprobación.'; return; }
          var texto = t2 ? '1) ' + t1 + ' 2) ' + t2 : t1;
          var ok = ctx.responder('verificacion', texto, 'verificar');
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        g = ctx.guardado();
        if (previa) ctx.listo();
      } },

      /* 7 · firma (la revelación no se abre sin ella) */
      { id: 'firma', titulo: 'FIRMA TU DECISION', render: function (ctx, cuerpo) {
        ctx.p('Decide dónde van las dos placas y firma. Una decisión firmada dice <b>qué decides, con qué certeza, qué no sabes y qué te haría cambiar</b>. Lo que pasó de verdad viene después.');
        var cont = ctx.el('div', 'avion-elegir'); cuerpo.appendChild(cont);
        var lado = ctx.el('div'), der = ctx.el('div'); cont.appendChild(lado); cont.appendChild(der);
        var sel = (ctx.datos.placas || []).slice();
        function pintar() { lado.innerHTML = ''; lado.appendChild(avion([], sel, function (z) { var b = der.querySelector('[data-v="' + z + '"]'); if (b) b.click(); })); }
        der.appendChild(ctx.el('p', 'nota', 'Elige dos zonas distintas.'));
        ctx.opciones({ lista: ZONAS.map(function (z) { return [z, NOMBRE[z]]; }), clave: 'placas', max: 2, b: true, clase: 'zonas', etiqueta: 'Zonas de las dos placas',
          dentro: der, alCambiar: function (v) { sel = v; pintar(); } });
        pintar();
        ctx.h3('CERTEZA');
        if (!ctx.datos.certeza) ctx.datos.certeza = 'Media';
        ctx.opciones({ lista: [['Baja', 'Baja'], ['Media', 'Media'], ['Alta', 'Alta']], clave: 'certeza', clase: 'zonas', etiqueta: 'Certeza' });
        ctx.campo({ id: 'nose', etiqueta: 'Lo que no sé', renglones: 2, max: 400 });
        ctx.campo({ id: 'cambiar', etiqueta: 'Qué me haría cambiar de decisión', renglones: 2, max: 400 });
        ctx.campo({ id: 'algo', etiqueta: '¿Necesitas algo más que contar y comparar para decidir? ¿Qué?', renglones: 2, max: 400 });
        var res = ctx.el('div'); var g;
        ctx.boton('FIRMAR MI DECISION', function () {
          if (sel.length !== 2) { g.className = 'guardado mal'; g.textContent = 'Elige dos zonas distintas para las placas. Nadie elige por ti.'; return; }
          var texto = 'Decido blindar: ' + NOMBRE[sel[0]] + ' y ' + NOMBRE[sel[1]] + '. Certeza: ' + (ctx.datos.certeza || 'Media') +
            '. Lo que no sé: ' + (ctx.datos.nose || '') + '. Me haría cambiar: ' + (ctx.datos.cambiar || '') +
            '. ¿Algo más que contar y comparar?: ' + (ctx.datos.algo || '');
          var ok = ctx.responder('firma', texto, 'firma');
          ctx.datos.firmadas = sel.slice(); ctx.guardar();
          res.innerHTML = ''; ctx.sello('DECISION FIRMADA', 'Placas en ' + NOMBRE[sel[0]].toLowerCase() + ' y ' + NOMBRE[sel[1]].toLowerCase() + ', con certeza ' + (ctx.datos.certeza || 'Media').toLowerCase() + '. La firma es tuya, no del asistente.', 'anil', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        cuerpo.appendChild(res);
        g = ctx.guardado();
        if (ctx.S.respuestas.firma) { ctx.sello('DECISION FIRMADA', 'Ya firmaste. Si firmas otra vez, cuenta la más reciente.', 'anil', res); ctx.listo(); }
        else ctx.p('La revelación se abre cuando firmes.', 'nota');
      } },

      /* 8 · la revelación */
      { id: 'revelacion', titulo: 'LA REVELACION', puerta: function (S) { return !!S.respuestas.firma; }, render: function (ctx, cuerpo) {
        ctx.p('Ahora sí: estos son los aviones que <b>no volvieron</b>, con sus agujeros. En la guerra nadie tuvo estos datos; aquí existen porque la misión es simulada.');
        var zona = ctx.el('div'); cuerpo.appendChild(zona);
        function abrir() {
          zona.innerHTML = '';
          zona.appendChild(ctx.el('h3', null, 'AGUJEROS POR AVION'));
          ctx.barras({ categorias: ZONAS.map(function (z) { return NOMBRE[z]; }), decimales: 2, series: [
            { nombre: 'Volvieron (' + ctx.fmt(VOLVIERON.length) + ')', color: ANIL, valores: ZONAS.map(function (z) { return H[z] / VOLVIERON.length; }) },
            { nombre: 'No volvieron (' + ctx.fmt(NO_VOLVIERON.length) + ')', color: SALSA, valores: ZONAS.map(function (z) { return HD[z] / NO_VOLVIERON.length; }) }],
            pie: 'Los ' + NO_VOLVIERON.length + ' aviones que no volvieron tienen casi un agujero en motores por avión; los que volvieron, menos de 0.2. En fuselaje, alas y cola, los dos grupos se parecen.' }, zona);
          var t = ctx.el('div', 'tarjeta verificado'); t.appendChild(ctx.el('h3', null, 'EXPEDIENTE: ABRAHAM WALD · VERIFICADO'));
          var dl = ctx.el('dl');
          [['QUIEN', 'Matemático del Statistical Research Group de la Universidad de Columbia, en Nueva York, durante la Segunda Guerra Mundial.'],
           ['QUE HIZO', 'Hacia 1943 escribió memorandos con un método para estimar qué tan vulnerable era cada parte de un avión a partir del daño de los que regresaban.'],
           ['SU SUPUESTO', 'En sus ejemplos, los impactos se reparten según el área que cada parte presenta al ataque: una idea parecida a la de «Lo que no llegó».'],
           ['DESPUES', 'El Center for Naval Analyses reimprimió los memorandos en julio de 1980; su método se usó para analizar datos de Corea y Vietnam.'],
           ['LO QUE SI ESCRIBIO', 'Ejemplos hipotéticos con motores, fuselaje y combustible, y que el método puede guiar dónde va el blindaje.'],
           ['LO QUE NO SABEMOS', 'Qué blindaje se cambió de verdad por su trabajo ni cuántas vidas se salvaron. La imagen del avión con puntos rojos no muestra sus datos.']
          ].forEach(function (f) { var a = document.createElement('div'); a.appendChild(ctx.el('dt', 'px', f[0])); a.appendChild(ctx.el('dd', null, f[1])); dl.appendChild(a); });
          t.appendChild(dl); zona.appendChild(t);
          var firm = (ctx.S.datos.firma || {}).firmadas || [];
          var m = /Decido blindar: (.+?) y (.+?)\. Certeza/.exec(ctx.S.respuestas.firma || '');
          var textoFirma = firm.length === 2 ? NOMBRE[firm[0]] + ' y ' + NOMBRE[firm[1]] : m ? m[1] + ' y ' + m[2] : '(todavía no firmas)';
          var tu = ctx.el('div', 'tarjeta'); tu.appendChild(ctx.el('h3', null, 'TU APUESTA Y TU FIRMA'));
          tu.appendChild(ctx.el('p', null, 'Tu apuesta: ' + (ctx.S.hip || '(no la anotaste)') + '. Tu firma: ' + textoFirma + '.'));
          tu.appendChild(ctx.el('p', null, 'Las zonas con menos agujeros en el registro eran las más peligrosas: lo que faltaba en los datos era la información que importaba.'));
          zona.appendChild(tu);
          ctx.datos.abierta = true; ctx.guardar(); ctx.listo();
        }
        if (ctx.datos.abierta) abrir();
        else ctx.boton('ABRIR EL HANGAR DE LOS QUE NO VOLVIERON', function () { abrir(); }, '', zona);
      } },

      /* 9 · laboratorio */
      { id: 'laboratorio', titulo: 'LABORATORIO', render: function (ctx, cuerpo) {
        ctx.p('Elige dónde van las dos placas y manda otra vez la misma misión de ' + ctx.fmt(SALIERON) + ' aviones. Una placa reduce el peligro de los impactos en su zona.');
        var sel = (ctx.datos.placas || []).slice();
        ctx.opciones({ lista: ZONAS.map(function (z) { return [z, NOMBRE[z]]; }), clave: 'placas', max: 2, b: true, clase: 'zonas', etiqueta: 'Zonas de las dos placas',
          alCambiar: function (v) { sel = v; enviar.disabled = sel.length !== 2; } });
        var enviar = ctx.boton('ENVIAR ' + ctx.fmt(SALIERON) + ' AVIONES', function () { volar(sel, true); });
        enviar.disabled = sel.length !== 2;
        var marc = ctx.el('dl', 'marcador'), hang = ctx.el('div', 'hangar'); hang.setAttribute('aria-hidden', 'true');
        cuerpo.appendChild(marc); cuerpo.appendChild(hang);
        var ultimo = 0;
        function volar(placas, registrar) {
          var vuelo = SIM.simulate(P, placas), vuelven = vuelo.filter(function (a) { return a.returned; }).length;
          marc.innerHTML = '<div><dt>SIN PLACAS</dt><dd class="base">' + ctx.fmt(VOLVIERON.length) + '</dd></div><div><dt>CON TUS PLACAS</dt><dd>' +
            ctx.fmt(vuelven) + '</dd></div><div><dt>DIFERENCIA</dt><dd>' + (vuelven - VOLVIERON.length >= 0 ? '+' : '') + ctx.fmt(vuelven - VOLVIERON.length) + '</dd></div>';
          hang.innerHTML = ''; var celdas = vuelo.map(function () { var i = document.createElement('i'); hang.appendChild(i); return i; });
          var pintar = function (n) { for (var k = 0; k < n; k++) celdas[k].className = vuelo[k].returned ? 'v' : 'c'; };
          if (ctx.reducir) pintar(celdas.length);
          else { var k0 = 0, t0 = performance.now(); (function paso(t) { var n = Math.min(celdas.length, Math.round((t - t0) / 1500 * celdas.length)); for (; k0 < n; k0++) celdas[k0].className = vuelo[k0].returned ? 'v' : 'c'; if (n < celdas.length) requestAnimationFrame(paso); })(t0); }
          ctx.anunciar('Con placas en ' + placas.map(function (z) { return NOMBRE[z].toLowerCase(); }).join(' y ') + ' vuelven ' + vuelven + ' de ' + SALIERON + '.');
          if (registrar && Date.now() - ultimo > 10000) { ultimo = Date.now(); ctx.registrar('laboratorio', { valor: { placas: placas.slice().sort() } }); }
          ctx.datos.volo = true; ctx.guardar(); ctx.listo();
        }
        if (ctx.datos.volo && sel.length === 2) volar(sel, false);
        ctx.p('Los parámetros de la simulación son ilustrativos: sirven para ver el mecanismo, no para calcular la guerra real.', 'nota');
      } },

      /* 10 · tu propia decisión */
      { id: 'cierre', titulo: 'TU PROPIA DECISION', render: function (ctx, cuerpo) {
        ctx.h3('LA MISMA IDEA EN LA TAQUERIA');
        var t = ctx.el('table', 'tabla-t');
        t.innerHTML = '<thead><tr><th scope="col">En la taquería</th><th scope="col">En la guerra</th></tr></thead><tbody>' +
          '<tr><td>Don Juan pregunta qué mejorar solo a los clientes que regresan</td><td>Revisar solo los aviones que volvieron</td></tr>' +
          '<tr><td>Los que no volvieron nunca dicen por qué se fueron</td><td>Los aviones derribados no llegan al registro</td></tr>' +
          '<tr><td>Preguntar a quien dejó de venir, o mirar qué pasó en su última visita</td><td>Buscar los agujeros que faltan</td></tr></tbody>';
        cuerpo.appendChild(t);
        ctx.h3('MI DECISION');
        ctx.p('Piensa en una decisión real de tu trabajo, tu escuela o tu vida. Escribe <b>qué casos no llegan a los datos con los que decides</b> y por qué. Es la primera pieza de tu proyecto «Mi decisión».');
        ctx.campo({ id: 'mi', etiqueta: 'Mi decisión: qué casos no llegan a mis datos', renglones: 4, max: 1500, inicial: ctx.S.respuestas.mi_decision || '' });
        var fin = ctx.el('div'); var g;
        ctx.boton('ENTREGAR Y CERRAR EL CASO', function () {
          var texto = (ctx.datos.mi || '').trim();
          if (!texto) { g.className = 'guardado mal'; g.textContent = 'Escribe tu pieza de Mi decisión para cerrar el caso.'; return; }
          var ok = ctx.responder('mi_decision', texto, 'cierre');
          ctx.completar(); ctx.marcarGuardado(g, ok); cerrar();
        });
        g = ctx.guardado();
        cuerpo.appendChild(fin);
        function cerrar() {
          fin.innerHTML = '';
          ctx.sello('CASO 1.1 RESUELTO', null, 'comal', fin);
          fin.appendChild(lista(['Los agujeros que importaban no estaban en el registro: estaban en los aviones que no volvieron.',
            'Contar filas destapó el error del asistente; comparar con lo esperado destapó lo que faltaba.',
            'La pregunta que te llevas: qué falta en mis datos y por qué.']));
          var bits = Object.keys(ctx.S.retos).reduce(function (s, k) { return s + (ctx.S.retos[k].bits || 0); }, 0);
          if (ctx.M.modo === 'alumno') fin.appendChild(ctx.el('p', null, 'Bits de este caso: ' + bits + '. Tu marcador completo está en Mi avance.'));
          var f = ctx.el('p', 'frase'); f.innerHTML = '<b>El criterio en una frase:</b> ¿Qué falta en mis datos? Antes de contar lo que sí llegó, pregunta qué casos nunca llegaron a tu tabla.'; fin.appendChild(f);
          ctx.listo();
        }
        if (ctx.S.completo) cerrar();
        var glo = document.createElement('details'); glo.className = 'mas'; glo.innerHTML = '<summary>Glosario</summary>';
        glo.appendChild(lista(['Sesgo de supervivencia: sacar conclusiones solo con los casos que pasaron un filtro (los aviones que volvieron) e ignorar los que no.',
          'Faltantes no aleatorios: datos que faltan por una razón relacionada con lo que quieres medir.',
          'Proceso generador de datos: el camino por el que un caso llega (o no llega) a tu tabla.',
          'Esperado contra observado: comparar lo que verías bajo un supuesto (impactos parejos) con lo que de verdad hay.']));
        cuerpo.appendChild(glo);
        var fu = document.createElement('details'); fu.className = 'mas';
        fu.innerHTML = '<summary>Fuentes</summary><ul>' +
          '<li><a href="https://www.ams.org/samplings/feature-column/fc-2016-06" target="_blank" rel="noopener noreferrer">Casselman, B. (2016). «The Legend of Abraham Wald». AMS Feature Column.</a></li>' +
          '<li><a href="https://apps.dtic.mil/sti/pdfs/ADA091073.pdf" target="_blank" rel="noopener noreferrer">Center for Naval Analyses (1980). Reimpresión de «A Method of Estimating Plane Vulnerability Based on Damage of Survivors», de Abraham Wald (CRC 432).</a></li>' +
          '<li><a href="https://github.com/jcval94/mvp-ds-course/tree/main/casos/data/wald-bombers" target="_blank" rel="noopener noreferrer">Datos simulados del caso (CC0). No son cifras históricas.</a></li></ul>';
        cuerpo.appendChild(fu);
      } }
    ]
  };
})();
