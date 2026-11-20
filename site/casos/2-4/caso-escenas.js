/* Caso 2.4 (E29 del catálogo) · ¿Cuándo habría sonado la alarma? (Hyde, 1977-1998) — se resuelve en la página
   (docs/casos-pagina/2-4-shipman.md). Costo del error de la clase 4, formato corto (~25 min). DATOS REALES (datos.js =
   casos/data/shipman-hyde-1977): Tabla 8.1 de la auditoría de Baker (2001), filas de Hyde. El reporte del asistente es una
   reconstrucción con esas cifras y un error plantado. Las claves de los retos viven solo en la base. Regla: la herramienta
   se nombra en «Lo que se acumula», después del reto 3. Caso con homicidios reales (docs/GUIA_CASOS.md): aviso de
   contenido, sin nombres de víctimas ni detalles de las muertes, cifras sin sonido ni destello y sin opciones con humor. */
(function () {
  'use strict';
  var D = window.DatosShipman, CI = D.cifras, A = D.anios;
  A.forEach(function (a) { a.esperado = Math.round((a.certificados - a.diferencia) * 10) / 10; });   // lo que imprimió la auditoría
  var HASTA = A.filter(function (a) { return a.anio <= 1985; });         // lo que existía en enero de 1986
  var anio = function (n) { return A.filter(function (a) { return a.anio === n; })[0]; };
  var num = function (t) { var x = parseFloat(String(t || '').replace(/,(?=\d{3}\b)/g, '').replace(',', '.')); return isFinite(x) ? x : null; };
  var acumulada = function (lista) { var s = 0; return lista.map(function (a) { s += a.diferencia; return Math.round(s * 10) / 10; }); };

  /* Línea de la suma año con año (SVG). o = { anios, valores (null = sin dato), alarma, marca, alt } */
  function linea(ctx, o) {
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'), W = 320, H = 200, x0 = 40, x1 = 296, y0 = 168, y1 = 22;
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', o.alt);
    svg.style.width = '100%'; svg.style.maxWidth = '560px'; svg.style.display = 'block';
    var vals = o.valores.filter(function (v) { return v != null; });
    var max = Math.max(o.max || 0, o.alarma || 0, Math.max.apply(null, vals.concat([10]))), min = Math.min(-10, Math.min.apply(null, vals.concat([0])));
    var X = function (i) { return x0 + (x1 - x0) * i / Math.max(1, o.anios.length - 1); };
    var Y = function (v) { return y0 - (y0 - y1) * (v - min) / (max - min); };
    var s = '<rect width="' + W + '" height="' + H + '" fill="var(--tq-papel)"/>';
    s += '<text x="160" y="14" font-size="11" text-anchor="middle" fill="var(--tq-comal-texto)" font-weight="700">' + o.titulo + '</text>';
    (min < -15 ? [min, 0, max] : [0, max]).forEach(function (v) {
      s += '<line x1="' + x0 + '" y1="' + Y(v) + '" x2="' + x1 + '" y2="' + Y(v) + '" stroke="' + (v === 0 ? 'var(--tq-comal-texto)' : 'var(--tq-papel-sombra)') + '" stroke-width="' + (v === 0 ? 1.4 : 1) + '"/>';
      s += '<text x="' + (x0 - 4) + '" y="' + (Y(v) + 4) + '" font-size="11" text-anchor="end" fill="var(--tq-comal-texto)">' + ctx.fmt(v) + '</text>';
    });
    if (o.alarma) s += '<line x1="' + x0 + '" y1="' + Y(o.alarma) + '" x2="' + x1 + '" y2="' + Y(o.alarma) + '" stroke="var(--tq-salsa)" stroke-width="1.5" stroke-dasharray="5 4"/>' +
      '<text x="' + x1 + '" y="' + (Y(o.alarma) - 4) + '" font-size="11" text-anchor="end" fill="var(--tq-salsa)">alarma: ' + ctx.fmt(o.alarma) + '</text>';
    var pts = [];
    o.valores.forEach(function (v, i) { if (v != null) pts.push(X(i).toFixed(1) + ',' + Y(v).toFixed(1)); });
    if (pts.length > 1) s += '<polyline points="' + pts.join(' ') + '" fill="none" stroke="var(--tq-anil-gris)" stroke-width="2.5"/>';
    o.valores.forEach(function (v, i) { if (v != null) s += '<rect x="' + (X(i) - 3) + '" y="' + (Y(v) - 3) + '" width="6" height="6" fill="' + (o.marca === i ? 'var(--tq-salsa)' : 'var(--tq-anil-gris)') + '"/>'; });
    o.anios.forEach(function (a, i) { if (i % (o.anios.length > 12 ? 3 : 2) === 0 || i === o.anios.length - 1) s += '<text x="' + X(i) + '" y="' + (y0 + 16) + '" font-size="11" text-anchor="middle" fill="var(--tq-comal-texto)">' + a + '</text>'; });
    svg.innerHTML = s; return svg;
  }

  /* Barras horizontales de la diferencia de cada año, alrededor del cero, con escala fija de −20 a +20 (SVG). */
  function diferencias(ctx, lista, alt) {
    var ns = 'http://www.w3.org/2000/svg', svg = document.createElementNS(ns, 'svg'), W = 320, fila = 20, H = 34 + fila * lista.length;
    var x0 = 176, k = 100 / 20, s = '<rect width="' + W + '" height="' + H + '" fill="var(--tq-papel)"/>';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H); svg.setAttribute('role', 'img'); svg.setAttribute('aria-label', alt);
    svg.style.width = '100%'; svg.style.maxWidth = '560px'; svg.style.display = 'block';
    s += '<text x="' + (x0 - 6) + '" y="16" font-size="11" text-anchor="end" fill="var(--tq-comal-texto)">menos</text>' +
      '<text x="' + (x0 + 6) + '" y="16" font-size="11" fill="var(--tq-comal-texto)">más de lo esperado</text>';
    lista.forEach(function (a, i) {
      var y = 26 + i * fila, w = Math.abs(a.diferencia) * k;
      s += '<text x="40" y="' + (y + 12) + '" font-size="11" text-anchor="end" fill="var(--tq-comal-texto)">' + a.anio + (a.parcial ? '*' : '') + '</text>';
      s += '<rect x="' + (a.diferencia < 0 ? x0 - w : x0) + '" y="' + (y + 2) + '" width="' + w + '" height="' + (fila - 6) + '" fill="' + (a.diferencia < 0 ? 'var(--tq-papel-sombra)' : 'var(--tq-anil-gris)') + '"/>';
      var tx = a.diferencia < 0 ? x0 - w - 4 : x0 + w + 4;
      s += '<text x="' + tx + '" y="' + (y + 12) + '" font-size="11" text-anchor="' + (a.diferencia < 0 ? 'end' : 'start') + '" fill="var(--tq-comal-texto)">' + (a.diferencia > 0 ? '+' : '−') + ctx.fmt(Math.abs(a.diferencia), 1) + '</text>';
    });
    s += '<line x1="' + x0 + '" y1="22" x2="' + x0 + '" y2="' + (H - 4) + '" stroke="var(--tq-comal-texto)" stroke-width="1.4"/>';
    svg.innerHTML = s; return svg;
  }

  window.CASO_PAGINA = {
    id: '2.4', version: 'pagina-1.0', titulo: '¿CUANDO HABRIA SONADO LA ALARMA?', intro: './', minutos: 25,
    secciones: [

      /* 1 · el expediente */
      { id: 'preparacion', titulo: 'EL EXPEDIENTE', render: function (ctx) {
        ctx.aviso('<b>Aviso de contenido.</b> Este caso trata de homicidios reales cometidos por un médico de familia. Trabajamos con conteos de certificados de defunción, sin nombres de víctimas ni detalles de las muertes.');
        ctx.p('Enero de 1986, en Hyde. Cada certificado de defunción lleva la firma de un médico, pero nadie suma esas firmas médico por médico. Hoy te toca a ti.');
        ctx.expediente([['LOS CERTIFICADOS', 'Cuántos certificados de defunción firmó un médico de Hyde cada año, de 1977 a 1985.'],
          ['LAS LISTAS DE PACIENTES', 'Cuántos pacientes tenía él y cuántos los médicos de comparación del mismo pueblo.'],
          ['EL REPORTE DEL ASISTENTE', 'Una revisión año por año. Todavía no la abres.', true]]);
        ctx.aviso('<b>Datos reales.</b> Las cifras son las de la auditoría oficial de 2001 (Baker, Tabla 8.1). En 1986 nadie las había juntado: aquí las tienes de adelanto, hasta 1985. Las fuentes están al final del caso.');
      } },

      /* 2 · la apuesta */
      { id: 'apuesta', titulo: 'TU APUESTA', render: function (ctx) {
        var a = anio(1985);
        ctx.p('En 1985 este médico firmó <b>' + a.certificados + '</b> certificados de defunción. Los médicos de comparación de Hyde, todos juntos, firmaron <b>' + a.cert_comp + '</b>.');
        ctx.p('<b>¿Abrirías una revisión de este médico?</b>');
        ctx.apuesta(['Sí: firmó casi la mitad que todos los demás juntos', 'Todavía no: primero veo cuántos pacientes tiene cada uno',
          'No: un médico con pacientes mayores firma más certificados', 'No: un número así nunca basta para sospechar']);
      } },

      /* 3 · lo esperado para su lista */
      { id: 'esperado', titulo: 'LO ESPERADO', render: function (ctx, cuerpo) {
        ctx.desplegable('¿Qué es un certificado de defunción?', ['Certificado de defunción: el documento en el que un médico anota la causa de una muerte. Este caso cuenta los que firmó cada médico de Hyde, año por año.']);
        ctx.p('Un médico con muchos pacientes firma más certificados que uno con pocos. Para comparar con justicia, pregunta: si en su lista muriera la misma proporción que en las listas de los demás médicos del pueblo, <b>¿cuántos certificados firmaría?</b>');
        var caja = ctx.el('div'); cuerpo.appendChild(caja);
        function pintar() {
          var con = !!(ctx.S.retos.reto_esperado_1984 || (ctx.S.datos._luego || {}).reto_esperado_1984);
          var cab = ['AÑO', 'SUS CERTIFICADOS', 'SUS PACIENTES', 'LOS DEMAS: CERTIFICADOS', 'LOS DEMAS: PACIENTES'].concat(con ? ['ESPERADO (AUDITORIA)', 'DIFERENCIA'] : []);
          caja.innerHTML = '';
          caja.appendChild(ctx.tabla(cab, HASTA.map(function (a) {
            var f = [a.anio + (a.parcial ? '*' : ''), String(a.certificados), ctx.fmt(a.pacientes), String(a.cert_comp), ctx.fmt(a.pac_comp)];
            return con ? f.concat([ctx.fmt(a.esperado, 1), (a.diferencia > 0 ? '+' : '') + ctx.fmt(a.diferencia, 1)]) : f;
          }), { caja: 'Certificados y pacientes por año, Hyde, 1977 a 1985' }));
          caja.appendChild(ctx.el('p', 'nota', '* 1977 cuenta solo una parte del año. Los pacientes antes de 1987 son una estimación de la auditoría.' + (con ? ' La auditoría calculó lo esperado así: certificados de los demás por cada 1,000 pacientes, por los pacientes de este médico.' : '')));
        }
        pintar();
        ctx.aviso('<b>Ojo.</b> Esta cuenta solo toma en cuenta cuántos pacientes tiene cada médico, no su edad. La auditoría también ajustó por edad y sexo; lo verás al final.');
        ctx.calculadora();
        ctx.reto({ id: 'reto_esperado_1984', titulo: '★★ RETO 1', dificultad: 2, tipo: 'numero', etiqueta: 'Tu respuesta (certificados)',
          pregunta: '¿Cuántos certificados se esperaban en 1984 para un médico con sus ' + ctx.fmt(anio(1984).pacientes) + ' pacientes?',
          pista: 'Certificados de los demás entre sus pacientes; eso, por los pacientes de este médico.',
          alResponder: function () { pintar(); ctx.listo(); }, alSaltar: function () { pintar(); ctx.listo(); } });
        if (ctx.S.retos.reto_esperado_1984 || (ctx.S.datos._luego || {}).reto_esperado_1984) ctx.listo();
      } },

      /* 4 · el reporte del asistente: mira cada año por separado (error plantado) */
      { id: 'asistente', titulo: 'EL REPORTE DEL ASISTENTE', render: function (ctx, cuerpo) {
        ctx.p('Le pediste al asistente: <i>«Revisa si este médico firmó más certificados de los esperados de 1977 a 1985 y dime si hay que preocuparse.»</i> Esto entregó. <b>Puede tener un error.</b> Revisa antes de usarlo.');
        var pz = ctx.el('div', 'pieza borrador'); pz.appendChild(ctx.el('b', null, 'REPORTE DEL ASISTENTE')); pz.appendChild(ctx.el('span', 'sello-mini', 'BORRADOR'));
        pz.appendChild(diferencias(ctx, HASTA, 'Gráfica del asistente: la diferencia entre lo firmado y lo esperado, año por año de 1977 a 1985. Barras hacia la izquierda en 1977 y 1983; hacia la derecha los demás años.'));
        pz.appendChild(ctx.el('p', null, '«Revisé año por año la diferencia entre lo que firmó y lo esperado. Sube y baja: en 1977 y en 1983 firmó menos de lo esperado. Ningún año, por sí solo, está fuera de lo que le puede pasar a un médico con pacientes mayores. Conclusión: variación normal. No hace falta revisar más.»'));
        cuerpo.appendChild(pz);
        ctx.h3('TU MESA DE VERIFICACION');
        var notas = ctx.controles('comprobacion').map(function (x) { return x.texto; }).filter(Boolean);
        var acc = ctx.el('div', 'acciones'); cuerpo.appendChild(acc);
        var lib = ctx.libreta(notas);
        function anotar(a, t) { if (notas.indexOf(t) < 0) ctx.registrar('comprobacion', { accion: a, texto: t }); lib.anotar(t); }
        var arriba = HASTA.filter(function (a) { return a.diferencia > 0; }).length;
        ctx.boton('CONTAR AÑOS ARRIBA Y ABAJO', function () { anotar('signos', arriba + ' años arriba de lo esperado y ' + (HASTA.length - arriba) + ' abajo (1977, incompleto, y 1983).'); }, 'sec', acc);
        ctx.boton('VER EL AÑO MAS ALTO', function () {
          var m = HASTA.reduce(function (p, a) { return a.diferencia > p.diferencia ? a : p; });
          anotar('maximo', m.anio + ': ' + ctx.fmt(m.diferencia, 1) + ' certificados más de lo esperado, el año más alto.');
        }, 'sec', acc);
        ctx.boton('LEER LA NOTA DE LA TABLA', function () { anotar('nota', 'Nota: 1977 cuenta solo una parte del año, y sus pacientes antes de 1987 son una estimación de la auditoría.'); }, 'sec', acc);
        ctx.reto({ id: 'reto_error_reporte', titulo: '★★ RETO 2', dificultad: 2, tipo: 'opcion',
          pregunta: 'Compara el reporte con la tabla. ¿Dónde está el error del asistente?',
          opciones: ['Mira cada año por separado y no ve que casi todos quedan arriba de lo esperado',
            'Calcula lo esperado con los pacientes de los demás médicos, no con los suyos',
            'Compara con médicos de otra ciudad, no con los de Hyde, que atienden a gente parecida',
            'No tiene ningún error'],
          pista: 'Cuenta cuántos años quedan arriba y cuántos abajo. ¿Se compensan?',
          alResponder: function () { ctx.listo(); }, alSaltar: function () { ctx.listo(); } });
        if (ctx.S.retos.reto_error_reporte || (ctx.S.datos._luego || {}).reto_error_reporte) ctx.listo();
      } },

      /* 5 · lo que se acumula: el alumno lleva la cuenta y la herramienta se nombra después del reto 3 */
      { id: 'acumulado', titulo: 'LO QUE SE ACUMULA', render: function (ctx, cuerpo) {
        ctx.p('Un año arriba puede ser mala suerte. Siete de nueve ya no se parece a la suerte. Lleva la cuenta: en cada año, suma su diferencia a lo que traías del año anterior.');
        var guardadas = {}; ctx.controles('acumulado').forEach(function (x) { guardadas[x.anio] = x.valor; });
        var entradas = {};
        HASTA.forEach(function (a) {
          var i = ctx.el('input'); i.type = 'text'; i.inputMode = 'decimal'; i.size = 6; i.style.width = '5.5em'; i.style.maxWidth = '100%';
          i.setAttribute('aria-label', 'Lo que lleva de más al terminar ' + a.anio);
          if (guardadas[a.anio] != null) i.value = ctx.fmt(guardadas[a.anio], 1);
          entradas[a.anio] = i;
        });
        cuerpo.appendChild(ctx.tabla(['AÑO', 'DIFERENCIA', 'LLEVA DE MAS'], HASTA.map(function (a) {
          return [a.anio + (a.parcial ? '*' : ''), (a.diferencia > 0 ? '+' : '') + ctx.fmt(a.diferencia, 1), entradas[a.anio]];
        }), { caja: 'Diferencia por año y lo que lleva de más' }));
        var graf = ctx.el('div'); cuerpo.appendChild(graf);
        var nota = ctx.el('p', 'nota'); nota.setAttribute('role', 'status'); cuerpo.appendChild(nota);
        function pintar() {
          graf.innerHTML = '';
          graf.appendChild(linea(ctx, { titulo: 'Lo que lleva de más, según tu cuenta', anios: HASTA.map(function (a) { return a.anio; }),
            valores: HASTA.map(function (a) { return guardadas[a.anio] != null ? guardadas[a.anio] : null; }),
            alt: 'Tu línea: lo que lleva de más año con año, con los valores que escribiste.' }));
        }
        HASTA.forEach(function (a) {
          entradas[a.anio].addEventListener('change', function () {
            var x = num(entradas[a.anio].value);
            if (x == null || x < -100 || x > 1000) { nota.textContent = 'Escribe un número entre −100 y 1,000 para ' + a.anio + '.'; return; }
            guardadas[a.anio] = x; ctx.registrar('acumulado', { anio: a.anio, valor: x }); pintar(); nota.textContent = '';
          });
        });
        pintar();
        ctx.calculadora();
        var nom = ctx.el('div'); nom.style.display = 'grid'; nom.style.gap = '14px';
        ctx.reto({ id: 'reto_acumulado_1985', titulo: '★★★ RETO 3', dificultad: 3, tipo: 'numero', etiqueta: 'Tu respuesta (certificados de más)',
          pregunta: 'Al terminar 1985, ¿cuántos certificados de más llevaba este médico, sumando las diferencias desde 1977?',
          pista: 'Suma la columna de diferencias de 1977 a 1985, con todo y los dos años negativos.',
          alResponder: function () { nombrar(); ctx.listo(); }, alSaltar: function () { nombrar(); ctx.listo(); } });
        cuerpo.appendChild(nom);
        function nombrar() {
          if (nom.childNodes.length) return;
          ctx.nombre(['Restar a lo que pasó lo que se esperaba es <b>observado menos esperado</b>. Sumarlo año con año es una <b>suma acumulada</b>: un año malo sube y baja, pero algo que se repite hace que la línea suba sin parar.',
            'Si pones una <b>línea de alarma</b> encima de la suma, tienes un <b>gráfico de control</b>: cuando la línea la cruza, alguien revisa. La versión que ajusta por el riesgo de cada paciente se llama <b>CUSUM</b>, y viene del control de calidad de las fábricas.'],
            ['../../labs/level-2/valores-atipicos.html', 'Laboratorio: valores atípicos'], nom);
          var t = ctx.el('div', 'tarjeta'); t.appendChild(ctx.el('h3', null, '¿DONDE PONES LA ALARMA?'));
          t.appendChild(ctx.el('p', null, 'Mueve la línea de alarma y mira en qué año la habría cruzado la suma que imprimió la auditoría.'));
          var cum = acumulada(HASTA), sal = ctx.el('p', 'frase'); sal.setAttribute('role', 'status');
          var zona = ctx.el('div');
          var r = ctx.el('input'); r.type = 'range'; r.min = 20; r.max = 120; r.step = 10; r.value = ctx.datos.alarma || 50; r.style.width = '100%';
          r.setAttribute('aria-label', 'Línea de alarma, en certificados de más');
          function mover() {
            var v = +r.value, i = cum.findIndex(function (c) { return c >= v; });
            ctx.datos.alarma = v; ctx.guardar();
            zona.innerHTML = ''; zona.appendChild(linea(ctx, { titulo: 'Lo que llevaba de más según la auditoría', anios: HASTA.map(function (a) { return a.anio; }), valores: cum, alarma: v, marca: i,
              alt: 'Línea de la suma acumulada de 1977 a 1985 con la alarma en ' + v + (i >= 0 ? '; la cruza en ' + HASTA[i].anio : '; no la cruza antes de 1986') + '.' }));
            sal.textContent = i >= 0 ? 'Con la alarma en ' + v + ', habría sonado al terminar ' + HASTA[i].anio + '.' : 'Con la alarma en ' + v + ', no habría sonado antes de 1986.';
          }
          r.addEventListener('input', mover);
          r.addEventListener('change', function () { ctx.registrar('alarma', { valor: +r.value }); });
          t.appendChild(r); t.appendChild(zona); t.appendChild(sal);
          t.appendChild(ctx.el('p', null, 'Cuanto más baja la alarma, antes suena, y más veces suena por médicos inocentes. En un estudio con ' + ctx.fmt(CI.medicos_estudio) + ' médicos, ' + CI.alarmas_estudio + ' dieron señal con datos de 1993 a 1999: una era la de este médico y las demás se explicaban sobre todo por pacientes en residencias de ancianos (Spiegelhalter y Best, 2004). Una alarma no acusa a nadie: dice dónde revisar.'));
          nom.appendChild(t); mover();
          ctx.verificacion({ texto: 'Escribe qué revisaste para confiar en tu suma y qué encontraste. Busca dos comprobaciones que no salgan de la misma cuenta.', dentro: nom });
        }
        if (ctx.S.retos.reto_acumulado_1985 || (ctx.S.datos._luego || {}).reto_acumulado_1985) { nombrar(); ctx.listo(); }
      } },

      /* 6 · la firma */
      { id: 'firma', titulo: 'FIRMA TU DECISION', render: function (ctx, cuerpo) {
        ctx.p('Es enero de 1986. Tienes la suma de un solo médico, hasta 1985. Lo que pasó de verdad viene después.');
        var OPC = ['Pedir a la policía que investigue ya', 'Revisar sus certificados y formularios de cremación con un médico independiente',
          'Esperar un año más para ver si la línea sigue subiendo', 'Nada: un número no prueba un delito'];
        var sel = ctx.opciones({ lista: OPC.map(function (o) { return [o, o]; }), clave: 'decision', etiqueta: 'Tu decisión' });
        ctx.campo({ id: 'regla', etiqueta: 'Tu regla de alarma, en una frase: cuándo se revisa a un médico', renglones: 2, max: 400 });
        ctx.campo({ id: 'quien', etiqueta: 'Quién firma la revisión (una persona, no el asistente)', renglones: 1, max: 200 });
        ctx.h3('CERTEZA');
        if (!ctx.datos.certeza) ctx.datos.certeza = 'Media';
        ctx.opciones({ lista: [['Baja', 'Baja'], ['Media', 'Media'], ['Alta', 'Alta']], clave: 'certeza', clase: 'zonas', etiqueta: 'Certeza' });
        ctx.campo({ id: 'nose', etiqueta: 'Lo que no sé', renglones: 2, max: 400 });
        ctx.campo({ id: 'cambiar', etiqueta: 'Qué me haría cambiar de decisión', renglones: 2, max: 400 });
        var res = ctx.el('div'), g;
        ctx.boton('FIRMAR MI DECISION', function () {
          var d = ctx.datos, o = sel.valor()[0];
          if (!o || !(d.regla || '').trim() || !(d.quien || '').trim()) { g.className = 'guardado mal'; g.textContent = 'Elige qué haces, escribe tu regla y quién firma la revisión. Nadie firma por ti.'; return; }
          var texto = 'Recomiendo: ' + o + '. Mi regla: ' + d.regla.trim().replace(/\.+$/, '') + '. Firma la revisión: ' + d.quien.trim() + '. Certeza: ' + (d.certeza || 'Media') +
            '. Lo que no sé: ' + (d.nose || '') + '. Me haría cambiar: ' + (d.cambiar || '');
          var ok = ctx.responder('firma', texto, 'firma');
          res.innerHTML = ''; ctx.sello('DECISION FIRMADA', 'Con certeza ' + (d.certeza || 'Media').toLowerCase() + '. La firma es tuya, no del asistente.', 'anil', res);
          ctx.marcarGuardado(g, ok); ctx.listo();
        });
        cuerpo.appendChild(res); g = ctx.guardado();
        if (ctx.S.respuestas.firma) { ctx.sello('DECISION FIRMADA', 'Ya firmaste. Si firmas otra vez, cuenta la más reciente.', 'anil', res); ctx.listo(); }
        else ctx.p('La revelación se abre cuando firmes.', 'nota');
      } },

      /* 7 · la revelación */
      { id: 'revelacion', titulo: 'LA REVELACION', puerta: function (S) { return !!S.respuestas.firma; }, render: function (ctx, cuerpo) {
        ctx.h3('LO QUE SIGUIO: 1986 A 1998');
        var cum = acumulada(A), i85 = A.map(function (a) { return a.anio; }).indexOf(1985);
        cuerpo.appendChild(linea(ctx, { titulo: 'Certificados de más, sumados desde 1977 (auditoría)', anios: A.map(function (a) { return a.anio; }), valores: cum, marca: i85,
          alt: 'La suma acumulada de 1977 a 1998: sube casi todos los años, pasa de ' + ctx.fmt(cum[i85], 1) + ' en 1985, marcado, a ' + ctx.fmt(cum[cum.length - 1], 1) + ' en 1998.' }));
        ctx.p('El punto rojo es donde terminaba tu cuenta. Al terminar 1998, solo en Hyde, llevaba ' + ctx.fmt(cum[cum.length - 1], 1) + ' certificados más de los esperados para su lista.');
        ctx.verificado('HAROLD SHIPMAN · VERIFICADO', [
          ['LO QUE SI PASO', 'Harold Shipman fue médico de familia en Hyde desde 1977. En marzo de 1998 la policía investigó sospechas sobre las muertes de sus pacientes y no encontró nada. Ese mismo año lo descubrió un testamento falsificado. El 31 de enero de 2000 lo condenaron por ' + CI.condenas + ' asesinatos y por la falsificación.'],
          ['LO QUE ENCONTRO LA INVESTIGACION', 'En 2002 la investigación pública concluyó que mató al menos a ' + CI.victimas_inquiry_2002 + ' pacientes entre 1975 y 1998 (171 mujeres y 44 hombres), con sospecha real en 45 muertes más; en 2005 estimó unas ' + CI.victimas_inquiry_2005 + '.'],
          ['LO QUE MOSTRABAN SUS CERTIFICADOS', 'La auditoría de 2001, ajustando por edad y sexo, encontró ' + CI.exceso_ajustado + ' certificados de más (entre 254 y 345), visibles desde sus primeros años. Según los formularios de cremación, ' + CI.tarde_shipman + ' % de sus pacientes murieron entre la 1 y las 7 de la tarde, contra ' + CI.tarde_comparacion + ' % con otros médicos, y él estuvo presente en ' + ctx.fmt(CI.presente_shipman, 1) + ' % de las muertes, contra ' + ctx.fmt(CI.presente_comparacion, 1) + ' %.'],
          ['EL GRAFICO QUE NADIE HIZO', 'Una suma acumulada con ajuste por riesgo lo habría señalado, en teoría, al final de ' + CI.detectable + ': trece años antes de su arresto. No existía: la vigilancia de las muertes por médico se diseñó después de este caso (Spiegelhalter y Best, 2004).'],
          ['LO QUE NO SE SABE', 'Los pacientes de su lista antes de 1987 son una estimación. La cuenta de este caso solo ajusta por el tamaño de la lista. Una alarma no dice por qué: hay médicos con muchas muertes por razones inocentes, como atender residencias de ancianos.'],
          ['MITOS', 'Los números lo atraparon (lo descubrió un testamento falsificado) · Un gráfico de control prueba un delito (es un filtro para saber a quién revisar) · Firmar más certificados es sospechoso (depende de cuántos pacientes tiene el médico y de qué edad).']]);
        var m = /^Recomiendo: (.+?)\. Mi regla/.exec(ctx.S.respuestas.firma || '');
        var tu = ctx.el('div', 'tarjeta'); tu.appendChild(ctx.el('h3', null, 'TU APUESTA Y TU FIRMA'));
        tu.appendChild(ctx.el('p', null, 'Tu apuesta: ' + (ctx.S.hip || '(no la anotaste)') + '. Tu decisión: ' + (m ? m[1] : '(todavía no firmas)') + '.'));
        tu.appendChild(ctx.el('p', null, 'Ningún año, solo, alcanzaba para sospechar. La suma contra lo esperado sí, y años antes. Lo que faltó no fue un dato: fue alguien que lo comparara.'));
        cuerpo.appendChild(tu);
        ctx.listo();
      } },

      /* 8 · transferir */
      { id: 'cierre', titulo: 'TU PROPIA DECISION', render: function (ctx, cuerpo) {
        ctx.h3('LA MISMA IDEA EN LA TAQUERIA');
        cuerpo.appendChild(ctx.tabla(['EN LA TAQUERIA', 'EN HYDE'], [
          ['Cada mes, Don Juan cuenta las quejas de la sucursal del centro contra las que espera por sus ventas', 'Cada año, los certificados del médico contra los esperados para su lista'],
          ['Un mes un poco arriba no dice nada', 'Un año arriba puede ser mala suerte'],
          ['Arriba casi todos los meses: al sumarlo, se nota', 'Siete de nueve años arriba: la suma lo delata']], { caja: 'La misma idea en la taquería' }));
        ctx.cierre({ codigo: '2.4', pregunta: 'En tu decisión, <b>¿contra qué esperado comparas?</b> ¿Cada cuánto sumas la diferencia y en qué punto sonaría tu alarma?',
          etiqueta: 'Mi decisión: contra qué esperado comparo y cuándo sonaría mi alarma',
          frase: '¿Contra qué lo comparo? Contra lo esperado, y no un año a la vez: suma la diferencia y decide antes en qué punto revisas.',
          siguiente: ['../4-1/', 'Las dos salas'] });
        ctx.desplegable('Glosario', ['Certificado de defunción: el documento en el que un médico anota la causa de una muerte.',
          'Lo esperado: lo que pasaría si el grupo se comportara como la referencia (aquí, los demás médicos del pueblo), con su mismo tamaño.',
          'Observado menos esperado: lo que pasó menos lo que se esperaba; positivo si hubo de más.',
          'Suma acumulada: la suma, periodo tras periodo, de observado menos esperado.',
          'Gráfico de control: una suma o una serie con una línea de alarma; cuando la cruza, alguien revisa.',
          'CUSUM: la suma acumulada con ajuste por el riesgo de cada caso; viene del control de calidad.',
          'Alarma falsa: una alarma que suena sin que haya un problema; el precio de avisar temprano.']);
        ctx.desplegable('Fuentes', [
          ['https://gosportpanel.independent.gov.uk/media/panel_documents/IMI000470.pdf', 'Baker, R. (2001). Harold Shipman’s Clinical Practice 1974-1998 (resumen oficial): 499 certificados en Hyde, 210 del médico de comparación con más, exceso de 297 y de 236.'],
          ['https://serialkillersinfo.com/blog/wp-content/uploads/2018/02/shipman-clinical-practice.pdf', 'Baker, R. (2001), informe completo (copia no oficial): Tabla 8.1, hora de las muertes y formularios de cremación.'],
          ['https://discovery.nationalarchives.gov.uk/details/r/C16350', 'The National Archives: la condena de 2000 y los informes de la investigación pública.'],
          ['https://pmc.ncbi.nlm.nih.gov/articles/PMC1123718', 'BMJ (2002): el primer informe de la investigación, 215 pacientes.'],
          ['https://www.pslhub.org/learn/investigations-risk-management-and-legal-issues/investigations-and-complaints/investigation-reports/other-reports-and-enquiries/the-shipman-inquiry-2002-2005-r867/', 'The Shipman Inquiry (2002-2005): resumen de los seis informes, entre ellos la investigación policial de marzo de 1998.'],
          ['https://tommasorigon.github.io/StatI/approfondimenti/Spiegelhalter2004.pdf', 'Spiegelhalter, D. y Best, N. (2004). Shipman’s statistical legacy. Significance 1(1).'],
          ['https://pmc.ncbi.nlm.nih.gov/articles/PMC1125127', 'Baker, R., Jones, D. R. y Goldblatt, P. (2003). Monitoring mortality rates in general practice after Shipman. BMJ 326.']
        ]);
      } }
    ]
  };
})();
