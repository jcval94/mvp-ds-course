// Canciones: celebración, tristeza, humor, sabor latino y créditos.

export default [
  // ── Celebración ───────────────────────────────────────
  {
    id: 'victoria-gloriosa', title: 'Victoria gloriosa', category: 'victoria',
    tags: ['triunfo', 'marcha', 'fanfarria', 'logro'], desc: 'Marcha triunfal para resultados, premios y finales felices.',
    bpm: 132, key: 'C', mode: 'major', rit: 0.12,
    inst: { lead: 'lead.square', harm: 'harm.stab' },
    sections: {
      A: { chords: '1 4 1 5 1 4 5 1', harm: 'pulse4', bass: 'march', drums: 'march',
        lead: ['5:3 5:1 5:4 1\':8', '6:3 6:1 6:4 1\':8', '3\':3 2\':1 1\':4 5:8', '2\':8 7:8', '5:3 5:1 5:4 1\':8', '4\':3 4\':1 4\':4 3\':4 2\':4', '2\':4 7:4 5:4 7:4', '1\':16'] },
    },
    form: ['A', 'A'], loop: ['A'],
  },
  {
    id: 'fiesta-final', title: 'Fiesta final', category: 'victoria',
    tags: ['fiesta', 'baile', 'celebración', 'disco'], desc: 'Disco 8 bits para celebraciones, logros de equipo o cierres eufóricos.',
    bpm: 128, key: 'D', mode: 'major',
    inst: { lead: 'lead.bright', harm: 'harm.stab' },
    sections: {
      A: { chords: '1 3 4 5', harm: 'offbeat', bass: 'disco', drums: 'fourfloor',
        lead: ['1\':2 1\':2 . 7:2 1\':2 . 3\':4 1\':2', '3\':2 3\':2 . 2\':2 3\':2 . 5\':4 3\':2', '4\':2 3\':2 2\':2 1\':2 2\':4 1\':2 7:2', '6:4 7:4 2\':4 5\':4'] },
      B: { chords: '6 4 1 5', harm: 'arp', bass: 'disco', drums: 'fourfloor',
        lead: ['6:4 1\':4 3\':4 1\':4', '4:4 6:4 1\':4 2\':4', '3\':6 2\':2 1\':8', '7:4 1\':4 2\':4 5:4'] },
    },
    form: ['A', 'B', 'A', 'B'], loop: ['A', 'B'],
  },

  // ── Tristeza / reflexión ──────────────────────────────
  {
    id: 'lluvia-gris', title: 'Lluvia gris', category: 'triste',
    tags: ['tristeza', 'pérdida', 'error', 'reflexión'], desc: 'Tema melancólico para fracasos, errores o despedidas.',
    bpm: 70, key: 'A', mode: 'minor', intensity: 1,
    inst: { lead: 'lead.soft', harm: 'harm.soft' },
    sections: {
      A: { chords: '1 6 4 5M', harm: 'arp8', bass: 'root', drums: 'none',
        lead: ['5:6 4:2 3:8', '3:6 2:2 1:8', '4:6 3:2 2:4 1:4', '#7,:16'] },
      B: { chords: '6 7 1 5M', harm: 'pad', bass: 'half', drums: 'none',
        lead: ['1\':6 7:2 6:8', '7:6 6:2 5:8', '3:6 2:2 1:8', '2:8 #7,:8'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },
  {
    id: 'recuerdo', title: 'Recuerdo', category: 'triste',
    tags: ['nostalgia', 'flashback', 'historia', 'pasado'], desc: 'Vals nostálgico para flashbacks y contexto histórico.',
    bpm: 96, key: 'D', mode: 'minor', beats: 3, intensity: 1,
    inst: { lead: 'lead.chime', harm: 'harm.bell' },
    sections: {
      A: { chords: '1 4 7 3 6 2dim 5M 1', harm: 'waltz', bass: 'waltz', drums: 'none',
        lead: ['5:8 1\':4', '1\':4 6:4 4:4', '4:8 7:4', '7:4 5:4 3:4', '3:8 6:4', '6:4 4:4 2:4', '#7,:4 2:4 4:4', '3:4 2:4 1:4'] },
    },
    form: ['A', 'A'], loop: ['A'],
  },

  // ── Humor ──────────────────────────────────────────────
  {
    id: 'torpeza', title: 'Torpeza', category: 'humor',
    tags: ['cómico', 'torpe', 'tropiezo', 'oom-pah'], desc: 'Oom-pah cromático para torpezas y momentos ridículos.',
    bpm: 120, key: 'F', mode: 'major', swing: 0.25,
    inst: { lead: 'lead.staccato', harm: 'harm.stab', bass: 'bass.triShort' },
    sections: {
      A: { chords: '1 5 5 1', harm: 'offbeat', bass: 'march', drums: 'ska',
        lead: ['1:2 . 3:2 . 5:2 #5:2 6:2 . 5:2 .', '7,:2 . 2:2 . 4:2 #4:2 5:2 . 4:2 .', '7,:2 2:2 4:2 5:2 4:2 2:2 7,:4', '1:4 5,:4 1:4 . . . .'] },
      B: { chords: '4 1 2 5', harm: 'offbeat', bass: 'march', drums: 'march',
        lead: ['4:2 . 6:2 . 1\':2 . 6:2 4:4 .', '3:2 . 5:2 . 1\':2 . 5:2 3:4 .', '2:2 . 4:2 . 6:2 5:2 4:2 2:4', '5:2 #5:2 6:2 #6:2 7:2 1\':2 #1\':2 . .'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },
  {
    id: 'caricatura', title: 'Caricatura', category: 'humor',
    tags: ['dibujos animados', 'persecución cómica', 'ska', 'rápido'], desc: 'Ska veloz de dibujos animados para persecuciones cómicas.',
    bpm: 180, key: 'G', mode: 'major',
    inst: { lead: 'lead.pluck', harm: 'harm.stab' },
    sections: {
      A: { chords: '1 6 2 5', harm: 'skank', bass: 'octave', drums: 'ska',
        lead: ['5:1 6:1 5:1 #4:1 5:4 1\':2 7:2 6:2 5:2', '3:1 4:1 3:1 #2:1 3:4 6:2 5:2 4:2 3:2', '2:2 4:2 6:2 4:2 2:4 1:4', '7,:2 2:2 5:2 2:2 7,:4 5,:4'] },
      B: { chords: '4 1 2 5', harm: 'skank', bass: 'octave', drums: 'ska',
        lead: ['1\':2 7:2 6:2 4:2 5:4 4:4', '5:2 #4:2 5:2 7:2 1\':8', '6:2 5:2 4:2 2:2 1:4 2:4', '5:4 6:4 7:4 2\':4'] },
    },
    form: ['A', 'B', 'A', 'B'], loop: ['A', 'B'],
  },
  {
    id: 'travesura', title: 'Travesura', category: 'humor',
    tags: ['pícaro', 'pizzicato', 'sigilo cómico', 'tierno'], desc: 'Pizzicato pícaro: planes traviesos y personajes curiosos.',
    bpm: 108, key: 'D', mode: 'minor',
    inst: { lead: 'lead.pluck', harm: 'harm.pluck', bass: 'bass.triShort' },
    sections: {
      A: { chords: '1 1 4 5M', harm: 'offbeat', bass: 'quarter', drums: 'hats',
        lead: ['1:2 . . 1:2 . . 3:1 4:1 5:2 . . 3:2', '1:2 . . 1:2 . . 3:1 4:1 5:2 6:2 5:2', '4:2 . . 4:2 . . 6:1 7:1 1\':2 . . 6:2', '#7:2 . 5:2 . #7:2 . 2\':7'] },
      B: { chords: '6 7 5M 1', harm: 'offbeat', bass: 'quarter', drums: 'ska',
        lead: ['6:2 . 1\':2 . 3\':2 . 1\':2 6:2 . . .', '7:2 . 2\':2 . 4\':2 . 2\':2 7:2 . . .', '5:2 . #7:2 . 2\':2 . #7:2 5:2 . . .', '1:4 . . . . 1\':2 . 1:2 . . .'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },

  // ── Sabor latino ───────────────────────────────────────
  {
    id: 'puesto-de-tacos', title: 'Puesto de tacos', category: 'latino',
    tags: ['huapango', 'mercado', 'fiesta', 'México', 'Don Juan'], desc: 'Son/huapango 8 bits en 6/8 para el puesto, el mercado y la fiesta.',
    bpm: 120, key: 'G', mode: 'major', beats: 2, stepsPerBeat: 6,
    inst: { lead: 'lead.bright', harm: 'harm.stab' },
    sections: {
      A: { chords: '1 5 5 1 1 5 5 1', harm: 'huapango', bass: 'huapango', drums: 'huapango',
        lead: ['5:2 5:2 5:2 3:2 4:2 5:2', '6:4 5:2 4:4 2:2', '4:2 4:2 4:2 2:2 3:2 4:2', '5:4 4:2 3:6', '5:2 5:2 5:2 3:2 4:2 5:2', '6:4 5:2 4:4 6:2', '7:4 6:2 5:4 4:2', '3:12'] },
      B: { chords: '4 1 5 1 4 1 5 1', harm: 'huapango', bass: 'huapango', drums: 'huapango',
        lead: ['1\':4 7:2 6:6', '5:4 6:2 5:6', '4:4 3:2 2:6', '3:4 2:2 1:6', '6:4 1\':2 6:6', '5:4 3:2 1:6', '2:4 4:2 7,:6', '1:12'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },
  {
    id: 'cumbia-pixel', title: 'Cumbia pixel', category: 'latino',
    tags: ['cumbia', 'baile', 'barrio', 'alegre'], desc: 'Cumbia con guacharaca de ruido y bajo tumbao.',
    bpm: 96, key: 'A', mode: 'minor',
    inst: { lead: 'lead.morph', harm: 'harm.stab' },
    sections: {
      A: { chords: '1 4 5M 1', harm: 'offbeat', bass: 'tumbao', drums: 'latin',
        lead: ['5:2 3:2 5:2 3:2 5:2 6:2 5:4', '4:2 6:2 4:2 6:2 4:2 5:2 4:4', '#7,:2 2:2 4:2 2:2 #7,:2 1:2 2:4', '1:4 3:4 1:8'] },
      B: { chords: '6 7 1 5M', harm: 'offbeat', bass: 'tumbao', drums: 'bossa',
        lead: ['1\':4 6:4 3:4 6:4', '7:4 5:4 2:4 5:4', '1\':4 5:4 3:4 5:4', '#7:4 5:4 2:4 #7,:4'] },
    },
    form: ['A', 'B', 'A', 'B'], loop: ['A', 'B'],
  },

  // ── Créditos / cierre ──────────────────────────────────
  {
    id: 'creditos', title: 'Créditos', category: 'cierre',
    tags: ['créditos', 'nostalgia', 'final', 'emotivo'], desc: 'Tema de créditos con subdominante menor prestada.',
    bpm: 100, key: 'C', mode: 'major', rit: 0.15,
    inst: { lead: 'lead.soft', harm: 'harm.soft' },
    sections: {
      A: { chords: '1 3 4 4m', harm: 'arp8', bass: 'half', drums: 'halftime',
        lead: ['3\':6 2\':2 1\':4 5:4', '7:6 1\':2 2\':4 3\':4', '4\':6 3\':2 2\':4 1\':4', 'b6:8 1\':4 4\':4'] },
      B: { chords: '6 2 5 1', harm: 'broken', bass: 'octave', drums: 'beat',
        lead: ['6:4 1\':4 3\':8', '4\':4 3\':4 2\':8', '2\':4 7:4 5:8', '1\':16'] },
    },
    form: ['A', 'B', 'A', 'B'], loop: ['A', 'B'],
  },
  {
    id: 'hasta-la-proxima', title: 'Hasta la próxima', category: 'cierre',
    tags: ['despedida', 'cálido', 'outro', 'suscribirse'], desc: 'Outro cálido para despedidas y llamadas a la acción.',
    bpm: 92, key: 'G', mode: 'major', rit: 0.12,
    inst: { lead: 'lead.flute', harm: 'harm.soft' },
    sections: {
      A: { chords: '1 5 6 4', harm: 'broken', bass: 'half', drums: 'none',
        lead: ['1\':4 7:2 1\':2 2\':4 5:4', '5:4 6:2 5:2 2:8', '3:4 5:2 6:2 1\':4 7:4', '6:4 5:4 4:8'] },
      B: { chords: '1 5 6 4', harm: 'arp8', bass: 'octave', drums: 'halftime',
        lead: ['3\':4 2\':2 1\':2 5:8', '2\':4 1\':2 7:2 6:8', '5:4 6:4 7:4 1\':4', '2\':16'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },
];
