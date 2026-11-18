// Imprime en JSON las líneas de narración de una intro de caso (site/casos/<id>/escenas.js).
// Carga pixel.js, comun.js y escenas.js en un contexto aislado, sin navegador: las escenas solo
// se declaran (arte() y al() no se ejecutan). Uso: node harness/lineas_intro.cjs site/casos/4-1
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const dir = path.resolve(process.argv[2]);
const casos = path.dirname(dir);
const window = {};
const ctx = vm.createContext({ window, console });
for (const f of [path.join(casos, 'pixel.js'), path.join(casos, 'comun.js'), path.join(dir, 'escenas.js')]) {
  vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
}
const C = window.CASO;
if (!C || !Array.isArray(C.escenas)) throw new Error(dir + ': escenas.js no define window.CASO.escenas');
const lineas = [];
C.escenas.forEach(function (e, n) {
  (e.lineas || [{ t: e.texto }]).forEach(function (l) {
    const t = typeof l === 'string' ? l : l && l.t;
    if (t) lineas.push({ escena: n, t: t });
  });
});
process.stdout.write(JSON.stringify(lineas));
