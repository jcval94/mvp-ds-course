// Síntesis estilo consola de 8 bits.
// Voces: pulso (12.5/25/50/75 %), triángulo de 4 bits, ruido LFSR de 15 bits
// y diente de sierra (estilo chip de expansión). Las macros de instrumento
// (volumen, arpegio, tono, ciclo de trabajo) avanzan a 60 cuadros por segundo,
// como en los trackers clásicos, y el volumen se cuantiza a 16 niveles.

import { midiToHz } from './theory.js';

export const SR = 44100;
export const FRAME_HZ = 60;
const SPF = SR / FRAME_HZ;

const CPU_HZ = 1789773;
const NOISE_PERIODS = [4, 8, 16, 32, 64, 96, 128, 160, 202, 254, 380, 508, 762, 1016, 2034, 4068];

const TRI_STEPS = (() => {
  const t = new Float32Array(32);
  for (let i = 0; i < 32; i++) {
    const v = i < 16 ? 15 - i : i - 16;
    t[i] = v / 7.5 - 1;
  }
  return t;
})();

function polyBlep(t, dt) {
  if (t < dt) {
    t /= dt;
    return t + t - t * t - 1;
  }
  if (t > 1 - dt) {
    t = (t - 1) / dt;
    return t * t + t + t + 1;
  }
  return 0;
}

// Lee una macro {seq, loop}; sin loop se queda en el último valor.
export function seqAt(m, f) {
  if (!m) return undefined;
  const seq = Array.isArray(m) ? m : m.seq;
  const loop = Array.isArray(m) ? -1 : (m.loop ?? -1);
  if (f < seq.length) return seq[f];
  if (loop >= 0 && loop < seq.length) {
    const span = seq.length - loop;
    return seq[loop + ((f - loop) % span)];
  }
  return seq[seq.length - 1];
}

function noiseRate(p) {
  const c = Math.max(0, Math.min(15, p));
  const lo = Math.floor(c);
  const hi = Math.min(15, lo + 1);
  const fr = c - lo;
  const a = CPU_HZ / NOISE_PERIODS[lo];
  const b = CPU_HZ / NOISE_PERIODS[hi];
  return a * Math.pow(b / a, fr);
}

function envLevel(inst, f) {
  if (inst.volSeq) return seqAt(inst.volSeq, f) / 15;
  const e = inst.env || {};
  const a = e.a ?? 0;
  const d = e.d ?? 0;
  const s = e.s ?? 1;
  if (f < a) return (f + 1) / (a + 1);
  if (f < a + d) return 1 - (1 - s) * ((f - a + 1) / d);
  return s;
}

/**
 * Renderiza una voz monofónica.
 * notes: [{time, dur, midi, vel, inst, arpChord?, slideFrom?, slideFrames?}]
 * Una nota nueva corta la anterior (como un canal real de consola).
 */
export function renderVoice(notes, totalSamples, out = new Float32Array(totalSamples)) {
  const sorted = [...notes].sort((a, b) => a.time - b.time);
  let phase = 0;
  let lfsr = 1;
  let noiseAcc = 0;

  for (let n = 0; n < sorted.length; n++) {
    const note = sorted[n];
    const inst = note.inst;
    if (!Number.isFinite(note.time) || !Number.isFinite(note.dur)) continue;
    const startS = Math.round(note.time * SR);
    if (startS >= totalSamples) continue;
    const gateEnd = startS + Math.max(1, Math.round(note.dur * SR));
    const next = n + 1 < sorted.length ? Math.round(sorted[n + 1].time * SR) : Infinity;
    const relFrames = inst.env?.r ?? 2;
    const endS = Math.min(gateEnd + Math.round(relFrames * SPF), next, totalSamples);
    const vel = note.vel ?? 1;
    const peak = inst.vol ?? 15;
    const wave = inst.wave;
    const quant = inst.quantize !== false;
    let gateLevel = 0;
    let gateFrame = -1;

    for (let f = 0; ; f++) {
      const fs = startS + Math.round(f * SPF);
      if (fs >= endS) break;
      const fe = Math.min(startS + Math.round((f + 1) * SPF), endS);
      const gate = fs < gateEnd;

      let level;
      if (gate) {
        level = envLevel(inst, f);
        gateLevel = level;
      } else {
        if (gateFrame < 0) gateFrame = f;
        const k = (f - gateFrame + 1) / (relFrames + 1);
        level = gateLevel * Math.max(0, 1 - k);
      }
      let vol = level * peak * vel;
      if (quant) vol = Math.round(vol);
      vol = Math.max(0, Math.min(15, vol));
      const amp = vol / 15;

      let pitch = note.midi ?? 60;
      if (note.arpChord) pitch += note.arpChord[Math.floor(f / (inst.arpRate ?? 1)) % note.arpChord.length];
      if (inst.arp) pitch += seqAt(inst.arp, f);
      if (inst.pitchSeq) pitch += seqAt(inst.pitchSeq, f);
      if (inst.sweep) pitch += inst.sweep * f;
      if (inst.vib && f >= (inst.vib.delay ?? 0)) {
        pitch += inst.vib.depth * Math.sin((2 * Math.PI * inst.vib.rate * (f - (inst.vib.delay ?? 0))) / FRAME_HZ);
      }
      if (note.slideFrom !== undefined) {
        const sf = note.slideFrames ?? 4;
        if (f < sf) pitch += (note.slideFrom - (note.midi ?? 60)) * (1 - (f + 1) / (sf + 1));
      }
      if (note.bend) pitch += note.bend * Math.min(1, f / Math.max(1, (note.dur * FRAME_HZ)));

      const duty = inst.dutySeq ? seqAt(inst.dutySeq, f) : (inst.duty ?? 0.5);

      if (wave === 'noise') {
        let p = inst.noise?.periodSeq !== undefined ? seqAt(inst.noise.periodSeq, f) : (note.noisePeriod ?? 8);
        if (note.noiseShift) p += note.noiseShift;
        const step = noiseRate(p) / SR;
        const short = (inst.noise?.mode ?? 'long') === 'short';
        for (let i = fs; i < fe; i++) {
          noiseAcc += step;
          while (noiseAcc >= 1) {
            noiseAcc -= 1;
            const bit = (lfsr & 1) ^ ((lfsr >> (short ? 6 : 1)) & 1);
            lfsr = (lfsr >> 1) | (bit << 14);
          }
          out[i] += (lfsr & 1 ? -1 : 1) * amp;
        }
        continue;
      }

      const dt = midiToHz(pitch) / SR;
      if (wave === 'triangle') {
        for (let i = fs; i < fe; i++) {
          out[i] += TRI_STEPS[(phase * 32) | 0] * amp;
          phase += dt;
          if (phase >= 1) phase -= 1;
        }
      } else if (wave === 'saw') {
        for (let i = fs; i < fe; i++) {
          out[i] += (2 * phase - 1 - polyBlep(phase, dt)) * amp;
          phase += dt;
          if (phase >= 1) phase -= 1;
        }
      } else {
        for (let i = fs; i < fe; i++) {
          let v = phase < duty ? 1 : -1;
          v += polyBlep(phase, dt);
          let t2 = phase - duty;
          if (t2 < 0) t2 += 1;
          v -= polyBlep(t2, dt);
          out[i] += v * amp;
          phase += dt;
          if (phase >= 1) phase -= 1;
        }
      }
    }
  }
  return out;
}

const DEFAULT_PAN = { lead: -0.15, harm: 0.35, echo: -0.4, bass: 0, drum: 0.12, kick: 0 };

/**
 * Mezcla voces en mono o estéreo con filtros de salida y normalización.
 * voices: [{name, buf, gain, pan?}]
 */
export function mixVoices(voices, { stereo = false, normalize = true, targetRms = 0.16, ceiling = 0.89, tone = 'clean', gain = 1 } = {}) {
  const len = voices.reduce((m, v) => Math.max(m, v.buf.length), 0);
  const L = new Float32Array(len);
  const R = stereo ? new Float32Array(len) : null;
  for (const v of voices) {
    const g = v.gain ?? 1;
    if (stereo) {
      const p = v.pan ?? DEFAULT_PAN[v.name] ?? 0;
      const a = ((p + 1) * Math.PI) / 4;
      const gl = Math.cos(a) * Math.SQRT2 * g;
      const gr = Math.sin(a) * Math.SQRT2 * g;
      for (let i = 0; i < v.buf.length; i++) {
        L[i] += v.buf[i] * gl;
        R[i] += v.buf[i] * gr;
      }
    } else {
      for (let i = 0; i < v.buf.length; i++) L[i] += v.buf[i] * g;
    }
  }
  const chans = stereo ? [L, R] : [L];
  for (const c of chans) postFilter(c, tone);
  if (normalize) normalizeChannels(chans, targetRms, ceiling);
  if (gain !== 1) for (const c of chans) for (let i = 0; i < c.length; i++) c[i] *= gain;
  return chans;
}

// Paso alto ~30 Hz (quita DC) y paso bajo según el "tono":
// clean ≈ 16 kHz, tv ≈ 7 kHz (altavoz de televisor), radio ≈ 3.2 kHz.
export function postFilter(buf, tone = 'clean') {
  const hpA = Math.exp((-2 * Math.PI * 30) / SR);
  let hpX = 0;
  let hpY = 0;
  const cut = tone === 'radio' ? 3200 : tone === 'tv' ? 7000 : 16000;
  const lpA = Math.exp((-2 * Math.PI * cut) / SR);
  let lp = 0;
  for (let i = 0; i < buf.length; i++) {
    const x = buf[i];
    hpY = hpA * (hpY + x - hpX);
    hpX = x;
    lp = lp * lpA + hpY * (1 - lpA);
    buf[i] = lp;
  }
  if (tone === 'radio') {
    let hx = 0;
    let hy = 0;
    const a = Math.exp((-2 * Math.PI * 300) / SR);
    for (let i = 0; i < buf.length; i++) {
      hy = a * (hy + buf[i] - hx);
      hx = buf[i];
      buf[i] = hy * 1.6;
    }
  }
}

export function normalizeChannels(chans, targetRms = 0.16, ceiling = 0.89) {
  let sum = 0;
  let n = 0;
  let peak = 0;
  for (const c of chans) {
    for (let i = 0; i < c.length; i++) {
      sum += c[i] * c[i];
      const a = Math.abs(c[i]);
      if (a > peak) peak = a;
    }
    n += c.length;
  }
  const rms = Math.sqrt(sum / Math.max(1, n));
  if (rms < 1e-6) return 1;
  let g = targetRms / rms;
  if (peak * g > ceiling) g = ceiling / peak;
  for (const c of chans) for (let i = 0; i < c.length; i++) c[i] *= g;
  return g;
}

export function fadeOut(chans, seconds) {
  const n = Math.round(seconds * SR);
  for (const c of chans) {
    const s = Math.max(0, c.length - n);
    for (let i = s; i < c.length; i++) c[i] *= (c.length - i) / n;
  }
}

export function fadeIn(chans, seconds) {
  const n = Math.round(seconds * SR);
  for (const c of chans) for (let i = 0; i < Math.min(n, c.length); i++) c[i] *= i / n;
}
