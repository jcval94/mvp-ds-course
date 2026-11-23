// Instrumentos: macros a 60 cuadros/s. env {a, d, s, r} en cuadros (s = 0..1).
// volSeq / arp / pitchSeq / dutySeq aceptan {seq, loop}.

export const INSTRUMENTS = {
  // ── Melodía ─────────────────────────────────────────────
  'lead.square': { wave: 'pulse', duty: 0.5, vol: 13, env: { a: 0, d: 8, s: 0.75, r: 5 }, vib: { depth: 0.18, rate: 6, delay: 14 } },
  'lead.bright': { wave: 'pulse', duty: 0.25, vol: 13, env: { a: 0, d: 10, s: 0.8, r: 6 }, vib: { depth: 0.2, rate: 5.5, delay: 12 } },
  'lead.thin': { wave: 'pulse', duty: 0.125, vol: 13, env: { a: 0, d: 8, s: 0.7, r: 5 }, vib: { depth: 0.15, rate: 6, delay: 12 } },
  'lead.soft': { wave: 'pulse', duty: 0.5, vol: 11, env: { a: 3, d: 12, s: 0.6, r: 12 }, vib: { depth: 0.22, rate: 5, delay: 10 } },
  'lead.pluck': { wave: 'pulse', duty: 0.25, vol: 14, env: { a: 0, d: 18, s: 0, r: 2 } },
  'lead.staccato': { wave: 'pulse', duty: 0.125, vol: 14, env: { a: 0, d: 7, s: 0.15, r: 2 } },
  'lead.morph': { wave: 'pulse', dutySeq: { seq: [0.125, 0.125, 0.25, 0.25, 0.5, 0.5, 0.25, 0.25], loop: 0 }, vol: 13, env: { a: 0, d: 10, s: 0.75, r: 6 }, vib: { depth: 0.2, rate: 5.5, delay: 16 } },
  'lead.saw': { wave: 'saw', vol: 12, env: { a: 0, d: 10, s: 0.7, r: 6 }, vib: { depth: 0.2, rate: 5.5, delay: 12 } },
  'lead.flute': { wave: 'triangle', vol: 15, env: { a: 2, d: 0, s: 1, r: 6 }, vib: { depth: 0.25, rate: 5, delay: 8 } },
  'lead.chime': { wave: 'pulse', duty: 0.125, vol: 13, env: { a: 0, d: 30, s: 0, r: 4 }, arp: { seq: [0, 12, 0], loop: 2 } },
  'lead.trill': { wave: 'pulse', duty: 0.25, vol: 12, env: { a: 0, d: 10, s: 0.7, r: 5 }, arp: { seq: [0, 0, 2, 2], loop: 0 } },
  'lead.wah': { wave: 'pulse', dutySeq: { seq: [0.5, 0.5, 0.25, 0.25, 0.125, 0.125, 0.125], loop: 6 }, vol: 13, env: { a: 0, d: 14, s: 0.6, r: 6 }, vib: { depth: 0.3, rate: 6.5, delay: 6 } },
  'lead.ghost': { wave: 'pulse', duty: 0.125, vol: 9, env: { a: 6, d: 0, s: 1, r: 18 }, vib: { depth: 0.35, rate: 4, delay: 0 } },

  // ── Armonía ─────────────────────────────────────────────
  'harm.pad': { wave: 'pulse', duty: 0.5, vol: 7, env: { a: 2, d: 10, s: 0.75, r: 8 }, arpRate: 1 },
  'harm.padSoft': { wave: 'pulse', duty: 0.125, vol: 6, env: { a: 6, d: 0, s: 1, r: 14 }, arpRate: 2 },
  'harm.soft': { wave: 'pulse', duty: 0.25, vol: 8, env: { a: 1, d: 10, s: 0.5, r: 6 } },
  'harm.pluck': { wave: 'pulse', duty: 0.125, vol: 9, env: { a: 0, d: 10, s: 0, r: 2 } },
  'harm.stab': { wave: 'pulse', duty: 0.25, vol: 9, env: { a: 0, d: 6, s: 0.2, r: 2 }, arpRate: 1 },
  'harm.bell': { wave: 'pulse', duty: 0.125, vol: 9, env: { a: 0, d: 24, s: 0, r: 4 } },
  'harm.echo': { wave: 'pulse', duty: 0.25, vol: 6, env: { a: 0, d: 10, s: 0.7, r: 6 }, vib: { depth: 0.2, rate: 5.5, delay: 12 } },
  'harm.organ': { wave: 'pulse', duty: 0.5, vol: 7, env: { a: 0, d: 0, s: 1, r: 4 }, arpRate: 1 },
  'harm.saw': { wave: 'saw', vol: 6, env: { a: 2, d: 12, s: 0.6, r: 8 }, arpRate: 1 },

  // ── Bajo ────────────────────────────────────────────────
  'bass.tri': { wave: 'triangle', vol: 15, env: { a: 0, d: 0, s: 1, r: 1 } },
  'bass.triShort': { wave: 'triangle', vol: 15, env: { a: 0, d: 6, s: 0, r: 1 } },
  'bass.pulse': { wave: 'pulse', duty: 0.5, vol: 11, env: { a: 0, d: 6, s: 0.7, r: 2 } },
  'bass.slap': { wave: 'triangle', vol: 15, env: { a: 0, d: 8, s: 0.4, r: 1 }, pitchSeq: { seq: [12, 5, 0] } },
  'bass.saw': { wave: 'saw', vol: 10, env: { a: 0, d: 8, s: 0.6, r: 2 } },

  // ── Percusión ───────────────────────────────────────────
  'drum.kick': { wave: 'triangle', vol: 15, quantize: false, env: { a: 0, d: 7, s: 0, r: 0 }, pitchSeq: { seq: [0, -6, -12, -17, -22, -26, -30, -33] } },
  'drum.kickNoise': { wave: 'noise', vol: 9, noise: { periodSeq: { seq: [12, 13, 14] } }, env: { a: 0, d: 4, s: 0, r: 0 } },
  'drum.snare': { wave: 'noise', vol: 13, noise: { periodSeq: { seq: [5, 6, 6, 7, 7, 7] } }, volSeq: [15, 13, 11, 9, 8, 6, 5, 4, 3, 2, 1, 0] },
  'drum.snareTight': { wave: 'noise', vol: 13, noise: { periodSeq: { seq: [4, 5, 5, 6] } }, volSeq: [15, 11, 8, 5, 3, 1, 0] },
  'drum.ghost': { wave: 'noise', vol: 6, noise: { periodSeq: { seq: [5, 6] } }, volSeq: [15, 9, 4, 0] },
  'drum.hat': { wave: 'noise', vol: 8, noise: { periodSeq: { seq: [0] } }, volSeq: [15, 9, 4, 0] },
  'drum.hatOpen': { wave: 'noise', vol: 8, noise: { periodSeq: { seq: [0] } }, volSeq: [15, 13, 12, 10, 9, 8, 6, 5, 4, 3, 2, 1, 0] },
  'drum.hatMetal': { wave: 'noise', vol: 7, noise: { mode: 'short', periodSeq: { seq: [1] } }, volSeq: [15, 8, 3, 0] },
  'drum.crash': { wave: 'noise', vol: 11, noise: { periodSeq: { seq: [2, 2, 3] } }, volSeq: { seq: [15, 14, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 1, 1, 1, 0] } },
  'drum.tomHi': { wave: 'noise', vol: 12, noise: { periodSeq: { seq: [8, 9, 10, 10] } }, volSeq: [15, 12, 9, 6, 4, 2, 0] },
  'drum.tomLo': { wave: 'noise', vol: 12, noise: { periodSeq: { seq: [10, 11, 12, 12] } }, volSeq: [15, 13, 10, 7, 5, 3, 1, 0] },
  'drum.clap': { wave: 'noise', vol: 12, noise: { periodSeq: { seq: [4] } }, volSeq: [15, 3, 14, 3, 12, 9, 6, 4, 2, 0] },
  'drum.shaker': { wave: 'noise', vol: 6, noise: { periodSeq: { seq: [1] } }, volSeq: [6, 12, 9, 5, 2, 0] },
  'drum.wood': { wave: 'pulse', duty: 0.5, vol: 10, env: { a: 0, d: 3, s: 0, r: 0 }, pitchSeq: { seq: [0, -2, -4] } },
  'drum.cowbell': { wave: 'pulse', duty: 0.25, vol: 9, env: { a: 0, d: 10, s: 0, r: 0 }, arp: { seq: [0, 7], loop: 0 } },
};

export function instrument(name) {
  const i = INSTRUMENTS[name];
  if (!i) throw new Error(`Instrumento desconocido: ${name}`);
  return i;
}

// Qué instrumento suena para cada golpe de batería y en qué voz.
export const DRUM_MAP = {
  k: [{ voice: 'kick', inst: 'drum.kick', midi: 60 }, { voice: 'drum', inst: 'drum.kickNoise' }],
  s: [{ voice: 'drum', inst: 'drum.snare' }],
  S: [{ voice: 'drum', inst: 'drum.snareTight' }],
  g: [{ voice: 'drum', inst: 'drum.ghost' }],
  h: [{ voice: 'drum', inst: 'drum.hat' }],
  o: [{ voice: 'drum', inst: 'drum.hatOpen' }],
  m: [{ voice: 'drum', inst: 'drum.hatMetal' }],
  c: [{ voice: 'drum', inst: 'drum.crash' }, { voice: 'kick', inst: 'drum.kick', midi: 60 }],
  t: [{ voice: 'drum', inst: 'drum.tomHi' }],
  T: [{ voice: 'drum', inst: 'drum.tomLo' }],
  p: [{ voice: 'drum', inst: 'drum.clap' }],
  z: [{ voice: 'drum', inst: 'drum.shaker' }],
  w: [{ voice: 'kick', inst: 'drum.wood', midi: 84 }],
  b: [{ voice: 'kick', inst: 'drum.cowbell', midi: 80 }],
};
