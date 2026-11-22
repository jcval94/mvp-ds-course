// API pública de sonido-8bits. Funciona igual en Node y en navegador.
//
//   renderSong('amanecer-heroico', { duration: 12, intensity: 3, mood: 'oscuro' })
//   renderSfx('coin', { variation: 3, pitch: 2 })
//   forSituation('intro-caso', { duration: 10 })
//   toWav(result)  → Uint8Array con el archivo .wav

import { SR, renderVoice, mixVoices, postFilter, normalizeChannels, fadeIn, fadeOut } from './core/synth.js';
import { sequenceSong, rng } from './core/sequencer.js';
import { renderLayers } from './core/sfx.js';
import { encodeWav } from './core/wav.js';
import { MODES, MODE_LABELS } from './core/theory.js';
import { INSTRUMENTS } from './library/instruments.js';
import { SFX, SFX_LIST, SFX_CATEGORIES } from './library/sfx-presets.js';
import { MOODS, SITUATIONS, applyMood } from './library/situations.js';
import songs1 from './library/songs-1.js';
import songs2 from './library/songs-2.js';
import songs3 from './library/songs-3.js';
import jingles from './library/jingles.js';

export { SR, MODES, MODE_LABELS, INSTRUMENTS, MOODS, SITUATIONS, SFX_CATEGORIES };

export const SONG_CATEGORIES = {
  apertura: 'Aperturas e intros', aventura: 'Aventura y exploración', misterio: 'Misterio e investigación',
  accion: 'Acción', tension: 'Tensión y peligro', calma: 'Calma y reflexión', datos: 'Tecnología y datos',
  victoria: 'Celebración', triste: 'Tristeza y nostalgia', humor: 'Humor', latino: 'Sabor latino',
  cierre: 'Cierres y créditos', jingle: 'Jingles y remates',
};

export const SONGS = [...songs1, ...songs2, ...songs3, ...jingles];
const BY_ID = Object.fromEntries(SONGS.map((s) => [s.id, s]));

export const VOICE_GAIN = { lead: 0.26, harm: 0.17, echo: 0.12, bass: 0.34, drum: 0.2, kick: 0.36 };

export function getSong(id) {
  const s = typeof id === 'object' ? id : BY_ID[id];
  if (!s) throw new Error(`Canción desconocida: ${id}`);
  return s;
}

export function listSongs({ category, tag, search } = {}) {
  const q = search?.toLowerCase();
  return SONGS.filter((s) => (!category || s.category === category)
    && (!tag || s.tags?.includes(tag))
    && (!q || `${s.id} ${s.title} ${s.desc} ${(s.tags || []).join(' ')}`.toLowerCase().includes(q)))
    .map(songMeta);
}

export function songMeta(s) {
  return {
    id: s.id, title: s.title, category: s.category, tags: s.tags || [], desc: s.desc || '',
    bpm: s.bpm, key: s.key, mode: s.mode, meter: (s.stepsPerBeat ?? 4) === 6 ? '6/8' : `${s.beats ?? 4}/4`,
    jingle: s.type === 'jingle',
  };
}

export function listSfx({ category, search } = {}) {
  const q = search?.toLowerCase();
  return SFX_LIST.filter((p) => (!category || p.category === category)
    && (!q || `${p.id} ${p.desc} ${p.tags.join(' ')}`.toLowerCase().includes(q)))
    .map(({ id, category: c, desc, tags }) => ({ id, category: c, desc, tags }));
}

/**
 * Renderiza una canción.
 * opts:
 *  duration   segundos exactos (ajusta tempo y número de compases; termina en cadencia)
 *  loop       true → solo el cuerpo, sin intro ni final, con cola envuelta (bucle perfecto)
 *  loops      cuántas vueltas del cuerpo en modo bucle (1)
 *  intensity  0 (mínima) … 3 (máxima: eco, rellenos, platillos)
 *  curve      'auto' | 'flat' | 'build' | 'peak' | 'calm'
 *  mood       ver MOODS (heroico, oscuro, misterioso, tenso, triste, tierno, épico…)
 *  key, mode, transpose, tempo (multiplicador), bpm, swing
 *  mix        'full' | 'underscore' (melodía baja, para narración) | 'nolead'
 *  inst       { lead, harm, bass, echo } instrumentos alternativos
 *  tone       'clean' | 'tv' | 'radio'
 *  stereo     true para paneo suave por voz
 *  stems      true → devuelve también cada voz por separado (misma ganancia que la mezcla)
 *  fadeIn, fadeOut  segundos
 *  intro/ending false para omitirlos
 */
export function renderSong(idOrSong, options = {}) {
  const song = getSong(idOrSong);
  const opts = applyMood(song, options);
  const seq = sequenceSong(song, opts);
  const tail = opts.loop ? 0 : 0.6;
  const musicLen = opts.duration ?? seq.musicEnd + tail;
  const extra = opts.loop ? 1.5 : 0;
  const n = Math.max(1, Math.round((opts.loop ? seq.musicEnd : musicLen) * SR));
  const renderN = n + Math.round(extra * SR);

  const voices = [];
  for (const [name, notes] of Object.entries(seq.voices)) {
    if (!notes.length) continue;
    let buf = renderVoice(notes, renderN);
    if (opts.loop) {
      const w = new Float32Array(n);
      w.set(buf.subarray(0, n));
      for (let i = n; i < renderN; i++) w[i - n] += buf[i];
      buf = w;
    } else if (buf.length > n) {
      buf = buf.slice(0, n);
    }
    voices.push({ name, buf, gain: (opts.gains?.[name] ?? VOICE_GAIN[name]) * (opts.mix === 'underscore' && name === 'drum' ? 0.6 : 1) });
  }

  const stereo = !!opts.stereo;
  const master = mixVoices(voices, { stereo, normalize: false, tone: opts.tone ?? 'clean' });
  const gain = normalizeChannels(master, opts.targetRms ?? (opts.mix === 'underscore' ? 0.1 : 0.16), 0.89);
  if (opts.volume) for (const c of master) for (let i = 0; i < c.length; i++) c[i] *= opts.volume;
  if (!opts.loop) {
    fadeOut(master, opts.fadeOut ?? (opts.duration ? 0.05 : 0.25));
    if (opts.fadeIn) fadeIn(master, opts.fadeIn);
  }

  let stems;
  if (opts.stems) {
    stems = {};
    for (const v of voices) {
      const s = mixVoices([v], { stereo, normalize: false, tone: opts.tone ?? 'clean' });
      for (const c of s) for (let i = 0; i < c.length; i++) c[i] *= gain * (opts.volume ?? 1);
      if (!opts.loop) fadeOut(s, opts.fadeOut ?? (opts.duration ? 0.05 : 0.25));
      stems[v.name] = s;
    }
  }

  return {
    kind: 'song', id: song.id, title: song.title,
    channels: master, sampleRate: SR, duration: master[0].length / SR, stems,
    bpm: +seq.bpm.toFixed(2), key: seq.ctx.key, mode: seq.ctx.mode,
    markers: seq.markers, beats: seq.beats, barSeconds: +seq.barSec.toFixed(4),
    loop: !!opts.loop, options: opts,
  };
}

/**
 * Renderiza un efecto. opts: variation (semilla), pitch (semitonos), speed,
 * volume, tone, stereo.
 */
export function renderSfx(id, opts = {}) {
  const p = SFX[id];
  if (!p) throw new Error(`Efecto desconocido: ${id}`);
  const r = rng(1 + (opts.variation ?? 0) * 7919 + hash(id));
  const amt = opts.variation ? 1 : 0;
  const j = (x, pct) => x * (1 + (r() * 2 - 1) * pct * amt);
  const layers = p.build(r, j);
  const chans = renderLayers(layers, opts);
  return { kind: 'sfx', id, channels: chans, sampleRate: SR, duration: chans[0].length / SR, options: opts };
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h) % 100000;
}

/** Elige y renderiza la música de una situación (ver SITUATIONS). */
export function forSituation(name, opts = {}) {
  const sit = SITUATIONS[name];
  if (!sit) throw new Error(`Situación desconocida: ${name}`);
  const songId = opts.song ?? sit.song;
  const merged = { ...(sit.opts || {}), ...opts };
  if (merged.duration === undefined && sit.duration) merged.duration = sit.duration;
  if (merged.loop) delete merged.duration;
  const song = songId ? renderSong(songId, merged) : null;
  return { situation: name, label: sit.label, song, sfx: sit.sfx, alternatives: sit.alt };
}

export function toWav(result) {
  return encodeWav(result.channels, result.sampleRate ?? SR);
}

/** Sitúa efectos sobre una pista: cues = [{ sfx, at, ...opts }]. Devuelve canales mezclados. */
export function layerCues(base, cues, { sfxGain = 0.8 } = {}) {
  const chans = base.channels.map((c) => Float32Array.from(c));
  for (const cue of cues) {
    const fx = renderSfx(cue.sfx, cue);
    const off = Math.round(cue.at * SR);
    chans.forEach((c, ci) => {
      const src = fx.channels[Math.min(ci, fx.channels.length - 1)];
      for (let i = 0; i < src.length && off + i < c.length; i++) c[off + i] += src[i] * sfxGain * (cue.gain ?? 1);
    });
  }
  let peak = 0;
  for (const c of chans) for (const v of c) peak = Math.max(peak, Math.abs(v));
  if (peak > 0.95) for (const c of chans) for (let i = 0; i < c.length; i++) c[i] *= 0.95 / peak;
  return { ...base, channels: chans };
}

export { postFilter };
