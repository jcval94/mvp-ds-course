// Ánimos y situaciones: cómo se ajusta la biblioteca al momento.
// Un ánimo transforma cualquier canción (modo, tempo, intensidad, timbre).
// Una situación elige canción + ajustes + efectos recomendados.

export const MOODS = {
  original: { label: 'Original' },
  heroico: { label: 'Heroico', toMode: { minor: 'major', harmonicMinor: 'major', dorian: 'mixolydian', phrygian: 'major', phrygianDominant: 'major' }, tempo: 1.05, intensityDelta: 1 },
  alegre: { label: 'Alegre', toMode: { minor: 'major', harmonicMinor: 'major', dorian: 'major', phrygian: 'major', phrygianDominant: 'mixolydian' }, tempo: 1.1 },
  oscuro: { label: 'Oscuro', toMode: { major: 'minor', mixolydian: 'dorian', lydian: 'minor', minor: 'phrygian', dorian: 'phrygian', harmonicMinor: 'phrygian' }, tempo: 0.9 },
  misterioso: { label: 'Misterioso', toMode: { major: 'dorian', minor: 'dorian', lydian: 'dorian', mixolydian: 'dorian' }, tempo: 0.85, intensity: 1, inst: { lead: 'lead.ghost' } },
  tenso: { label: 'Tenso', toMode: { major: 'harmonicMinor', minor: 'harmonicMinor', dorian: 'harmonicMinor', mixolydian: 'harmonicMinor', lydian: 'harmonicMinor' }, tempo: 1.12, intensity: 3 },
  triste: { label: 'Triste', toMode: { major: 'minor', mixolydian: 'minor', lydian: 'minor', dorian: 'minor' }, tempo: 0.78, intensity: 1, inst: { lead: 'lead.soft' } },
  tierno: { label: 'Tierno', toMode: { minor: 'major', harmonicMinor: 'major', phrygian: 'major' }, tempo: 0.85, intensity: 1, inst: { lead: 'lead.flute', harm: 'harm.padSoft' } },
  epico: { label: 'Épico', tempo: 0.95, intensity: 3, curve: 'build' },
  sonador: { label: 'Soñador', toMode: { major: 'lydian', minor: 'dorian', mixolydian: 'lydian' }, tempo: 0.9, inst: { lead: 'lead.chime' } },
  exotico: { label: 'Exótico', toMode: { major: 'phrygianDominant', minor: 'phrygianDominant', dorian: 'phrygianDominant', mixolydian: 'phrygianDominant' } },
  urgente: { label: 'Urgente', tempo: 1.25, intensity: 3 },
  relajado: { label: 'Relajado', tempo: 0.82, intensity: 1 },
  retro: { label: 'Radio retro', tone: 'radio' },
};

export function applyMood(song, opts = {}) {
  const mood = MOODS[opts.mood];
  if (!mood || opts.mood === 'original') return opts;
  const baseMode = opts.mode ?? song.mode ?? 'major';
  const out = { ...opts };
  if (mood.toMode && !opts.mode && mood.toMode[baseMode]) out.mode = mood.toMode[baseMode];
  if (mood.tempo && opts.tempo === undefined) out.tempo = mood.tempo;
  if (mood.intensity !== undefined && opts.intensity === undefined) out.intensity = mood.intensity;
  if (mood.intensityDelta && opts.intensity === undefined) out.intensity = Math.min(3, (song.intensity ?? 2) + mood.intensityDelta);
  if (mood.curve && !opts.curve) out.curve = mood.curve;
  if (mood.tone && !opts.tone) out.tone = mood.tone;
  if (mood.inst) out.inst = { ...mood.inst, ...(opts.inst || {}) };
  return out;
}

// Situaciones típicas de un video o animación.
// duration: sugerida (s) · song: primera opción · alt: alternativas · sfx: efectos a mano
export const SITUATIONS = {
  'intro-caso': {
    label: 'Intro de un caso del curso', duration: 12,
    song: 'laboratorio-de-datos', alt: ['caso-nuevo', 'descubrimiento', 'inicio-caso'],
    opts: { curve: 'build', intensity: 2 }, sfx: ['power-on', 'scene-change', 'voice-mid', 'impact'],
  },
  'logo': {
    label: 'Revelado de logo / marca', duration: 3,
    song: 'logo-brillo', alt: ['logo-poderoso', 'datos-listos'], sfx: ['shine', 'sparkle', 'whoosh'],
  },
  'titulo': {
    label: 'Pantalla de título', duration: 8,
    song: 'amanecer-heroico', alt: ['aventura-pixel', 'titular'], opts: { curve: 'build' }, sfx: ['stinger-hit', 'impact', 'swoosh-up'],
  },
  'narracion': {
    label: 'Fondo bajo narración', duration: 30,
    song: 'menu-tranquilo', alt: ['procesando', 'atardecer', 'jardin-zen'], opts: { mix: 'underscore', intensity: 1, loop: true },
    sfx: ['voice-mid', 'page-flip', 'pop-soft'],
  },
  'explicacion-datos': {
    label: 'Explicar una gráfica o resultado', duration: 20,
    song: 'procesando', alt: ['red-neuronal', 'codigo-fuente'], opts: { mix: 'underscore', intensity: 1 },
    sfx: ['graph-reveal', 'chart-grow', 'counter-roll', 'insight', 'pop'],
  },
  'hallazgo': {
    label: 'Momento ¡ajá! / hallazgo', duration: 6,
    song: 'descubrimiento', alt: ['eureka', 'revelacion'], opts: { curve: 'build' }, sfx: ['insight', 'shine', 'sparkle'],
  },
  'misterio': {
    label: 'Planteamiento de un enigma', duration: 20,
    song: 'sombras-del-archivo', alt: ['enigma', 'pistas-ocultas', 'cripta'], opts: { intensity: 1 },
    sfx: ['question', 'heartbeat', 'clock-tick', 'reverse-hit'],
  },
  'investigacion': {
    label: 'Buscar pistas / revisar evidencia', duration: 20,
    song: 'pistas-ocultas', alt: ['caso-nuevo', 'enigma'], sfx: ['scan', 'page-flip', 'radar', 'stamp'],
  },
  'error': {
    label: 'Error / algo salió mal', duration: 4,
    song: 'respuesta-incorrecta', alt: ['fallo-sistema', 'derrota-comica', 'lluvia-gris'], sfx: ['fail', 'error-glitch', 'ui-error', 'glitch'],
  },
  'acierto': {
    label: 'Respuesta correcta / validación', duration: 3,
    song: 'respuesta-correcta', alt: ['logro', 'nivel-completo'], sfx: ['success', 'ui-confirm', 'coin'],
  },
  'quiz': {
    label: 'Pregunta al público / reto', duration: 4,
    song: 'pregunta', alt: ['enigma'], sfx: ['question', 'clock-tick', 'ui-countdown'],
  },
  'cuenta-atras': {
    label: 'Cuenta atrás / plazo', duration: 15,
    song: 'bomba-reloj', alt: ['cuenta-regresiva'], opts: { curve: 'build' }, sfx: ['clock-tick', 'clock-tock', 'alarm', 'ui-countdown-go'],
  },
  'accion': {
    label: 'Montaje rápido / acción', duration: 20,
    song: 'persecucion', alt: ['carrera-turbo', 'batalla', 'ninja-nocturno'], opts: { intensity: 3 }, sfx: ['whoosh', 'dash', 'impact', 'punch'],
  },
  'peligro': {
    label: 'Peligro / gran problema', duration: 20,
    song: 'jefe-final', alt: ['amenaza', 'bomba-reloj'], sfx: ['alarm', 'rumble', 'hit-heavy', 'warning'],
  },
  'calma': {
    label: 'Respiro / reflexión', duration: 20,
    song: 'atardecer', alt: ['jardin-zen', 'noche-estrellada'], opts: { intensity: 1 }, sfx: ['wind', 'bird', 'water-drop'],
  },
  'triste': {
    label: 'Fracaso / despedida triste', duration: 15,
    song: 'lluvia-gris', alt: ['recuerdo', 'game-over'], sfx: ['rain', 'powerdown'],
  },
  'flashback': {
    label: 'Flashback / contexto histórico', duration: 15,
    song: 'recuerdo', alt: ['travesia'], opts: { tone: 'radio' }, sfx: ['rewind', 'static', 'page-flip'],
  },
  'celebracion': {
    label: 'Celebración / meta alcanzada', duration: 12,
    song: 'fiesta-final', alt: ['victoria-gloriosa', 'mision-cumplida', 'logro'], sfx: ['applause', 'level-up', 'coin-bag', 'sparkle'],
  },
  'humor': {
    label: 'Momento cómico', duration: 10,
    song: 'torpeza', alt: ['caricatura', 'travesura', 'derrota-comica'], sfx: ['boing', 'squeak', 'fall-whistle', 'wobble'],
  },
  'mercado': {
    label: 'Puesto / mercado / negocio', duration: 15,
    song: 'puesto-de-tacos', alt: ['cumbia-pixel', 'tienda'], sfx: ['cash', 'sizzle', 'bell', 'coin'],
  },
  'transicion': {
    label: 'Cambio de escena', duration: 2,
    song: 'transicion-alegre', alt: ['transicion-misterio', 'capitulo-nuevo'], sfx: ['wipe', 'whoosh', 'riser-short', 'scene-change'],
  },
  'capitulo': {
    label: 'Título de capítulo o sección', duration: 4,
    song: 'capitulo-nuevo', alt: ['nivel-inicio', 'inicio-caso'], sfx: ['stinger-hit', 'swoosh-up', 'stamp'],
  },
  'cierre': {
    label: 'Cierre / créditos', duration: 20,
    song: 'hasta-la-proxima', alt: ['creditos', 'continuara'], sfx: ['power-off', 'typewriter-bell'],
  },
  'cliffhanger': {
    label: 'Final abierto / continuará', duration: 4,
    song: 'continuara', alt: ['suspenso'], sfx: ['reverse-hit', 'impact'],
  },
  'dialogo': {
    label: 'Diálogo de personajes (caja de texto)', duration: 0,
    song: null, alt: [], sfx: ['voice-low', 'voice-mid', 'voice-high', 'voice-cute', 'voice-robot', 'typewriter', 'mumble'],
  },
};
