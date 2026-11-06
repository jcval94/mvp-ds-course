/* vivo.js — ronda en vivo para el docente (proyector) y cómo va la práctica del grupo · The Agentic Data Scientist
   Todo pasa por funciones de la base que comprueban el rol: docente_vivo_iniciar, docente_vivo_mover,
   docente_microcasos y docente_practica (esquema 0.15). */
(function () {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const { R, el, chips, HABITOS } = window.Micro;
  const vistas = ['vEntrar', 'vNoDocente', 'vConfig', 'vRonda'];
  const ver = (id) => vistas.forEach((v) => { $('#' + v).hidden = v !== id; });
  const CALENTAMIENTO = ['n01-gatos'];
  let ronda = null, timer = null, banco = null, renderActual = null, itemActual = null;

  function error(m) { $('#error').textContent = m || ''; $('#error').hidden = !m; }
  const msg = (e) => (e && e.message === 'sesion') ? 'Tu sesión expiró. Vuelve a entrar.' : ((e && e.message) || 'No se pudo conectar.');

  async function arrancar() {
    let rol;
    try { rol = await TDD.rpc('mi_rol'); } catch (e) { error(msg(e)); ver('vEntrar'); return; }
    if (!rol || !(rol.docente || rol.admin)) { ver('vNoDocente'); return; }
    let grupos = rol.grupos || [];
    if (rol.admin) { try { grupos = (await TDD.rpc('admin_grupos')) || grupos; } catch (_) {} }
    const sel = $('#grupo'); sel.innerHTML = '';
    grupos.forEach((g) => { const o = el('option', null, (g.nombre || g.id) + ' (' + g.id + ')'); o.value = g.id; sel.appendChild(o); });
    if (!grupos.length) { const o = el('option', null, 'Sin grupos asignados'); o.value = ''; sel.appendChild(o); }
    ver('vConfig');
    tablero();
  }

  async function iniciar(ids) {
    error('');
    const g = $('#grupo').value || null;
    try {
      ronda = await TDD.rpc('docente_vivo_iniciar', ids ? { p_grupo: g, p_ids: ids } : { p_grupo: g });
      ver('vRonda'); pintar(ronda); seguir();
    } catch (e) { error(msg(e)); }
  }

  async function mover(accion) {
    try { ronda = await TDD.rpc('docente_vivo_mover', { p_id: ronda.id, p_accion: accion }); pintar(ronda); }
    catch (e) { error(msg(e)); }
  }
  function seguir() {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      if (!ronda || ronda.terminado) return;
      try { ronda = await TDD.rpc('docente_vivo_mover', { p_id: ronda.id, p_accion: 'ver' }); pintar(ronda); } catch (_) {}
      seguir();
    }, document.hidden ? 6000 : 2000);
  }

  function pintar(v) {
    if (v.terminado || !v.item) {
      clearTimeout(timer); ver('vConfig'); tablero();
      error(''); $('#error').hidden = false; $('#error').textContent = 'Ronda terminada. Puedes abrir otra.';
      return;
    }
    $('#rConteo').textContent = (v.contestaron || 0) + (v.participantes ? ' de ' + v.participantes : '') + ' contestaron';
    if (!itemActual || itemActual.id !== v.item.id || itemActual.actual !== v.actual) {
      itemActual = { id: v.item.id, actual: v.actual };
      chips($('#rChips'), v.item);
      $('#rSituacion').textContent = v.item.situacion; $('#rPregunta').textContent = v.item.pregunta;
      const z = $('#rZona'); z.innerHTML = '';
      renderActual = R[v.item.tipo](v.item, z, () => {});
      z.querySelectorAll('button,input').forEach((b) => { if (!/CALCULADORA/.test(b.textContent)) b.disabled = true; });
      $('#rResultado').hidden = true; $('#rResultado').innerHTML = '';
      $('#rPie').textContent = 'Pregunta ' + (v.actual + 1) + ' de ' + v.total + '. Teclas: R revela, → siguiente, ← anterior.';
    }
    $('#cRevelar').disabled = v.revelado; $('#cAnterior').disabled = v.actual === 0;
    $('#cSiguiente').textContent = v.actual + 1 < v.total ? 'SIGUIENTE' : 'TERMINAR RONDA';
    if (v.revelado && v.resultado && $('#rResultado').hidden) revelar(v);
  }

  function revelar(v) {
    const r = v.resultado, it = v.item, caja = $('#rResultado'); caja.innerHTML = ''; caja.hidden = false;
    renderActual.mostrar(r.clave, true);
    caja.appendChild(el('p', 'veredicto', 'RESPUESTA: ' + renderActual.texto(r.clave)));
    caja.appendChild(el('p', null, r.explicacion));
    const total = v.contestaron || 0;
    if (total) {
      const d = el('div', 'dist');
      let filas = [];
      if (it.tipo === 'opcion') filas = it.contenido.opciones.map((o) => [o.texto, r.conteo[String(o.i)] || 0, o.i === r.clave.i]);
      else if (it.tipo === 'error') filas = it.contenido.partes.map((p, k) => [p, r.conteo[String(k)] || 0, k === r.clave.i]);
      else if (it.tipo === 'vf') filas = [['Verdadero', r.conteo['true'] || 0, r.clave.v === true], ['Falso', r.conteo['false'] || 0, r.clave.v === false]];
      else filas = [['Acertaron', r.aciertos, true], ['No acertaron', total - r.aciertos, false]];
      filas.forEach(([t, n, ok]) => {
        const f = el('div', 'f' + (ok ? ' ok' : '')); f.appendChild(el('span', null, t));
        const b = el('div', 'b'); const s = el('span'); s.style.width = Math.round(100 * n / total) + '%'; b.appendChild(s); f.appendChild(b);
        f.appendChild(el('b', null, Math.round(100 * n / total) + ' %')); d.appendChild(f);
      });
      caja.appendChild(d);
      caja.appendChild(el('p', 'nota', 'Acertó ' + Math.round(100 * r.aciertos / total) + ' % de ' + total + ' respuestas.'));
    } else caja.appendChild(el('p', 'nota', 'Nadie contestó desde el celular: usa la votación a mano alzada.'));
  }

  async function tablero() {
    const g = $('#grupo').value || null;
    try {
      const p = await TDD.rpc('docente_practica', { p_grupo: g });
      const tm = $('#tablaMicro'); tm.innerHTML = '';
      if (!p.microcasos.length) { tm.appendChild(el('p', 'nota', 'Todavía nadie del grupo ha practicado.')); }
      else {
        const t = el('table'); t.innerHTML = '<thead><tr><th>MICRO-CASO</th><th>HABITO</th><th>A LA PRIMERA</th><th>ALUMNOS</th></tr></thead>';
        const tb = el('tbody');
        p.microcasos.slice(0, 15).forEach((m) => {
          const tr = el('tr'); tr.appendChild(el('td', null, m.pregunta + ' (' + m.id + ')'));
          tr.appendChild(el('td', null, HABITOS[m.habito] || m.habito));
          tr.appendChild(el('td', null, m.primer_intento_ok + ' de ' + m.alumnos)); tr.appendChild(el('td', null, String(m.alumnos)));
          tb.appendChild(tr);
        });
        t.appendChild(tb); tm.appendChild(t);
      }
      const ta = $('#tablaAlumnos'); ta.innerHTML = '';
      if (p.alumnos.length) {
        const t = el('table'); t.innerHTML = '<thead><tr><th>ALUMNO</th><th>ESTA SEMANA</th><th>TOTAL</th><th>ACIERTOS</th></tr></thead>';
        const tb = el('tbody');
        p.alumnos.forEach((a) => {
          const tr = el('tr'); tr.appendChild(el('td', null, a.nombre || a.alumno_id));
          tr.appendChild(el('td', null, String(a.semana))); tr.appendChild(el('td', null, String(a.respuestas)));
          tr.appendChild(el('td', null, a.respuestas ? Math.round(100 * a.aciertos / a.respuestas) + ' %' : '—'));
          tb.appendChild(tr);
        });
        t.appendChild(tb); ta.appendChild(t);
      }
    } catch (e) { $('#tablaMicro').textContent = msg(e); }
  }

  async function elegir() {
    const caja = $('#elegir'); caja.hidden = !caja.hidden; $('#mElegir').setAttribute('aria-expanded', String(!caja.hidden));
    if (caja.hidden || banco) return;
    try { banco = await TDD.rpc('docente_microcasos'); } catch (e) { error(msg(e)); return; }
    const fc = $('#filtroClase');
    [...new Set(banco.map((m) => m.clase))].sort((a, b) => a - b).forEach((c) => { const o = el('option', null, 'Clase ' + c); o.value = c; fc.appendChild(o); });
    lista();
  }
  function lista() {
    const c = $('#filtroClase').value, l = $('#lista'); l.innerHTML = '';
    banco.filter((m) => !c || String(m.clase) === c).forEach((m) => {
      const lab = el('label'); const i = el('input'); i.type = 'checkbox'; i.value = m.id;
      i.addEventListener('change', () => { $('#iniciarElegidos').disabled = !l.querySelector('input:checked'); });
      lab.appendChild(i);
      const d = el('span'); d.appendChild(el('b', null, m.pregunta));
      d.appendChild(el('span', 'nota', ' · clase ' + m.clase + ' · ' + (HABITOS[m.habito] || m.habito) + ' · nivel ' + m.nivel + ' · ' + m.tipo + ' · ' + m.id));
      lab.appendChild(d); l.appendChild(lab);
    });
  }

  $('#mCalentamiento').addEventListener('click', () => iniciar(CALENTAMIENTO));
  $('#mAuto').addEventListener('click', () => iniciar(null));
  $('#mElegir').addEventListener('click', elegir);
  $('#filtroClase').addEventListener('change', lista);
  $('#grupo').addEventListener('change', tablero);
  $('#iniciarElegidos').addEventListener('click', () => iniciar([...$('#lista').querySelectorAll('input:checked')].map((i) => i.value)));
  $('#cRevelar').addEventListener('click', () => mover('revelar'));
  $('#cSiguiente').addEventListener('click', () => mover('siguiente'));
  $('#cAnterior').addEventListener('click', () => mover('anterior'));
  $('#cCerrar').addEventListener('click', () => mover('cerrar').then(() => { ronda = null; ver('vConfig'); tablero(); }));
  document.addEventListener('keydown', (e) => {
    if ($('#vRonda').hidden || /INPUT|SELECT/.test(e.target.tagName)) return;
    if (e.key === 'r' || e.key === 'R') { e.preventDefault(); if (!$('#cRevelar').disabled) mover('revelar'); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); mover('siguiente'); }
    else if (e.key === 'ArrowLeft' && !$('#cAnterior').disabled) { e.preventDefault(); mover('anterior'); }
  });
  $('#entrar').addEventListener('click', TDD.entrar);
  $('#salir').addEventListener('click', async () => { await TDD.cerrar(); location.reload(); });

  // La dirección que se proyecta sale de donde está publicada esta página (sin acoplarla a un proveedor).
  const url = new URL('./', location.href); const corta = (url.host + url.pathname).replace(/\/$/, '');
  document.querySelectorAll('.url-practica').forEach((b) => { b.textContent = corta; });

  const ret = TDD.tomarRetorno();
  if (ret.error) error('No se pudo entrar: ' + ret.error);
  if (TDD.iniciar()) { $('#salir').hidden = false; arrancar(); } else ver('vEntrar');
})();
