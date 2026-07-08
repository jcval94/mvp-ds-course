const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rows = [];
const directories = fs
  .readdirSync("generated")
  .filter((name) => /^data-class-.*-level-\d+$/.test(name));

for (const directory of directories) {
  const level = Number(directory.match(/level-(\d+)$/)[1]);
  const curriculumPath = path.join("generated", directory, "assets", "curriculum.js");
  if (!fs.existsSync(curriculumPath)) continue;

  const window = {};
  vm.runInNewContext(fs.readFileSync(curriculumPath, "utf8"), { window });
  const data = window.DCF_LEVEL || window.DCF_LEVEL2 || { modules: window.DCF_MODULES };

  for (const module of Object.values(data.modules)) {
    for (const [lessonIndex, lesson] of module.lessons.entries()) {
      const exercises = lesson.exercises || (lesson.practice ? [lesson.practice] : []);
      for (const [exerciseIndex, exercise] of exercises.entries()) {
        rows.push({
          Nivel: level,
          Tema: module.title,
          Concepto: lesson.title,
          Ejercicio: exercise.question || "",
          _moduleOrder: module.number ?? 999,
          _lessonOrder: lessonIndex + 1,
          _exerciseOrder: exerciseIndex + 1,
        });
      }
    }
  }
}

rows.sort(
  (a, b) =>
    a.Nivel - b.Nivel ||
    a._moduleOrder - b._moduleOrder ||
    a._lessonOrder - b._lessonOrder ||
    a._exerciseOrder - b._exerciseOrder,
);

const publicRows = rows.map(({ Nivel, Tema, Concepto, Ejercicio }) => ({
  Nivel,
  Tema,
  Concepto,
  Ejercicio,
}));

const escapeCsv = (value) => `"${String(value).replaceAll('"', '""').replace(/\r?\n/g, " ")}"`;
const csv = [
  "Nivel,Tema,Concepto,Ejercicio",
  ...publicRows.map((row) => Object.values(row).map(escapeCsv).join(",")),
].join("\r\n");

fs.mkdirSync("output", { recursive: true });
fs.writeFileSync("output/tabla_niveles_temas_conceptos_ejercicios.csv", `\ufeff${csv}`);
fs.writeFileSync(
  "output/tabla_niveles_temas_conceptos_ejercicios.json",
  JSON.stringify(publicRows, null, 2),
);

const porNivel = rows.reduce((groups, row) => {
  const level = String(row.Nivel);
  if (!groups[level]) groups[level] = [];
  groups[level].push(row);
  return groups;
}, {});

const inventoryRows = fs
  .readFileSync("docs/placement/curriculum_inventory.csv", "utf8")
  .split(/\r?\n/)
  .slice(1)
  .filter(Boolean);

const expectedConcepts = inventoryRows.length;
const expectedExercises = inventoryRows.reduce((count, line) => {
  const level = Number(line.split(",", 1)[0]);
  return count + (level === 1 ? 1 : 2);
}, 0);
const actualConcepts = new Set(rows.map((row) => `${row.Nivel}|${row.Tema}|${row.Concepto}`)).size;

console.log(
  JSON.stringify({
    ejercicios: rows.length,
    conceptos: actualConcepts,
    esperado: {
      conceptos: expectedConcepts,
      ejercicios: expectedExercises,
    },
    ok: actualConcepts === expectedConcepts && rows.length === expectedExercises,
    porNivel: Object.fromEntries(
      Object.entries(porNivel).map(([level, levelRows]) => [level, levelRows.length]),
    ),
  }),
);
