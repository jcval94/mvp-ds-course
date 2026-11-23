// Teoría musical mínima: tonalidades, modos, grados y acordes.
// Todo el catálogo se escribe en grados de escala, así que cambiar
// tonalidad o modo (mayor → menor) transforma la pieza completa.

export const PITCH_CLASS = {
  C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6,
  G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11,
};

export const MODES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixolydian: [0, 2, 4, 5, 7, 9, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  melodicMinor: [0, 2, 3, 5, 7, 9, 11],
  phrygianDominant: [0, 1, 4, 5, 7, 8, 10],
  wholeTone: [0, 2, 4, 6, 8, 10, 12],
};

export const MODE_LABELS = {
  major: 'Mayor', minor: 'Menor', dorian: 'Dórico', phrygian: 'Frigio',
  lydian: 'Lidio', mixolydian: 'Mixolidio', locrian: 'Locrio',
  harmonicMinor: 'Menor armónica', melodicMinor: 'Menor melódica',
  phrygianDominant: 'Frigio dominante', wholeTone: 'Tonos enteros',
};

const QUALITIES = {
  M: [0, 4, 7], m: [0, 3, 7], dim: [0, 3, 6], aug: [0, 4, 8],
  7: [0, 4, 7, 10], M7: [0, 4, 7, 11], m7: [0, 3, 7, 10], dim7: [0, 3, 6, 9],
  m7b5: [0, 3, 6, 10], sus2: [0, 2, 7], sus4: [0, 5, 7], 5: [0, 7, 12],
  add9: [0, 4, 7, 14], madd9: [0, 3, 7, 14], 6: [0, 4, 7, 9], m6: [0, 3, 7, 9],
};

export function pitchClass(key) {
  const pc = PITCH_CLASS[key];
  if (pc === undefined) throw new Error(`Tonalidad desconocida: ${key}`);
  return pc;
}

export function midiFor(pc, octave) {
  return 12 * (octave + 1) + pc;
}

export function midiToHz(m) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

export function scaleOf(mode) {
  const s = MODES[mode];
  if (!s) throw new Error(`Modo desconocido: ${mode}`);
  return s;
}

// Grado (1..7, admite >7 y <1) a semitonos desde la tónica.
export function degreeSemis(deg, scale) {
  const idx = deg - 1;
  const oct = Math.floor(idx / 7);
  const i = ((idx % 7) + 7) % 7;
  return scale[i] + 12 * oct;
}

// Acorde a partir de un token: [b|#]grado[calidad]
// Sin calidad → tríada diatónica del modo. "d7" → séptima diatónica.
// Con alteración y sin calidad → tríada mayor (acorde prestado).
export function parseChord(token, scale) {
  const m = /^([b#]?)([1-7])(.*)$/.exec(token);
  if (!m) throw new Error(`Acorde inválido: ${token}`);
  const acc = m[1] === 'b' ? -1 : m[1] === '#' ? 1 : 0;
  const deg = Number(m[2]);
  let q = m[3];
  const rootSemis = degreeSemis(deg, scale) + acc;
  let intervals;
  if (q === '' || q === 'd7') {
    if (acc !== 0 && q === '') {
      intervals = QUALITIES.M;
    } else {
      const count = q === 'd7' ? 4 : 3;
      intervals = [];
      for (let k = 0; k < count; k++) {
        intervals.push(degreeSemis(deg + 2 * k, scale) - degreeSemis(deg, scale));
      }
    }
  } else {
    intervals = QUALITIES[q];
    if (!intervals) throw new Error(`Calidad de acorde desconocida: ${q} en ${token}`);
  }
  return { rootSemis, intervals, token };
}

// Progresión: "1 6 4 5" (un compás cada uno) o "1 4:2 5:2" (en tiempos).
export function parseProgression(str, scale, beatsPerBar) {
  const out = [];
  let beat = 0;
  for (const raw of str.trim().split(/\s+/)) {
    if (!raw || raw === '|') continue;
    const [tok, dur] = raw.split(':');
    const beats = dur ? Number(dur) : beatsPerBar;
    out.push({ ...parseChord(tok, scale), startBeat: beat, beats });
    beat += beats;
  }
  return { chords: out, totalBeats: beat };
}
