// Patrones de acompañamiento. Cada golpe: [paso, duración, tono].
// Tonos de bajo: r raíz · o octava · 5 quinta · 3 tercera · a aproximación
// cromática a la siguiente raíz · T tónica fija.
// Tonos de armonía: 'C' acorde completo (arpegio rápido a 60 Hz) o índice
// 0..5 dentro del acorde (0 raíz, 1 tercera, 2 quinta, 3 octava/séptima…).

const every = (n, len, tone, steps = 16, offset = 0) => {
  const out = [];
  for (let s = offset; s < steps; s += n) out.push([s, len, typeof tone === 'function' ? tone(out.length) : tone]);
  return out;
};

export const BASS = {
  none: { steps: 16, hits: [] },
  root: { steps: 16, hits: [[0, 16, 'r']] },
  half: { steps: 16, hits: [[0, 8, 'r'], [8, 8, 'r']] },
  quarter: { steps: 16, hits: every(4, 3.5, 'r') },
  pump: { steps: 16, hits: every(2, 1.5, 'r') },
  octave: { steps: 16, hits: every(2, 1.6, (i) => (i % 2 ? 'o' : 'r')) },
  disco: { steps: 16, hits: every(2, 1.2, (i) => (i % 2 ? 'o' : 'r')) },
  walk: { steps: 16, hits: [[0, 3.6, 'r'], [4, 3.6, '3'], [8, 3.6, '5'], [12, 3.6, 'a']] },
  gallop: { steps: 16, hits: [0, 4, 8, 12].flatMap((b) => [[b, 2, 'r'], [b + 2, 1, 'r'], [b + 3, 1, 'r']]) },
  sync: { steps: 16, hits: [[0, 3, 'r'], [3, 3, 'r'], [6, 2, '5'], [8, 3, 'r'], [11, 3, 'o'], [14, 2, '5']] },
  arp: { steps: 16, hits: every(2, 1.8, (i) => ['r', '5', 'o', '5'][i % 4]) },
  drone: { steps: 16, hits: [[0, 16, 'T']] },
  push: { steps: 16, hits: [[0, 5.5, 'r'], [6, 1.8, 'r'], [8, 5.5, 'r'], [14, 1.8, '5']] },
  march: { steps: 16, hits: [[0, 3, 'r'], [4, 3, '5'], [8, 3, 'r'], [12, 3, '5']] },
  tumbao: { steps: 16, hits: [[0, 5.5, 'r'], [6, 5.5, '5'], [12, 3.5, 'r']] },
  pedal: { steps: 16, hits: every(2, 1.5, 'T') },
  sixteenth: { steps: 16, hits: every(1, 0.8, 'r') },
  boogie: { steps: 16, hits: every(2, 1.7, (i) => ['r', '3', '5', '6'][i % 4]) },
  // compases de 12 pasos (3/4 y 6/8)
  waltz: { steps: 12, hits: [[0, 3.5, 'r']] },
  waltzFull: { steps: 12, hits: [[0, 3.5, 'r'], [4, 3.5, '5'], [8, 3.5, '5']] },
  sixeight: { steps: 12, hits: [[0, 5.5, 'r'], [6, 5.5, '5']] },
  jig: { steps: 12, hits: [[0, 2, 'r'], [3, 2, '5'], [6, 2, 'o'], [9, 2, '5']] },
  huapango: { steps: 12, hits: [[0, 2.5, 'r'], [3, 2.5, '5'], [6, 2.5, 'r'], [9, 1.5, '5'], [11, 1, 'a']] },
};

export const HARM = {
  none: { steps: 16, hits: [] },
  pad: { steps: 16, hits: 'pad' },
  stab: { steps: 16, hits: [[4, 1.5, 'C'], [12, 1.5, 'C']] },
  offbeat: { steps: 16, hits: every(4, 1, 'C', 16, 2) },
  pulse8: { steps: 16, hits: every(2, 1.4, 'C') },
  pulse4: { steps: 16, hits: every(4, 2.5, 'C') },
  charleston: { steps: 16, hits: [[0, 2, 'C'], [6, 2, 'C']] },
  arp: { steps: 16, hits: every(1, 1, (i) => i % 4) },
  arpud: { steps: 16, hits: every(1, 1, (i) => [0, 1, 2, 3, 4, 3, 2, 1][i % 8]) },
  arp8: { steps: 16, hits: every(2, 2, (i) => i % 4) },
  arpdown: { steps: 16, hits: every(1, 1, (i) => 3 - (i % 4)) },
  arpwide: { steps: 16, hits: every(1, 1, (i) => [0, 2, 3, 5, 3, 2][i % 6]) },
  broken: { steps: 16, hits: every(2, 2, (i) => [0, 2, 1, 2][i % 4]) },
  counter: { steps: 16, hits: [[0, 8, 1], [8, 8, 2]] },
  bell: { steps: 16, hits: every(4, 4, (i) => [3, 2, 1, 2][i % 4]) },
  shimmer: { steps: 16, hits: every(1, 1, (i) => [3, 4, 5, 4][i % 4]) },
  ostinato: { steps: 16, hits: every(1, 1, (i) => [0, 0, 2, 0, 3, 0, 2, 0][i % 8]) },
  skank: { steps: 16, hits: [[2, 1, 'C'], [6, 1, 'C'], [10, 1, 'C'], [14, 1, 'C'], [15, 0.6, 'C']] },
  waltz: { steps: 12, hits: [[4, 3, 'C'], [8, 3, 'C']] },
  sixeight: { steps: 12, hits: [[3, 2, 'C'], [9, 2, 'C']] },
  jigArp: { steps: 12, hits: every(1, 1, (i) => [0, 1, 2, 3, 2, 1][i % 6], 12) },
  huapango: { steps: 12, hits: [[2, 1, 'C'], [4, 1, 'C'], [8, 1, 'C'], [10, 1, 'C']] },
};

// Batería: carriles k bombo · s caja · S caja seca · g fantasma · h hi-hat ·
// o hi-hat abierto · m hi-hat metálico · c platillo · t/T toms · p palmas ·
// z shaker · w bloque de madera · b cencerro.  x = golpe, X = acento.
export const DRUMS = {
  none: {},
  rock: { k: 'x.......x.x.....', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.' },
  beat: { k: 'x.....x...x.....', s: '....x.......x...', h: 'x.x.x.x.x.x.x.x.' },
  fourfloor: { k: 'x...x...x...x...', p: '....x.......x...', o: '..x...x...x...x.' },
  march: { k: 'x.......x.......', s: '....x..x....x.xx', h: 'x...x...x...x...' },
  halftime: { k: 'x.........x.....', s: '........x.......', h: 'x.x.x.x.x.x.x.x.' },
  break: { k: 'x.....x..x......', s: '....x..g.g..x..g', h: 'x.x.x.x.x.x.xox.' },
  shuffle: { k: 'x.......x.......', s: '....x.......x...', h: 'x..xx..xx..xx..x' },
  gallop: { k: 'x.xxx.xxx.xxx.xx', s: '....x.......x...', h: '' },
  driving: { k: 'x...x...x...x...', s: '....x.......x...', h: 'xxxxxxxxxxxxxxxx' },
  ska: { k: 'x.......x.......', s: '....x.......x...', h: '..x...x...x...x.' },
  latin: { k: 'x..x..x.x..x..x.', w: '..x..x....x..x..', z: 'xxxxxxxxxxxxxxxx' },
  bossa: { k: 'x..xx..xx..xx..x', w: 'x..x..x...x..x..', h: 'x.x.x.x.x.x.x.x.' },
  tension: { k: 'x...............', h: '..x...x...x...x.' },
  heartbeat: { k: 'x..x............' },
  pulse: { k: 'x...x...x...x...' },
  tick: { m: 'x...x...x...x...' },
  hats: { h: 'x.x.x.x.x.x.x.x.' },
  build: { k: 'x...x...x...x...', s: '........x.x.xxxx', h: 'x.x.x.x.x.x.x.x.' },
  roll: { s: 'xxxxxxxxxxxxxxxx' },
  toms: { k: 'x.......x.......', t: '..x..x....x.....', T: '......x.....x.x.' },
  tribal: { k: 'x..x..x...x..x..', T: '..x....x..x...x.', t: '.....x.......x..' },
  funk: { k: 'x.....x.x.....x.', s: '....x..g.g..x..g', h: 'xxxxxxxxxxxxxxxx' },
  dnb: { k: 'x.........x.....', s: '....x.......x...', h: 'x.xxx.xxx.xxx.xx' },
  end: { c: 'X...............' },
  hit: { c: 'X...............', s: 'X...............' },
  // 12 pasos (3/4, 6/8)
  waltz: { k: 'x...........', h: '....x...x...' },
  sixeight: { k: 'x.....x.....', s: '...x.....x..', h: 'x.xx.xx.xx.x' },
  jig: { k: 'x.....x.....', s: '......x.....', h: 'x..x..x..x..' },
  huapango: { k: 'x..x..x.....', w: '..x..x..x.xx', z: 'xxxxxxxxxxxx' },
  sixeightRock: { k: 'x.....x..x..', s: '...X.....X..', h: 'xxxxxxxxxxxx' },
};

export function patternLength(p) {
  return Object.values(p).reduce((m, s) => Math.max(m, s.length), 0);
}
