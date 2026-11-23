// Motor de efectos: capas paramétricas de una voz de chip.
// Cada capa: { wave, freq, slide, slideAccel, jumps, notes, vib, env, punch,
//   repeat, duty, dutySweep, tremolo, crush, lpf, hpf, stepped, at, gain, noise }
//  - freq: Hz (en ruido es la frecuencia de reloj del LFSR, ~200…450 000)
//  - slide: semitonos/s · slideAccel: semitonos/s² · minFreq corta la capa
//  - jumps: [[t, semitonos], …] saltos acumulativos (monedas, power-ups)
//  - notes: [[semitonos, dur], …] secuencia; retrigger:true reinicia la envolvente
//  - env: { a, h, d, curve } en segundos · punch 0..1 golpe inicial
//  - stepped: el tono avanza a 60 cuadros/s (barridos "escalonados" de consola)

import { SR, normalizeChannels, postFilter } from './synth.js';

const TRI = (() => {
  const t = new Float32Array(32);
  for (let i = 0; i < 32; i++) t[i] = (i < 16 ? 15 - i : i - 16) / 7.5 - 1;
  return t;
})();

function blep(t, dt) {
  if (t < dt) { t /= dt; return t + t - t * t - 1; }
  if (t > 1 - dt) { t = (t - 1) / dt; return t * t + t + t + 1; }
  return 0;
}

function layerLength(L) {
  if (L.notes) return L.notes.reduce((s, n) => s + n[1], 0) + (L.env?.d ?? 0.05);
  const e = L.env || {};
  return (e.a ?? 0) + (e.h ?? 0) + (e.d ?? 0.2);
}

function envAt(e, t, punch) {
  const a = e.a ?? 0;
  const h = e.h ?? 0;
  const d = e.d ?? 0.2;
  const curve = e.curve ?? 1;
  if (t < a) return t / a;
  if (t < a + h) {
    const p = punch ? 1 + punch * (1 - (t - a) / Math.max(1e-4, h)) : 1;
    return p;
  }
  const x = (t - a - h) / d;
  if (x >= 1) return 0;
  return Math.pow(1 - x, curve);
}

export function renderLayer(L, opts = {}) {
  const pitch = opts.pitch ?? 0;
  const speed = opts.speed ?? 1;
  const total = layerLength(L) / speed;
  const n = Math.max(1, Math.ceil(total * SR));
  const out = new Float32Array(n);
  const wave = L.wave ?? 'square';
  const env = L.env || {};
  const quant = L.quantize !== false;
  let phase = 0;
  let lfsr = 1;
  let acc = 0;
  let hold = 0;
  let holdCount = 0;
  const crushRate = L.crush?.rate ? SR / L.crush.rate : 0;
  const crushLevels = L.crush?.bits ? Math.pow(2, L.crush.bits - 1) : 0;
  const noteStarts = [];
  if (L.notes) {
    let t = 0;
    for (const [semi, d] of L.notes) { noteStarts.push([t / speed, (t + d) / speed, semi]); t += d; }
  }
  let alive = true;
  for (let i = 0; i < n && alive; i++) {
    const t = i / SR;
    const ts = t * speed;
    let tp = L.stepped ? Math.floor(ts * 60) / 60 : ts;
    if (L.repeat) tp %= L.repeat;
    let semis = pitch + (L.slide ?? 0) * tp + 0.5 * (L.slideAccel ?? 0) * tp * tp;
    if (L.jumps) for (const [jt, js] of L.jumps) if (ts >= jt) semis += js;
    if (L.vib) semis += L.vib.depth * Math.sin(2 * Math.PI * L.vib.rate * ts);
    let level;
    if (L.notes) {
      let cur = null;
      for (const ns of noteStarts) if (t >= ns[0]) cur = ns;
      if (!cur) cur = noteStarts[0];
      semis += cur[2] === null ? 0 : cur[2];
      const muted = cur[2] === null;
      const lt = L.retrigger ? (t - cur[0]) * speed : ts;
      const lastEnd = noteStarts[noteStarts.length - 1][1];
      if (t >= lastEnd) {
        level = Math.max(0, 1 - (t - lastEnd) * speed / (env.d ?? 0.05));
      } else {
        level = muted ? 0 : (L.retrigger ? envAt({ a: env.a ?? 0, h: 0, d: env.noteD ?? ((cur[1] - cur[0]) * speed), curve: env.curve }, lt, 0) : Math.min(1, (env.a ? ts / env.a : 1)));
      }
    } else {
      level = envAt(env, ts, L.punch);
    }
    if (L.tremolo) level *= 1 - L.tremolo.depth * (0.5 + 0.5 * Math.sin(2 * Math.PI * L.tremolo.rate * ts));
    if (quant) level = Math.round(level * 15) / 15;
    let f = (L.freq ?? 440) * Math.pow(2, semis / 12);
    if (L.minFreq && f < L.minFreq) { if (L.cutoff !== false) { alive = false; break; } f = L.minFreq; }
    if (L.maxFreq && f > L.maxFreq) f = L.maxFreq;
    let v;
    if (wave === 'noise') {
      const step = f / SR;
      const short = L.noise === 'short';
      acc += step;
      while (acc >= 1) {
        acc -= 1;
        const bit = (lfsr & 1) ^ ((lfsr >> (short ? 6 : 1)) & 1);
        lfsr = (lfsr >> 1) | (bit << 14);
      }
      v = lfsr & 1 ? -1 : 1;
    } else {
      const dt = Math.min(0.49, f / SR);
      if (wave === 'triangle') {
        v = TRI[(phase * 32) | 0];
      } else if (wave === 'saw') {
        v = 2 * phase - 1 - blep(phase, dt);
      } else if (wave === 'sine') {
        v = Math.sin(2 * Math.PI * phase);
      } else {
        let duty = (L.duty ?? 0.5) + (L.dutySweep ?? 0) * ts;
        duty = 0.05 + (((duty - 0.05) % 0.9) + 0.9) % 0.9;
        v = phase < duty ? 1 : -1;
        v += blep(phase, dt);
        let t2 = phase - duty;
        if (t2 < 0) t2 += 1;
        v -= blep(t2, dt);
      }
      phase += dt;
      if (phase >= 1) phase -= 1;
    }
    v *= level;
    if (crushLevels) v = Math.round(v * crushLevels) / crushLevels;
    if (crushRate) {
      if (holdCount <= 0) { hold = v; holdCount += crushRate; }
      holdCount -= 1;
      v = hold;
    }
    out[i] = v * (L.gain ?? 1);
  }
  if (L.lpf || L.hpf) {
    if (L.lpf) {
      const a = Math.exp((-2 * Math.PI * L.lpf) / SR);
      let y = 0;
      for (let i = 0; i < n; i++) { y = y * a + out[i] * (1 - a); out[i] = y; }
    }
    if (L.hpf) {
      const a = Math.exp((-2 * Math.PI * L.hpf) / SR);
      let x0 = 0;
      let y = 0;
      for (let i = 0; i < n; i++) { y = a * (y + out[i] - x0); x0 = out[i]; out[i] = y; }
    }
  }
  return out;
}

/** Renderiza un efecto compuesto de capas a [canal] (mono) o [L, R]. */
export function renderLayers(layers, opts = {}) {
  const speed = opts.speed ?? 1;
  const bufs = layers.map((L) => ({ L, buf: renderLayer(L, opts), off: Math.round(((L.at ?? 0) / speed) * SR) }));
  const len = bufs.reduce((m, b) => Math.max(m, b.off + b.buf.length), 0) + Math.round(0.01 * SR);
  const stereo = !!opts.stereo;
  const chans = stereo ? [new Float32Array(len), new Float32Array(len)] : [new Float32Array(len)];
  for (const { L, buf, off } of bufs) {
    const p = L.pan ?? 0;
    const a = ((p + 1) * Math.PI) / 4;
    const g = stereo ? [Math.cos(a) * Math.SQRT2, Math.sin(a) * Math.SQRT2] : [1];
    chans.forEach((c, ci) => { for (let i = 0; i < buf.length; i++) c[off + i] += buf[i] * g[ci]; });
  }
  for (const c of chans) postFilter(c, opts.tone ?? 'clean');
  normalizeChannels(chans, 1, opts.ceiling ?? 0.89);
  const vol = opts.volume ?? 1;
  if (vol !== 1) for (const c of chans) for (let i = 0; i < c.length; i++) c[i] *= vol;
  // micro-fundido final para evitar clics
  const fn = Math.min(len, Math.round(0.004 * SR));
  for (const c of chans) for (let i = 0; i < fn; i++) c[len - 1 - i] *= i / fn;
  return chans;
}
