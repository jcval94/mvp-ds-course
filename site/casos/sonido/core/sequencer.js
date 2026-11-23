// Convierte una canción declarativa en notas con tiempo para cada voz y
// decide el arreglo: intensidad por sección, ajuste a una duración exacta,
// versión en bucle y mezcla bajo narración.

import { pitchClass, midiFor, scaleOf, degreeSemis, parseProgression } from './theory.js';
import { BASS, HARM, DRUMS } from './patterns.js';
import { instrument, DRUM_MAP } from '../library/instruments.js';

export function rng(seed = 1) {
  let a = seed >>> 0 || 1;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Melodía ───────────────────────────────────────────────
// Tokens separados por espacio, cada uno ocupa 1 paso (semicorchea en 4/4):
//   5  grado 5 · #4 / b7 alterado · 5' una octava arriba · 5, abajo
//   5:4 dura 4 pasos · - prolonga la nota anterior · . silencio · r:8 silencio de 8
//   !5 acento · 5~ ligado deslizando desde la nota anterior
//   c1 c2 c3 c4 tono del acorde vigente (raíz, tercera, quinta, séptima/octava)
//   C5 / F#4 nota absoluta · | separador de compás (se ignora)
const NOTE_RE = /^(!?)([#b]?)(c?)(\d)([',]*)(?::(\d+(?:\.\d+)?))?(~?)$/;
const ABS_RE = /^(!?)([A-G][#b]?)(-?\d)(?::(\d+(?:\.\d+)?))?(~?)$/;
const REST_RE = /^([.r_])(?::(\d+(?:\.\d+)?))?$/;

export function parseMelody(src) {
  const text = Array.isArray(src) ? src.join(' ') : (src || '');
  const notes = [];
  let step = 0;
  for (const tok of text.trim().split(/\s+/)) {
    if (!tok || tok === '|') continue;
    if (tok === '-') {
      if (notes.length && notes[notes.length - 1].step + notes[notes.length - 1].len === step) notes[notes.length - 1].len += 1;
      step += 1;
      continue;
    }
    let m = REST_RE.exec(tok);
    if (m) {
      step += m[2] ? Number(m[2]) : 1;
      continue;
    }
    m = NOTE_RE.exec(tok);
    if (m) {
      const len = m[6] ? Number(m[6]) : 1;
      const oct = (m[5].match(/'/g) || []).length - (m[5].match(/,/g) || []).length;
      notes.push({
        step, len, accent: !!m[1], slide: !!m[7],
        acc: m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0,
        chordTone: m[3] === 'c' ? Number(m[4]) : 0,
        degree: m[3] === 'c' ? 0 : Number(m[4]),
        oct,
      });
      step += len;
      continue;
    }
    m = ABS_RE.exec(tok);
    if (m) {
      const len = m[4] ? Number(m[4]) : 1;
      notes.push({ step, len, accent: !!m[1], slide: !!m[5], abs: midiFor(pitchClass(m[2]), Number(m[3])) });
      step += len;
      continue;
    }
    throw new Error(`Token de melodía inválido: "${tok}"`);
  }
  return { notes, steps: step };
}

// ── Contexto de canción ───────────────────────────────────
export function songContext(song, opts = {}) {
  const key = opts.key ?? song.key ?? 'C';
  const mode = opts.mode ?? song.mode ?? 'major';
  const beats = song.beats ?? 4;
  const stepsPerBeat = song.stepsPerBeat ?? 4;
  const transpose = opts.transpose ?? 0;
  const pc = (pitchClass(key) + transpose + 120) % 12;
  const oct = { lead: 5, harm: 4, bass: 3, ...(song.octaves || {}) };
  return {
    key, mode, pc, scale: scaleOf(mode), beats, stepsPerBeat,
    stepsPerBar: beats * stepsPerBeat,
    tonic: { lead: midiFor(pc, oct.lead), harm: midiFor(pc, oct.harm), bass: midiFor(pc, oct.bass) },
  };
}

function sectionData(song, name, ctx) {
  const sec = song.sections[name];
  if (!sec) throw new Error(`Sección "${name}" no existe en ${song.id}`);
  if (sec._cache && sec._cache.mode === ctx.mode) return sec._cache;
  const prog = parseProgression(sec.chords || '1', ctx.scale, ctx.beats);
  const lead = parseMelody(sec.lead);
  const line = sec.line ? parseMelody(sec.line) : null;
  const chordSteps = prog.totalBeats * ctx.stepsPerBeat;
  const longest = Math.max(chordSteps, lead.steps, line ? line.steps : 0);
  const bars = sec.bars ?? Math.max(1, Math.ceil(longest / ctx.stepsPerBar));
  const data = { mode: ctx.mode, sec, prog, lead, line, chordSteps, bars };
  Object.defineProperty(sec, '_cache', { value: data, writable: true, configurable: true, enumerable: false });
  return data;
}

function chordAt(data, stepInSection, ctx) {
  const s = ((stepInSection % data.chordSteps) + data.chordSteps) % data.chordSteps;
  const beat = s / ctx.stepsPerBeat;
  let found = data.prog.chords[0];
  for (const c of data.prog.chords) if (beat >= c.startBeat) found = c;
  return found;
}

function nearRoot(tonic, rootSemis, low = -5, high = 7) {
  let r = tonic + rootSemis;
  while (r - tonic >= high) r -= 12;
  while (r - tonic < low) r += 12;
  return r;
}

function chordTones(chord, tonic, count = 6) {
  const root = nearRoot(tonic, chord.rootSemis);
  const iv = chord.intervals.filter((x) => x < 12);
  const tones = [];
  for (let k = 0; tones.length < count; k++) for (const x of iv) if (tones.length < count) tones.push(root + x + 12 * k);
  return tones;
}

function melodyMidi(n, ctx, tonic, chord) {
  if (n.abs !== undefined) return n.abs + (ctx.transposeAbs ?? 0);
  if (n.chordTone) {
    const t = chordTones(chord, tonic, 4);
    return t[(n.chordTone - 1) % 4] + 12 * n.oct;
  }
  return tonic + degreeSemis(n.degree, ctx.scale) + n.acc + 12 * n.oct;
}

function resolvePattern(table, style, fallback) {
  if (style && typeof style === 'object') return style;
  return table[style] ?? table[fallback];
}

function scaleHits(pat, stepsPerBar) {
  if (pat.steps === stepsPerBar) return pat.hits;
  const k = stepsPerBar / pat.steps;
  return pat.hits.map(([s, l, t]) => [Math.round(s * k), l * k, t]);
}

// ── Generación por sección ───────────────────────────────
function emitSection(song, inst, data, ctx, voices, opt) {
  const { start, bars, intensity, mix, rand, isEnding, isIntro, prevName, name, fillLast } = opt;
  const sec = data.sec;
  const spb = ctx.stepsPerBar;
  const limit = bars * spb;
  const ins = { ...inst, ...(sec.inst || {}) };
  const leadVel = mix === 'underscore' ? 0.38 : 1;

  // Melodía principal
  if (mix !== 'nolead' && data.lead.notes.length) {
    const reps = Math.max(1, Math.ceil(limit / Math.max(1, data.lead.steps)));
    let prevMidi;
    for (let r = 0; r < reps; r++) {
      for (const n of data.lead.notes) {
        const s = r * data.lead.steps + n.step;
        if (s >= limit) break;
        const midi = melodyMidi(n, ctx, ctx.tonic.lead, chordAt(data, s, ctx));
        const note = {
          step: start + s, len: Math.min(n.len, limit - s), midi,
          vel: (n.accent ? 1 : 0.92) * leadVel, inst: instrument(ins.lead),
        };
        if (n.slide && prevMidi !== undefined) note.slideFrom = prevMidi;
        voices.lead.push(note);
        if ((intensity >= 3 || song.echo) && mix !== 'underscore') {
          voices.echo.push({ ...note, step: note.step + (song.echoDelay ?? 3), vel: 0.55, inst: instrument(ins.echo) });
        }
        prevMidi = midi;
      }
    }
  }

  // Línea secundaria escrita (contramelodía) en la voz de armonía
  const useLine = data.line && intensity >= (sec.lineMin ?? 1);
  if (useLine) {
    const reps = Math.max(1, Math.ceil(limit / data.line.steps));
    for (let r = 0; r < reps; r++) {
      for (const n of data.line.notes) {
        const s = r * data.line.steps + n.step;
        if (s >= limit) break;
        voices.harm.push({
          step: start + s, len: Math.min(n.len, limit - s),
          midi: melodyMidi(n, ctx, ctx.tonic.harm, chordAt(data, s, ctx)),
          vel: n.accent ? 1 : 0.9, inst: instrument(ins.line ?? ins.harm),
        });
      }
    }
  }

  // Armonía por patrón
  if (!useLine) {
    let style = sec.harm ?? 'pad';
    let harmInst = ins.harm;
    if (intensity === 0 && style !== 'none') { style = 'pad'; harmInst = 'harm.padSoft'; }
    const pat = resolvePattern(HARM, style, 'pad');
    if (pat.hits === 'pad') {
      let s = 0;
      while (s < limit) {
        const ch = chordAt(data, s, ctx);
        let e = s + 1;
        while (e < limit && chordAt(data, e, ctx) === ch) e++;
        const t = chordTones(ch, ctx.tonic.harm, 4);
        voices.harm.push({ step: start + s, len: e - s, midi: t[0], arpChord: t.slice(0, 3).map((x) => x - t[0]), vel: 0.95, inst: instrument(harmInst) });
        s = e;
      }
    } else {
      const hits = scaleHits(pat, spb);
      for (let b = 0; b < bars; b++) {
        for (const [hs, hl, tone] of hits) {
          const s = b * spb + hs;
          if (s >= limit) continue;
          const ch = chordAt(data, s, ctx);
          const t = chordTones(ch, ctx.tonic.harm, 6);
          const note = { step: start + s, len: Math.min(hl, limit - s), vel: 0.9, inst: instrument(harmInst) };
          if (tone === 'C') {
            note.midi = t[0];
            note.arpChord = t.slice(0, 3).map((x) => x - t[0]);
          } else {
            note.midi = t[tone % t.length];
          }
          voices.harm.push(note);
        }
      }
    }
  }

  // Bajo
  {
    let style = sec.bass ?? 'root';
    if (intensity === 0 && style !== 'none' && style !== 'drone') style = spb === 12 ? 'waltz' : 'half';
    const pat = resolvePattern(BASS, style, 'root');
    const hits = scaleHits(pat, spb);
    const bassInst = instrument(ins.bass);
    for (let b = 0; b < bars; b++) {
      for (const [hs, hl, tone] of hits) {
        const s = b * spb + hs;
        if (s >= limit) continue;
        const ch = chordAt(data, s, ctx);
        const root = nearRoot(ctx.tonic.bass, ch.rootSemis);
        let midi = root;
        if (tone === 'o') midi = root + 12;
        else if (tone === '5') midi = root + (ch.intervals[2] ?? 7);
        else if (tone === '3') midi = root + ch.intervals[1];
        else if (tone === '6') midi = root + 9;
        else if (tone === 'T') midi = ctx.tonic.bass;
        else if (tone === 'a') {
          const nx = chordAt(data, Math.min(limit, s + hl + 0.01), ctx);
          const nr = nearRoot(ctx.tonic.bass, nx.rootSemis);
          midi = nr === root ? root + 7 : nr + (nr > root ? -1 : 1);
        }
        voices.bass.push({ step: start + s, len: Math.min(hl, limit - s), midi, vel: 1, inst: bassInst });
      }
    }
  }

  // Batería
  {
    const style = sec.drums ?? 'none';
    const pat = resolvePattern(DRUMS, style, 'none');
    const bump = mix === 'underscore' ? Math.min(intensity, 1) : intensity;
    if (bump > 0) {
      for (let b = 0; b < bars; b++) {
        const isFillBar = fillLast && b === bars - 1 && bump >= 2 && !isEnding && sec.fill !== false;
        for (const [lane, str] of Object.entries(pat)) {
          if (!str) continue;
          const L = str.length;
          for (let i = 0; i < L; i++) {
            const ch = str[i];
            if (ch === '.' || ch === '-') continue;
            const s = b * spb + Math.round((i * spb) / L);
            if (isFillBar && s - b * spb >= spb / 2 && 'shgo'.includes(lane)) continue;
            if (bump === 1) {
              if (lane === 'k' && i !== 0) continue;
              if ('sSgpctTwb'.includes(lane)) continue;
              if ('hozm'.includes(lane) && i % Math.max(1, L / 4) !== 0 && i % 4 !== 0) continue;
            }
            if (bump < 3 && lane === 'g') continue;
            pushDrum(voices, lane, start + s, ch === 'X' ? 1 : 0.85);
            if (bump >= 3 && lane === 'h' && str[i + 1] === '.' && i + 1 < L && !pat.o?.[i + 1]?.match(/[xX]/)) {
              pushDrum(voices, 'h', start + s + spb / L, 0.55);
            }
          }
        }
        if (isFillBar) {
          const half = spb / 2;
          for (let k = 0; k < half; k++) {
            const lane = k >= half - 4 ? (k % 2 ? 'T' : 't') : 's';
            pushDrum(voices, lane, start + b * spb + half + k, 0.6 + (0.4 * k) / half);
          }
        }
      }
      const crashHere = bump >= 2 && !isIntro && prevName !== undefined && prevName !== name && style !== 'none';
      if (crashHere && !pat.c) pushDrum(voices, 'c', start, 1);
    }
  }
  void rand;
}

function pushDrum(voices, lane, step, vel) {
  for (const d of DRUM_MAP[lane] || []) {
    voices[d.voice].push({ step, len: 1, midi: d.midi, vel, inst: instrument(d.inst), drum: lane });
  }
}

// ── Arreglo ───────────────────────────────────────────────
function autoEnding(song) {
  return {
    chords: '1', lead: '!1\':16', harm: 'pad', bass: 'root', drums: 'end',
    inst: { lead: song.inst?.lead ?? 'lead.square' },
  };
}

export function songParts(song) {
  const names = Object.keys(song.sections);
  const intro = song.intro ?? (names.includes('intro') ? 'intro' : null);
  let ending = song.ending ?? (names.includes('end') ? 'end' : null);
  if (!ending && !song.noAutoEnding) {
    if (!song.sections.__end) Object.defineProperty(song.sections, '__end', { value: autoEnding(song), enumerable: false });
    ending = '__end';
  }
  const form = song.form ?? names.filter((n) => n !== intro && n !== ending);
  const body = song.loop ?? form.filter((n) => n !== intro && n !== ending);
  return { intro, ending, form, body };
}

const CURVES = {
  flat: (base) => () => base,
  auto: (base) => (i, n, role) => (role === 'intro' ? Math.max(0, base - 1) : base),
  build: (base) => (i, n, role) => (role === 'ending' ? Math.max(base, 2) : Math.round((Math.min(3, base + 1) * i) / Math.max(1, n - 1))),
  peak: (base) => (i, n) => {
    const x = n <= 1 ? 1 : i / (n - 1);
    return Math.round(Math.min(3, base + 1) * Math.sin(Math.PI * Math.min(0.999, Math.max(0.12, x))));
  },
  calm: (base) => (i, n, role) => (role === 'ending' ? base : Math.max(0, base - 1)),
};

/**
 * Decide la secuencia de secciones.
 * opts.duration (s): ajusta tempo y número de compases para durar exactamente eso.
 * opts.loop: solo cuerpo, sin intro ni final, para bucles sin corte.
 */
export function planArrangement(song, ctx, opts = {}) {
  const parts = songParts(song);
  const bpm0 = (opts.bpm ?? song.bpm ?? 120) * (opts.tempo ?? 1);
  const barSec = (ctx.beats * 60) / bpm0;
  const bars = (n) => sectionData(song, n, ctx).bars;
  const tail = opts.tail ?? 0.2;

  let seq;
  let bpm = bpm0;
  if (opts.form || (song.type === 'jingle' && !opts.loop)) {
    seq = (opts.form ?? parts.form).map((n) => ({ name: n, bars: bars(n) }));
    if (opts.duration) {
      const total = seq.reduce((s, x) => s + x.bars, 0);
      bpm = bpm0 * (total * barSec) / Math.max(0.3, opts.duration - tail);
    }
  } else if (opts.loop) {
    const times = opts.loops ?? 1;
    seq = [];
    for (let k = 0; k < times; k++) for (const n of parts.body) seq.push({ name: n, bars: bars(n) });
  } else if (!opts.duration) {
    seq = parts.form.map((n) => ({ name: n, bars: bars(n) }));
    if (parts.intro && opts.intro !== false && !parts.form.includes(parts.intro)) seq.unshift({ name: parts.intro, bars: bars(parts.intro) });
    if (parts.ending && opts.ending !== false && !parts.form.includes(parts.ending)) seq.push({ name: parts.ending, bars: bars(parts.ending) });
  } else {
    const avail = Math.max(0.3, opts.duration - tail);
    const target = avail / barSec;
    const iB = parts.intro && opts.intro !== false ? bars(parts.intro) : 0;
    const eB = parts.ending && opts.ending !== false ? bars(parts.ending) : 0;
    seq = [];
    if (target < eB + 0.75 || (!parts.body.length)) {
      // Muy corto: solo el remate final (o el comienzo del cuerpo si no hay final)
      if (eB) seq.push({ name: parts.ending, bars: eB });
      else seq.push({ name: parts.body[0], bars: Math.max(1, Math.round(target)) });
    } else {
      let useIntro = iB > 0 && target >= iB + eB + 1.5;
      let need = target - eB - (useIntro ? iB : 0);
      let bodyBars = Math.max(1, Math.round(need));
      // Preferir cortes en múltiplos de 2 compases si el tempo no se desvía mucho
      const even = Math.max(2, Math.round(need / 2) * 2);
      if (Math.abs(even - need) / Math.max(1, need) < 0.12 && need >= 1.5) bodyBars = even;
      if (useIntro) seq.push({ name: parts.intro, bars: iB });
      let left = bodyBars;
      let k = 0;
      while (left > 0) {
        const n = parts.body[k % parts.body.length];
        const b = Math.min(bars(n), left);
        seq.push({ name: n, bars: b });
        left -= b;
        k++;
      }
      if (eB) seq.push({ name: parts.ending, bars: eB });
    }
    const totalBars = seq.reduce((s, x) => s + x.bars, 0);
    bpm = bpm0 * (totalBars * barSec) / avail;
  }

  const base = Math.max(0, Math.min(3, opts.intensity ?? song.intensity ?? 2));
  const curve = (CURVES[opts.curve ?? song.curve ?? 'auto'] ?? CURVES.auto)(base);
  seq.forEach((x, i) => {
    const role = x.name === parts.intro ? 'intro' : x.name === parts.ending ? 'ending' : 'body';
    x.role = role;
    x.intensity = song.sections[x.name]?.intensity ?? curve(i, seq.length, role);
    if (opts.loop) x.intensity = base;
  });
  return { seq, bpm, parts };
}

/**
 * Secuencia completa → notas con tiempo (s) por voz + marcas de sección/compás.
 */
export function sequenceSong(song, opts = {}) {
  const ctx = songContext(song, opts);
  const plan = planArrangement(song, ctx, opts);
  const inst = {
    lead: 'lead.square', harm: 'harm.pad', bass: 'bass.tri', echo: 'harm.echo',
    ...(song.inst || {}), ...(opts.inst || {}),
  };
  const voices = { lead: [], harm: [], echo: [], bass: [], drum: [], kick: [] };
  const rand = rng(opts.seed ?? 7);
  const spb = ctx.stepsPerBar;
  let step = 0;
  const markers = [];
  plan.seq.forEach((x, i) => {
    const data = sectionData(song, x.name, ctx);
    const next = plan.seq[i + 1];
    emitSection(song, inst, data, ctx, voices, {
      start: step, bars: x.bars, intensity: x.intensity, mix: opts.mix ?? 'full', rand,
      isEnding: x.role === 'ending', isIntro: x.role === 'intro',
      prevName: plan.seq[i - 1]?.name, name: x.name,
      fillLast: next !== undefined && next.name !== x.name && !opts.loop,
    });
    markers.push({ type: 'section', name: x.name, role: x.role, step, bars: x.bars, intensity: x.intensity });
    step += x.bars * spb;
  });
  const totalSteps = step;

  // Tiempo por paso (con ritardando opcional en el final y swing)
  const stepSec = 60 / plan.bpm / ctx.stepsPerBeat;
  const pad = spb * 4;
  const times = new Float64Array(totalSteps + pad + 1);
  const endMarker = markers.find((m) => m.role === 'ending');
  const rit = opts.loop ? 0 : (opts.rit ?? song.rit ?? 0);
  let ritComp = 1;
  if (rit && endMarker && opts.duration) {
    // compensar el ritardando para no pasarse de la duración pedida
    const n = endMarker.bars * spb;
    let extra = 0;
    for (let k = 0; k < n; k++) extra += rit * (k / n);
    ritComp = totalSteps / (totalSteps + extra);
  }
  for (let s = 0; s < totalSteps + pad; s++) {
    let d = stepSec * ritComp;
    if (rit && endMarker && s >= endMarker.step) d *= 1 + rit * ((s - endMarker.step) / (endMarker.bars * spb));
    times[s + 1] = times[s] + d;
  }
  const swing = opts.swing ?? song.swing ?? 0;
  const tAt = (s) => {
    const i = Math.max(0, Math.min(totalSteps + pad - 1, Math.floor(s)));
    const fr = s - i;
    let t = times[i] + fr * (times[i + 1] - times[i]);
    if (swing) {
      const pos = Math.round(s) % ctx.stepsPerBeat;
      if (ctx.stepsPerBeat === 4 && pos === 2) t += swing * stepSec;
      else if (ctx.stepsPerBeat === 4 && pos % 2 === 1) t += swing * stepSec * 0.5;
    }
    return t;
  };
  const out = {};
  for (const [v, list] of Object.entries(voices)) {
    out[v] = list.map((n) => {
      const time = tAt(n.step);
      const end = tAt(n.step + n.len);
      return { ...n, time, dur: Math.max(0.01, end - time - (n.drum ? 0 : 0.004)) };
    });
  }
  const musicEnd = times[totalSteps];
  for (const m of markers) m.time = tAt(m.step);
  const beatTimes = [];
  for (let s = 0; s < totalSteps; s += ctx.stepsPerBeat) beatTimes.push(+times[s].toFixed(4));
  return {
    voices: out, ctx, plan, bpm: plan.bpm, totalSteps, musicEnd,
    markers: markers.map(({ step: _s, ...m }) => ({ ...m, time: +m.time.toFixed(4) })),
    beats: beatTimes,
    barSec: stepSec * spb,
  };
}
