// Jingles: piezas cortas (1–6 s) de forma fija. Con `duration` solo se
// ajusta el tempo, nunca se recorta la frase. Octava de melodía 4 para que
// los saltos a 1'' no resulten estridentes.

const J = (o) => ({ type: 'jingle', category: 'jingle', octaves: { lead: 4, harm: 4, bass: 3 }, noAutoEnding: true, ...o });

export default [
  J({
    id: 'logo-brillo', title: 'Logo brillante', tags: ['logo', 'marca', 'destello'], desc: 'Arpegio veloz que termina en un destello: revelado de logo.',
    bpm: 140, key: 'C', mode: 'major', inst: { lead: 'lead.bright' },
    sections: {
      a: { chords: '1', harm: 'arp', bass: 'root', drums: 'none', lead: '1:1 3:1 5:1 1\':1 3\':1 5\':1 1\'\':1 . 5\':1 1\'\':7' },
      b: { chords: '1', harm: 'pad', bass: 'root', drums: 'end', lead: '!1\'\':12 . . . .' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'logo-poderoso', title: 'Logo poderoso', tags: ['logo', 'épico', 'impacto'], desc: 'Dos golpes de anticipación y acorde mayor final (picardía).',
    bpm: 100, key: 'C', mode: 'minor', inst: { lead: 'lead.saw', harm: 'harm.stab' },
    sections: {
      a: { chords: '6:2 7:2', harm: 'stab', bass: 'pump', drums: 'toms', lead: '6:4 . . 6:1 6:1 7:4 . . 7:1 7:1' },
      b: { chords: '1M', harm: 'pad', bass: 'root', drums: 'hit', lead: '!1\':16' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'inicio-caso', title: 'Inicio de caso', tags: ['curso', 'caso', 'misión', 'datos'], desc: 'Sello corto para arrancar un caso del curso.',
    bpm: 120, key: 'D', mode: 'dorian', inst: { lead: 'lead.morph', harm: 'harm.pluck' },
    sections: {
      a: { chords: '1:2 4:2', harm: 'arp', bass: 'octave', drums: 'beat', lead: '1\':2 3\':2 5\':2 1\'\':2 6\':2 . 4\':2 6\':2 .' },
      b: { chords: '7:2 1:2', harm: 'pad', bass: 'root', drums: 'hit', lead: '7\':2 2\'\':2 3\'\':2 4\'\':2 !5\':8' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'nivel-inicio', title: 'Inicio de nivel', tags: ['comenzar', 'nivel', 'misión'], desc: '¡A jugar! Jingle de arranque de nivel o sección.',
    bpm: 150, key: 'G', mode: 'major',
    sections: {
      a: { chords: '1:2 4:2', harm: 'offbeat', bass: 'octave', drums: 'beat', lead: '1\':2 3\':2 5\':2 1\'\':2 6\':2 4\':2 6\':2 1\'\':2' },
      b: { chords: '5:2 1:2', harm: 'pad', bass: 'root', drums: 'hit', lead: '7\':2 2\'\':2 5\'\':2 . . !1\'\':8' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'nivel-completo', title: 'Nivel completado', tags: ['éxito', 'meta', 'superado'], desc: 'Fanfarria de nivel superado en arpegios ascendentes.',
    bpm: 160, key: 'C', mode: 'major', inst: { lead: 'lead.square' },
    sections: {
      a: { chords: '1 4', harm: 'pulse8', bass: 'octave', drums: 'rock', lead: ['5:2 1\':2 3\':2 5\':2 3\':2 5\':6', '6:2 1\':2 4\':2 6\':2 4\':2 6\':6'] },
      b: { chords: '5 1', harm: 'pad', bass: 'root', drums: 'end', lead: ['7:2 2\':2 5\':2 7\':2 5\':2 7\':6', '!1\'\':16'] },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'logro', title: 'Logro desbloqueado', tags: ['logro', 'insignia', 'XP'], desc: 'Remate brillante para insignias y logros.',
    bpm: 130, key: 'E', mode: 'major', inst: { lead: 'lead.bright' },
    sections: {
      a: { chords: '1:2 4:2', harm: 'arp', bass: 'root', drums: 'none', lead: '5\':1 . 5\':1 . 6\':2 7\':2 1\'\':4 3\'\':4' },
      b: { chords: '1', harm: 'pad', bass: 'root', drums: 'end', lead: '!5\'\':12 . . . .' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'objeto-especial', title: 'Objeto especial', tags: ['objeto', 'tesoro', 'encontrar'], desc: 'Fanfarria de “has obtenido…” con IV–V–I.',
    bpm: 120, key: 'D', mode: 'major', inst: { lead: 'lead.square' },
    sections: {
      a: { chords: '4:2 5:2', harm: 'arp', bass: 'root', drums: 'none', lead: '6:2 1\':2 4\':2 6\':2 7:2 2\':2 5\':2 7\':2' },
      b: { chords: '1', harm: 'pad', bass: 'root', drums: 'end', lead: '!1\'\':16' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'mision-cumplida', title: 'Misión cumplida', tags: ['misión', 'militar', 'deber'], desc: 'Toque de corneta: misión cumplida.',
    bpm: 120, key: 'C', mode: 'major', inst: { lead: 'lead.square', harm: 'harm.stab' },
    sections: {
      a: { chords: '1', harm: 'stab', bass: 'march', drums: 'march', lead: '5:2 . 5:1 5:1 1\':8 . . .' },
      b: { chords: '4:2 5:2', harm: 'stab', bass: 'march', drums: 'march', lead: '6:3 . 6:1 6:1 6:2 7:3 . 7:1 7:1 7:2' },
      c: { chords: '1', harm: 'pad', bass: 'root', drums: 'hit', lead: '!1\'\':16' },
    },
    form: ['a', 'b', 'c'],
  }),
  J({
    id: 'game-over', title: 'Fin del juego', tags: ['derrota', 'perder', 'fin'], desc: 'Descenso menor lento: fin del juego.',
    bpm: 80, key: 'C', mode: 'minor', inst: { lead: 'lead.soft', harm: 'harm.padSoft' },
    sections: {
      a: { chords: '1:2 6:2', harm: 'pad', bass: 'root', drums: 'none', lead: '5\':4 4\':4 3\':4 2\':4' },
      b: { chords: '4:2 5M:2', harm: 'pad', bass: 'root', drums: 'none', lead: '1\':4 6:4 #7:8' },
      c: { chords: '1', harm: 'pad', bass: 'root', drums: 'none', lead: '1\':16' },
    },
    form: ['a', 'b', 'c'],
  }),
  J({
    id: 'derrota-comica', title: 'Derrota cómica', tags: ['wah wah', 'fallo', 'cómico'], desc: 'El clásico “wah wah wah wahhh” de trombón triste.',
    bpm: 90, key: 'C', mode: 'major', inst: { lead: 'lead.wah' },
    sections: {
      a: { chords: '5', harm: 'none', bass: 'none', drums: 'none', lead: '5\':4 #4\':4 4\':4 3\':4' },
      b: { chords: '1', harm: 'none', bass: 'none', drums: 'none', lead: '3\':16' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'pregunta', title: 'Pregunta', tags: ['quiz', 'duda', 'reto'], desc: 'Frase que queda en suspenso: plantear una pregunta o reto.',
    bpm: 110, key: 'A', mode: 'minor', inst: { lead: 'lead.square' },
    sections: {
      a: { chords: '4:2 5M:2', harm: 'stab', bass: 'quarter', drums: 'none', lead: '4\':2 . 6\':2 . #7\':2 . 2\'\':4 . . .' },
      b: { chords: '5M', harm: 'pad', bass: 'root', drums: 'none', lead: '#7\':12 . . . .' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'respuesta-correcta', title: 'Respuesta correcta', tags: ['correcto', 'acierto', 'quiz'], desc: 'Acierto: arpegio mayor ascendente.',
    bpm: 140, key: 'C', mode: 'major', inst: { lead: 'lead.bright' },
    sections: {
      a: { chords: '1:2 5:2', harm: 'stab', bass: 'octave', drums: 'none', lead: '1\':2 3\':2 5\':2 . . 3\':2 5\':6' },
      b: { chords: '1', harm: 'pad', bass: 'root', drums: 'end', lead: '!1\'\':12 . . . .' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'respuesta-incorrecta', title: 'Respuesta incorrecta', tags: ['error', 'fallo', 'quiz'], desc: 'Fallo: semitono disonante que cae.',
    bpm: 110, key: 'C', mode: 'minor', inst: { lead: 'lead.square', harm: 'harm.stab' },
    sections: {
      a: { chords: 'b2:2 1:2', harm: 'stab', bass: 'half', drums: 'none', lead: 'b2\':4 . . 1\':8 . .' },
    },
    form: ['a'],
  }),
  J({
    id: 'revelacion', title: 'Revelación', tags: ['revelar', 'giro', 'dramático'], desc: 'Redoble y acorde mayor sorpresivo: el gran dato revelado.',
    bpm: 72, key: 'D', mode: 'minor', inst: { lead: 'lead.square' },
    sections: {
      a: { chords: '6:2 7:2', harm: 'pad', bass: 'root', drums: 'roll', lead: '3\':4 4\':4 5\':8' },
      b: { chords: '1M', harm: 'pad', bass: 'root', drums: 'hit', lead: '!1\'\':16' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'suspenso', title: 'Suspenso', tags: ['dun dun dun', 'dramático', 'giro'], desc: 'El “tan tan taaan” dramático.',
    bpm: 70, key: 'C', mode: 'minor', inst: { lead: 'lead.saw', harm: 'harm.saw' },
    sections: {
      a: { chords: '1 1', harm: 'stab', bass: 'root', drums: 'none', lead: ['5:3 . 5:3 . 6:8', '5:16'] },
    },
    form: ['a'],
  }),
  J({
    id: 'transicion-alegre', title: 'Transición alegre', tags: ['transición', 'escala', 'cambio'], desc: 'Escala ascendente rápida para pasar de escena.',
    bpm: 150, key: 'F', mode: 'major', inst: { lead: 'lead.bright' },
    sections: {
      a: { chords: '1:2 4:2', harm: 'offbeat', bass: 'octave', drums: 'beat', lead: '1\':1 2\':1 3\':1 4\':1 5\':1 6\':1 7\':1 1\'\':1 2\'\':1 3\'\':1 4\'\':1 5\'\':1 !6\'\':4' },
      b: { chords: '5:2 1:2', harm: 'pad', bass: 'root', drums: 'hit', lead: '7\':4 5\':4 !1\'\':8' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'transicion-misterio', title: 'Transición misteriosa', tags: ['transición', 'misterio', 'frigio'], desc: 'Paso de escena con color frigio.',
    bpm: 80, key: 'E', mode: 'phrygian', inst: { lead: 'lead.ghost', harm: 'harm.bell' },
    sections: {
      a: { chords: '1:2 2:2', harm: 'arp', bass: 'drone', drums: 'none', lead: '1\'\':2 7\':2 6\':2 5\':2 2\'\':4 1\'\':4' },
      b: { chords: '1', harm: 'pad', bass: 'drone', drums: 'none', lead: '1\':16' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'capitulo-nuevo', title: 'Capítulo nuevo', tags: ['capítulo', 'título', 'sección'], desc: 'Cortinilla para títulos de capítulo o sección.',
    bpm: 100, key: 'A', mode: 'major', inst: { lead: 'lead.square' },
    sections: {
      a: { chords: '4 5', harm: 'arp8', bass: 'octave', drums: 'halftime', lead: ['6\':4 1\'\':4 3\'\':8', '5\':4 7\':4 2\'\':8'] },
      b: { chords: '1', harm: 'pad', bass: 'root', drums: 'hit', lead: '!1\'\':16' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'tienda', title: 'Tienda', tags: ['tienda', 'compra', 'mercado', 'tacos'], desc: 'Jingle comercial alegre con cencerro y madera.',
    bpm: 130, key: 'G', mode: 'major', inst: { lead: 'lead.bright' },
    sections: {
      a: { chords: '1:2 5:2', harm: 'offbeat', bass: 'tumbao', drums: 'latin', lead: '5\':2 3\':2 1\':2 3\':2 2\':2 7:2 5:4' },
      b: { chords: '1', harm: 'pad', bass: 'root', drums: 'end', lead: '1\':4 5\':4 !1\'\':8' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'datos-listos', title: 'Datos listos', tags: ['datos', 'listo', 'carga', 'IA'], desc: 'Remate lidio: el modelo terminó, los datos están listos.',
    bpm: 140, key: 'D', mode: 'lydian', inst: { lead: 'lead.morph', harm: 'harm.bell' },
    sections: {
      a: { chords: '1:2 2:2', harm: 'arp', bass: 'octave', drums: 'none', lead: '1\':2 3\':2 5\':2 4\':2 2\'\':4 6\':4' },
      b: { chords: '1', harm: 'pad', bass: 'root', drums: 'end', lead: '!3\'\':4 !5\'\':12' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'continuara', title: 'Continuará…', tags: ['cliffhanger', 'próximo episodio', 'suspenso'], desc: 'Final abierto sobre dominante: “continuará…”.',
    bpm: 90, key: 'E', mode: 'minor', inst: { lead: 'lead.square' },
    sections: {
      a: { chords: '4', harm: 'arp8', bass: 'half', drums: 'none', lead: '6\':8 1\'\':8' },
      b: { chords: '5M', harm: 'pad', bass: 'root', drums: 'roll', lead: '#7\':4 2\'\':4 4\'\':8' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'fallo-sistema', title: 'Fallo del sistema', tags: ['error', 'caída', 'cromático'], desc: 'Descenso cromático en sierra: algo se rompió.',
    bpm: 120, key: 'C', mode: 'major', inst: { lead: 'lead.saw', harm: 'harm.saw' },
    sections: {
      a: { chords: '1', harm: 'none', bass: 'none', drums: 'none', lead: '5\':2 b5\':2 4\':2 3\':2 b3\':2 2\':2 b2\':2 1\':2' },
      b: { chords: 'b2', harm: 'stab', bass: 'root', drums: 'hit', lead: '1:16' },
    },
    form: ['a', 'b'],
  }),
  J({
    id: 'eureka', title: '¡Eureka!', tags: ['idea', 'hallazgo', 'insight'], desc: 'Chispazo de idea: dos destellos y nota alta.',
    bpm: 130, key: 'G', mode: 'major', inst: { lead: 'lead.chime', harm: 'harm.bell' },
    sections: {
      a: { chords: '4:2 5:2', harm: 'arp', bass: 'root', drums: 'none', lead: '1\':1 2\':1 3\':1 5\':1 . . . . 2\':1 3\':1 4\':1 6\':1 . . . .' },
      b: { chords: '1', harm: 'pad', bass: 'root', drums: 'end', lead: '!5\':4 !1\'\':12' },
    },
    form: ['a', 'b'],
  }),
];
