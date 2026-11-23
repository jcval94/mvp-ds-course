// Reproductor para navegador (Web Audio). Sintetiza en vivo: no necesita archivos.
//
//   import { ChipAudio } from 'sonido-8bits/player';
//   const audio = new ChipAudio();
//   await audio.unlock();                       // tras un clic del usuario
//   audio.music('laboratorio-de-datos', { duration: 12, curve: 'build' });
//   audio.sfx('coin');                          // variación aleatoria automática
//   audio.duck(0.3);                            // bajar la música mientras alguien habla
//   audio.situation('acierto');
//   audio.on('section', (m) => …);              // marcas de sección para sincronizar animaciones

import { renderSong, renderSfx, forSituation, toWav } from '../index.js';

export class ChipAudio {
  constructor({ volume = 0.8, musicVolume = 0.8, sfxVolume = 0.9 } = {}) {
    this.ctx = null;
    this.cache = new Map();
    this.listeners = {};
    this.current = null;
    this.timers = [];
    this.vol = { master: volume, music: musicVolume, sfx: sfxVolume };
    this.reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  async unlock() {
    if (!this.ctx) {
      const AC = globalThis.AudioContext || globalThis.webkitAudioContext;
      this.ctx = new AC({ sampleRate: 44100 });
      this.master = this.ctx.createGain();
      this.musicBus = this.ctx.createGain();
      this.sfxBus = this.ctx.createGain();
      this.musicBus.connect(this.master);
      this.sfxBus.connect(this.master);
      this.master.connect(this.ctx.destination);
      this.setVolume();
    }
    if (this.ctx.state === 'suspended') await this.ctx.resume();
    return this;
  }

  setVolume({ master, music, sfx } = {}) {
    Object.assign(this.vol, Object.fromEntries(Object.entries({ master, music, sfx }).filter(([, v]) => v !== undefined)));
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.vol.master, t, 0.02);
    this.musicBus.gain.setTargetAtTime(this.vol.music, t, 0.02);
    this.sfxBus.gain.setTargetAtTime(this.vol.sfx, t, 0.02);
  }

  on(evt, fn) { (this.listeners[evt] ||= []).push(fn); return () => this.off(evt, fn); }
  off(evt, fn) { this.listeners[evt] = (this.listeners[evt] || []).filter((f) => f !== fn); }
  emit(evt, data) { for (const f of this.listeners[evt] || []) f(data); }

  buffer(result) {
    const b = this.ctx.createBuffer(result.channels.length, result.channels[0].length, result.sampleRate);
    result.channels.forEach((c, i) => b.copyToChannel(c, i));
    return b;
  }

  /** Renderiza (con caché) sin reproducir. Útil para preparar antes de una escena. */
  prepare(id, opts = {}) {
    const key = `song:${id}:${JSON.stringify(opts)}`;
    if (!this.cache.has(key)) this.cache.set(key, renderSong(id, opts));
    return this.cache.get(key);
  }

  /** Reproduce música. Devuelve { result, stop, startedAt }. */
  music(id, opts = {}, { when = 0, fade = 0.4 } = {}) {
    this.stopMusic(fade);
    const result = this.prepare(id, opts);
    const src = this.ctx.createBufferSource();
    src.buffer = this.buffer(result);
    const g = this.ctx.createGain();
    src.connect(g).connect(this.musicBus);
    const at = this.ctx.currentTime + when;
    if (opts.loop) src.loop = true;
    g.gain.setValueAtTime(opts.fadeIn ? 0 : 1, at);
    if (opts.fadeIn) g.gain.linearRampToValueAtTime(1, at + opts.fadeIn);
    src.start(at);
    const handle = { result, src, gain: g, startedAt: at, stop: (f = fade) => this.stopMusic(f, handle) };
    this.current = handle;
    this.scheduleMarkers(result, when);
    src.onended = () => { if (this.current === handle) { this.current = null; this.emit('end', result); } };
    return handle;
  }

  scheduleMarkers(result, offset) {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    for (const m of result.markers) this.timers.push(setTimeout(() => this.emit('section', m), (offset + m.time) * 1000));
    if (this.listeners.beat?.length) result.beats.forEach((t, i) => this.timers.push(setTimeout(() => this.emit('beat', { index: i, time: t }), (offset + t) * 1000)));
  }

  stopMusic(fade = 0.4, handle = this.current) {
    if (!handle || !this.ctx) return;
    const t = this.ctx.currentTime;
    handle.gain.gain.cancelScheduledValues(t);
    handle.gain.gain.setValueAtTime(handle.gain.gain.value, t);
    handle.gain.gain.linearRampToValueAtTime(0, t + fade);
    handle.src.stop(t + fade + 0.02);
    if (handle === this.current) { this.current = null; this.timers.forEach(clearTimeout); this.timers = []; }
  }

  /** Efecto. Sin `variation` elige una al azar para que no suene repetido. */
  sfx(id, opts = {}, { when = 0, gain = 1 } = {}) {
    const variation = opts.variation ?? Math.floor(Math.random() * 6);
    const key = `sfx:${id}:${variation}:${JSON.stringify(opts)}`;
    if (!this.cache.has(key)) this.cache.set(key, renderSfx(id, { ...opts, variation }));
    const src = this.ctx.createBufferSource();
    src.buffer = this.buffer(this.cache.get(key));
    const g = this.ctx.createGain();
    g.gain.value = gain;
    src.connect(g).connect(this.sfxBus);
    src.start(this.ctx.currentTime + when);
    return src;
  }

  /** Voz de diálogo: un blip por letra visible (omite espacios y signos). */
  speak(text, { voice = 'voice-mid', cps = 22, every = 2 } = {}) {
    let k = 0;
    [...text].forEach((ch, i) => {
      if (/[\p{L}\p{N}]/u.test(ch) && (k++ % every === 0)) this.sfx(voice, {}, { when: i / cps, gain: 0.6 });
    });
    return text.length / cps;
  }

  /** Baja la música (p. ej. bajo narración) y la devuelve con duck(1). */
  duck(level = 0.3, time = 0.25) {
    if (!this.ctx) return;
    this.musicBus.gain.setTargetAtTime(this.vol.music * level, this.ctx.currentTime, time / 3);
  }

  situation(name, opts = {}) {
    const r = forSituation(name, opts);
    if (r.song) {
      const key = `song:${r.song.id}:${JSON.stringify(r.song.options)}`;
      this.cache.set(key, r.song);
      return this.music(r.song.id, r.song.options);
    }
    return null;
  }

  /** Descarga un render como .wav (para usarlo en un editor). */
  download(result, filename = `${result.id}.wav`) {
    const blob = new Blob([toWav(result)], { type: 'audio/wav' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  }
}
