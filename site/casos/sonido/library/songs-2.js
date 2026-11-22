// Canciones: acción, tensión, calma y tecnología/datos.

export default [
  // ── Acción ─────────────────────────────────────────────
  {
    id: 'persecucion', title: 'Persecución', category: 'accion',
    tags: ['rápido', 'urgente', 'carrera', 'galope'], desc: 'Galope veloz para persecuciones y cortes rápidos.',
    bpm: 168, key: 'E', mode: 'minor', echo: true,
    inst: { lead: 'lead.bright', harm: 'harm.pluck' },
    sections: {
      A: { chords: '1 6 7 1', harm: 'arp', bass: 'gallop', drums: 'driving',
        lead: ['1:2 1:1 1:1 5:2 1:2 3:2 1:2 5:2 3:2', '6:2 6:1 6:1 3\':2 6:2 1\':2 6:2 3\':2 1\':2', '7:2 7:1 7:1 4\':2 7:2 2\':2 7:2 4\':2 2\':2', '1\':4 7:2 6:2 5:4 3:4'] },
      B: { chords: '4 6 7 5M', harm: 'arpud', bass: 'octave', drums: 'dnb',
        lead: ['4\':4 3\':2 1\':2 6:4 4:4', '3\':4 1\':2 6:2 3:4 6:4', '2\':4 7:2 5:2 4:4 2:4', '5:4 #7:4 2\':4 5\':4'] },
    },
    form: ['A', 'B', 'A', 'B'], loop: ['A', 'B'],
  },
  {
    id: 'batalla', title: 'Batalla', category: 'accion',
    tags: ['combate', 'rock', 'enemigos', 'sierra'], desc: 'Rock de combate con melodía en diente de sierra.',
    bpm: 150, key: 'D', mode: 'minor', echo: true,
    inst: { lead: 'lead.saw', harm: 'harm.stab' },
    sections: {
      A: { chords: '1 6 3 7', harm: 'pulse8', bass: 'push', drums: 'rock',
        lead: ['1\':6 7:2 6:4 5:4', '4:6 5:2 6:8', '3:4 5:4 1\':4 3\':4', '2\':8 7:4 5:4'] },
      B: { chords: '4 5M 4 5M', harm: 'arp', bass: 'gallop', drums: 'break',
        lead: ['4\':4 3\':4 2\':4 1\':4', '#7:8 5:4 2\':4', '4:4 6:4 7:4 1\':4', '2\':4 #7:4 5:8'] },
    },
    form: ['A', 'A', 'B', 'A'], loop: ['A', 'B'],
  },
  {
    id: 'carrera-turbo', title: 'Carrera turbo', category: 'accion',
    tags: ['velocidad', 'energía', 'deporte', 'arpegios'], desc: 'Arpegios a toda velocidad para montajes y carreras.',
    bpm: 176, key: 'A', mode: 'major', echo: true,
    inst: { lead: 'lead.square', harm: 'harm.pluck' },
    sections: {
      A: { chords: '1 5 6 4', harm: 'arp', bass: 'octave', drums: 'dnb',
        lead: ['5:2 1\':2 3\':2 5\':2 3\':2 1\':2 5:2 3:2', '5:2 7:2 2\':2 5\':2 2\':2 7:2 5:2 2:2', '6:2 1\':2 3\':2 6\':2 3\':2 1\':2 6:2 3:2', '4:2 6:2 1\':2 4\':2 3\':4 2\':4'] },
      B: { chords: '4 5 3 6', harm: 'shimmer', bass: 'sixteenth', drums: 'driving',
        lead: ['4\':6 3\':2 2\':8', '2\':6 1\':2 7:8', '7:6 6:2 3\':8', '3\':4 2\':4 1\':4 7:4'] },
    },
    form: ['A', 'B', 'A', 'B'], loop: ['A', 'B'],
  },
  {
    id: 'ninja-nocturno', title: 'Ninja nocturno', category: 'accion',
    tags: ['sigilo', 'exótico', 'oriental', 'acción'], desc: 'Acción sigilosa en frigio dominante.',
    bpm: 140, key: 'E', mode: 'phrygianDominant',
    inst: { lead: 'lead.thin', harm: 'harm.pluck' },
    sections: {
      A: { chords: '1 2 1 7', harm: 'ostinato', bass: 'sync', drums: 'tribal',
        lead: ['1:2 2:2 3:2 2:2 1:4 5,:4', '2:2 3:2 4:2 3:2 2:4 6,:4', '5:2 4:2 3:2 2:2 3:4 1:4', '7,:4 2:4 4:4 3:4'] },
      B: { chords: '4 2 7 1', harm: 'arp8', bass: 'pump', drums: 'break',
        lead: ['4:4 6:4 1\':4 6:4', '2:4 4:4 6:4 4:4', '7,:4 2:4 4:4 2:4', '1:4 3:4 5:4 1\':4'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },

  // ── Tensión / jefe ─────────────────────────────────────
  {
    id: 'jefe-final', title: 'Jefe final', category: 'tension',
    tags: ['jefe', 'peligro', 'épico', 'oscuro'], desc: 'Riff de pedal en menor armónica para el gran enfrentamiento.',
    bpm: 156, key: 'C', mode: 'harmonicMinor', echo: true, intensity: 3,
    inst: { lead: 'lead.saw', harm: 'harm.pluck', bass: 'bass.tri' },
    sections: {
      A: { chords: '1 1 b2 5', harm: 'arp', bass: 'sixteenth', drums: 'break',
        lead: ['1:2 1:2 1\':2 1:2 7:2 1:2 6:2 1:2', '1:2 1:2 3:2 1:2 4:2 1:2 3:2 2:2', 'b2:2 b2:2 b2\':2 b2:2 1\':2 b2:2 6:2 b2:2', '7,:4 2:4 4:4 7:4'] },
      B: { chords: '6 4 6 5', harm: 'ostinato', bass: 'gallop', drums: 'driving',
        lead: ['3\':6 1\':2 6:8', '4\':6 3\':2 1\':8', '6:4 5:4 3:4 1:4', '7,:4 2:4 5:4 7:4'] },
    },
    form: ['A', 'A', 'B', 'A'], loop: ['A', 'B'],
  },
  {
    id: 'bomba-reloj', title: 'Bomba de relojería', category: 'tension',
    tags: ['cuenta atrás', 'reloj', 'tensión', 'urgencia'], desc: 'Tic-tac tenso para plazos, cuentas atrás o decisiones críticas.',
    bpm: 120, key: 'A', mode: 'minor',
    inst: { lead: 'lead.staccato', harm: 'harm.pluck' },
    sections: {
      A: { chords: '1 1 6 5M', harm: 'ostinato', bass: 'pedal', drums: 'tick',
        lead: ['. . . . 5:2 . . 3:2 . . 1:2 . .', '. . . . 5:2 . . 4:2 . . 3:2 . .', '. . . . 6:2 . . 3:2 . . 1:2 . .', '#7,:8 2:8'] },
      B: { chords: '4 4 5M 5M', harm: 'arp', bass: 'pump', drums: 'build',
        lead: ['4\':8 3\':8', '2\':8 1\':8', '#7:8 2\':8', '#7:16'] },
    },
    form: ['A', 'B', 'A', 'B'], loop: ['A', 'B'],
  },
  {
    id: 'amenaza', title: 'Amenaza', category: 'tension',
    tags: ['lento', 'peligro', 'acecho', 'oscuro'], desc: 'Acecho lento con napolitano; algo grande se acerca.',
    bpm: 72, key: 'D', mode: 'minor', intensity: 1,
    inst: { lead: 'lead.ghost', harm: 'harm.padSoft' },
    sections: {
      A: { chords: '1 b2 1 b2', harm: 'pad', bass: 'drone', drums: 'heartbeat',
        lead: ['5:8 6:4 5:4', 'b2\':8 1\':4 6:4', '5:8 4:4 3:4', 'b2:16'] },
      B: { chords: '6 5M 6 5M', harm: 'arp8', bass: 'half', drums: 'tribal',
        lead: ['1\':8 6:8', '#7:8 5:8', '3\':8 1\':8', '#7:16'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },

  // ── Calma ──────────────────────────────────────────────
  {
    id: 'menu-tranquilo', title: 'Menú tranquilo', category: 'calma',
    tags: ['menú', 'relajado', 'fondo', 'bucle'], desc: 'Bucle suave de menú o pantalla de espera; buen fondo para narración.',
    bpm: 90, key: 'F', mode: 'major', intensity: 1,
    inst: { lead: 'lead.soft', harm: 'harm.soft' },
    sections: {
      A: { chords: '1 6 2 5', harm: 'broken', bass: 'half', drums: 'hats',
        lead: ['5:4 6:2 5:2 3:8', '4:4 3:2 4:2 6:8', '5:4 4:2 3:2 2:8', '3:4 2:2 1:2 2:8'] },
      B: { chords: '4 5 3 6 2 5 1 1', harm: 'arp8', bass: 'half', drums: 'hats',
        lead: ['4:6 6:2 1\':8', '7:6 6:2 5:8', '3:6 5:2 7:8', '6:6 5:2 6:8', '2:6 4:2 6:8', '5:6 3:2 2:8', '1:16', 'r:16'] },
    },
    form: ['A', 'B'], loop: ['A', 'B'],
  },
  {
    id: 'atardecer', title: 'Atardecer', category: 'calma',
    tags: ['nostalgia', 'reflexión', 'flauta', 'cierre'], desc: 'Balada cálida para reflexiones y cierres suaves.',
    bpm: 76, key: 'Eb', mode: 'major', intensity: 1,
    inst: { lead: 'lead.flute', harm: 'harm.soft', bass: 'bass.pulse' }, octaves: { bass: 2 },
    sections: {
      A: { chords: '1 5 6 4', harm: 'arp8', bass: 'root', drums: 'none',
        lead: ['3:6 2:2 1:8', '2:6 1:2 7,:8', '1:6 7,:2 6,:4 1:4', '6,:8 1:4 2:4'] },
      B: { chords: '4 1 4 5', harm: 'arpud', bass: 'half', drums: 'hats',
        lead: ['4:4 6:4 1\':8', '7:4 6:4 5:8', '6:4 1\':4 3\':8', '2\':8 7:4 5:4'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },
  {
    id: 'noche-estrellada', title: 'Noche estrellada', category: 'calma',
    tags: ['canción de cuna', 'noche', 'vals', 'tierno'], desc: 'Cajita de música en 3/4 para escenas nocturnas o tiernas.',
    bpm: 84, key: 'A', mode: 'major', beats: 3, intensity: 1,
    inst: { lead: 'lead.chime', harm: 'harm.bell' },
    sections: {
      A: { chords: '1 4 1 5 1 4 5 1', harm: 'waltz', bass: 'waltz', drums: 'none',
        lead: ['5:4 3:4 5:4', '6:4 4:4 6:4', '5:4 3:4 1:4', '2:12', '5:4 3:4 5:4', '1\':4 6:4 4:4', '5:4 7:4 2\':4', '1\':12'] },
    },
    form: ['A', 'A'], loop: ['A'],
  },
  {
    id: 'jardin-zen', title: 'Jardín zen', category: 'calma',
    tags: ['pentatónica', 'meditación', 'calma', 'pausa'], desc: 'Pentatónica serena sobre bajo pedal; pausas y respiración.',
    bpm: 70, key: 'D', mode: 'major', intensity: 0,
    inst: { lead: 'lead.flute', harm: 'harm.padSoft' },
    sections: {
      A: { chords: '1 6 4 1', harm: 'pad', bass: 'drone', drums: 'none',
        lead: ['3:8 5:4 6:4', '5:8 3:4 2:4', '2:8 1:4 6,:4', '1:16'] },
      B: { chords: '4 1 6 5', harm: 'pad', bass: 'drone', drums: 'none',
        lead: ['6:6 5:2 6:8', '1\':6 6:2 5:8', '3:6 2:2 3:8', '2:8 . . . . . . . .'] },
    },
    form: ['A', 'B'], loop: ['A', 'B'],
  },

  // ── Tecnología y datos ─────────────────────────────────
  {
    id: 'procesando', title: 'Procesando', category: 'datos',
    tags: ['algoritmo', 'cálculo', 'montaje', 'bucle'], desc: 'Bucle rítmico para montajes de cálculo, código o análisis.',
    bpm: 124, key: 'C', mode: 'minor',
    inst: { lead: 'lead.staccato', harm: 'harm.pluck' },
    sections: {
      A: { chords: '1 6 4 5', harm: 'ostinato', bass: 'sync', drums: 'funk',
        lead: ['1\':2 . 7:1 . 5:2 . 3:2 5:6', '1\':2 . 6:1 . 3:2 . 1:2 3:6', '6:2 . 4:1 . 1\':2 . 6:2 4:6', '5:2 . 2:1 . 7:2 . 5:2 2\':6'] },
      B: { chords: '3 7 6 5M', harm: 'arp', bass: 'octave', drums: 'break',
        lead: ['3\':4 2\':4 1\':4 7:4', '2\':6 1\':2 7:8', '1\':4 6:4 3:4 6:4', '#7:4 2\':4 4\':4 5\':4'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },
  {
    id: 'red-neuronal', title: 'Red neuronal', category: 'datos',
    tags: ['IA', 'futuro', 'asombro', 'lidio'], desc: 'Lidio brillante con eco: inteligencia artificial, futuro, asombro.',
    bpm: 110, key: 'D', mode: 'lydian', echo: true,
    inst: { lead: 'lead.morph', harm: 'harm.bell' },
    sections: {
      A: { chords: '1 2 1 2', harm: 'shimmer', bass: 'pedal', drums: 'halftime',
        lead: ['3:4 5:4 4:4 5:4', '2:4 6:4 7:4 6:4', '1\':6 7:2 5:8', '4:6 6:2 2:8'] },
      B: { chords: '6 7 1 2', harm: 'arp', bass: 'octave', drums: 'beat',
        lead: ['6:8 1\':4 3\':4', '7:8 2\':4 4\':4', '3\':8 5\':4 1\':4', '2\':8 4\':8'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },
  {
    id: 'descubrimiento', title: 'Descubrimiento', category: 'datos',
    tags: ['hallazgo', 'insight', 'crescendo', 'emotivo'], desc: 'Progresión ascendente para el momento del hallazgo en los datos.',
    bpm: 116, key: 'G', mode: 'major', curve: 'build',
    inst: { lead: 'lead.bright', harm: 'harm.pluck' },
    sections: {
      A: { chords: '4 5 3 6', harm: 'arp', bass: 'octave', drums: 'beat',
        lead: ['1\':4 2\':4 3\':6 2\':2', '2\':4 3\':4 5\':6 3\':2', '3\':4 2\':4 3\':4 5\':4', '6\':8 5\':4 3\':4'] },
      B: { chords: '4 5 1 1', harm: 'pulse8', bass: 'octave', drums: 'fourfloor',
        lead: ['4\':4 3\':4 2\':4 1\':4', '2\':6 1\':2 7:4 5:4', '1\':16', '5:2 6:2 7:2 1\':2 2\':4 5:4'] },
    },
    form: ['A', 'B', 'A', 'B'], loop: ['A', 'B'],
  },
  {
    id: 'codigo-fuente', title: 'Código fuente', category: 'datos',
    tags: ['programar', 'funk', 'montaje', 'dórico'], desc: 'Funk dórico para escenas de programar o limpiar datos.',
    bpm: 112, key: 'E', mode: 'dorian',
    inst: { lead: 'lead.wah', harm: 'harm.stab', bass: 'bass.slap' },
    sections: {
      A: { chords: '1 4 1 4', harm: 'skank', bass: 'sync', drums: 'funk',
        lead: ['1:2 . 3:1 1:1 4:2 . 5:2 7:2 5:2 3:2', '4:2 . 6:1 4:1 1\':2 . 6:2 4:2 3:2 1:2', '1:2 . 3:1 1:1 4:2 . 5:2 7:2 5:2 3:2', '4:2 . 6:1 4:1 1\':2 6:2 7:4 5:3'] },
      B: { chords: '3 4 5 4', harm: 'stab', bass: 'boogie', drums: 'funk',
        lead: ['3:4 5:4 7:4 5:4', '4:4 6:4 1\':4 6:4', '5:4 7:4 2\':4 7:4', '6:4 4:4 1\':8'] },
    },
    form: ['A', 'B', 'A'], loop: ['A', 'B'],
  },
];
