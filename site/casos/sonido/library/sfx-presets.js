// Catálogo de efectos. Cada efecto recibe (r, j):
//   r() → aleatorio 0..1 de la variación pedida · j(x, p) → x ± p·x
// Así cada id produce variaciones coherentes con `variation: n`.

const C5 = 523.25;
const E5 = 659.26;
const G5 = 783.99;
const A5 = 880;
const B5 = 987.77;
const C6 = 1046.5;

export const SFX_CATEGORIES = {
  interfaz: 'Interfaz y menús',
  juego: 'Juego y plataformas',
  movimiento: 'Movimiento y animación',
  transicion: 'Transiciones',
  impacto: 'Impactos y explosiones',
  magia: 'Magia y poder',
  datos: 'Tecnología y datos',
  voz: 'Voces y texto',
  ambiente: 'Ambiente y objetos',
};

const list = [];
const P = (id, category, desc, tags, build) => list.push({ id, category, desc, tags, build });

// ── Interfaz ─────────────────────────────────────────────
P('ui-cursor', 'interfaz', 'Mover el cursor por un menú', ['menú', 'cursor', 'navegar'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(A5, 0.03), env: { h: 0.015, d: 0.03 } },
]);
P('ui-hover', 'interfaz', 'Pasar el ratón sobre un botón', ['hover', 'suave'], (r, j) => [
  { wave: 'triangle', freq: j(1568, 0.04), env: { h: 0.01, d: 0.025 } },
]);
P('ui-select', 'interfaz', 'Seleccionar una opción', ['seleccionar', 'clic'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(C6, 0.02), notes: [[0, 0.035], [7, 0.06]], env: { d: 0.04 } },
]);
P('ui-confirm', 'interfaz', 'Confirmar / aceptar', ['aceptar', 'ok', 'positivo'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(C5 * 2, 0.01), notes: [[0, 0.045], [4, 0.045], [7, 0.045], [12, 0.12]], retrigger: true, env: { d: 0.06 } },
]);
P('ui-cancel', 'interfaz', 'Cancelar / volver', ['cancelar', 'atrás', 'negativo'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(G5, 0.02), notes: [[0, 0.05], [-5, 0.1]], retrigger: true, env: { d: 0.05 } },
]);
P('ui-error', 'interfaz', 'Acción no permitida', ['error', 'denegado', 'buzz'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(196, 0.03), notes: [[0, 0.09], [null, 0.04], [0, 0.14]], retrigger: true, env: { d: 0.03 } },
  { wave: 'square', duty: 0.5, freq: j(207, 0.03), notes: [[0, 0.09], [null, 0.04], [0, 0.14]], retrigger: true, env: { d: 0.03 }, gain: 0.5 },
]);
P('ui-open', 'interfaz', 'Abrir menú o ventana', ['abrir', 'menú', 'subida'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(330, 0.03), slide: 110, stepped: true, env: { h: 0.08, d: 0.05 } },
]);
P('ui-close', 'interfaz', 'Cerrar menú o ventana', ['cerrar', 'menú', 'bajada'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(990, 0.03), slide: -110, stepped: true, env: { h: 0.08, d: 0.05 } },
]);
P('ui-toggle-on', 'interfaz', 'Interruptor encendido', ['activar', 'on'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(E5, 0.02), notes: [[0, 0.04], [12, 0.07]], retrigger: true, env: { d: 0.04 } },
]);
P('ui-toggle-off', 'interfaz', 'Interruptor apagado', ['desactivar', 'off'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(E5 * 2, 0.02), notes: [[0, 0.04], [-12, 0.07]], retrigger: true, env: { d: 0.04 } },
]);
P('ui-pause', 'interfaz', 'Pausa del juego', ['pausa', 'detener'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(B5, 0.01), notes: [[0, 0.06], [-5, 0.06], [0, 0.06], [-5, 0.14]], retrigger: true, env: { d: 0.05 } },
]);
P('ui-notify', 'interfaz', 'Notificación amable', ['aviso', 'campana', 'mensaje'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(E5 * 2, 0.02), notes: [[0, 0.08], [5, 0.25]], retrigger: true, env: { d: 0.2, curve: 2 } },
  { wave: 'triangle', freq: j(E5, 0.02), notes: [[0, 0.08], [5, 0.25]], retrigger: true, env: { d: 0.2 }, gain: 0.6 },
]);
P('ui-tick', 'interfaz', 'Tic de conteo o deslizador', ['tic', 'conteo', 'slider'], (r, j) => [
  { wave: 'noise', noise: 'short', freq: j(120000, 0.1), env: { h: 0.005, d: 0.02 } },
]);
P('ui-countdown', 'interfaz', 'Cuenta regresiva (3, 2, 1)', ['cuenta', 'regresiva', 'carrera'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(440, 0.01), env: { h: 0.12, d: 0.05 } },
]);
P('ui-countdown-go', 'interfaz', '¡Ya! al terminar la cuenta', ['salida', 'go', 'inicio'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(880, 0.01), env: { h: 0.35, d: 0.2 }, vib: { depth: 0.1, rate: 8 } },
  { wave: 'square', duty: 0.25, freq: j(880 * 1.5, 0.01), env: { h: 0.35, d: 0.2 }, gain: 0.5 },
]);
P('ui-unlock', 'interfaz', 'Desbloquear opción', ['desbloquear', 'nuevo'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(G5, 0.02), notes: [[0, 0.05], [5, 0.05], [10, 0.05], [15, 0.05], [19, 0.18]], retrigger: true, env: { d: 0.1 } },
]);

// ── Juego ────────────────────────────────────────────────
P('coin', 'juego', 'Moneda clásica de dos notas', ['moneda', 'recompensa', 'punto'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(B5, 0.015), jumps: [[0.075, 5]], env: { h: 0.06, d: 0.42, curve: 1.5 } },
]);
P('coin-bag', 'juego', 'Varias monedas seguidas', ['monedas', 'tesoro', 'botín'], (r, j) => [0, 0.07, 0.15, 0.21].map((at, i) => (
  { at, wave: 'square', duty: 0.5, freq: j(B5 * Math.pow(2, i / 24), 0.02), jumps: [[0.05, 5]], env: { h: 0.04, d: 0.2 } }
)));
P('gem', 'juego', 'Gema o cristal valioso', ['gema', 'brillo', 'premio'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(C6, 0.02), notes: [[0, 0.04], [7, 0.04], [12, 0.04], [19, 0.04], [24, 0.25]], retrigger: true, env: { d: 0.2, curve: 2 } },
]);
P('jump', 'juego', 'Salto', ['salto', 'brinco'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(220, 0.05), slide: j(60, 0.1), env: { h: 0.12, d: 0.08 } },
]);
P('jump-small', 'juego', 'Salto pequeño y ligero', ['salto', 'ligero'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(440, 0.05), slide: j(80, 0.1), env: { h: 0.06, d: 0.05 } },
]);
P('jump-big', 'juego', 'Súper salto', ['salto', 'potente'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(150, 0.05), slide: j(42, 0.1), slideAccel: -20, env: { h: 0.22, d: 0.12 }, vib: { depth: 0.3, rate: 14 } },
]);
P('double-jump', 'juego', 'Doble salto en el aire', ['salto', 'aire'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(330, 0.04), slide: 70, env: { h: 0.07, d: 0.03 } },
  { at: 0.09, wave: 'square', duty: 0.125, freq: j(500, 0.04), slide: 90, env: { h: 0.08, d: 0.06 } },
]);
P('land', 'juego', 'Aterrizar en el suelo', ['caer', 'suelo', 'paso'], (r, j) => [
  { wave: 'noise', freq: j(9000, 0.15), env: { h: 0.01, d: 0.07 } },
  { wave: 'triangle', freq: j(110, 0.05), slide: -60, env: { h: 0.02, d: 0.05 } },
]);
P('step', 'juego', 'Paso / pisada', ['paso', 'caminar'], (r, j) => [
  { wave: 'noise', freq: j(16000, 0.3), env: { h: 0.005, d: 0.035 } },
]);
P('powerup', 'juego', 'Recoger un potenciador', ['poder', 'mejora', 'subir'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(262, 0.02), notes: [0, 4, 7, 12, 4, 7, 12, 16, 7, 12, 16, 19, 12, 16, 19, 24].map((s) => [s, 0.032]), env: { d: 0.06 } },
]);
P('powerdown', 'juego', 'Perder un potenciador', ['perder', 'bajar', 'daño'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(523, 0.02), notes: [12, 7, 9, 4, 5, 0, 2, -3, -2, -7].map((s) => [s, 0.045]), env: { d: 0.06 } },
]);
P('extra-life', 'juego', 'Vida extra', ['vida', '1up', 'premio'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(E5, 0.01), notes: [[0, 0.09], [3, 0.09], [12, 0.09], [8, 0.09], [10, 0.09], [15, 0.2]], retrigger: true, env: { d: 0.1 } },
]);
P('heal', 'juego', 'Curar / recuperar vida', ['curar', 'vida', 'corazón'], (r, j) => [
  { wave: 'triangle', freq: j(C5, 0.02), notes: [0, 4, 7, 12, 16].map((s) => [s, 0.06]), env: { d: 0.25 }, vib: { depth: 0.15, rate: 9 } },
  { wave: 'square', duty: 0.125, freq: j(C5 * 2, 0.02), notes: [0, 4, 7, 12, 16].map((s) => [s, 0.06]), env: { d: 0.2 }, gain: 0.4 },
]);
P('hurt', 'juego', 'Recibir daño', ['daño', 'golpe', 'dolor'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(400, 0.06), slide: -70, env: { h: 0.05, d: 0.12 }, vib: { depth: 1.5, rate: 30 } },
  { wave: 'noise', freq: j(20000, 0.2), env: { h: 0.02, d: 0.1 }, gain: 0.6 },
]);
P('death', 'juego', 'Perder una vida', ['muerte', 'perder', 'fin'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(B5, 0.01), notes: [[0, 0.1], [null, 0.08], [-1, 0.07], [-2, 0.07], [-3, 0.07], [-5, 0.07], [-7, 0.07], [-9, 0.07], [-12, 0.3]], retrigger: true, env: { d: 0.1 } },
]);
P('laser', 'juego', 'Disparo láser', ['disparo', 'láser', 'pew'], (r, j) => [
  { wave: 'square', duty: j(0.25, 0.3), freq: j(1800, 0.1), slide: j(-90, 0.15), env: { h: 0.02, d: 0.13 }, minFreq: 80 },
]);
P('laser-heavy', 'juego', 'Cañón pesado', ['disparo', 'cañón', 'potente'], (r, j) => [
  { wave: 'saw', freq: j(700, 0.1), slide: -60, env: { h: 0.05, d: 0.25 }, minFreq: 40 },
  { wave: 'noise', freq: j(60000, 0.1), slide: -40, env: { h: 0.03, d: 0.25 }, gain: 0.7 },
]);
P('shoot', 'juego', 'Disparo corto', ['disparo', 'bala'], (r, j) => [
  { wave: 'noise', freq: j(90000, 0.15), slide: -50, env: { h: 0.01, d: 0.1 } },
  { wave: 'square', duty: 0.5, freq: j(600, 0.1), slide: -120, env: { h: 0.01, d: 0.05 }, gain: 0.5 },
]);
P('fireball', 'juego', 'Bola de fuego', ['fuego', 'disparo', 'bola'], (r, j) => [
  { wave: 'noise', freq: j(40000, 0.1), slide: -25, env: { h: 0.05, d: 0.2 } },
  { wave: 'square', duty: 0.125, freq: j(800, 0.05), slide: -40, env: { h: 0.02, d: 0.12 }, gain: 0.5 },
]);
P('enemy-hit', 'juego', 'Golpear a un enemigo', ['golpe', 'enemigo'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(300, 0.05), slide: 80, stepped: true, env: { h: 0.04, d: 0.04 } },
  { wave: 'noise', freq: j(50000, 0.1), env: { h: 0.01, d: 0.05 }, gain: 0.7 },
]);
P('enemy-defeat', 'juego', 'Enemigo derrotado (puf)', ['derrota', 'puf', 'humo'], (r, j) => [
  { wave: 'noise', freq: j(30000, 0.1), slide: -30, env: { h: 0.05, d: 0.3 } },
  { wave: 'square', duty: 0.25, freq: j(800, 0.05), slide: -48, stepped: true, env: { h: 0.05, d: 0.15 }, gain: 0.5 },
]);
P('stomp', 'juego', 'Pisar a un enemigo', ['pisar', 'aplastar'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(330, 0.03), slide: 120, stepped: true, env: { h: 0.03, d: 0.04 } },
  { at: 0.05, wave: 'square', duty: 0.5, freq: j(440, 0.03), slide: 120, stepped: true, env: { h: 0.03, d: 0.04 } },
]);
P('bump', 'juego', 'Cabezazo contra un bloque', ['bloque', 'golpe', 'tope'], (r, j) => [
  { wave: 'triangle', freq: j(180, 0.04), slide: -40, env: { h: 0.03, d: 0.08 } },
  { wave: 'square', duty: 0.5, freq: j(120, 0.04), env: { h: 0.02, d: 0.05 }, gain: 0.4 },
]);
P('block-break', 'juego', 'Romper un bloque', ['romper', 'ladrillo', 'escombros'], (r, j) => [
  { wave: 'noise', freq: j(25000, 0.1), env: { h: 0.02, d: 0.28 }, tremolo: { depth: 0.6, rate: 28 } },
  { wave: 'triangle', freq: j(140, 0.05), slide: -50, env: { h: 0.02, d: 0.1 } },
]);
P('item-get', 'juego', 'Conseguir un objeto', ['objeto', 'recoger'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(G5, 0.01), notes: [[0, 0.06], [4, 0.06], [7, 0.06], [12, 0.2]], retrigger: true, env: { d: 0.08 } },
]);
P('key-get', 'juego', 'Encontrar una llave', ['llave', 'encontrar'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(C6, 0.01), notes: [[0, 0.05], [12, 0.05], [7, 0.05], [19, 0.25]], retrigger: true, env: { d: 0.2 }, vib: { depth: 0.1, rate: 10 } },
]);
P('door-open', 'juego', 'Abrir una puerta', ['puerta', 'abrir'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(110, 0.04), notes: [0, 2, 4, 5, 7, 9, 11, 12].map((s) => [s, 0.04]), env: { d: 0.05 } },
  { wave: 'noise', freq: j(4000, 0.1), env: { h: 0.3, d: 0.05 }, gain: 0.35 },
]);
P('chest-open', 'juego', 'Abrir un cofre', ['cofre', 'tesoro', 'sorpresa'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(330, 0.01), notes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((s) => [s, 0.035]), env: { d: 0.02 } },
  { at: 0.45, wave: 'square', duty: 0.25, freq: j(C6, 0.01), notes: [[0, 0.1], [4, 0.1], [7, 0.1], [12, 0.4]], retrigger: true, env: { d: 0.3 } },
]);
P('secret', 'juego', 'Secreto descubierto', ['secreto', 'misterio', 'descubrir'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(784, 0.01), notes: [[0, 0.09], [-1, 0.09], [-4, 0.09], [-10, 0.09], [-11, 0.09], [-3, 0.09], [1, 0.09], [5, 0.3]], retrigger: true, env: { d: 0.15 } },
]);
P('checkpoint', 'juego', 'Punto de control', ['guardar', 'bandera', 'control'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(C5, 0.01), notes: [[0, 0.08], [7, 0.08], [12, 0.25]], retrigger: true, env: { d: 0.15 } },
  { wave: 'triangle', freq: j(C5 / 2, 0.01), notes: [[0, 0.08], [7, 0.08], [12, 0.25]], retrigger: true, env: { d: 0.15 }, gain: 0.7 },
]);
P('bomb-fuse', 'juego', 'Mecha encendida', ['bomba', 'mecha', 'chispa'], (r, j) => [
  { wave: 'noise', noise: 'short', freq: j(150000, 0.1), env: { h: 1.0, d: 0.05 }, tremolo: { depth: 0.8, rate: 22 }, gain: 0.7 },
]);
P('teleport', 'juego', 'Teletransporte', ['teleport', 'desaparecer', 'viaje'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(300, 0.05), slide: 60, repeat: 0.1, env: { h: 0.35, d: 0.1 } },
  { wave: 'square', duty: 0.5, freq: j(600, 0.05), slide: -60, repeat: 0.1, env: { h: 0.35, d: 0.1 }, gain: 0.5 },
]);
P('warp', 'juego', 'Bajar por un tubo / portal', ['tubo', 'bajar', 'warp'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(440, 0.02), slide: -24, repeat: 0.18, stepped: true, env: { h: 0.6, d: 0.1 } },
]);
P('spring', 'juego', 'Resorte / trampolín', ['resorte', 'rebote', 'boing'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(220, 0.05), slide: 50, env: { h: 0.3, d: 0.1 }, vib: { depth: 2.5, rate: 16 } },
]);
P('swim', 'juego', 'Brazada bajo el agua', ['nadar', 'agua'], (r, j) => [
  { wave: 'triangle', freq: j(300, 0.05), slide: 30, env: { a: 0.02, h: 0.05, d: 0.1 } },
  { wave: 'noise', freq: j(8000, 0.1), env: { a: 0.02, h: 0.04, d: 0.1 }, gain: 0.3, lpf: 2000 },
]);
P('charge', 'juego', 'Cargar poder', ['cargar', 'energía', 'subir'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(150, 0.05), slide: 30, env: { a: 0.1, h: 0.8, d: 0.05 }, vib: { depth: 0.4, rate: 18 } },
  { wave: 'square', duty: 0.125, freq: j(300, 0.05), slide: 30, env: { a: 0.1, h: 0.8, d: 0.05 }, gain: 0.4 },
]);
P('dash', 'juego', 'Impulso rápido', ['impulso', 'velocidad'], (r, j) => [
  { wave: 'noise', freq: j(60000, 0.1), slide: 40, env: { a: 0.02, h: 0.05, d: 0.12 } },
]);
P('sword', 'juego', 'Espadazo', ['espada', 'corte', 'tajo'], (r, j) => [
  { wave: 'noise', freq: j(120000, 0.1), slide: -45, env: { h: 0.02, d: 0.12 } },
  { wave: 'square', duty: 0.125, freq: j(1400, 0.1), slide: -80, env: { h: 0.01, d: 0.06 }, gain: 0.3 },
]);
P('shield', 'juego', 'Bloquear con escudo', ['escudo', 'bloquear', 'metal'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(1200, 0.03), env: { h: 0.02, d: 0.2 }, vib: { depth: 0.6, rate: 40 } },
  { wave: 'noise', noise: 'short', freq: j(70000, 0.1), env: { h: 0.01, d: 0.1 }, gain: 0.6 },
]);
P('ladder', 'juego', 'Subir escalera', ['escalera', 'trepar'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(260, 0.04), env: { h: 0.02, d: 0.02 } },
]);
P('select-character', 'juego', 'Elegir personaje', ['personaje', 'elegir'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(392, 0.01), notes: [[0, 0.05], [7, 0.05], [12, 0.05], [7, 0.05], [12, 0.15]], retrigger: true, env: { d: 0.08 } },
]);

// ── Movimiento y animación ──────────────────────────────
P('whoosh', 'movimiento', 'Barrido de aire corto', ['whoosh', 'aire', 'paso rápido'], (r, j) => [
  { wave: 'noise', freq: j(20000, 0.1), slide: 55, env: { a: 0.08, h: 0.02, d: 0.14 }, lpf: 6000 },
]);
P('whoosh-long', 'movimiento', 'Barrido de aire largo', ['whoosh', 'aire', 'lento'], (r, j) => [
  { wave: 'noise', freq: j(9000, 0.1), slide: 22, env: { a: 0.35, h: 0.05, d: 0.45 }, lpf: 5000 },
]);
P('swoosh-up', 'movimiento', 'Elemento que sube', ['subir', 'entrar', 'barrido'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(200, 0.05), slide: 70, env: { a: 0.05, h: 0.12, d: 0.08 }, gain: 0.6 },
  { wave: 'noise', freq: j(15000, 0.1), slide: 50, env: { a: 0.08, h: 0.08, d: 0.1 }, gain: 0.6, lpf: 7000 },
]);
P('swoosh-down', 'movimiento', 'Elemento que baja', ['bajar', 'salir', 'barrido'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(1200, 0.05), slide: -70, env: { a: 0.02, h: 0.12, d: 0.1 }, gain: 0.6 },
  { wave: 'noise', freq: j(60000, 0.1), slide: -50, env: { a: 0.04, h: 0.08, d: 0.12 }, gain: 0.6, lpf: 7000 },
]);
P('pop', 'movimiento', 'Aparición tipo burbuja', ['pop', 'aparecer', 'burbuja'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(400, 0.08), slide: 260, env: { h: 0.025, d: 0.03 } },
]);
P('pop-soft', 'movimiento', 'Pop suave para íconos', ['pop', 'ícono', 'suave'], (r, j) => [
  { wave: 'triangle', freq: j(600, 0.08), slide: 200, env: { h: 0.02, d: 0.04 } },
]);
P('bubble', 'movimiento', 'Burbujas', ['burbuja', 'agua', 'gorgoteo'], (r, j) => [0, 0.06, 0.13].map((at) => (
  { at, wave: 'triangle', freq: j(500, 0.3), slide: j(150, 0.3), env: { h: 0.02, d: 0.04 } }
)));
P('bounce', 'movimiento', 'Rebote', ['rebote', 'pelota'], (r, j) => [
  { wave: 'triangle', freq: j(330, 0.04), slide: -40, env: { h: 0.04, d: 0.08 } },
  { at: 0.12, wave: 'triangle', freq: j(330, 0.04), slide: -40, env: { h: 0.03, d: 0.06 }, gain: 0.6 },
  { at: 0.21, wave: 'triangle', freq: j(330, 0.04), slide: -40, env: { h: 0.02, d: 0.04 }, gain: 0.35 },
]);
P('boing', 'movimiento', 'Boing de caricatura', ['boing', 'resorte', 'cómico'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(180, 0.05), slide: 15, env: { h: 0.35, d: 0.2 }, vib: { depth: 3, rate: 12 } },
]);
P('appear', 'movimiento', 'Aparecer con destello', ['aparecer', 'destello', 'brillo'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(800, 0.02), notes: [0, 5, 9, 12, 17, 21, 24].map((s) => [s, 0.03]), env: { d: 0.2 } },
  { wave: 'noise', noise: 'short', freq: j(200000, 0.1), env: { a: 0.1, h: 0.05, d: 0.15 }, gain: 0.2 },
]);
P('disappear', 'movimiento', 'Desaparecer', ['desaparecer', 'salir', 'esfumar'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(1600, 0.02), notes: [24, 21, 17, 12, 9, 5, 0].map((s) => [s, 0.03]), env: { d: 0.15 } },
]);
P('zoom-in', 'movimiento', 'Acercamiento de cámara', ['zoom', 'acercar'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(150, 0.05), slide: 48, slideAccel: 60, env: { a: 0.1, h: 0.25, d: 0.05 }, gain: 0.7 },
  { wave: 'noise', freq: j(8000, 0.1), slide: 40, env: { a: 0.2, h: 0.15, d: 0.05 }, gain: 0.5, lpf: 5000 },
]);
P('zoom-out', 'movimiento', 'Alejamiento de cámara', ['zoom', 'alejar'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(1500, 0.05), slide: -48, env: { a: 0.02, h: 0.3, d: 0.1 }, gain: 0.7 },
  { wave: 'noise', freq: j(60000, 0.1), slide: -40, env: { a: 0.02, h: 0.25, d: 0.1 }, gain: 0.5, lpf: 5000 },
]);
P('slide-in', 'movimiento', 'Panel que entra deslizando', ['deslizar', 'entrar', 'panel'], (r, j) => [
  { wave: 'noise', freq: j(30000, 0.1), slide: -20, env: { a: 0.02, h: 0.1, d: 0.08 }, lpf: 4000 },
  { at: 0.17, wave: 'triangle', freq: j(220, 0.03), env: { h: 0.02, d: 0.05 } },
]);
P('slide-out', 'movimiento', 'Panel que sale deslizando', ['deslizar', 'salir', 'panel'], (r, j) => [
  { wave: 'triangle', freq: j(220, 0.03), env: { h: 0.02, d: 0.05 } },
  { at: 0.04, wave: 'noise', freq: j(20000, 0.1), slide: 25, env: { a: 0.05, h: 0.08, d: 0.1 }, lpf: 4000 },
]);
P('spin', 'movimiento', 'Giro', ['girar', 'rotar', 'vuelta'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(400, 0.05), vib: { depth: 6, rate: 10 }, env: { h: 0.4, d: 0.1 }, gain: 0.8 },
]);
P('wobble', 'movimiento', 'Tambaleo gelatinoso', ['gelatina', 'tambaleo', 'cómico'], (r, j) => [
  { wave: 'triangle', freq: j(260, 0.05), vib: { depth: 2, rate: 7 }, env: { h: 0.4, d: 0.2 } },
]);
P('stretch', 'movimiento', 'Estirar (como chicle)', ['estirar', 'elástico'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(200, 0.05), slide: 18, dutySweep: -0.8, env: { a: 0.05, h: 0.4, d: 0.05 } },
]);
P('squeak', 'movimiento', 'Chirrido de juguete', ['chirrido', 'juguete', 'cómico'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(1400, 0.05), slide: 30, vib: { depth: 0.8, rate: 25 }, env: { h: 0.08, d: 0.05 } },
]);
P('fall-whistle', 'movimiento', 'Silbido de caída', ['caer', 'silbido', 'cómico'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(1800, 0.02), slide: -22, vib: { depth: 0.2, rate: 7 }, env: { h: 1.0, d: 0.1 } },
]);
P('rise-whistle', 'movimiento', 'Silbido de subida', ['subir', 'silbido'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(300, 0.02), slide: 26, vib: { depth: 0.2, rate: 7 }, env: { h: 0.9, d: 0.1 } },
]);
P('snap', 'movimiento', 'Chasquido / encaje', ['encajar', 'chasquido', 'clic'], (r, j) => [
  { wave: 'noise', freq: j(200000, 0.1), env: { h: 0.003, d: 0.02 } },
  { wave: 'square', duty: 0.5, freq: j(1800, 0.05), env: { h: 0.005, d: 0.015 }, gain: 0.5 },
]);
P('page-flip', 'movimiento', 'Pasar página', ['página', 'libro', 'papel'], (r, j) => [
  { wave: 'noise', freq: j(80000, 0.1), env: { a: 0.04, h: 0.03, d: 0.1 }, hpf: 1500, tremolo: { depth: 0.5, rate: 40 } },
]);
P('stamp', 'movimiento', 'Sello / estampado', ['sello', 'aprobado', 'golpe'], (r, j) => [
  { wave: 'noise', freq: j(7000, 0.1), env: { h: 0.02, d: 0.12 } },
  { wave: 'triangle', freq: j(90, 0.05), slide: -30, env: { h: 0.03, d: 0.1 } },
]);
P('blink', 'movimiento', 'Parpadeo de personaje', ['parpadeo', 'ojos'], (r, j) => [
  { wave: 'triangle', freq: j(2000, 0.05), env: { h: 0.01, d: 0.01 } },
]);

// ── Transiciones ─────────────────────────────────────────
P('riser', 'transicion', 'Subida de tensión hacia un corte', ['subida', 'tensión', 'antes del corte'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(110, 0.02), slide: 24, slideAccel: 8, env: { a: 1.2, h: 0.3, d: 0.02 }, vib: { depth: 0.3, rate: 12 }, gain: 0.7 },
  { wave: 'noise', freq: j(4000, 0.1), slide: 30, env: { a: 1.4, h: 0.1, d: 0.02 }, gain: 0.6 },
]);
P('riser-short', 'transicion', 'Subida corta', ['subida', 'rápida'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(220, 0.02), slide: 48, env: { a: 0.45, h: 0.05, d: 0.02 }, gain: 0.7 },
  { wave: 'noise', freq: j(10000, 0.1), slide: 50, env: { a: 0.45, h: 0.05, d: 0.02 }, gain: 0.5 },
]);
P('drop', 'transicion', 'Caída después del corte', ['caída', 'bajada', 'impacto'], (r, j) => [
  { wave: 'triangle', freq: j(220, 0.02), slide: -30, env: { h: 0.3, d: 0.5 } },
  { wave: 'noise', freq: j(20000, 0.1), slide: -30, env: { h: 0.05, d: 0.6 }, gain: 0.5 },
]);
P('impact', 'transicion', 'Golpe cinematográfico', ['golpe', 'título', 'impacto'], (r, j) => [
  { wave: 'triangle', freq: j(110, 0.02), slide: -40, env: { h: 0.05, d: 0.8, curve: 2 }, quantize: false },
  { wave: 'noise', freq: j(12000, 0.1), slide: -12, env: { h: 0.03, d: 1.0, curve: 2 } },
  { wave: 'square', duty: 0.5, freq: j(55, 0.02), env: { h: 0.05, d: 0.4, curve: 2 }, gain: 0.5 },
]);
P('reverse-hit', 'transicion', 'Platillo invertido antes de un golpe', ['inverso', 'anticipación'], (r, j) => [
  { wave: 'noise', freq: j(60000, 0.05), env: { a: 0.9, h: 0.01, d: 0.02, curve: 1 } },
]);
P('glitch', 'transicion', 'Fallo digital corto', ['glitch', 'error', 'digital'], (r) => {
  const out = [];
  let t = 0;
  for (let k = 0; k < 7; k++) {
    const d = 0.02 + r() * 0.04;
    out.push(r() < 0.5
      ? { at: t, wave: 'square', duty: [0.125, 0.25, 0.5][Math.floor(r() * 3)], freq: 200 + r() * 2000, env: { h: d, d: 0.005 }, crush: { bits: 3 } }
      : { at: t, wave: 'noise', noise: r() < 0.5 ? 'short' : 'long', freq: 5000 + r() * 200000, env: { h: d, d: 0.005 } });
    t += d + r() * 0.015;
  }
  return out;
});
P('glitch-long', 'transicion', 'Interferencia digital larga', ['glitch', 'interferencia'], (r) => {
  const out = [];
  let t = 0;
  while (t < 1.1) {
    const d = 0.015 + r() * 0.06;
    out.push({ at: t, wave: r() < 0.6 ? 'square' : 'noise', noise: 'short', duty: 0.125 + r() * 0.5, freq: r() < 0.6 ? 100 + r() * 3000 : 20000 + r() * 300000, env: { h: d, d: 0.003 }, crush: { bits: 2 + Math.floor(r() * 3), rate: 4000 + r() * 8000 } });
    t += d + (r() < 0.2 ? 0.05 : 0);
  }
  return out;
});
P('static', 'transicion', 'Estática de televisor', ['estática', 'tv', 'ruido'], (r, j) => [
  { wave: 'noise', freq: j(300000, 0.1), env: { a: 0.02, h: 0.8, d: 0.1 }, tremolo: { depth: 0.3, rate: 15 } },
]);
P('tape-stop', 'transicion', 'Cinta que se detiene', ['detener', 'cinta', 'bajada'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(440, 0.01), slide: -10, slideAccel: -40, env: { h: 0.6, d: 0.1 }, minFreq: 30 },
  { wave: 'triangle', freq: j(220, 0.01), slide: -10, slideAccel: -40, env: { h: 0.6, d: 0.1 }, minFreq: 20 },
]);
P('rewind', 'transicion', 'Rebobinar', ['rebobinar', 'retroceder', 'flashback'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(600, 0.05), slide: -80, repeat: 0.07, env: { h: 0.7, d: 0.05 }, gain: 0.7 },
  { wave: 'noise', freq: j(90000, 0.1), env: { h: 0.7, d: 0.05 }, tremolo: { depth: 0.7, rate: 14 }, gain: 0.4 },
]);
P('fast-forward', 'transicion', 'Adelantar', ['adelantar', 'avanzar', 'tiempo'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(400, 0.05), slide: 80, repeat: 0.06, env: { h: 0.7, d: 0.05 }, gain: 0.7 },
]);
P('power-on', 'transicion', 'Encender pantalla', ['encender', 'inicio', 'tv'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(60, 0.05), slide: 60, env: { a: 0.05, h: 0.25, d: 0.1 } },
  { at: 0.3, wave: 'square', duty: 0.125, freq: j(1500, 0.02), env: { h: 0.15, d: 0.2 }, gain: 0.5 },
]);
P('power-off', 'transicion', 'Apagar pantalla', ['apagar', 'final', 'tv'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(2000, 0.02), slide: -90, env: { h: 0.35, d: 0.1 }, minFreq: 40 },
  { wave: 'noise', freq: j(200000, 0.05), slide: -60, env: { h: 0.2, d: 0.2 }, gain: 0.4 },
]);
P('wipe', 'transicion', 'Barrido de escena', ['barrido', 'cortinilla', 'cambio'], (r, j) => [
  { wave: 'noise', freq: j(15000, 0.1), slide: 30, env: { a: 0.15, h: 0.1, d: 0.2 }, lpf: 8000 },
  { wave: 'square', duty: 0.125, freq: j(300, 0.02), notes: [0, 2, 4, 7, 9, 12, 14, 16].map((s) => [s, 0.04]), env: { d: 0.06 }, gain: 0.5 },
]);
P('stinger-hit', 'transicion', 'Acorde de golpe para títulos', ['título', 'acento', 'acorde'], (r, j) => [0, 4, 7, 12].map((s, i) => (
  { wave: i === 0 ? 'triangle' : 'square', duty: [0.5, 0.25, 0.125, 0.5][i], freq: j(C5 / 2, 0.005) * Math.pow(2, s / 12), env: { h: 0.06, d: 0.7, curve: 1.6 }, gain: i === 0 ? 1 : 0.5 }
)).concat([{ wave: 'noise', freq: 30000, env: { h: 0.02, d: 0.6, curve: 2 }, gain: 0.6 }]));
P('scene-change', 'transicion', 'Cambio de escena con chispa', ['cambio', 'escena', 'brillo'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(G5, 0.01), notes: [[0, 0.05], [5, 0.05], [12, 0.15]], retrigger: true, env: { d: 0.12 } },
  { wave: 'noise', freq: j(50000, 0.1), slide: 30, env: { a: 0.1, h: 0.05, d: 0.15 }, gain: 0.4 },
]);

// ── Impactos ─────────────────────────────────────────────
P('punch', 'impacto', 'Puñetazo', ['golpe', 'puño', 'pelea'], (r, j) => [
  { wave: 'noise', freq: j(15000, 0.15), env: { h: 0.02, d: 0.09 } },
  { wave: 'triangle', freq: j(160, 0.05), slide: -60, env: { h: 0.02, d: 0.07 } },
]);
P('kick-hit', 'impacto', 'Patada', ['golpe', 'patada', 'pelea'], (r, j) => [
  { wave: 'noise', freq: j(25000, 0.15), slide: -30, env: { h: 0.03, d: 0.12 } },
  { wave: 'square', duty: 0.5, freq: j(200, 0.05), slide: -70, env: { h: 0.02, d: 0.08 }, gain: 0.5 },
]);
P('thud', 'impacto', 'Golpe sordo', ['sordo', 'caída', 'pesado'], (r, j) => [
  { wave: 'triangle', freq: j(80, 0.05), slide: -30, env: { h: 0.04, d: 0.18 } },
  { wave: 'noise', freq: j(3000, 0.15), env: { h: 0.02, d: 0.1 }, gain: 0.6 },
]);
P('clank', 'impacto', 'Golpe metálico', ['metal', 'clang'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(900, 0.05), env: { h: 0.01, d: 0.3, curve: 2 }, vib: { depth: 0.3, rate: 45 } },
  { wave: 'square', duty: 0.25, freq: j(1340, 0.05), env: { h: 0.01, d: 0.25, curve: 2 }, gain: 0.6 },
  { wave: 'noise', noise: 'short', freq: j(90000, 0.1), env: { h: 0.005, d: 0.06 }, gain: 0.6 },
]);
P('explosion-small', 'impacto', 'Explosión pequeña', ['explosión', 'bomba'], (r, j) => [
  { wave: 'noise', freq: j(20000, 0.1), slide: -20, env: { h: 0.05, d: 0.45, curve: 1.5 } },
]);
P('explosion', 'impacto', 'Explosión grande', ['explosión', 'boom', 'destrucción'], (r, j) => [
  { wave: 'noise', freq: j(12000, 0.1), slide: -10, env: { h: 0.08, d: 1.3, curve: 1.6 } },
  { wave: 'triangle', freq: j(90, 0.05), slide: -20, env: { h: 0.05, d: 0.6 }, quantize: false },
  { at: 0.12, wave: 'noise', freq: j(6000, 0.1), env: { h: 0.05, d: 0.8, curve: 2 }, gain: 0.5, tremolo: { depth: 0.5, rate: 12 } },
]);
P('explosion-chain', 'impacto', 'Cadena de explosiones', ['explosiones', 'caos', 'jefe'], (r, j) => [0, 0.18, 0.31, 0.5, 0.62].map((at) => (
  { at, wave: 'noise', freq: j(16000, 0.3), slide: -18, env: { h: 0.03, d: 0.35 }, gain: j(0.8, 0.2) }
)));
P('thunder', 'impacto', 'Trueno', ['trueno', 'tormenta', 'rayo'], (r, j) => [
  { wave: 'noise', freq: j(60000, 0.1), env: { h: 0.05, d: 0.15 } },
  { at: 0.08, wave: 'noise', freq: j(3000, 0.1), slide: -6, env: { a: 0.1, h: 0.3, d: 1.5, curve: 1.5 }, tremolo: { depth: 0.5, rate: 6 } },
]);
P('rumble', 'impacto', 'Retumbo / terremoto', ['retumbo', 'terremoto', 'temblor'], (r, j) => [
  { wave: 'noise', freq: j(1800, 0.1), env: { a: 0.3, h: 1.2, d: 0.5 }, tremolo: { depth: 0.6, rate: 9 } },
  { wave: 'triangle', freq: j(45, 0.05), vib: { depth: 1, rate: 8 }, env: { a: 0.3, h: 1.2, d: 0.5 }, gain: 0.8 },
]);
P('hit-heavy', 'impacto', 'Golpe pesado de jefe', ['golpe', 'pesado', 'jefe'], (r, j) => [
  { wave: 'noise', freq: j(9000, 0.1), env: { h: 0.04, d: 0.3 } },
  { wave: 'square', duty: 0.5, freq: j(80, 0.05), slide: -30, env: { h: 0.06, d: 0.25 } },
  { wave: 'triangle', freq: j(60, 0.05), slide: -20, env: { h: 0.06, d: 0.3 } },
]);
P('crash-glass', 'impacto', 'Cristal que se rompe', ['cristal', 'romper', 'vidrio'], (r) => [
  { wave: 'noise', noise: 'short', freq: 220000, env: { h: 0.02, d: 0.35 }, gain: 0.7 },
  ...[0, 0.05, 0.09, 0.15, 0.22].map((at) => ({ at, wave: 'square', duty: 0.125, freq: 2000 + r() * 2500, env: { h: 0.005, d: 0.08 }, gain: 0.4 })),
]);

// ── Magia y poder ────────────────────────────────────────
P('sparkle', 'magia', 'Destellos mágicos', ['brillo', 'destello', 'magia'], (r) => [0, 0.05, 0.1, 0.16, 0.22, 0.27].map((at) => (
  { at, wave: 'square', duty: 0.125, freq: 2000 + r() * 2200, env: { h: 0.01, d: 0.09 }, gain: 0.6 + r() * 0.4 }
)));
P('spell', 'magia', 'Lanzar un hechizo', ['hechizo', 'conjuro', 'magia'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(400, 0.05), slide: 36, vib: { depth: 0.8, rate: 14 }, env: { a: 0.05, h: 0.35, d: 0.2 } },
  { wave: 'triangle', freq: j(200, 0.05), slide: 36, env: { a: 0.05, h: 0.35, d: 0.2 }, gain: 0.6 },
]);
P('level-up', 'magia', 'Subir de nivel', ['nivel', 'mejora', 'logro'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(C5, 0.01), notes: [[0, 0.07], [4, 0.07], [7, 0.07], [12, 0.07], [7, 0.07], [12, 0.07], [16, 0.07], [19, 0.07], [24, 0.35]], retrigger: true, env: { d: 0.2 } },
  { wave: 'triangle', freq: j(C5 / 2, 0.01), notes: [[0, 0.28], [5, 0.28], [7, 0.4]], retrigger: true, env: { d: 0.2 } },
]);
P('twinkle', 'magia', 'Centelleo de estrella', ['estrella', 'brillo'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(2637, 0.03), notes: [[0, 0.05], [7, 0.05], [12, 0.05], [7, 0.05], [12, 0.2]], retrigger: true, env: { d: 0.15 }, gain: 0.7 },
]);
P('fairy', 'magia', 'Hada / ayuda mágica', ['hada', 'ayuda', 'arpa'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(C6, 0.02), notes: [0, 4, 7, 11, 12, 16, 19, 23, 24].map((s) => [s, 0.035]), env: { d: 0.3 }, vib: { depth: 0.15, rate: 10 } },
]);
P('freeze', 'magia', 'Congelar / hielo', ['hielo', 'congelar', 'frío'], (r, j) => [
  { wave: 'noise', noise: 'short', freq: j(250000, 0.05), env: { a: 0.05, h: 0.3, d: 0.4 }, gain: 0.6 },
  { wave: 'square', duty: 0.125, freq: j(3000, 0.05), vib: { depth: 0.5, rate: 30 }, env: { h: 0.4, d: 0.3 }, gain: 0.4 },
]);
P('fire', 'magia', 'Llamarada', ['fuego', 'llama'], (r, j) => [
  { wave: 'noise', freq: j(25000, 0.1), env: { a: 0.08, h: 0.4, d: 0.3 }, tremolo: { depth: 0.6, rate: 18 } },
]);
P('zap', 'magia', 'Descarga eléctrica', ['electricidad', 'rayo', 'zap'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(80, 0.1), vib: { depth: 12, rate: 60 }, env: { h: 0.2, d: 0.1 } },
  { wave: 'noise', noise: 'short', freq: j(120000, 0.1), env: { h: 0.2, d: 0.1 }, tremolo: { depth: 1, rate: 35 }, gain: 0.6 },
]);
P('beam', 'magia', 'Rayo continuo', ['rayo', 'láser', 'energía'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(500, 0.05), vib: { depth: 0.5, rate: 25 }, env: { a: 0.05, h: 0.7, d: 0.2 } },
  { wave: 'saw', freq: j(252, 0.05), env: { a: 0.05, h: 0.7, d: 0.2 }, gain: 0.5 },
]);
P('portal', 'magia', 'Portal que se abre', ['portal', 'abrir', 'dimensión'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(200, 0.05), slide: 20, vib: { depth: 3, rate: 6 }, env: { a: 0.4, h: 0.6, d: 0.4 } },
  { wave: 'noise', freq: j(10000, 0.1), slide: 15, env: { a: 0.5, h: 0.5, d: 0.4 }, gain: 0.4, lpf: 5000 },
]);
P('shine', 'magia', 'Brillo de objeto importante', ['brillo', 'importante', 'ding'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(2093, 0.02), env: { h: 0.02, d: 0.6, curve: 2 }, vib: { depth: 0.1, rate: 9 } },
  { at: 0.07, wave: 'square', duty: 0.125, freq: j(3136, 0.02), env: { h: 0.02, d: 0.5, curve: 2 }, gain: 0.6 },
]);
P('curse', 'magia', 'Maldición / efecto negativo', ['maldición', 'oscuro', 'negativo'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(300, 0.03), notes: [0, -1, -3, -4, -6, -7, -9, -10].map((s) => [s, 0.06]), env: { d: 0.2 }, vib: { depth: 0.6, rate: 9 } },
]);

// ── Tecnología y datos ──────────────────────────────────
P('beep', 'datos', 'Pitido de computadora', ['pitido', 'computadora'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(1000, 0.01), env: { h: 0.08, d: 0.01 } },
]);
P('computing', 'datos', 'Computadora procesando', ['procesar', 'calcular', 'pensar'], (r) => {
  const notes = [];
  for (let k = 0; k < 24; k++) notes.push([Math.floor(r() * 24), 0.04]);
  return [{ wave: 'square', duty: 0.25, freq: 600, notes, retrigger: true, env: { d: 0.02 }, gain: 0.8 }];
});
P('data-crunch', 'datos', 'Procesamiento de datos intenso', ['datos', 'procesar', 'rápido'], (r) => {
  const notes = [];
  for (let k = 0; k < 40; k++) notes.push([Math.floor(r() * 36) - 12, 0.022]);
  return [
    { wave: 'square', duty: 0.125, freq: 800, notes, env: { d: 0.02 } },
    { wave: 'noise', noise: 'short', freq: 80000, env: { h: 0.85, d: 0.05 }, tremolo: { depth: 0.9, rate: 23 }, gain: 0.25 },
  ];
});
P('scan', 'datos', 'Escaneo', ['escanear', 'analizar', 'barrido'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(400, 0.03), slide: 24, repeat: 0.3, env: { h: 0.9, d: 0.05 }, gain: 0.7 },
  { wave: 'triangle', freq: j(200, 0.03), slide: 24, repeat: 0.3, env: { h: 0.9, d: 0.05 }, gain: 0.5 },
]);
P('loading-tick', 'datos', 'Avance de barra de carga', ['carga', 'progreso', 'tic'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(1200, 0.01), env: { h: 0.015, d: 0.02 } },
]);
P('loading-done', 'datos', 'Carga completa', ['completo', 'listo', 'éxito'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(C6, 0.01), notes: [[0, 0.06], [7, 0.06], [12, 0.18]], retrigger: true, env: { d: 0.1 } },
]);
P('upload', 'datos', 'Subir archivo', ['subir', 'enviar', 'nube'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(400, 0.02), notes: [0, 3, 7, 10, 12, 15, 19, 22, 24].map((s) => [s, 0.035]), env: { d: 0.06 } },
]);
P('download', 'datos', 'Descargar archivo', ['descargar', 'recibir'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(1600, 0.02), notes: [0, -3, -7, -10, -12, -15, -19, -22, -24].map((s) => [s, 0.035]), env: { d: 0.06 } },
]);
P('connect', 'datos', 'Conexión establecida (módem)', ['conexión', 'red', 'módem'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(1200, 0.01), env: { h: 0.2, d: 0.01 }, gain: 0.6 },
  { at: 0.2, wave: 'square', duty: 0.5, freq: j(2100, 0.01), env: { h: 0.2, d: 0.01 }, gain: 0.5 },
  { at: 0.42, wave: 'noise', freq: 150000, env: { h: 0.4, d: 0.05 }, tremolo: { depth: 0.8, rate: 30 }, gain: 0.5 },
  { at: 0.9, wave: 'square', duty: 0.25, freq: j(C6, 0.01), notes: [[0, 0.06], [12, 0.12]], retrigger: true, env: { d: 0.05 } },
]);
P('alarm', 'datos', 'Alarma', ['alarma', 'peligro', 'urgente'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(880, 0.01), notes: [[0, 0.15], [-5, 0.15], [0, 0.15], [-5, 0.15], [0, 0.15], [-5, 0.15]], env: { d: 0.02 } },
]);
P('warning', 'datos', 'Advertencia', ['advertencia', 'atención', 'cuidado'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(660, 0.01), notes: [[0, 0.1], [null, 0.06], [0, 0.1]], retrigger: true, env: { d: 0.02 } },
]);
P('success', 'datos', 'Resultado correcto', ['correcto', 'éxito', 'bien'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(E5, 0.01), notes: [[0, 0.07], [5, 0.07], [9, 0.07], [12, 0.25]], retrigger: true, env: { d: 0.18 } },
  { wave: 'triangle', freq: j(E5 / 2, 0.01), notes: [[0, 0.21], [5, 0.3]], retrigger: true, env: { d: 0.2 } },
]);
P('fail', 'datos', 'Resultado incorrecto', ['incorrecto', 'fallo', 'mal'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(311, 0.01), notes: [[0, 0.15], [-1, 0.15], [-2, 0.4]], retrigger: true, env: { d: 0.2 }, vib: { depth: 0.3, rate: 7 } },
  { wave: 'triangle', freq: j(155, 0.01), notes: [[0, 0.15], [-1, 0.15], [-2, 0.4]], retrigger: true, env: { d: 0.2 } },
]);
P('chart-grow', 'datos', 'Gráfica que crece', ['gráfica', 'crecer', 'subir', 'barras'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(262, 0.01), notes: [0, 2, 4, 5, 7, 9, 11, 12, 14, 16].map((s) => [s, 0.05]), retrigger: true, env: { d: 0.1, noteD: 0.06 } },
]);
P('chart-fall', 'datos', 'Gráfica que baja', ['gráfica', 'bajar', 'caída'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(659, 0.01), notes: [0, -2, -4, -5, -7, -9, -11, -12, -14, -16].map((s) => [s, 0.05]), retrigger: true, env: { d: 0.1, noteD: 0.06 } },
]);
P('counter-roll', 'datos', 'Contador numérico girando', ['contador', 'números', 'cifra'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(1400, 0.01), notes: Array.from({ length: 22 }, (_, k) => [k % 2 ? 0 : 0.5, 0.03]), retrigger: true, env: { d: 0.01, noteD: 0.015 }, gain: 0.7 },
]);
P('insight', 'datos', '¡Eureka! Hallazgo en los datos', ['hallazgo', 'idea', 'descubrir', 'insight'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(C6, 0.01), notes: [[0, 0.06], [4, 0.06], [7, 0.06], [11, 0.06], [14, 0.4]], retrigger: true, env: { d: 0.35, curve: 2 } },
  { wave: 'triangle', freq: j(C5, 0.01), env: { h: 0.25, d: 0.4 } },
  { at: 0.24, wave: 'noise', noise: 'short', freq: 220000, env: { h: 0.02, d: 0.3 }, gain: 0.2 },
]);
P('graph-reveal', 'datos', 'Revelar una gráfica o tabla', ['revelar', 'gráfica', 'mostrar'], (r, j) => [
  { wave: 'noise', freq: j(30000, 0.1), slide: 25, env: { a: 0.15, h: 0.02, d: 0.1 }, gain: 0.5, lpf: 6000 },
  { at: 0.17, wave: 'square', duty: 0.25, freq: j(G5, 0.01), notes: [[0, 0.05], [5, 0.05], [9, 0.18]], retrigger: true, env: { d: 0.12 } },
]);
P('terminal-boot', 'datos', 'Arranque de terminal', ['arranque', 'sistema', 'boot'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(110, 0.01), env: { h: 0.15, d: 0.02 } },
  { at: 0.2, wave: 'noise', noise: 'short', freq: 100000, env: { h: 0.4, d: 0.02 }, tremolo: { depth: 1, rate: 18 }, gain: 0.3 },
  { at: 0.65, wave: 'square', duty: 0.25, freq: j(C6, 0.01), notes: [[0, 0.05], [12, 0.15]], retrigger: true, env: { d: 0.08 } },
]);
P('keyboard', 'datos', 'Tecleo rápido', ['teclado', 'escribir', 'código'], (r) => Array.from({ length: 10 }, (_, k) => (
  { at: k * 0.065 + r() * 0.02, wave: 'noise', freq: 60000 + r() * 100000, env: { h: 0.004, d: 0.018 }, gain: 0.6 + r() * 0.4 }
)));
P('print', 'datos', 'Impresión / ticket', ['imprimir', 'ticket', 'reporte'], (r, j) => [
  { wave: 'noise', noise: 'short', freq: j(40000, 0.1), env: { h: 0.8, d: 0.05 }, tremolo: { depth: 0.9, rate: 20 }, gain: 0.7 },
  { wave: 'square', duty: 0.5, freq: j(90, 0.02), vib: { depth: 0.5, rate: 20 }, env: { h: 0.8, d: 0.05 }, gain: 0.4 },
]);
P('radar', 'datos', 'Ping de radar / sonar', ['radar', 'sonar', 'detectar'], (r, j) => [
  { wave: 'triangle', freq: j(1200, 0.02), env: { h: 0.02, d: 0.6, curve: 2.5 }, quantize: false },
  { wave: 'square', duty: 0.125, freq: j(1200, 0.02), env: { h: 0.02, d: 0.3, curve: 2.5 }, gain: 0.3 },
]);
P('robot', 'datos', 'Voz de robot (bip-bup)', ['robot', 'voz', 'máquina'], (r) => [
  { wave: 'square', duty: 0.25, freq: 300, notes: Array.from({ length: 6 }, () => [Math.floor(r() * 12) - 4, 0.07]), retrigger: true, env: { d: 0.02 }, crush: { bits: 3 } },
]);
P('error-glitch', 'datos', 'Error del sistema', ['error', 'sistema', 'fallo'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(150, 0.01), notes: [[0, 0.06], [12, 0.06], [0, 0.06], [12, 0.06], [-1, 0.3]], env: { d: 0.05 }, crush: { bits: 3, rate: 6000 } },
]);
P('notification-data', 'datos', 'Nuevo dato disponible', ['dato', 'nuevo', 'aviso'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(1760, 0.01), notes: [[0, 0.05], [-5, 0.05], [7, 0.12]], retrigger: true, env: { d: 0.08 } },
]);
P('filter', 'datos', 'Filtrar / ordenar registros', ['filtrar', 'ordenar', 'tabla'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(500, 0.01), notes: [12, 7, 9, 4, 5, 0, 2, -3].map((s) => [s, 0.03]), env: { d: 0.05 }, gain: 0.7 },
  { wave: 'noise', freq: j(80000, 0.1), env: { h: 0.24, d: 0.05 }, tremolo: { depth: 0.8, rate: 33 }, gain: 0.3 },
]);
P('merge', 'datos', 'Unir datos (merge / join)', ['unir', 'join', 'combinar'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(400, 0.01), slide: 24, env: { h: 0.15, d: 0.02 }, pan: -0.4 },
  { wave: 'square', duty: 0.25, freq: j(1600, 0.01), slide: -24, env: { h: 0.15, d: 0.02 }, pan: 0.4 },
  { at: 0.17, wave: 'square', duty: 0.5, freq: j(800, 0.01), env: { h: 0.05, d: 0.2 } },
]);

// ── Voces y texto ────────────────────────────────────────
P('voice-low', 'voz', 'Voz grave (diálogo letra a letra)', ['voz', 'diálogo', 'grave'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(150, 0.06), env: { h: 0.03, d: 0.02 } },
]);
P('voice-mid', 'voz', 'Voz media (diálogo letra a letra)', ['voz', 'diálogo', 'narrador'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(300, 0.06), env: { h: 0.03, d: 0.02 } },
]);
P('voice-high', 'voz', 'Voz aguda (diálogo letra a letra)', ['voz', 'diálogo', 'aguda'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(620, 0.06), env: { h: 0.025, d: 0.02 } },
]);
P('voice-cute', 'voz', 'Voz tierna de mascota', ['voz', 'mascota', 'tierno'], (r, j) => [
  { wave: 'triangle', freq: j(900, 0.08), slide: j(40, 0.5), env: { h: 0.03, d: 0.03 } },
]);
P('voice-robot', 'voz', 'Voz de máquina (diálogo)', ['voz', 'robot', 'IA'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(220, 0.1), env: { h: 0.035, d: 0.01 }, crush: { bits: 2, rate: 3000 } },
]);
P('voice-villain', 'voz', 'Voz de villano', ['voz', 'villano', 'oscuro'], (r, j) => [
  { wave: 'saw', freq: j(90, 0.06), vib: { depth: 0.6, rate: 20 }, env: { h: 0.04, d: 0.03 } },
]);
P('typewriter', 'voz', 'Tecla de máquina de escribir', ['máquina de escribir', 'texto', 'tecla'], (r, j) => [
  { wave: 'noise', freq: j(40000, 0.2), env: { h: 0.005, d: 0.03 } },
  { wave: 'square', duty: 0.5, freq: j(180, 0.05), env: { h: 0.004, d: 0.01 }, gain: 0.4 },
]);
P('typewriter-bell', 'voz', 'Campana de fin de línea', ['campana', 'fin de línea'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(2800, 0.01), env: { h: 0.01, d: 0.5, curve: 2 } },
  { wave: 'triangle', freq: j(2800, 0.01), env: { h: 0.01, d: 0.6, curve: 2 }, gain: 0.7 },
]);
P('mumble', 'voz', 'Balbuceo de personaje (frase)', ['balbuceo', 'hablar', 'frase'], (r) => [
  { wave: 'square', duty: 0.25, freq: 280, notes: Array.from({ length: 9 }, () => [r() < 0.15 ? null : Math.floor(r() * 7) - 3, 0.06 + r() * 0.03]), retrigger: true, env: { d: 0.03, noteD: 0.05 } },
]);
P('question', 'voz', 'Duda / pregunta (¿?)', ['pregunta', 'duda', 'hm'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(440, 0.02), notes: [[0, 0.1], [5, 0.18]], retrigger: true, env: { d: 0.1 } },
]);
P('exclaim', 'voz', 'Sorpresa (¡!)', ['sorpresa', 'alerta', 'exclamación'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(880, 0.01), notes: [[0, 0.05], [12, 0.15]], retrigger: true, env: { d: 0.1 } },
]);

// ── Ambiente y objetos ───────────────────────────────────
P('clock-tick', 'ambiente', 'Tic de reloj', ['reloj', 'tic', 'tiempo'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(1800, 0.02), env: { h: 0.004, d: 0.015 } },
]);
P('clock-tock', 'ambiente', 'Tac de reloj', ['reloj', 'tac', 'tiempo'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(1200, 0.02), env: { h: 0.004, d: 0.015 } },
]);
P('heartbeat', 'ambiente', 'Latido', ['corazón', 'latido', 'tensión'], (r, j) => [
  { wave: 'triangle', freq: j(70, 0.03), slide: -20, env: { h: 0.04, d: 0.08 }, quantize: false },
  { at: 0.2, wave: 'triangle', freq: j(62, 0.03), slide: -20, env: { h: 0.04, d: 0.12 }, quantize: false, gain: 0.8 },
]);
P('wind', 'ambiente', 'Viento', ['viento', 'aire', 'exterior'], (r, j) => [
  { wave: 'noise', freq: j(7000, 0.1), vib: { depth: 5, rate: 0.6 }, env: { a: 0.6, h: 1.5, d: 0.8 }, lpf: 2500 },
]);
P('rain', 'ambiente', 'Lluvia', ['lluvia', 'agua', 'tormenta'], (r, j) => [
  { wave: 'noise', freq: j(150000, 0.05), env: { a: 0.3, h: 2.2, d: 0.5 }, lpf: 5000, gain: 0.6 },
  ...Array.from({ length: 14 }, () => ({ at: r() * 2.6, wave: 'triangle', freq: 1500 + r() * 1500, slide: -30, env: { h: 0.005, d: 0.03 }, gain: 0.3 })),
]);
P('water-drop', 'ambiente', 'Gota de agua', ['gota', 'agua'], (r, j) => [
  { wave: 'triangle', freq: j(900, 0.05), slide: 60, env: { h: 0.02, d: 0.08 } },
]);
P('bird', 'ambiente', 'Pájaro', ['pájaro', 'naturaleza', 'mañana'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(2600, 0.05), slide: 30, vib: { depth: 1.5, rate: 30 }, env: { h: 0.06, d: 0.03 } },
  { at: 0.14, wave: 'square', duty: 0.125, freq: j(3000, 0.05), slide: -20, vib: { depth: 1.5, rate: 30 }, env: { h: 0.08, d: 0.04 } },
]);
P('cricket', 'ambiente', 'Grillo nocturno', ['grillo', 'noche', 'campo'], (r, j) => [0, 0.5].map((at) => (
  { at, wave: 'square', duty: 0.5, freq: j(4200, 0.02), env: { h: 0.25, d: 0.02 }, tremolo: { depth: 1, rate: 30 }, gain: 0.5 }
)));
P('alarm-clock', 'ambiente', 'Despertador', ['despertador', 'mañana', 'timbre'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(2000, 0.01), env: { h: 1.2, d: 0.02 }, tremolo: { depth: 1, rate: 16 }, gain: 0.7 },
]);
P('bell', 'ambiente', 'Campana', ['campana', 'timbre', 'tienda'], (r, j) => [
  { wave: 'square', duty: 0.125, freq: j(1318, 0.01), env: { h: 0.01, d: 1.0, curve: 2.5 } },
  { wave: 'square', duty: 0.25, freq: j(1318 * 2.4, 0.01), env: { h: 0.01, d: 0.6, curve: 2.5 }, gain: 0.4 },
]);
P('phone', 'ambiente', 'Teléfono sonando', ['teléfono', 'llamada'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(1400, 0.01), vib: { depth: 2, rate: 20 }, env: { h: 0.8, d: 0.02 }, gain: 0.7 },
]);
P('siren', 'ambiente', 'Sirena', ['sirena', 'policía', 'emergencia'], (r, j) => [
  { wave: 'square', duty: 0.5, freq: j(700, 0.01), vib: { depth: 4, rate: 1.5 }, env: { a: 0.1, h: 2, d: 0.2 } },
]);
P('engine', 'ambiente', 'Motor', ['motor', 'coche', 'vehículo'], (r, j) => [
  { wave: 'square', duty: 0.25, freq: j(55, 0.05), slide: 4, vib: { depth: 0.5, rate: 22 }, env: { a: 0.1, h: 1.2, d: 0.2 } },
  { wave: 'noise', freq: j(3000, 0.1), env: { a: 0.1, h: 1.2, d: 0.2 }, tremolo: { depth: 0.6, rate: 22 }, gain: 0.5 },
]);
P('sizzle', 'ambiente', 'Comida en la plancha', ['comida', 'cocina', 'plancha', 'tacos'], (r, j) => [
  { wave: 'noise', noise: 'short', freq: j(180000, 0.05), env: { a: 0.1, h: 1.5, d: 0.4 }, tremolo: { depth: 0.6, rate: 13 }, gain: 0.5 },
  { wave: 'noise', freq: j(220000, 0.05), env: { a: 0.1, h: 1.5, d: 0.4 }, gain: 0.4, hpf: 3000 },
]);
P('cash', 'ambiente', 'Caja registradora', ['caja', 'venta', 'dinero'], (r, j) => [
  { wave: 'noise', freq: j(30000, 0.1), env: { h: 0.06, d: 0.08 }, gain: 0.6 },
  { at: 0.1, wave: 'square', duty: 0.125, freq: j(2093, 0.01), env: { h: 0.02, d: 0.5, curve: 2 } },
  { at: 0.1, wave: 'square', duty: 0.25, freq: j(2637, 0.01), env: { h: 0.02, d: 0.45, curve: 2 }, gain: 0.6 },
]);
P('applause', 'ambiente', 'Aplausos', ['aplausos', 'público', 'celebrar'], (r) => Array.from({ length: 40 }, () => (
  { at: r() * 1.6, wave: 'noise', freq: 20000 + r() * 40000, env: { h: 0.005, d: 0.04 }, gain: 0.3 + r() * 0.4, pan: r() * 1.6 - 0.8 }
)));

export const SFX = Object.fromEntries(list.map((p) => [p.id, p]));
export const SFX_LIST = list;
