/* Caso 2.3 · ¿Lanzarías mañana? (Challenger, 1986) — se resuelve en la página (docs/casos-pagina/2-3-challenger.md).
   Caso de «el costo del error», formato corto (~25 min). DATOS REALES (datos.js): los 23 vuelos anteriores con su
   temperatura y juntas de campo con daño (Comisión Rogers, figuras 6 y 7; Dalal et al. 1989). Caso con víctimas: aviso de
   contenido, sin imágenes del lanzamiento ni del accidente, sin sonidos ni celebraciones. Las claves de los retos viven
   solo en la base. Regla: la herramienta se nombra en «Los vuelos que faltan», después del reto 3. */
(function () {
  'use strict';
  var V = window.VuelosChallenger;
  var CON_DANO = V.filter(function (v) { return v.juntas > 0; });
  var MANANA = 26;
  /* Gráfica de dispersión: temperatura (°F) contra juntas con daño. o = { vuelos, desde, manana } */
  function dispersion(o) {
    var ns = 'http://www.w3.org/2000/svg', W = 320, H = 200, x0 = 34, x1 = 310, y0 = 170, y1 = 16;
    var desde = o.desde || 50, hasta = 85;
    var X = function (f) { return x0 + (f - desde) / (hasta - desde) * (x1 - x0); }, Y = function (j) { return y0 - j / 3 * (y0 - y1); };
    var svg = document.createElementNS(ns, 'svg'); svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('role', 'img');
    svg.setAttribute('aria-label', 'Juntas con daño según la temperatura del lanzamiento: ' + o.vuelos.length + ' vuelos en la gráfica. Las cifras están en la tabla.');
    svg.style.width = '100%'; svg.style.maxWidth = '560px';
    var s = '';
    if (o.manana) s += '<rect x="' + X(53) + '" y="' + y1 + '" width="' + (X(81) - X(53)) + '" height="' + (y0 - y1) + '" fill="var(--tq-suelo)"/>' +
      '<text x="' + ((X(53) + X(81)) / 2) + '" y="' + (y1 + 10) + '" font-size="8" text-anchor="middle" fill="var(--tinta-suave)">temperaturas ya voladas</text>';
    s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="var(--tinta-suave)" stroke-width="1.5"/>';
    s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="var(--tinta-suave)" stroke-width="1.5"/>';
    for (var j = 0; j <= 3; j++) s += '<text x="' + (x0 - 6) + '" y="' + (Y(j) + 3) + '" font-size="9" text-anchor="end" fill="var(--tinta-suave)">' + j + '</text>';
    for (var f = Math.ceil(desde / 10) * 10; f <= hasta; f += 10) s += '<text x="' + X(f) + '" y="' + (y0 + 13) + '" font-size="9" text-anchor="middle" fill="var(--tinta-suave)">' + f + '°F</text>';
    s += '<text x="' + ((x0 + x1) / 2) + '" y="' + (H - 2) + '" font-size="8" text-anchor="middle" fill="var(--tinta-suave)">temperatura del lanzamiento</text>';
    var apil = {};
    o.vuelos.forEach(function (v) {
      var k = v.f + ':' + v.juntas; apil[k] = (apil[k] || 0) + 1;
      var dy = (apil[k] - 1) * 7;
      s += '<rect x="' + (X(v.f) - 3.5) + '" y="' + (Y(v.juntas) - 3.5 - dy) + '" width="7" height="7" fill="' + (v.juntas ? 'var(--comal)' : 'var(--tq-vidrio)') + '"/>';
    });
    if (o.manana) s += '<line x1="' + X(MANANA) + '" y1="' + y1 + '" x2="' + X(MANANA) + '" y2="' + y0 + '" stroke="var(--tq-salsa-clara)" stroke-width="2" stroke-dasharray="4 3"/>' +
      '<text x="' + (X(MANANA) + 4) + '" y="' + (y1 + 22) + '" font-size="9" fill="var(--tq-salsa-clara)">mañana: ' + MANANA + '°F</text>';
    svg.innerHTML = s; return svg;
  }
  var PRONOSTICO = function (ctx, dentro) {
    var n = ctx.el('div', 'pieza'); n.appendChild(ctx.el('b', null, 'PRONOSTICO · 27 DE ENERO DE 1986, NOCHE'));
    n.appendChild(ctx.el('p', null, 'Mañana, 9:38 a. m.: unos 26 °F (−3 °C). Mínima de la madrugada: 22 °F (−6 °C).'));
    n.appendChild(ctx.el('p', null, 'El vuelo más frío hasta hoy: 53 °F (12 °C).')); dentro.appendChild(n);
  };

  window.CASO_PAGINA = {
    id: '2.3', version: 'pagina-1.0', titulo: '¿LANZARIAS MAÑANA?', intro: './', minutos: 25,
    secciones: [

      { id: 'preparacion', titulo: 'EL EXPEDIENTE', render: function (ctx, cuerpo) {
        ctx.aviso('<b>Aviso de contenido.</b> Este caso trata sobre el accidente del transbordador Challenger, en el que murieron siete personas. Trabajamos con los datos de los vuelos; no mostramos el accidente.');
        ctx.p('Es la noche del 27 de enero de 1986. Mañana está programado el lanzamiento del Challenger. Llegó el expediente.');
        ctx.expediente([['EL PRONOSTICO', 'La temperatura esperada para mañana.'], ['LA GRAFICA DE LA VISPERA', 'Cómo se compararon los vuelos anteriores. Cerrada.'],
          ['EL RESUMEN DEL ASISTENTE', 'Una tabla con una recomendación. Todavía no la abres.', true], ['EL REGISTRO', 'Los 23 vuelos anteriores, cerrado con cinta.']]);
        ctx.aviso('<b>Datos reales.</b> Son los registros de los 23 vuelos anteriores, del informe de la Comisión Rogers (1986).');
      } },

      { id: 'apuesta', titulo: 'TU APUESTA', render: function (ctx, cuerpo) {
        PRONOSTICO(ctx, cuerpo);
        ctx.p('<b>¿Lanzarías mañana?</b> Todavía no hay gráfica sobre la mesa.');
        ctx.apuesta(['Sí, lanzaría', 'No, esperaría a que suba la temperatura', 'No sé: necesito ver los vuelos anteriores']);
      } },

      { id: 'grafica', titulo: 'LA GRAFICA DE LA VISPERA', render: function (ctx, cuerpo) {
        ctx.p('Esta es la comparación que se hizo la víspera: cada cuadro es un vuelo con daño en las juntas, según la temperatura del lanzamiento.');
        cuerpo.appendChild(dispersion({ vuelos: CON_DANO }));
        ctx.p('Reconstrucción de la comparación que describe la Comisión Rogers (figura 6), no una lámina de esa noche.', 'nota');
        var det = document.createElement('details'); det.className = 'mas'; det.innerHTML = '<summary>Ver las cifras de la gráfica</summary>';
        det.appendChild(ctx.tabla(['Vuelo', 'Temperatura', 'Juntas con daño'], CON_DANO.map(function (v) { return [v.vuelo, v.f + ' °F', String(v.juntas)]; })));
        cuerpo.appendChild(det);
        ctx.reto({ id: 'reto_grafica_patron', titulo: '★ RETO 1', dificultad: 1, tipo: 'opcion',
          pregunta: '¿Qué ves entre la temperatura y el daño en esta gráfica?',
          opciones: ['Hay daño tanto en vuelos fríos como en cálidos; no se ve un patrón claro', 'Todos los vuelos fríos tuvieron más daño que los cálidos',
            'El daño crece cuanto más calor hace', 'Ningún vuelo tuvo más de una junta dañada'],
          pista: 'Mira dónde caen los cuadros a lo largo del eje de temperatura, no solo los más altos.',
          alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        if (ctx.S.retos.reto_grafica_patron || (ctx.S.datos._luego || {}).reto_grafica_patron) ctx.listo();
      } },

      { id: 'vuelos', titulo: 'LOS VUELOS QUE FALTAN', render: function (ctx, cuerpo) {
        ctx.p('Se corta la cinta: el registro tiene los 23 vuelos anteriores. La gráfica de la víspera no los usaba todos.');
        var agregados = ctx.controles('agregar_vuelo').map(function (x) { return x.vuelo; });
        var graf = ctx.el('div'), cont = ctx.el('p', 'nota'); cont.setAttribute('role', 'status');
        cuerpo.appendChild(graf); cuerpo.appendChild(cont);
        var manana = ctx.controles('marcar_manana').length > 0;
        function enGrafica() { return V.filter(function (v) { return v.juntas > 0 || agregados.indexOf(v.vuelo) >= 0; }); }
        function pintar() { graf.innerHTML = ''; graf.appendChild(dispersion({ vuelos: enGrafica(), desde: manana ? 20 : 50, manana: manana })); cont.textContent = 'La gráfica lleva ' + enGrafica().length + ' de 23 vuelos.'; }
        var orden = V.slice().sort(function (a, b) { return a.f - b.f; });
        var tc = ctx.tabla(['Vuelo', 'Temperatura', 'Juntas con daño', 'En la gráfica'], orden.map(function (v) {
          if (v.juntas > 0) return [v.vuelo, v.f + ' °F', String(v.juntas), 'Sí'];
          var b = ctx.el('button', 'btn sec', agregados.indexOf(v.vuelo) >= 0 ? 'AGREGADO' : 'AGREGAR'); b.type = 'button';
          b.disabled = agregados.indexOf(v.vuelo) >= 0; b.setAttribute('aria-label', 'Agregar el vuelo ' + v.vuelo + ' a la gráfica');
          b.addEventListener('click', function () { agregar(v); b.textContent = 'AGREGADO'; b.disabled = true; });
          return [v.vuelo, v.f + ' °F', String(v.juntas), b];
        }), { caja: 'Registro de los 23 vuelos' });
        cuerpo.appendChild(tc);
        var todos = ctx.boton('AGREGAR TODOS LOS QUE FALTAN', function () {
          V.forEach(function (v) { if (!v.juntas && agregados.indexOf(v.vuelo) < 0) agregar(v, true); });
          tc.querySelectorAll('button').forEach(function (b) { b.textContent = 'AGREGADO'; b.disabled = true; }); pintar(); paso2();
        }, 'sec');
        function agregar(v, sinPintar) {
          if (agregados.indexOf(v.vuelo) >= 0) return;
          agregados.push(v.vuelo); ctx.registrar('agregar_vuelo', { vuelo: v.vuelo });
          if (!sinPintar) { pintar(); paso2(); ctx.anunciar('Vuelo ' + v.vuelo + ', ' + v.f + ' grados, sin daño: entra a la gráfica en cero.'); }
        }
        var r2 = ctx.el('div'), r3 = ctx.el('div'), nom = ctx.el('div');
        cuerpo.appendChild(r2); cuerpo.appendChild(r3); cuerpo.appendChild(nom);
        function paso2() {
          if (enGrafica().length < 23 || r2.childNodes.length) return;
          todos.hidden = true;
          r2.appendChild(ctx.el('p', null, 'Con los 23 vuelos en la gráfica, cuenta tú.'));
          ctx.calculadora(r2);
          ctx.reto({ id: 'reto_vuelos_calidos', titulo: '★★ RETO 2', dificultad: 2, tipo: 'numero', dentro: r2,
            pregunta: '¿Qué porcentaje de los vuelos a 66 °F o más tuvo al menos una junta con daño?', etiqueta: 'Tu respuesta (un número con un decimal)',
            pista: 'Cuenta en el registro los vuelos de 66 °F o más; después, cuántos de ellos tienen daño. Divide y multiplica por 100.',
            alResponder: paso3, alSaltar: paso3 });
        }
        function paso3() {
          if (r3.childNodes.length) return;
          var b = ctx.boton('MARCAR MAÑANA EN LA GRAFICA', function () {
            b.remove(); manana = true; ctx.registrar('marcar_manana', { f: MANANA }); pintar(); reto3();
            ctx.anunciar('La marca de mañana, 26 grados, cae lejos de todas las temperaturas ya voladas, de 53 a 81.');
          }, '', r3);
          if (manana) { b.remove(); reto3(); }
        }
        function reto3() {
          if (r3.querySelector('.reto')) return;
          ctx.reto({ id: 'reto_fuera_de_rango', titulo: '★★ RETO 3', dificultad: 2, tipo: 'opcion', dentro: r3,
            pregunta: '¿Qué dicen los 23 vuelos sobre lo que pasará mañana?',
            opciones: ['Nada seguro: ningún vuelo previo bajó de 53 °F', 'Que habrá 2 juntas dañadas, como a 53 °F',
              'Que no habrá daño, porque la mayoría de los vuelos no tuvo', 'Que el riesgo es el mismo que en cualquier vuelo'],
            pista: 'Mira dónde cae la marca de mañana respecto de la zona sombreada.',
            alResponder: function () { nombrar(); ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        }
        function nombrar() {
          if (nom.childNodes.length) return;
          ctx.nombre(['Agregaste los vuelos sin daño que la víspera no estaban en la gráfica: buscaste <b>lo que una gráfica deja fuera</b>. Cuando las filas que quedan fuera no son al azar (aquí, justo los vuelos sin problema), se llama <b>sesgo de selección</b>.',
            'Y viste que mañana cae fuera de todo lo ya volado: decidir ahí es <b>extrapolar fuera del rango observado</b>. Los datos no dicen qué pasa donde nunca se probó.'],
            ['../../labs/level-2/comparacion-visual.html', 'Laboratorio: comparación visual'], nom);
        }
        pintar(); paso2();
        if (ctx.S.retos.reto_vuelos_calidos || (ctx.S.datos._luego || {}).reto_vuelos_calidos) paso3();
        if (ctx.S.retos.reto_fuera_de_rango) { nombrar(); ctx.listo(); } else if ((ctx.S.datos._luego || {}).reto_fuera_de_rango) ctx.listo();
      } },

      { id: 'asistente', titulo: 'EL RESUMEN DEL ASISTENTE', render: function (ctx, cuerpo) {
        ctx.p('El asistente preparó una tabla para la decisión. <b>Puede tener un error.</b> Revisa antes de usarla.');
        var pz = ctx.el('div', 'pieza borrador'); pz.appendChild(ctx.el('b', null, 'JUNTAS CON DAÑO POR VUELO, SEGUN LA TEMPERATURA'));
        pz.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
        var frio = CON_DANO.filter(function (v) { return v.f < 66; }), calido = CON_DANO.filter(function (v) { return v.f >= 66; });
        var suma = function (xs) { return xs.reduce(function (s, v) { return s + v.juntas; }, 0); };
        pz.appendChild(ctx.tabla(['Grupo', 'Vuelos', 'Juntas con daño', 'Promedio por vuelo'], [
          ['Fríos (menos de 66 °F)', String(frio.length), String(suma(frio)), ctx.fmt(suma(frio) / frio.length, 2)],
          ['Cálidos (66 °F o más)', String(calido.length), String(suma(calido)), ctx.fmt(suma(calido) / calido.length, 2)]]));
        pz.appendChild(ctx.el('p', null, 'Conclusión del asistente: los vuelos cálidos tienen tanto daño por vuelo como los fríos; la temperatura no explica el daño. Recomiendo lanzar.'));
        cuerpo.appendChild(pz);
        ctx.h3('TU MESA DE VERIFICACION');
        var lib;
        function anotar(a, t) { if (lib.notas.indexOf(t) < 0) ctx.registrar('comprobacion', { accion: a, texto: t }); lib.anotar(t); }
        var f = ctx.el('div', 'acciones'); cuerpo.appendChild(f);
        var fr = V.filter(function (v) { return v.f < 66; }), ca = V.filter(function (v) { return v.f >= 66; });
        ctx.boton('CONTAR VUELOS DEL REGISTRO DE MENOS DE 66 °F', function () { anotar('frios', 'El registro tiene ' + fr.length + ' vuelos de menos de 66 °F.'); }, 'sec', f);
        ctx.boton('CONTAR VUELOS DEL REGISTRO DE 66 °F O MAS', function () { anotar('calidos', 'El registro tiene ' + ca.length + ' vuelos de 66 °F o más.'); }, 'sec', f);
        ctx.boton('CONTAR LOS VUELOS QUE USO LA TABLA', function () { anotar('tabla', 'La tabla usa ' + CON_DANO.length + ' vuelos de los 23.'); }, 'sec', f);
        lib = ctx.libreta(ctx.controles('comprobacion').map(function (v) { return v.texto; }).filter(Boolean), null, 'Todavía no compruebas nada.');
        ctx.reto({ id: 'reto_error_sin_ceros', titulo: '★★ RETO 4', dificultad: 2, tipo: 'opcion',
          pregunta: '¿Dónde está el error del resumen?',
          opciones: ['Solo cuenta los vuelos que tuvieron daño; deja fuera los vuelos sin daño', 'Suma mal las juntas dañadas de los vuelos fríos',
            'Pone el corte en 66 °F cuando debía ser 53 °F', 'No tiene ningún error'],
          pista: 'Compara cuántos vuelos usa la tabla con cuántos hay en el registro en cada grupo.',
          alResponder: function () { verif.hidden = false; }, alSaltar: function () { verif.hidden = false; } });
        var verif = ctx.el('div'); verif.hidden = !ctx.S.retos.reto_error_sin_ceros && !(ctx.S.datos._luego || {}).reto_error_sin_ceros && !ctx.S.respuestas.verificacion;
        cuerpo.appendChild(verif);
        ctx.verificacion({ dentro: verif, texto: 'Escribe qué revisaste para confiar en lo que encontraste y qué encontraste. Busca dos comprobaciones distintas.' });
      } },

      { id: 'firma', titulo: 'FIRMA TU DECISION', render: function (ctx, cuerpo) {
        PRONOSTICO(ctx, cuerpo);
        ctx.p('Decide y firma. Una decisión firmada dice <b>qué decides, con qué certeza, qué no sabes y qué te haría cambiar</b>. Lo que pasó de verdad viene después.');
        var OPC = ['Lanzar mañana', 'No lanzar hasta que las juntas estén al menos a la temperatura más baja ya volada', 'Posponer y pedir pruebas en frío', 'Otra'];
        var sel = ctx.opciones({ lista: OPC.map(function (o) { return [o, o === 'Otra' ? 'Otra (la escribo abajo)' : o]; }), clave: 'decision', etiqueta: 'Tu decisión' });
        ctx.campo({ id: 'otra', etiqueta: 'Si elegiste otra, ¿cuál?', renglones: 1, max: 160 });
        ctx.campo({ id: 'minima', etiqueta: 'A qué temperatura mínima lanzarías y por qué', renglones: 2, max: 300 });
        ctx.campo({ id: 'frase', etiqueta: 'Una frase para quien decide', renglones: 2, max: 300 });
        ctx.h3('CERTEZA');
        if (!ctx.datos.certeza) ctx.datos.certeza = 'Media';
        ctx.opciones({ lista: [['Baja', 'Baja'], ['Media', 'Media'], ['Alta', 'Alta']], clave: 'certeza', clase: 'zonas', etiqueta: 'Certeza' });
        ctx.campo({ id: 'nose', etiqueta: 'Lo que no sé', renglones: 2, max: 400 });
        ctx.campo({ id: 'cambiar', etiqueta: 'Qué me haría cambiar de decisión', renglones: 2, max: 400 });
        ctx.campo({ id: 'algo', etiqueta: '¿Necesitas algo más que contar y comparar? ¿Qué?', renglones: 2, max: 400 });
        var res = ctx.el('div'), g;
        ctx.boton('FIRMAR MI DECISION', function () {
          var d = ctx.datos, o = sel.valor()[0];
          if (!o || !(d.frase || '').trim()) { g.className = 'guardado mal'; g.textContent = 'Elige una decisión y escribe la frase para quien decide. Nadie firma por ti.'; return; }
          var dec = o === 'Otra' ? 'Otra: ' + (d.otra || '') : o;
          var texto = 'Decido: ' + dec + '. Temperatura mínima: ' + (d.minima || '') + '. Para quien decide: ' + d.frase.trim() + '. Certeza: ' + (d.certeza || 'Media') +
            '. Lo que no sé: ' + (d.nose || '') + '. Me haría cambiar: ' + (d.cambiar || '') + '. ¿Algo más que contar y comparar?: ' + (d.algo || '');
          var ok = ctx.responder('firma', texto, 'firma');
          res.innerHTML = ''; ctx.sello('DECISION FIRMADA', dec + ', con certeza ' + (d.certeza || 'Media').toLowerCase() + '. La firma es tuya, no del asistente.', 'anil', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.respuestas.firma) { ctx.sello('DECISION FIRMADA', 'Ya firmaste. Si firmas otra vez, cuenta la más reciente.', 'anil', res); ctx.listo(); }
        else ctx.p('La revelación se abre cuando firmes.', 'nota');
      } },

      { id: 'revelacion', titulo: 'LA REVELACION', puerta: function (S) { return !!S.respuestas.firma; }, render: function (ctx, cuerpo) {
        ctx.h3('LA VISPERA Y EL DIA');
        cuerpo.appendChild(ctx.lista([
          '27 de enero, 5:45 p. m. y 8:45 p. m.: teleconferencias entre NASA y Morton Thiokol.',
          'Los ingenieros de Thiokol recomiendan no lanzar por debajo de 53 °F, el vuelo más frío hasta entonces.',
          'Hay una pausa de unos 30 minutos. Después, Thiokol cambia su recomendación y la confirma por telefax.',
          '28 de enero, 11:38 a. m.: lanzamiento con 36 °F en el aire, 15 grados menos que cualquier lanzamiento anterior.',
          'El vuelo terminó a los 73 segundos. Murieron los siete tripulantes.']));
        ctx.h3('LA GRAFICA QUE NADIE HIZO');
        ctx.p('La Comisión Rogers comparó la figura de solo los vuelos con daño (como la de la víspera) con la de los 23 vuelos (como la que armaste tú): con todos los vuelos, los de 66 °F o más casi nunca tienen daño y todos los vuelos por debajo de 66 °F lo tuvieron.');
        cuerpo.appendChild(dispersion({ vuelos: V, desde: 20, manana: true }));
        ctx.verificado('CHALLENGER · VERIFICADO', [['LO QUE SI PASO', 'La Comisión concluyó que la falla empezó en una junta del cohete derecho y que el frío contribuyó; también señaló fallas en cómo se tomó la decisión.'],
         ['DESPUES', 'Dalal, Fowlkes y Hoadley (1989) estimaron con los 23 vuelos al menos 13% de probabilidad de falla de una junta a 31 °F, y advirtieron que es una extrapolación lejos de los datos.'],
         ['LO QUE SE DISCUTE', 'Qué temperatura tenían las juntas en el momento (el aire marcaba 36 °F; las juntas estaban más frías) y cuánto pesó la gráfica frente a la presión del calendario.']]);
        var m = /^Decido: (.+?)\. Temperatura mínima/.exec(ctx.S.respuestas.firma || '');
        var tu = ctx.el('div', 'tarjeta'); tu.appendChild(ctx.el('h3', null, 'TU APUESTA Y TU FIRMA'));
        tu.appendChild(ctx.el('p', null, 'Tu apuesta: ' + (ctx.S.hip || '(no la anotaste)') + '. Tu firma: ' + (m ? m[1] : '(todavía no firmas)') + '.'));
        tu.appendChild(ctx.el('p', null, 'Los vuelos sin daño eran la mitad de la evidencia. Sin ellos, la gráfica no mostraba lo que el frío hacía.'));
        cuerpo.appendChild(tu);
        ctx.listo();
      } },

      { id: 'cierre', titulo: 'TU PROPIA DECISION', render: function (ctx, cuerpo) {
        ctx.h3('LA MISMA IDEA EN LA TAQUERIA');
        cuerpo.appendChild(ctx.tabla(['En la taquería', 'En 1986'], [
          ['Don Juan quiere saber si la lluvia retrasa las entregas y revisa solo las quejas de los días con retraso', 'La víspera solo se graficaron los vuelos con daño'],
          ['Nunca mira los días sin quejas', 'Los vuelos sin daño quedaron fuera'],
          ['Nunca ha repartido con tormenta, y mañana hay tormenta', 'Mañana iba a hacer más frío que en cualquier vuelo anterior']]));
        ctx.cierre({ codigo: '2.3', pregunta: 'Piensa en la gráfica o la tabla con la que tomas una decisión real. ¿<b>Qué casos deja fuera</b>? ¿Vas a decidir <b>fuera de lo que ya viste</b>?',
          etiqueta: 'Mi decisión: qué deja fuera mi gráfica y si decido fuera de lo que ya vi',
          frase: '¿Qué falta en mis datos? Antes de leer una gráfica, pregunta qué casos quedaron fuera y si vas a decidir más allá de lo que ya viste.' });
        ctx.desplegable('Fuentes', [
          ['https://www.nasa.gov/history/rogersrep/v1ch3.htm', 'Comisión Rogers (1986), vol. I, cap. 3: el lanzamiento y la temperatura.'],
          ['https://www.nasa.gov/history/rogersrep/v1ch5.htm', 'Comisión Rogers (1986), vol. I, cap. 5: las teleconferencias de la víspera.'],
          ['https://www.nasa.gov/history/rogersrep/v1ch6.htm', 'Comisión Rogers (1986), vol. I, cap. 6: figuras 6 y 7, los vuelos y la temperatura.'],
          ['https://doi.org/10.1080/01621459.1989.10478858', 'Dalal, Fowlkes y Hoadley (1989), Journal of the American Statistical Association 84(408).']
        ]);
      } }
    ]
  };
})();
