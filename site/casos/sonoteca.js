/* Sonoteca 8 bits en las intros: efectos, ambiente por escena y tema por caso.
   motor.js lo carga con import() solo cuando la persona enciende SONIDO (nunca con movimiento reducido).
   sonido/ es copia de src/ del repo sonido-8bits; aquí solo va el mapeo y la mezcla. */
import { ChipAudio } from './sonido/browser/player.js';
import { renderSfx } from './sonido/index.js';

/* los 9 efectos del motor → presets de la sonoteca; los demás siguen con el sintetizador del motor */
const EFECTOS = {
  pop: 'pop-soft', sello: 'stamp', revela: 'graph-reveal', ok: 'success', whoosh: 'whoosh',
  golpe: 'thud', pregunta: 'question', paso: 'step', puerta: 'door-open'
};

/* tema por caso (bucle, mezcla underscore) y ambiente por número de escena (null: sin ambiente) */
const CASOS = {
  '1.1': { tema: 'pistas-ocultas', ambiente: ['engine', 'engine', 'clock-tick', 'clock-tick', null] },
  '1.2': { tema: 'sombras-del-archivo', ambiente: ['clock-tick', null, null, null, null] },
  '1.4': { tema: 'lluvia-gris', ambiente: ['wind', 'clock-tick', null] },
  '13.11': { tema: 'enigma', ambiente: ['engine', 'wind', null] },
  '2.1': { tema: 'sombras-del-archivo', ambiente: ['rain', 'water-drop', 'water-drop', 'clock-tick', null] },
  '2.2': { tema: 'recuerdo', ambiente: ['wind', 'clock-tick', 'clock-tick', null, null] },
  '2.3': { tema: 'enigma', ambiente: ['wind', null, null] },
  '2.4': { tema: 'sombras-del-archivo', ambiente: ['bird', 'clock-tick', null, null, null] },
  '4.1': { tema: 'noche-estrellada', ambiente: ['cricket', 'clock-tick', 'clock-tick', null, null] },
  '4.2': { tema: 'pistas-ocultas', ambiente: ['clock-tick', null, null, null, null] }
};
const TEMA_BASE = 'sombras-del-archivo';
/* los ambientes cortos se repiten con silencio en medio (segundos entre golpes), no como zumbido */
const PERIODO = { 'clock-tick': 1, 'water-drop': 2.5, bird: 4, cricket: 1.2 };

/* niveles de mezcla: la voz manda; la música va por debajo y el ambiente más abajo */
const VOL = { master: 0.55, music: 0.32, sfx: 0.5, ambiente: 0.18, bajoVoz: 0.3 };

export async function crear(idCaso) {
  const a = new ChipAudio({ volume: VOL.master, musicVolume: VOL.music, sfxVolume: VOL.sfx });
  await a.unlock();
  const caso = CASOS[idCaso] || { tema: TEMA_BASE, ambiente: [] };
  const amb = a.ctx.createGain();
  amb.gain.value = VOL.ambiente;
  amb.connect(a.master);
  let fuente = null, actual = null, tema = null, habla = false;

  function ponerAmbiente(id) {
    if (id === actual) return;
    if (fuente) { const f = fuente; f.g.gain.setTargetAtTime(0, a.ctx.currentTime, 0.3); setTimeout(() => f.s.stop(), 1500); }
    fuente = null; actual = id;
    if (!id) return;
    const r = renderSfx(id, { variation: 1 });
    const largo = Math.max(r.channels[0].length, Math.round((PERIODO[id] || 0) * r.sampleRate));
    const b = a.ctx.createBuffer(r.channels.length, largo, r.sampleRate);
    r.channels.forEach((c, i) => b.copyToChannel(c, i));
    const s = a.ctx.createBufferSource(), g = a.ctx.createGain();
    s.buffer = b; s.loop = true;
    g.gain.setValueAtTime(0, a.ctx.currentTime);
    g.gain.setTargetAtTime(1, a.ctx.currentTime, 0.4);
    s.connect(g).connect(amb); s.start();
    fuente = { s, g };
  }

  return {
    /* true si la sonoteca tocó el efecto; false para que el motor use su sintetizador */
    sfx(n) {
      if (!EFECTOS[n]) return false;
      a.sfx(EFECTOS[n]);
      return true;
    },
    escena(n) {
      if (!tema) { tema = a.music(caso.tema, { loop: true, mix: 'underscore', intensity: 1, fadeIn: 1.5 }); if (habla) a.duck(VOL.bajoVoz); }
      ponerAmbiente(caso.ambiente[n] || null);
    },
    /* mezcla underscore: mientras habla la voz, la música y el ambiente bajan */
    voz(si) {
      habla = si;
      a.duck(si ? VOL.bajoVoz : 1);
      amb.gain.setTargetAtTime(VOL.ambiente * (si ? 0.5 : 1), a.ctx.currentTime, 0.1);
    },
    apagar() {
      ponerAmbiente(null);
      a.stopMusic(0.6);
      tema = null;
    }
  };
}
