/* Caso 2.2 · ¿De qué mueren los soldados? (Crimea, 1854-1856) — se resuelve en la página (docs/casos-pagina/2-2-nightingale.md).
   Caso principal de la clase 4, formato completo (~40 min). DATOS REALES (datos.js = casos/data/nightingale-crimea-1854):
   la tabla mensual que Nightingale publicó en 1858 (tropa y muertes por causa), sin las tasas, que calcula el alumno.
   La rosa del asistente es una reconstrucción con esas cifras y un error plantado. Las claves de los retos viven solo en
   la base. Regla: la herramienta se nombra en «El número que no cabe», después del reto 2. Caso con muertes reales: sin
   nombres, sin dramatizar, sin sonido ni destello en las cifras y sin opciones con humor. */
(function () {
  'use strict';
  var D = window.DatosNightingale, CI = D.cifras, M = D.meses;
  var MES = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  var NOMBRE_MES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var etiqueta = function (m) { return NOMBRE_MES[+m.mes.slice(5) - 1] + ' de ' + m.mes.slice(0, 4); };
  var mes = function (clave) { return M.filter(function (m) { return m.mes === clave; })[0]; };
  var suma = function (k) { return M.reduce(function (s, m) { return s + m[k]; }, 0); };
  var tasa = function (m, k) { return 12000 * m[k] / m.tropa; };
  var num = function (t) { var x = parseFloat(String(t || '').replace(/,(?=\d{3}\b)/g, '').replace(',', '.')); return isFinite(x) ? x : null; };
  var ENE = mes('1855-01'), MAR = mes('1855-03'), JUL54 = mes('1854-07'), JUL55 = mes('1855-07');
  var ANIO1 = M.slice(0, 12), ANIO2 = M.slice(12, 24);
  var R_ENE = 80, R_MAR_RADIO = Math.round(10 * R_ENE * tasa(MAR, 'enfermedad') / tasa(ENE, 'enfermedad')) / 10;
  var area = function (r) { return Math.round(Math.PI * r * r / 12); };

  /* Rosa de 12 cuñas iguales (30° cada una). modo 'radio': el radio sigue al valor (el error); 'area': el área sigue al valor. */
  function rosa(ctx, o) {
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'), cx = 160, cy = 142, R = 92;
    svg.setAttribute('viewBox', '0 0 320 270'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', o.alt);
    svg.style.width = '100%'; svg.style.maxWidth = '420px'; svg.style.display = 'block'; svg.style.margin = '0 auto';
    var s = '<rect width="320" height="270" fill="var(--tq-papel)"/>';
    if (o.titulo) s += '<text x="160" y="17" font-size="12" text-anchor="middle" fill="var(--tq-comal-texto)" font-weight="700">' + o.titulo + '</text>';
    o.valores.forEach(function (v, i) {
      var a0 = (-90 + i * 30) * Math.PI / 180, a1 = a0 + Math.PI / 6;
      var r = o.modo === 'radio' ? R * v / o.max : R * Math.sqrt(Math.max(v, 0) / o.max);
      if (r >= 0.4) {
        var p = 'M' + cx + ' ' + cy + 'L' + (cx + r * Math.cos(a0)).toFixed(2) + ' ' + (cy + r * Math.sin(a0)).toFixed(2) +
          'A' + r.toFixed(2) + ' ' + r.toFixed(2) + ' 0 0 1 ' + (cx + r * Math.cos(a1)).toFixed(2) + ' ' + (cy + r * Math.sin(a1)).toFixed(2) + 'Z';
        var marca = (o.destacar || []).indexOf(i) >= 0;
        s += '<path d="' + p + '" fill="' + (o.color || 'var(--tq-anil)') + '" stroke="' + (marca ? 'var(--tq-comal-texto)' : 'var(--tq-papel)') + '" stroke-width="' + (marca ? 2.5 : 1) + '"/>';
      }
      var am = a0 + Math.PI / 12, rl = R + 14;
      s += '<text x="' + (cx + rl * Math.cos(am)).toFixed(1) + '" y="' + (cy + rl * Math.sin(am) + 4).toFixed(1) + '" font-size="11" text-anchor="middle" fill="var(--tq-comal-texto)">' + o.meses[i] + '</text>';
    });
    if (o.pie) s += '<text x="160" y="264" font-size="11" text-anchor="middle" fill="var(--tq-comal-texto)">' + o.pie + '</text>';
    svg.innerHTML = s; return svg;
  }
  var mesesDe = function (lista) { return lista.map(function (m) { return MES[+m.mes.slice(5) - 1]; }); };

  window.CASO_PAGINA = {
    id: '2.2', version: 'pagina-1.0', titulo: '¿DE QUE MUEREN LOS SOLDADOS?', intro: './', minutos: 40,
    secciones: [

      /* 1 · el expediente */
      { id: 'preparacion', titulo: 'EL EXPEDIENTE', render: function (ctx) {
        ctx.aviso('<b>Aviso de contenido.</b> Este caso trata sobre muertes reales de soldados en la guerra de Crimea. Trabajamos con conteos, no con historias personales.');
        ctx.p('Londres, 1857. La Comisión Real que estudia la salud del ejército quiere entender qué pasó en Oriente. Sobre la mesa cae un expediente con tres piezas.');
        ctx.expediente([['LA TABLA DEL EJERCITO', 'Mes por mes, de abril de 1854 a marzo de 1856: cuántos soldados había y de qué murieron. Cerrada.'],
          ['LA COLUMNA QUE NO CABE', 'Un número de enero de 1855 que parece imposible. Doblada.'],
          ['LA ROSA DEL ASISTENTE', 'Una gráfica para la comisión, hecha con la tabla. Todavía no la abres.', true]]);
        ctx.aviso('<b>Datos reales.</b> Las cifras son las de la tabla que Florence Nightingale publicó en 1858, transcritas por Pearson y Short. La rosa del asistente es una reconstrucción con esas mismas cifras. Las fuentes están al final del caso.');
      } },

      /* 2 · la apuesta, antes de abrir la tabla */
      { id: 'apuesta', titulo: 'TU APUESTA', render: function (ctx, cuerpo) {
        var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg');
        svg.setAttribute('viewBox', '0 0 160 60'); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', 'Un muelle de noche con cuatro cajas sin abrir junto a un barco.');
        svg.style.width = '100%'; svg.style.maxWidth = '480px'; svg.setAttribute('shape-rendering', 'crispEdges');
        var s = '<rect width="160" height="60" fill="var(--tq-noche)"/><rect y="42" width="160" height="18" fill="var(--tq-ventana-noche)"/><rect y="40" width="96" height="4" fill="var(--tq-madera)"/>';
        s += '<rect x="104" y="28" width="46" height="12" fill="var(--tq-cafe-oscuro)"/><rect x="118" y="10" width="2" height="18" fill="var(--tq-papel)"/><rect x="120" y="12" width="14" height="10" fill="var(--tq-papel)"/>';
        [10, 30, 50, 70].forEach(function (x) { s += '<rect x="' + x + '" y="28" width="14" height="12" fill="var(--tq-manila)"/><rect x="' + x + '" y="28" width="14" height="2" fill="var(--tq-manila-clara)"/><rect x="' + (x + 6) + '" y="30" width="2" height="10" fill="var(--tq-cafe)"/>'; });
        svg.innerHTML = s; cuerpo.appendChild(svg);
        ctx.p('<b>Es diciembre de 1854. Puedes mandar a Oriente una sola cosa. ¿Qué salva más vidas este invierno?</b>');
        ctx.apuesta(['Más cirujanos para los heridos de batalla', 'Limpiar el agua, los drenajes y la ventilación de los hospitales',
          'Ropa de invierno y comida', 'Más soldados de refuerzo']);
      } },

      /* 3 · la tabla: de qué murieron y una comparación entre dos julios */
      { id: 'tabla', titulo: 'LA TABLA', render: function (ctx, cuerpo) {
        ctx.p('Se abre la tabla. Para cada mes, la tropa promedio que estimó el ejército y las muertes por tres causas. «Enfermedad» es lo que la tabla llama enfermedades zimóticas.');
        ctx.desplegable('¿Qué es una enfermedad zimótica?', ['Enfermedad zimótica: término médico del siglo XIX para las enfermedades infecciosas agudas que se contagian, como el cólera, el tifus o la disentería. Nightingale las llamó «prevenibles o mitigables».']);
        var filas = M.map(function (m) { return [etiqueta(m), ctx.fmt(m.tropa), ctx.fmt(m.enfermedad), ctx.fmt(m.heridas), ctx.fmt(m.otras)]; });
        filas.push(['TOTAL', '—', ctx.fmt(suma('enfermedad')), ctx.fmt(suma('heridas')), ctx.fmt(suma('otras'))]);
        cuerpo.appendChild(ctx.tabla(['MES', 'TROPA', 'ENFERMEDAD', 'HERIDAS', 'OTRAS'], filas, { caja: 'Tropa y muertes por mes, abril de 1854 a marzo de 1856' }));
        ctx.barras({ categorias: ['Enfermedad', 'Heridas', 'Otras causas'], decimales: 0,
          series: [{ nombre: 'Muertes en los 24 meses', color: 'var(--anil)', valores: [suma('enfermedad'), suma('heridas'), suma('otras')] }],
          pie: 'Muertes de abril de 1854 a marzo de 1856, por causa.' });
        ctx.calculadora();
        ctx.reto({ id: 'reto_enfermedad_heridas', titulo: '★ RETO 1', dificultad: 1, tipo: 'numero', etiqueta: 'Tu respuesta (veces)',
          pregunta: 'En los 24 meses, ¿cuántas veces más soldados murieron por enfermedad que por heridas?',
          pista: 'Divide el total de enfermedad entre el total de heridas.', alResponder: function () {}, alSaltar: function () {} });

        ctx.h3('DOS JULIOS');
        ctx.p('En julio de 1854 murieron ' + ctx.fmt(JUL54.enfermedad) + ' soldados por enfermedad; en julio de 1855, ' + ctx.fmt(JUL55.enfermedad) + '. <b>¿Empeoró el ejército?</b> Antes de contestar, saca con la calculadora cuántos murieron por cada 1,000 soldados en cada julio.');
        var guardadas = {}; ctx.controles('julio').forEach(function (x) { guardadas[x.mes] = x.valor; });
        var notas = ctx.controles('julio').map(function (x) { return x.texto; });
        var lib = ctx.libreta(notas);
        [JUL54, JUL55].forEach(function (m) {
          var i = ctx.campo({ id: 'j' + m.mes, etiqueta: etiqueta(m) + ': muertes por enfermedad por cada 1,000 soldados', renglones: 1, max: 12 }); i.inputMode = 'decimal';
        });
        var nota = ctx.el('p', 'nota'); nota.setAttribute('role', 'status');
        ctx.boton('ANOTAR EN LA LIBRETA', function () {
          var a = num(ctx.datos['j' + JUL54.mes]), b = num(ctx.datos['j' + JUL55.mes]);
          if (a == null || b == null || a < 0 || b < 0 || a > 1000 || b > 1000) { nota.textContent = 'Escribe las dos cuentas, cada una entre 0 y 1,000.'; return; }
          [[JUL54, a], [JUL55, b]].forEach(function (p) {
            var t = etiqueta(p[0]) + ': ' + ctx.fmt(p[1], 1) + ' por cada 1,000 soldados.';
            guardadas[p[0].mes] = p[1]; ctx.registrar('julio', { mes: p[0].mes, valor: p[1], texto: t }); lib.anotar(t);
          });
          nota.textContent = b < a ? 'Más muertes en julio de 1855 y, aun así, menos por cada 1,000: la tropa era casi la mitad más grande.'
            : 'Revisa tus dos cuentas: muertes entre tropa, por 1,000.';
          ctx.listo();
        }, 'sec');
        cuerpo.appendChild(nota);
        if (guardadas[JUL54.mes] != null && guardadas[JUL55.mes] != null) ctx.listo();
      } },

      /* 4 · el número que no cabe: la herramienta, nombrada después del reto 2 */
      { id: 'anual', titulo: 'EL NUMERO QUE NO CABE', render: function (ctx, cuerpo) {
        ctx.p('Se desdobla la segunda pieza. En la tabla de 1858, junto a las muertes de cada mes, Nightingale imprimió una columna más. Así viene enero de 1855:');
        var pz = ctx.el('div', 'pieza'); pz.appendChild(ctx.el('b', null, 'ENERO DE 1855'));
        pz.appendChild(ctx.tabla(['TROPA', 'MUERTES POR ENFERMEDAD', 'TASA ANUAL DE MORTALIDAD POR CADA 1,000'], [[ctx.fmt(ENE.tropa), ctx.fmt(ENE.enfermedad), ctx.fmt(CI.tasa_impresa_ene1855, 1)]]));
        cuerpo.appendChild(pz);
        ctx.p('<b>Más de mil de cada mil.</b> Si en enero hubieran muerto 1,022 de cada 1,000 soldados, no habría quedado ejército. Y en febrero la tabla sigue con miles de soldados.');
        var notas = ctx.controles('cuenta').map(function (x) { return x.texto; });
        var lib = ctx.libreta(notas);
        ctx.calculadora();
        var i = ctx.campo({ id: 'ene', etiqueta: 'Con la calculadora: en enero de 1855, ¿cuántos de cada 1,000 soldados murieron por enfermedad?', renglones: 1, max: 12 }); i.inputMode = 'decimal';
        ctx.boton('ANOTAR EN LA LIBRETA', function () {
          var x = num(ctx.datos.ene); if (x == null || x < 0 || x > 1000) return;
          var t = 'Enero de 1855: ' + ctx.fmt(x, 1) + ' de cada 1,000 soldados murieron por enfermedad en el mes. La tabla dice ' + ctx.fmt(CI.tasa_impresa_ene1855, 1) + '.';
          ctx.registrar('cuenta', { que: 'enero', valor: x, texto: t }); lib.anotar(t);
        }, 'sec');
        var nom = ctx.el('div'), despues = ctx.el('div');   // antes del reto: si ya se respondió, nombrar() corre al pintarlo
        ctx.reto({ id: 'reto_por_doce', titulo: '★★ RETO 2', dificultad: 2, tipo: 'numero', etiqueta: 'Tu respuesta (un número)',
          pregunta: '¿Por qué número hay que multiplicar tu cuenta de enero para llegar al ' + ctx.fmt(CI.tasa_impresa_ene1855, 1) + ' de la tabla?',
          pista: 'Divide el número de la tabla entre tu cuenta. ¿Cuántos meses tiene un año?',
          alResponder: function () { nombrar(); }, alSaltar: function () { nombrar(); } });
        cuerpo.appendChild(nom); cuerpo.appendChild(despues);
        function nombrar() {
          if (nom.childNodes.length) return;
          ctx.nombre(['Tomar lo que pasó en un mes y multiplicarlo por 12 da una <b>tasa anualizada</b>: dice a qué ritmo morían, como si todo el año fuera igual que ese mes. No dice cuántos murieron en el año. Pasa de mil porque, a ese ritmo y sin refuerzos, la enfermedad habría acabado con el ejército en menos de un año.',
            'Poner todos los meses por cada 1,000 soldados y por año es <b>estandarizar</b>: dejar los números en la misma base para comparar meses con tropas de ' + ctx.fmt(M[0].tropa) + ' o de ' + ctx.fmt(Math.max.apply(null, M.map(function (m) { return m.tropa; }))) + ' soldados, o una tabla de un mes con otra de un año. Antes de comparar un número, pregunta: ¿por cada cuántos?, ¿en cuánto tiempo?'],
            ['../../labs/level-2/comparacion-visual.html', 'Laboratorio: comparación visual'], nom);
          ctx.reto({ id: 'reto_tasa_marzo', titulo: '★★ RETO 3', dificultad: 2, tipo: 'numero', etiqueta: 'Tu respuesta (por cada 1,000 al año)', dentro: despues,
            pregunta: 'Con la misma regla, ¿cuál fue la tasa anual de muertes por enfermedad en marzo de 1855? (Tropa: ' + ctx.fmt(MAR.tropa) + '. Muertes por enfermedad: ' + ctx.fmt(MAR.enfermedad) + '.)',
            pista: 'Muertes entre tropa, por 1,000 y por 12.', alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        }
        if (ctx.S.retos.reto_por_doce || (ctx.S.datos._luego || {}).reto_por_doce) nombrar();
        if (ctx.S.retos.reto_tasa_marzo || (ctx.S.datos._luego || {}).reto_tasa_marzo) ctx.listo();
      } },

      /* 5 · la rosa del asistente: el radio sigue a la tasa (error plantado) */
      { id: 'asistente', titulo: 'LA ROSA DEL ASISTENTE', render: function (ctx, cuerpo) {
        ctx.p('Le pediste al asistente: <i>«Haz una rosa como las de Nightingale, con la tasa anual de muertes por enfermedad de cada mes, de abril de 1854 a marzo de 1855, para la comisión.»</i> Esto entregó. <b>Puede tener un error.</b> Revisa antes de usarla.');
        var pz = ctx.el('div', 'pieza borrador'); pz.appendChild(ctx.el('b', null, 'ROSA DEL ASISTENTE')); pz.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
        var tasas = ANIO1.map(function (m) { return tasa(m, 'enfermedad'); });
        pz.appendChild(rosa(ctx, { valores: tasas, max: tasas[9], modo: 'radio', meses: mesesDe(ANIO1), destacar: [9, 11],
          titulo: 'Muertes por enfermedad · abril 1854 a marzo 1855', pie: 'Cada cuña es un mes. Fuente: Nightingale (1858).',
          alt: 'Rosa del asistente: doce cuñas iguales en ángulo, una por mes de abril de 1854 a marzo de 1855. Enero de 1855 es la más grande y marzo de 1855 está marcada.' }));
        pz.appendChild(ctx.el('p', null, '«Conclusión: en la rosa, el área de enero es más de cuatro veces la de marzo. El peor invierno multiplicó el peligro por más de cuatro.»'));
        cuerpo.appendChild(pz);
        ctx.h3('TU MESA DE VERIFICACION');
        var notas = ctx.controles('comprobacion').map(function (x) { return x.texto; }).filter(Boolean);
        var acc = ctx.el('div', 'acciones'); cuerpo.appendChild(acc);
        var lib = ctx.libreta(notas);
        function anotar(a, t) { if (notas.indexOf(t) < 0) ctx.registrar('comprobacion', { accion: a, texto: t }); lib.anotar(t); }
        ctx.boton('MEDIR LOS RADIOS', function () { anotar('radios', 'Radios en el dibujo: enero ' + ctx.fmt(R_ENE) + ', marzo ' + ctx.fmt(R_MAR_RADIO, 1) + '.'); }, 'sec', acc);
        ctx.boton('MEDIR LAS AREAS', function () { anotar('areas', 'Áreas en el dibujo: enero ' + ctx.fmt(area(R_ENE)) + ' unidades, marzo ' + ctx.fmt(area(R_MAR_RADIO)) + '.'); }, 'sec', acc);
        ctx.boton('LEER LA LEYENDA DE NIGHTINGALE', function () { anotar('leyenda', 'Leyenda de 1858: las cuñas representan las muertes «área por área», medidas desde el centro.'); }, 'sec', acc);
        var rc = ctx.el('div', 'tarjeta'); rc.appendChild(ctx.el('h3', null, 'COMPARAR LAS TASAS'));
        rc.appendChild(ctx.el('p', null, 'Con tus tasas de enero y de marzo: ¿cuántas veces más alta es la de enero?'));
        ctx.calculadora(rc);
        var ri = ctx.campo({ id: 'veces', etiqueta: 'Tu cuenta (veces)', renglones: 1, max: 12, dentro: rc }); ri.inputMode = 'decimal';
        ctx.boton('ANOTAR MI CUENTA', function () {
          var x = num(ctx.datos.veces); if (x == null) return;
          anotar('tasas', 'La tasa de enero es ' + ctx.fmt(x, 2) + ' veces la de marzo.');
        }, 'sec', rc);
        cuerpo.appendChild(rc);
        ctx.reto({ id: 'reto_error_rosa', titulo: '★★ RETO 4', dificultad: 2, tipo: 'opcion',
          pregunta: 'Compara la rosa con tus cuentas. ¿Dónde está el error del asistente?',
          opciones: ['El radio sigue a la tasa, así que el área crece al cuadrado y exagera enero',
            'Usa muertes en lugar de tasas y no toma en cuenta la tropa de cada mes',
            'Deja fuera las muertes por heridas y por otras causas del mismo año',
            'No tiene ningún error'],
          pista: 'Compara cuántas veces más grande es el área de enero con cuántas veces más alta es su tasa.',
          alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        if (ctx.S.retos.reto_error_rosa || (ctx.S.datos._luego || {}).reto_error_rosa) ctx.listo();
      } },

      /* 6 · la rosa honesta: el alumno saca el radio y verifica */
      { id: 'honesta', titulo: 'LA ROSA HONESTA', render: function (ctx, cuerpo) {
        ctx.p('Una rosa honesta pide que el <b>área</b> de cada cuña siga a la tasa. Si la tasa de marzo es menos de la mitad que la de enero, su área debe ser esa misma fracción de la de enero; el radio no baja en la misma proporción.');
        ctx.calculadora();
        var zona = ctx.el('div'), boton = ctx.el('div', 'acciones'), verif = ctx.el('div');   // verif: tarjeta y verificación, antes de SEGUIR aunque el reto se responda después
        verif.style.display = 'grid'; verif.style.gap = '14px';
        var tasas = ANIO1.map(function (m) { return tasa(m, 'enfermedad'); });   // antes del reto: si ya se respondió, mostrar() corre al pintarlo
        ctx.reto({ id: 'reto_radio_honesto', titulo: '★★★ RETO 5', dificultad: 3, tipo: 'numero', etiqueta: 'Tu respuesta (unidades de radio)',
          pregunta: 'En una rosa honesta, la cuña de enero de 1855 mide ' + R_ENE + ' de radio. ¿Cuánto debe medir la de marzo de 1855?',
          pista: 'Saca qué fracción de la tasa de enero es la de marzo. El radio es la raíz cuadrada de esa fracción, por ' + R_ENE + '. La calculadora tiene la tecla √.',
          alResponder: function () { mostrar(); }, alSaltar: function () { mostrar(); } });
        cuerpo.appendChild(boton); cuerpo.appendChild(zona); cuerpo.appendChild(verif);
        function pintar(modo) {
          zona.innerHTML = '';
          zona.appendChild(rosa(ctx, { valores: tasas, max: tasas[9], modo: modo, meses: mesesDe(ANIO1), destacar: [9, 11],
            titulo: modo === 'area' ? 'El área sigue a la tasa' : 'El radio sigue a la tasa (la del asistente)',
            pie: modo === 'area' ? 'Así midió Nightingale sus cuñas.' : 'Así quedó el borrador.',
            alt: modo === 'area' ? 'Rosa honesta: el área de cada cuña es proporcional a la tasa; enero sigue siendo la mayor, pero marzo ya no se ve tan pequeña.'
              : 'Rosa del asistente: el radio es proporcional a la tasa y enero se ve mucho más grande que marzo.' }));
        }
        function mostrar() {
          if (boton.childNodes.length) return;
          ctx.boton('VER LA ROSA HONESTA', function () { pintar('area'); ctx.registrar('rosa', { modo: 'area' }); }, 'sec', boton);
          ctx.boton('VER LA DEL ASISTENTE', function () { pintar('radio'); ctx.registrar('rosa', { modo: 'radio' }); }, 'sec', boton);
          pintar('area');
          var t = ctx.el('div', 'tarjeta'); t.appendChild(ctx.el('h3', null, 'EL AREA, NO EL RADIO'));
          t.appendChild(ctx.el('p', null, 'Si duplicas el radio, el área se multiplica por cuatro: el ojo compara superficies. En una gráfica de áreas, el tamaño de lo que ves tiene que crecer igual que el número. Si no, la gráfica cuenta otra historia, aunque cada número esté bien.'));
          verif.appendChild(t);
          ctx.verificacion({ texto: 'Escribe qué revisaste para confiar en tus tasas y en la rosa, y qué encontraste. Busca dos comprobaciones que no salgan de la misma cuenta.', dentro: verif });
        }
        if (ctx.S.retos.reto_radio_honesto || (ctx.S.datos._luego || {}).reto_radio_honesto) mostrar();
      } },

      /* 7 · la firma */
      { id: 'firma', titulo: 'FIRMA TU DECISION', render: function (ctx, cuerpo) {
        ctx.p('Es 1858. La comisión te da unos minutos y espacio para una sola gráfica. Lo que pasó de verdad viene después.');
        var OPC = ['Sanear cuarteles, hospitales y campamentos: la mayoría murió de enfermedades prevenibles',
          'Más cirujanos y hospitales de campaña: la guerra mata en el campo de batalla',
          'Más comida y ropa de invierno: el frío y el hambre explican ese invierno',
          'No recomendar nada: con cifras de guerra no se puede saber'];
        var sel = ctx.opciones({ lista: OPC.map(function (o) { return [o, o]; }), clave: 'decision', etiqueta: 'Tu recomendación' });
        ctx.campo({ id: 'frase', etiqueta: 'Qué gráfica le enseñas y qué dice, en una frase', renglones: 2, max: 400 });
        ctx.h3('CERTEZA');
        if (!ctx.datos.certeza) ctx.datos.certeza = 'Media';
        ctx.opciones({ lista: [['Baja', 'Baja'], ['Media', 'Media'], ['Alta', 'Alta']], clave: 'certeza', clase: 'zonas', etiqueta: 'Certeza' });
        ctx.campo({ id: 'nose', etiqueta: 'Lo que no sé', renglones: 2, max: 400 });
        ctx.campo({ id: 'cambiar', etiqueta: 'Qué me haría cambiar de decisión', renglones: 2, max: 400 });
        ctx.campo({ id: 'algo', etiqueta: '¿Necesitas algo más que contar y comparar? ¿Qué?', renglones: 2, max: 400 });
        var res = ctx.el('div'), g;
        ctx.boton('FIRMAR MI DECISION', function () {
          var d = ctx.datos, o = sel.valor()[0];
          if (!o || !(d.frase || '').trim()) { g.className = 'guardado mal'; g.textContent = 'Elige una recomendación y escribe tu frase. Nadie firma por ti.'; return; }
          var texto = 'Le recomiendo a la comisión: ' + o + '. Mi gráfica, en una frase: ' + d.frase.trim().replace(/\.+$/, '') + '. Certeza: ' + (d.certeza || 'Media') +
            '. Lo que no sé: ' + (d.nose || '') + '. Me haría cambiar: ' + (d.cambiar || '') + '. ¿Algo más que contar y comparar?: ' + (d.algo || '');
          var ok = ctx.responder('firma', texto, 'firma');
          res.innerHTML = ''; ctx.sello('DECISION FIRMADA', 'Con certeza ' + (d.certeza || 'Media').toLowerCase() + '. La firma es tuya, no del asistente.', 'anil', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.respuestas.firma) { ctx.sello('DECISION FIRMADA', 'Ya firmaste. Si firmas otra vez, cuenta la más reciente.', 'anil', res); ctx.listo(); }
        else ctx.p('La revelación se abre cuando firmes.', 'nota');
      } },

      /* 8 · la revelación */
      { id: 'revelacion', titulo: 'LA REVELACION', puerta: function (S) { return !!S.respuestas.firma; }, render: function (ctx, cuerpo) {
        ctx.h3('LOS 24 MESES, EN LA MISMA BASE');
        var t = M.map(function (m) { return tasa(m, 'enfermedad'); }), max = Math.max.apply(null, t);
        var col = ctx.el('div', 'columnas'); col.setAttribute('role', 'img');
        col.setAttribute('aria-label', 'Tasa anual de muertes por enfermedad, por cada 1,000 soldados, de abril de 1854 a marzo de 1856. Sube hasta enero de 1855, baja desde marzo de 1855, marcado, cuando llegó la comisión sanitaria, y en 1856 queda casi en cero.');
        M.forEach(function (m, k) { var i = ctx.el('i', m.mes === '1855-03' ? 'marca' : ''); i.style.height = (100 * t[k] / max) + '%'; i.title = etiqueta(m); col.appendChild(i); });
        cuerpo.appendChild(col);
        var ej = ctx.el('div', 'ejes'); ['abr 1854', 'mar 1855 (comisión)', 'mar 1856'].forEach(function (a) { ej.appendChild(ctx.el('span', null, a)); }); cuerpo.appendChild(ej);
        var s1 = ANIO1.reduce(function (s, m) { return s + m.enfermedad; }, 0), s2 = ANIO2.reduce(function (s, m) { return s + m.enfermedad; }, 0);
        ctx.p('En el primer año murieron por enfermedad ' + ctx.fmt(s1) + ' soldados; en el segundo, con más tropa, ' + ctx.fmt(s2) + '. Para comparar con lo esperado: Nightingale escribió que la mortalidad civil en Inglaterra era «solo de ' + CI.civiles_tasa + ' por 1,000» al año (Cohen, 1984).');
        ctx.verificado('FLORENCE NIGHTINGALE · VERIFICADO', [
          ['LO QUE SI PASO', 'Nightingale llegó a Scutari el 5 de noviembre de 1854. Las muertes por enfermedad siguieron subiendo hasta enero de 1855 y empezaron a bajar después de marzo de 1855, cuando llegó una comisión sanitaria; junto con la de abastos, limpió hospitales y campamentos.'],
          ['LA ROSA TUVO SU ERROR', 'Una primera versión de su diagrama medía con el radio aunque el texto hablaba de áreas. Nightingale lo notó, agregó una fe de erratas y en los documentos siguientes usó cuñas cuya área sigue a la tasa (Small, 1998).'],
          ['PARA QUE SIRVIO', 'Después de la guerra, con William Farr, armó las tablas para la Comisión Real que se formó en mayo de 1857. El diagrama salió en 1858 en sus Notes on Matters Affecting the Health… del ejército. Ese año fue la primera mujer elegida en la Sociedad de Estadística de Londres (McDonald, 2020).'],
          ['LO QUE NO SE SABE', 'Cuánto de la baja se debe al saneamiento y cuánto a mejor comida, ropa y refugio, que llegaron casi al mismo tiempo. La tropa de cada mes es una estimación de la época. Los historiadores discuten si Scutari tuvo la mortalidad más alta de la guerra.'],
          ['MITOS', 'Su enfermería bajó las muertes (bajaron con la comisión sanitaria) · Ella juntó las estadísticas en el hospital (las analizó después, con datos oficiales y con Farr) · Inventó las gráficas estadísticas (Farr ya usaba gráficas parecidas) · 1,174 por cada 1,000 quiere decir que murió todo el ejército (es el ritmo de un mes llevado a un año).']]);
        ctx.p('El diagrama original de 1858 se puede ver en <a href="https://wellcomecollection.org/works/jxwtskzc" target="_blank" rel="noopener noreferrer">Wellcome Collection</a> (dominio público).', 'nota');
        var m = /^Le recomiendo a la comisión: (.+?)\. Mi gráfica/.exec(ctx.S.respuestas.firma || '');
        var tu = ctx.el('div', 'tarjeta'); tu.appendChild(ctx.el('h3', null, 'TU APUESTA Y TU FIRMA'));
        tu.appendChild(ctx.el('p', null, 'Tu apuesta: ' + (ctx.S.hip || '(no la anotaste)') + '. Tu firma: ' + (m ? m[1] : '(todavía no firmas)') + '.'));
        tu.appendChild(ctx.el('p', null, 'Por cada soldado que murió por una herida, murieron unos ocho por enfermedad. Para verlo hubo que contar por causa, poner cada mes por cada 1,000 soldados y dibujarlo del tamaño que era.'));
        cuerpo.appendChild(tu);
        ctx.listo();
      } },

      /* 9 · laboratorio: el armador de rosas */
      { id: 'laboratorio', titulo: 'LABORATORIO', render: function (ctx, cuerpo) {
        ctx.p('El armador de rosas: los mismos datos reales, cuatro perillas. Los dos años usan la misma escala. Prueba combinaciones y mira cuáles cambian la historia.');
        var d = ctx.datos; d.que = d.que || 'tasa'; d.tam = d.tam || 'area'; d.causa = d.causa || 'enfermedad'; d.anio = d.anio || '1';
        var zona = ctx.el('div'), frase = ctx.el('p', 'frase'); frase.setAttribute('role', 'status');
        var ultimo = null, temp = null;
        function pintar() {
          var val = function (m) { return d.que === 'tasa' ? tasa(m, d.causa) : m[d.causa]; };
          var todos = M.map(val), max = Math.max.apply(null, todos), lista = d.anio === '1' ? ANIO1 : ANIO2;
          zona.innerHTML = '';
          zona.appendChild(rosa(ctx, { valores: lista.map(val), max: max, modo: d.tam, meses: mesesDe(lista),
            color: d.causa === 'enfermedad' ? 'var(--tq-anil)' : d.causa === 'heridas' ? 'var(--tq-salsa)' : 'var(--tq-cafe-oscuro)',
            titulo: (d.que === 'tasa' ? 'Tasa anual por cada 1,000' : 'Muertes') + ' · ' + { enfermedad: 'enfermedad', heridas: 'heridas', otras: 'otras causas' }[d.causa],
            pie: d.anio === '1' ? 'Abril 1854 a marzo 1855' : 'Abril 1855 a marzo 1856',
            alt: 'Rosa del laboratorio: ' + (d.que === 'tasa' ? 'tasas' : 'muertes') + ' por ' + d.causa + ', ' + (d.tam === 'area' ? 'con el área' : 'con el radio') + ' proporcional, ' + (d.anio === '1' ? 'primer año' : 'segundo año') + '.' }));
          var t = d.que === 'muertes' ? 'Cuenta muertes: un mes con más soldados se ve más grande aunque el riesgo sea el mismo.' : 'Cada mes por cada 1,000 soldados y por año: los meses se comparan aunque cambie la tropa.';
          t += d.tam === 'radio' ? ' Con el radio, el área crece al cuadrado: los meses altos se ven mucho más grandes de lo que son.' : ' Con el área, lo que ves crece igual que el número.';
          if (d.causa !== 'enfermedad') t += ' Compara con la enfermedad: es la misma escala para los dos años, no para las tres causas.';
          if (d.anio === '2') t += ' El segundo año, en la misma escala, casi desaparece.';
          frase.textContent = t;
          var clave = [d.que, d.tam, d.causa, d.anio].join('·');
          if (clave !== ultimo) { ultimo = clave; clearTimeout(temp); temp = setTimeout(function () { ctx.registrar('laboratorio', { que: d.que, tam: d.tam, causa: d.causa, anio: d.anio }); }, 10000); }
        }
        [['que', 'Qué dibujar', [['tasa', 'Tasa anual por cada 1,000'], ['muertes', 'Muertes']]],
         ['tam', 'Qué sigue al número', [['area', 'El área'], ['radio', 'El radio']]],
         ['causa', 'Qué causa', [['enfermedad', 'Enfermedad'], ['heridas', 'Heridas'], ['otras', 'Otras']]],
         ['anio', 'Qué año', [['1', 'Abr 1854 a mar 1855'], ['2', 'Abr 1855 a mar 1856']]]].forEach(function (p) {
          ctx.h3(p[1].normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase());
          var perilla = ctx.opciones({ lista: p[2], clave: p[0], clase: 'zonas', etiqueta: p[1], alCambiar: function (x) { if (!x[0]) { ctx.datos[p[0]] = p[2][0][0]; ctx.guardar(); perilla.poner([p[2][0][0]]); } pintar(); } });
        });
        cuerpo.appendChild(zona); cuerpo.appendChild(frase);
        pintar(); ctx.listo();
      } },

      /* 10 · transferir */
      { id: 'cierre', titulo: 'TU PROPIA DECISION', render: function (ctx, cuerpo) {
        ctx.h3('LA MISMA IDEA EN LA TAQUERIA');
        cuerpo.appendChild(ctx.tabla(['EN LA TAQUERIA', 'EN 1855'], [
          ['Don Juan vendió 30 tacos entre las 2 y las 3 de la tarde', 'En enero murieron unos 85 de cada 1,000 soldados por enfermedad'],
          ['Dice: «a este ritmo, son 720 al día»', 'La tabla dice: 1,022.8 por cada 1,000, al año']], { caja: 'La misma idea en la taquería' }));
        ctx.reto({ id: 'reto_taqueria_ritmo', titulo: '★ RETO 6', dificultad: 1, tipo: 'opcion',
          pregunta: '¿Qué mide el 720 de Don Juan?',
          opciones: ['Lo que vendería si todo el día fuera como esa hora', 'Lo que vendió ese día', 'Lo que vende en promedio cada día', 'Lo que venderá mañana a la misma hora'],
          pista: '¿Cuántas horas abre la taquería? ¿Todas se parecen a las 2 de la tarde?', alResponder: function () {}, alSaltar: function () {} });
        ctx.cierre({ codigo: '2.2', pregunta: 'En tu decisión, <b>¿qué número usas? ¿Por cada cuántos y en cuánto tiempo se mide?</b> Si lo dibujas, ¿se ve del tamaño que es?',
          etiqueta: 'Mi decisión: qué mide mi número y cómo lo muestro sin exagerarlo',
          frase: '¿Qué mide realmente este número? Antes de compararlo, pregunta por cada cuántos y en cuánto tiempo, y dibújalo del tamaño que es.',
          siguiente: ['../2-4/', '¿Cuándo habría sonado la alarma?'] });
        ctx.desplegable('Glosario', ['Tasa por cada 1,000: las muertes divididas entre la tropa, por 1,000.',
          'Tasa anualizada: la de un mes multiplicada por 12; dice el ritmo, no lo que pasó en el año.',
          'Estandarizar: dejar los números en la misma base (por cada 1,000 y por año) para poder compararlos.',
          'Rosa o diagrama de área polar: cuñas del mismo ángulo, una por mes; el área de cada una sigue al número.',
          'Enfermedad zimótica: término del siglo XIX para las infecciosas que se contagian, como el cólera o el tifus.']);
        ctx.desplegable('Fuentes', [
          ['https://wellcomecollection.org/works/jxwtskzc', 'Nightingale, F. (1858). Notes on Matters Affecting the Health, Efficiency, and Hospital Administration of the British Army. Wellcome Collection, dominio público.'],
          ['https://raw.githubusercontent.com/vincentarelbundock/Rdatasets/master/doc/HistData/Nightingale.html', 'HistData::Nightingale: la tabla mensual, transcrita por Pearson y Short (2007).'],
          ['https://www.nielsen.sites.oasis.unc.edu/soci708/cdocs/cohen.html', 'Cohen, I. B. (1984). Florence Nightingale. Scientific American 250(3): enero de 1855 y la llegada a Scutari.'],
          ['https://www.york.ac.uk/depts/maths/histstat/small.htm', 'Small, H. (1998). Florence Nightingale’s statistical diagrams: la primera versión y la fe de erratas.'],
          ['https://www.radstats.org.uk/no128/McDonald128.pdf', 'McDonald, L. (2021). Florence Nightingale and Statistics: What She Did and What She Did Not. Radical Statistics 128.'],
          ['https://www.sciencenews.org/article/florence-nightingale-passionate-statistician', 'Rehmeyer, J. (2008). Florence Nightingale: The passionate statistician. Science News.']
        ]);
      } }
    ]
  };
})();
