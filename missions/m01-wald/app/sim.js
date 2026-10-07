/* Simulador de la misión m01-wald.
   Reproduce exactamente casos/data/wald-bombers/generar.py: mismo Mersenne Twister que
   random.Random de Python, misma Poisson de Knuth y mismo random.choices. Con la semilla
   y sin blindaje devuelve los mismos aviones que regresaron.csv y todos.csv. */
(function (root) {
  "use strict";
  const N = 624, M = 397;

  function MersenneTwister(seed) {
    const mt = new Uint32Array(N);
    let index = N + 1;
    function initGenrand(s) {
      mt[0] = s >>> 0;
      for (let i = 1; i < N; i++) mt[i] = (Math.imul(1812433253, mt[i - 1] ^ (mt[i - 1] >>> 30)) + i) >>> 0;
      index = N;
    }
    function initByArray(key) {
      initGenrand(19650218);
      let i = 1, j = 0;
      for (let k = Math.max(N, key.length); k; k--) {
        mt[i] = ((mt[i] ^ Math.imul(mt[i - 1] ^ (mt[i - 1] >>> 30), 1664525)) + key[j] + j) >>> 0;
        i++; j++;
        if (i >= N) { mt[0] = mt[N - 1]; i = 1; }
        if (j >= key.length) j = 0;
      }
      for (let k = N - 1; k; k--) {
        mt[i] = ((mt[i] ^ Math.imul(mt[i - 1] ^ (mt[i - 1] >>> 30), 1566083941)) - i) >>> 0;
        i++;
        if (i >= N) { mt[0] = mt[N - 1]; i = 1; }
      }
      mt[0] = 0x80000000;
    }
    function int32() {
      if (index >= N) {
        for (let k = 0; k < N; k++) {
          const y = (mt[k] & 0x80000000) | (mt[(k + 1) % N] & 0x7fffffff);
          mt[k] = mt[(k + M) % N] ^ (y >>> 1) ^ (y & 1 ? 0x9908b0df : 0);
        }
        index = 0;
      }
      let y = mt[index++];
      y ^= y >>> 11;
      y ^= (y << 7) & 0x9d2c5680;
      y ^= (y << 15) & 0xefc60000;
      y ^= y >>> 18;
      return y >>> 0;
    }
    // Igual que random.seed(int) de Python: la clave son los bloques de 32 bits de |seed|.
    let n = Math.abs(seed);
    const key = [];
    do { key.push(n % 4294967296); n = Math.floor(n / 4294967296); } while (n > 0);
    initByArray(key);
    return {
      random() {
        const a = int32() >>> 5, b = int32() >>> 6;
        return (a * 67108864 + b) * (1 / 9007199254740992);
      },
    };
  }

  function poisson(rng, mean) {
    const limit = Math.exp(-mean);
    let k = 0, product = rng.random();
    while (product > limit) { k++; product *= rng.random(); }
    return k;
  }

  function choose(rng, items, cumulative) {
    const x = rng.random() * cumulative[cumulative.length - 1];
    let lo = 0, hi = cumulative.length - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (x < cumulative[mid]) hi = mid; else lo = mid + 1; }
    return items[lo];
  }

  function simulate(params, armored, seed) {
    const sections = params.secciones;
    const armoredSet = new Set(armored || []);
    const reduction = params.blindaje.reduccion_letalidad;
    const cumulative = [];
    sections.reduce((total, section) => { const next = total + section.area; cumulative.push(next); return next; }, 0);
    const rng = MersenneTwister(seed === undefined ? params.semilla : seed);
    const planes = [];
    for (let number = 1; number <= params.aviones_por_mision; number++) {
      const hits = {};
      sections.forEach((section) => { hits[section.id] = 0; });
      let downed = false;
      const count = poisson(rng, params.impactos_promedio);
      for (let h = 0; h < count; h++) {
        const section = choose(rng, sections, cumulative);
        hits[section.id] += 1;
        const lethality = section.letalidad * (armoredSet.has(section.id) ? (1 - reduction) : 1);
        if (rng.random() < lethality) downed = true;
      }
      planes.push({ avion: "A" + String(number).padStart(4, "0"), hits, returned: !downed });
    }
    return planes;
  }

  const api = { MersenneTwister, simulate };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.WaldSim = api;
})(typeof window !== "undefined" ? window : globalThis);
