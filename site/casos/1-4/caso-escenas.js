/* Caso 1.4 · ¿Cuántas muertes dejó María? — se resuelve en la página (docs/casos-pagina/1-4-puerto-rico.md).
   Caso de «el costo del error», formato corto (~25 min). DATOS REALES: defunciones por mes del Registro Demográfico de
   Puerto Rico (datos.js; 2017 preliminar). Caso con muertes reales: aviso de contenido, sin personas ni morbo, sin
   sonidos ni celebraciones alrededor de una cifra de muertes (docs/GUIA_CASOS.md). Las claves de los retos viven solo
   en la base. Regla: la herramienta se nombra en «El registro», después del reto 2. */
(function () {
  'use strict';
  var D = window.DefuncionesPR;
  var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  var CORTO = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  var valor = function (a, m) { var f = D.filter(function (x) { return x.anio === a && x.mes === m; })[0]; return f ? f.defunciones : null; };
  var fmt = function (n, d) { return Number(n).toLocaleString('es-MX', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); };
  var conSigno = function (n) { return (n > 0 ? '+' : n < 0 ? '−' : '') + fmt(Math.abs(n), n % 1 ? 1 : 0); };
  var NOTA_64 = function (ctx, dentro) {
    var n = ctx.el('div', 'pieza'); n.appendChild(ctx.el('b', null, 'CIFRA OFICIAL · DICIEMBRE DE 2017'));
    n.appendChild(ctx.el('p', null, 'Muertes por el huracán María en Puerto Rico: 64.')); dentro.appendChild(n); return n;
  };
  var ASISTENTE = [['Septiembre', 9, 2016], ['Octubre', 10, 2016], ['Noviembre', 11, 2016], ['Diciembre', 12, 2016]];
  var BASE_ASIST = { 9: valor(2016, 9), 10: valor(2016, 12), 11: valor(2016, 11), 12: valor(2016, 12) };  // así la armó el asistente

  window.CASO_PAGINA = {
    id: '1.4', version: 'pagina-1.0', titulo: '¿CUANTAS MUERTES DEJO MARIA?', intro: './', minutos: 25,
    secciones: [

      /* 1 · expediente, con aviso de contenido */
      { id: 'preparacion', titulo: 'EL EXPEDIENTE', render: function (ctx, cuerpo) {
        ctx.aviso('<b>Aviso de contenido.</b> Este caso trata sobre muertes reales después del huracán María en Puerto Rico. Trabajamos con conteos, no con historias personales.');
        ctx.p('El huracán María cruzó Puerto Rico el 20 de septiembre de 2017. Meses después, había que publicar una cifra de muertes. Llegó el expediente con tres piezas.');
        ctx.expediente([['LA CIFRA OFICIAL', 'Una nota de diciembre de 2017 con la cifra que se publicó.'],
          ['EL REGISTRO DE DEFUNCIONES', 'Todas las muertes de cada mes en Puerto Rico, de 2015 a 2017. Cerrado con cinta.'],
          ['LA TABLA DEL ASISTENTE', 'Un asistente preparó una tabla para ahorrarte tiempo. Todavía no la abres.', true]]);
        ctx.aviso('<b>Datos reales.</b> Son los registros de defunciones del Registro Demográfico de Puerto Rico. Las cifras de 2017 eran preliminares cuando se publicaron.');
      } },

      /* 2 · apuesta: solo la nota del 64 */
      { id: 'apuesta', titulo: 'TU APUESTA', render: function (ctx, cuerpo) {
        NOTA_64(ctx, cuerpo);
        ctx.p('<b>¿64 te parece una cifra razonable?</b> Elige y escribe por qué. Todavía no hay registro sobre la mesa.');
        ctx.apuesta(['Sí, parece razonable', 'Se queda corta', 'Se pasa', 'No sé con qué compararla'], '. Al final la vas a comparar con lo que muestre el registro.');
      } },

      /* 3 · la regla con la que se contó el 64 */
      { id: 'regla', titulo: 'LA REGLA DEL 64', render: function (ctx, cuerpo) {
        var doc = ctx.el('div', 'pieza'); doc.appendChild(ctx.el('b', null, 'COMO SE CONTO'));
        doc.appendChild(ctx.el('p', null, 'Una muerte entraba en la cifra si su certificado de defunción mencionaba el huracán y si el Instituto de Ciencias Forenses la confirmaba.'));
        cuerpo.appendChild(doc);
        ctx.p('Aplica esa regla a cinco situaciones tipo (no son personas reales). No hay calificación: es para ver qué deja dentro y qué deja fuera.');
        var TARJ = ['Una muerte por lesiones durante el paso del huracán, revisada por Ciencias Forenses.',
          'Una muerte semanas después, en una casa sin electricidad, de alguien que dependía de un equipo eléctrico. El certificado no menciona el huracán.',
          'Una muerte en un hospital que funcionaba con planta de emergencia. El certificado anota solo la causa clínica.',
          'Una muerte por una enfermedad crónica en un municipio sin agua potable desde hacía un mes. El certificado no menciona el huracán.',
          'Una muerte que habría ocurrido igual sin huracán.'];
        var hechas = {}; ctx.controles('clasificar').forEach(function (v) { hechas[v.tarjeta] = v.cuenta; });
        var cierre = ctx.el('div');
        TARJ.forEach(function (t, i) {
          var c = ctx.el('div', 'tarjeta-tipo'); c.appendChild(ctx.el('p', null, (i + 1) + '. ' + t));
          var f = ctx.el('div', 'fila'); c.appendChild(f);
          [['CUENTA', true], ['NO CUENTA', false]].forEach(function (op) {
            var b = ctx.boton(op[0], function () {
              hechas[i] = op[1]; ctx.registrar('clasificar', { tarjeta: i, cuenta: op[1] });
              f.querySelectorAll('.btn').forEach(function (x) { x.classList.toggle('hecha', x === b); x.setAttribute('aria-pressed', String(x === b)); });
              revisar();
            }, 'sec' + (hechas[i] === op[1] ? ' hecha' : ''), f);
            b.setAttribute('aria-pressed', String(hechas[i] === op[1]));
          });
          cuerpo.appendChild(c);
        });
        cuerpo.appendChild(cierre);
        function revisar() {
          if (Object.keys(hechas).length < TARJ.length || cierre.childNodes.length) return;
          var q = ctx.el('div', 'tarjeta'); q.appendChild(ctx.el('h3', null, 'LA PREGUNTA QUE QUEDA EN LA MESA'));
          q.appendChild(ctx.el('p', null, '¿Y las muertes que la regla no ve, dónde quedan? Ninguna regla caso por caso sabe cuáles habrían ocurrido igual. El registro de defunciones cuenta todas: ahí puede estar la respuesta.'));
          cierre.appendChild(q); ctx.listo();
        }
        revisar();
      } },

      /* 4 · el registro: comparar con el mismo mes; la herramienta se nombra después del reto 2 */
      { id: 'registro', titulo: 'EL REGISTRO', render: function (ctx, cuerpo) {
        ctx.p('Se corta la cinta: todas las muertes registradas en Puerto Rico, mes por mes, de enero de 2015 a diciembre de 2017.');
        var serie = D.filter(function (x) { return x.anio <= 2017; }), max = Math.max.apply(null, serie.map(function (x) { return x.defunciones; }));
        var col = ctx.el('div', 'columnas'); col.setAttribute('role', 'img');
        col.setAttribute('aria-label', 'Defunciones por mes de 2015 a 2017; la tabla de abajo trae las cifras. Septiembre y octubre de 2017 son las barras más altas.');
        serie.forEach(function (x) { var i = ctx.el('i', x.anio === 2017 && x.mes >= 9 ? 'marca' : ''); i.style.height = (100 * x.defunciones / max) + '%'; i.title = MESES[x.mes - 1] + ' ' + x.anio + ': ' + fmt(x.defunciones); col.appendChild(i); });
        cuerpo.appendChild(col);
        var ej = ctx.el('div', 'ejes'); ['2015', '2016', '2017'].forEach(function (a) { ej.appendChild(ctx.el('span', null, a)); }); cuerpo.appendChild(ej);
        var det = document.createElement('details'); det.className = 'mas'; det.innerHTML = '<summary>Ver todas las cifras del registro</summary>';
        det.appendChild(ctx.tabla(['MES', '2015', '2016', '2017'], MESES.map(function (m, k) { return [m, fmt(valor(2015, k + 1)), fmt(valor(2016, k + 1)), fmt(valor(2017, k + 1))]; }), { caja: 'Cifras del registro' }));
        cuerpo.appendChild(det);
        ctx.p('Septiembre y octubre de 2017 sobresalen. Pero cada diciembre y cada enero también suben, con o sin huracán: unas estaciones tienen más muertes que otras. Para saber si un mes es raro, compáralo con el <b>mismo mes</b> de años normales.');
        ctx.h3('PON AL LADO EL MISMO MES DE 2015 Y 2016');
        var acc = ctx.el('div', 'acciones'); cuerpo.appendChild(acc);
        var difs = ctx.el('div', 'difs'); cuerpo.appendChild(difs);
        var hechos = ctx.controles('comparar_mes').map(function (v) { return v.mes; });
        function pintar() {
          difs.innerHTML = '';
          hechos.slice().sort(function (a, b) { return a - b; }).forEach(function (m) {
            var esp = (valor(2015, m) + valor(2016, m)) / 2, d = valor(2017, m) - esp;
            var f = ctx.el('div', 'fila-d'); f.appendChild(ctx.el('span', null, MESES[m - 1]));
            var e = ctx.el('div', 'eje'), i = ctx.el('i', d < 0 ? 'neg' : ''); var w = Math.min(50, Math.abs(d) / 700 * 50);
            i.style.left = d < 0 ? (50 - w) + '%' : '50%'; i.style.width = w + '%'; e.appendChild(i); f.appendChild(e);
            f.appendChild(ctx.el('span', null, conSigno(d)));
            f.title = '2017: ' + fmt(valor(2017, m)) + ' · promedio 2015 y 2016: ' + fmt(esp, esp % 1 ? 1 : 0);
            difs.appendChild(f);
          });
          if (hechos.length) difs.appendChild(ctx.el('p', 'pie', 'Cada fila: el mes de 2017 menos el promedio del mismo mes de 2015 y 2016. A la derecha del centro, más muertes de lo normal; a la izquierda, menos.'));
        }
        for (var m = 1; m <= 8; m++) (function (m) {
          var b = ctx.boton(CORTO[m - 1] + ' 2017', function () {
            if (hechos.indexOf(m) >= 0) return;
            hechos.push(m); ctx.registrar('comparar_mes', { mes: m }); b.classList.add('hecha'); pintar(); paso1();
            var esp = (valor(2015, m) + valor(2016, m)) / 2;
            ctx.anunciar(MESES[m - 1] + ' de 2017: ' + fmt(valor(2017, m)) + '; promedio del mismo mes: ' + fmt(esp, 1) + '; diferencia ' + conSigno(valor(2017, m) - esp) + '.');
          }, hechos.indexOf(m) >= 0 ? 'hecha' : '', acc);
        })(m);
        acc.appendChild(ctx.el('p', 'nota', 'Septiembre a diciembre no tienen botón: esos los calculas tú.'));
        pintar();
        var r1 = ctx.el('div'), r2 = ctx.el('div'), nom = ctx.el('div'); cuerpo.appendChild(r1); cuerpo.appendChild(r2); cuerpo.appendChild(nom);
        function paso1() {
          if (r1.childNodes.length || hechos.length < 4) return;
          ctx.reto({ id: 'reto_meses_normales', titulo: '★ RETO 1', dificultad: 1, tipo: 'opcion', dentro: r1,
            pregunta: 'De enero a agosto de 2017, ¿cuánto se alejan los meses del promedio de su mismo mes?',
            opciones: ['Ninguno se aleja más de 200, arriba o abajo', 'Todos están más de 300 por encima', 'Varios se alejan más de 500', 'Son idénticos a su promedio'],
            pista: 'Compara los ocho meses y mira la diferencia más grande, sea hacia arriba o hacia abajo.',
            alResponder: paso2, alSaltar: paso2 });
        }
        function paso2() {
          if (r2.childNodes.length) return;
          r2.appendChild(ctx.el('p', null, 'Ahora octubre de 2017, sin botón: busca en el registro octubre de 2015, 2016 y 2017, saca el promedio de los dos años normales y réstaselo a 2017.'));
          ctx.calculadora(r2);
          ctx.reto({ id: 'reto_octubre_exceso', titulo: '★★ RETO 2', dificultad: 2, tipo: 'numero', dentro: r2,
            pregunta: '¿Cuántas muertes de más hubo en octubre de 2017 frente al promedio de octubre de 2015 y 2016?', etiqueta: 'Tu respuesta (un número entero)',
            pista: 'Promedio = (octubre 2015 + octubre 2016) ÷ 2. Después: octubre 2017 menos ese promedio. Las cifras están en «Ver todas las cifras del registro».',
            alResponder: function () { nombrar(); ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        }
        function nombrar() {
          if (nom.childNodes.length) return;
          ctx.nombre(['Antes de comparar cifras, preguntaste qué tiene que pasar para que algo cuente: eso es <b>definir la variable</b>. El 64 contaba certificados que mencionaban el huracán; el registro cuenta todas las muertes.',
            'Y comparaste lo que pasó con lo que pasa en los mismos meses de años normales: lo observado menos lo esperado se llama <b>exceso de mortalidad</b>. No dice qué muerte fue por el huracán, pero sí cuántas faltan por explicar.'],
            ['../../labs/level-1/alfabetizacion.html', 'Laboratorio: alfabetización de datos'], nom);
        }
        paso1();
        if (ctx.S.retos.reto_meses_normales || (ctx.S.datos._luego || {}).reto_meses_normales) paso2();
        if (ctx.S.retos.reto_octubre_exceso) { nombrar(); ctx.listo(); } else if ((ctx.S.datos._luego || {}).reto_octubre_exceso) ctx.listo();
      } },

      /* 5 · la tabla del asistente: error plantado y verificación */
      { id: 'asistente', titulo: 'LA TABLA DEL ASISTENTE', render: function (ctx, cuerpo) {
        ctx.p('El asistente comparó cada mes de septiembre a diciembre de 2017 con el mismo mes de 2016. <b>Puede tener un error.</b> Revisa antes de usarla.');
        var pz = ctx.el('div', 'pieza borrador'); pz.appendChild(ctx.el('b', null, 'MUERTES DE MAS, SEP A DIC DE 2017, CONTRA EL MISMO MES DE 2016'));
        pz.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
        var total = 0;
        var filas = ASISTENTE.map(function (f) { var a = valor(2017, f[1]), b = BASE_ASIST[f[1]]; total += a - b; return [f[0], fmt(a), fmt(b), conSigno(a - b)]; });
        filas.push(['Total', '', '', fmt(total)]);
        pz.appendChild(ctx.tabla(['Mes de 2017', 'Muertes 2017', 'Mismo mes de 2016', 'Diferencia'], filas));
        pz.appendChild(ctx.el('p', null, 'Conclusión del asistente: hubo unas ' + fmt(total) + ' muertes de más; octubre fue un mes casi normal.'));
        cuerpo.appendChild(pz);
        ctx.h3('TU MESA DE VERIFICACION');
        var f = ctx.el('div', 'fila'); cuerpo.appendChild(f);
        var selM = document.createElement('select'), selA = document.createElement('select');
        MESES.forEach(function (m, k) { selM.add(new Option(m, k + 1)); }); [2015, 2016, 2017].forEach(function (a) { selA.add(new Option(a, a)); });
        selM.value = 10; selA.value = 2016; selM.setAttribute('aria-label', 'Mes'); selA.setAttribute('aria-label', 'Año');
        [selM, selA].forEach(function (s) { s.className = 'opcion'; f.appendChild(s); });
        var lib;
        function anotar(accion, texto) { if (lib.notas.indexOf(texto) < 0) ctx.registrar('comprobacion', { accion: accion, texto: texto }); lib.anotar(texto); }
        ctx.boton('BUSCAR ESE MES EN EL REGISTRO', function () { var m = +selM.value, a = +selA.value; anotar('buscar', MESES[m - 1] + ' de ' + a + ': ' + fmt(valor(a, m)) + ' defunciones.'); }, 'sec', f);
        ctx.boton('SUMAR LA COLUMNA DIFERENCIA', function () { anotar('sumar', 'La columna Diferencia suma ' + fmt(total) + ', igual que el total de la tabla.'); }, 'sec', f);
        lib = ctx.libreta(ctx.controles('comprobacion').map(function (v) { return v.texto; }).filter(Boolean), null, 'Todavía no compruebas nada.');
        ctx.reto({ id: 'reto_error_linea_base', titulo: '★★ RETO 3', dificultad: 2, tipo: 'opcion',
          pregunta: '¿Dónde está el error de la tabla del asistente?',
          opciones: ['En octubre compara con diciembre de 2016, no con octubre de 2016', 'Suma mal el total de septiembre a diciembre',
            'En noviembre usa noviembre de 2015 en lugar de 2016', 'No tiene ningún error'],
          pista: 'Busca en el registro cada «mismo mes de 2016» de la tabla. ¿Alguno no corresponde a su mes?',
          alResponder: function () { verif.hidden = false; }, alSaltar: function () { verif.hidden = false; } });
        var verif = ctx.el('div'); verif.hidden = !ctx.S.retos.reto_error_linea_base && !(ctx.S.datos._luego || {}).reto_error_linea_base && !ctx.S.respuestas.verificacion;
        cuerpo.appendChild(verif);
        ctx.verificacion({ dentro: verif });
      } },

      /* 6 · firma (la revelación no se abre sin ella) */
      { id: 'firma', titulo: 'FIRMA TU CIFRA', render: function (ctx, cuerpo) {
        NOTA_64(ctx, cuerpo);
        ctx.p('Tú publicas la cifra. Una cifra firmada dice <b>cuánto, de qué periodo, qué cuenta, cómo la explicas, con qué certeza, qué no sabes y qué te haría cambiar</b>. Lo que pasó de verdad viene después.');
        ctx.campo({ id: 'cifra', etiqueta: 'La cifra o el rango que publicarías', renglones: 1, max: 60 });
        ctx.campo({ id: 'periodo', etiqueta: 'De qué periodo', renglones: 1, max: 80 });
        ctx.h3('QUE CUENTA EN TU CIFRA');
        ctx.opciones({ lista: [['Solo certificados que mencionan el huracán', 'Solo certificados que mencionan el huracán'],
          ['Todas las muertes de más frente a lo esperado', 'Todas las muertes de más frente a lo esperado'], ['Otra', 'Otra (la escribo abajo)']], clave: 'que', etiqueta: 'Qué cuenta en tu cifra' });
        ctx.campo({ id: 'otra', etiqueta: 'Si elegiste otra, ¿cuál?', renglones: 1, max: 160 });
        ctx.campo({ id: 'frase', etiqueta: 'Cómo la explicarías al público, en una frase', renglones: 2, max: 300 });
        ctx.h3('CERTEZA');
        if (!ctx.datos.certeza) ctx.datos.certeza = 'Media';
        ctx.opciones({ lista: [['Baja', 'Baja'], ['Media', 'Media'], ['Alta', 'Alta']], clave: 'certeza', clase: 'zonas', etiqueta: 'Certeza' });
        ctx.campo({ id: 'nose', etiqueta: 'Lo que no sé', renglones: 2, max: 400 });
        ctx.campo({ id: 'cambiar', etiqueta: 'Qué me haría cambiar de cifra', renglones: 2, max: 400 });
        ctx.campo({ id: 'algo', etiqueta: '¿Necesitas algo más que contar y comparar? ¿Qué?', renglones: 2, max: 400 });
        var res = ctx.el('div'), g;
        ctx.boton('FIRMAR MI CIFRA', function () {
          var d = ctx.datos;
          if (!(d.cifra || '').trim() || !(d.frase || '').trim()) { g.className = 'guardado mal'; g.textContent = 'Escribe la cifra y la frase para el público. Nadie firma por ti.'; return; }
          var que = d.que === 'Otra' ? 'Otra: ' + (d.otra || '') : (d.que || '(sin elegir)');
          var texto = 'Publico: ' + d.cifra.trim() + ' (' + (d.periodo || '').trim() + '). Cuenta: ' + que + '. Al público: ' + d.frase.trim() +
            '. Certeza: ' + (d.certeza || 'Media') + '. Lo que no sé: ' + (d.nose || '') + '. Me haría cambiar: ' + (d.cambiar || '') +
            '. ¿Algo más que contar y comparar?: ' + (d.algo || '');
          var ok = ctx.responder('firma', texto, 'firma');
          res.innerHTML = ''; ctx.sello('CIFRA FIRMADA', 'Publicas ' + d.cifra.trim() + ', con certeza ' + (d.certeza || 'Media').toLowerCase() + '. La firma es tuya, no del asistente.', 'anil', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.respuestas.firma) { ctx.sello('CIFRA FIRMADA', 'Ya firmaste. Si firmas otra vez, cuenta la más reciente.', 'anil', res); ctx.listo(); }
        else ctx.p('La revelación se abre cuando firmes.', 'nota');
      } },

      /* 7 · revelación: cada cifra dice qué contaba */
      { id: 'revelacion', titulo: 'LA REVELACION', puerta: function (S) { return !!S.respuestas.firma; }, render: function (ctx, cuerpo) {
        ctx.p('Cada cifra que se publicó contaba algo distinto. Esta es la línea de tiempo, con su fuente.');
        var t = ctx.el('div', 'tabla-caja'); t.tabIndex = 0; t.setAttribute('role', 'region'); t.setAttribute('aria-label', 'Línea de tiempo de las cifras');
        t.appendChild(ctx.tabla(['Cuándo', 'Cifra', 'Qué contaba', 'Quién'], [
          ['Diciembre de 2017', '64', 'Muertes con certificado que menciona el huracán, confirmadas por Ciencias Forenses', 'Gobierno de Puerto Rico'],
          ['Junio de 2018', 'unas 1,052', 'Septiembre y octubre de 2017 contra los mismos días de 2015 y 2016', 'Análisis del New York Times'],
          ['Mayo de 2018', '4,645 (intervalo de 793 a 8,498)', 'Encuesta a 3,299 hogares, del 20 de septiembre al 31 de diciembre, contra 2016', 'Universidad de Harvard (NEJM)'],
          ['Agosto de 2018', '1,427', 'Septiembre a diciembre de 2017 contra el promedio de cuatro años', 'Informe del gobierno al Congreso de EE. UU.'],
          ['Agosto de 2018', '2,975 (intervalo de 2,658 a 3,290)', 'Septiembre de 2017 a febrero de 2018, con un modelo que ajusta por la población que se fue de la isla', 'Universidad George Washington']], { cls: 'tabla' }));
        cuerpo.appendChild(t);
        ctx.verificado('PUERTO RICO · VERIFICADO', [['LO QUE SI PASO', 'El 28 de agosto de 2018 el gobierno de Puerto Rico adoptó 2,975 como cifra oficial, a partir del estudio de la Universidad George Washington.'],
         ['POR QUE TU CUENTA ES DISTINTA', 'Con el mismo mes de 2015 y 2016 y sin ajustar población, de septiembre a diciembre salen unas 1,710 muertes de más. El estudio usa otro periodo y otra población esperada: muchas personas se fueron de la isla, así que «lo normal» era menos. Con la población del censo, ese mismo estudio da 1,191. Cada cifra depende de la comparación.'],
         ['LO QUE NO SABEMOS', 'Ninguna de estas cifras dice qué muerte en particular causó el huracán. Los datos de 2017 eran preliminares cuando se hicieron los cálculos.']]);
        var m = /^Publico: (.+?) \(/.exec(ctx.S.respuestas.firma || '');
        var tu = ctx.el('div', 'tarjeta'); tu.appendChild(ctx.el('h3', null, 'TU APUESTA Y TU CIFRA'));
        tu.appendChild(ctx.el('p', null, 'Tu apuesta: ' + (ctx.S.hip || '(no la anotaste)') + '. Tu cifra firmada: ' + (m ? m[1] : '(todavía no firmas)') + '.'));
        tu.appendChild(ctx.el('p', null, 'El 64 no era un error de suma: contaba otra cosa. La pregunta de qué cuenta cambió la cifra de 64 a miles.'));
        cuerpo.appendChild(tu);
        ctx.listo();
      } },

      /* 8 · tu propia decisión */
      { id: 'cierre', titulo: 'TU PROPIA DECISION', render: function (ctx, cuerpo) {
        ctx.h3('LA MISMA IDEA EN LA TAQUERIA');
        cuerpo.appendChild(ctx.tabla(['En la taquería', 'En Puerto Rico'], [
          ['Don Juan pregunta cuántos pedidos se cancelaron la semana pasada', '¿Cuántas muertes dejó María?'],
          ['Paco cuenta los que no se pagaron; otro empleado, los que no se entregaron', 'El 64 contaba certificados; el registro, todas las muertes'],
          ['Antes de comparar cifras, acordar qué cuenta como cancelado', 'Antes de publicar, decir qué cuenta y contra qué se compara']]));
        ctx.cierre({ codigo: '1.4', pregunta: 'Piensa en el número más importante de una decisión real tuya. Escribe <b>cómo está definido</b> y <b>qué tiene que pasar para que algo cuente en él</b>.',
          etiqueta: 'Mi decisión: cómo está definido mi número más importante',
          frase: '¿Qué mide este número? Antes de comparar cifras, pregunta qué tiene que pasar para que algo cuente.' });
        ctx.desplegable('Glosario', ['Definir la variable: decir qué tiene que pasar para que algo cuente en un número.',
          'Exceso de mortalidad: muertes observadas menos las esperadas en un periodo normal comparable.',
          'Lo esperado: lo que pasa en los mismos meses de años normales (aquí, el promedio de 2015 y 2016).',
          'Intervalo: el rango de cifras compatibles con los datos; si es muy ancho, la estimación es poco precisa.']);
        ctx.desplegable('Fuentes', [
          ['https://github.com/c2-d2/pr_mort_official/blob/master/data/RD-Mortality-Report_2015-18-180531.pdf', 'Registro Demográfico de Puerto Rico: defunciones por mes, tablas del 4 jun 2018 (copia en c2-d2/pr_mort_official, CC BY 3.0 US).'],
          ['https://www.nbcnews.com/storyline/puerto-rico-crisis/puerto-rico-governor-orders-review-death-count-after-hurricane-maria-n830761', 'NBC News (dic 2017): la cifra de 64 y la orden de revisarla.'],
          ['https://www.boston.com/news/policy/2018/06/02/why-are-the-death-tolls-in-puerto-rico-from-hurricane-maria-so-different/', 'The New York Times, en Boston.com (2 jun 2018): la regla del certificado y unas 1,052 muertes de más.'],
          ['https://www.nejm.org/doi/full/10.1056/NEJMsa1803972', 'Kishore et al., NEJM (2018): 4,645, intervalo de 793 a 8,498.'],
          ['https://www.pbs.org/newshour/nation/puerto-rico-cites-storm-death-toll-of-1427-in-damage-report', 'AP en PBS NewsHour (ago 2018): 1,427 en el informe al Congreso.'],
          ['https://gwtoday.gwu.edu/node/9876', 'GW Today (28 ago 2018): 2,975, intervalo de 2,658 a 3,290.'],
          ['https://eldiariony.com/2018/08/28/rosello-admite-errores-y-confirma-2975-muertos-por-huracan-maria-en-puerto-rico/', 'EFE en El Diario NY (28 ago 2018): el gobierno adopta 2,975.']
        ]);
      } }
    ]
  };
})();
