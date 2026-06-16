(function () {
  const source = window.DCF_LEVEL2;
  const modules = source.modules;
  const moduleId = document.body.dataset.module;
  const currentModule = modules[moduleId];
  const params = new URLSearchParams(location.search);
  let lessonIndex = Math.max(
    0,
    currentModule.lessons.findIndex((lesson) => lesson.id === params.get("concept"))
  );
  let exerciseIndex = 0;
  let teacherMode = "live";
  let visualStep = 0;
  let hasInteracted = false;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const mean = (values) => values.reduce((total, value) => total + value, 0) / values.length;
  const sorted = (values) => [...values].sort((a, b) => a - b);
  const median = (values) => {
    const ordered = sorted(values);
    const middle = Math.floor(ordered.length / 2);
    return ordered.length % 2
      ? ordered[middle]
      : (ordered[middle - 1] + ordered[middle]) / 2;
  };
  const quantile = (values, p) => {
    const ordered = sorted(values);
    const position = (ordered.length - 1) * p;
    const lower = Math.floor(position);
    const upper = Math.ceil(position);
    return ordered[lower] + (ordered[upper] - ordered[lower]) * (position - lower);
  };
  const standardDeviation = (values) => {
    const center = mean(values);
    return Math.sqrt(
      values.reduce((total, value) => total + (value - center) ** 2, 0) /
        values.length
    );
  };
  const linearRegression = (pairs) => {
    const xs = pairs.map(([x]) => x);
    const ys = pairs.map(([, y]) => y);
    const xMean = mean(xs);
    const yMean = mean(ys);
    const numerator = pairs.reduce(
      (total, [x, y]) => total + (x - xMean) * (y - yMean),
      0
    );
    const denominator = xs.reduce(
      (total, x) => total + (x - xMean) ** 2,
      0
    );
    const slope = denominator ? numerator / denominator : 0;
    return { slope, intercept: yMean - slope * xMean };
  };
  const gaussian = (value) => Math.exp(-0.5 * value ** 2) / Math.sqrt(2 * Math.PI);
  const kernelDensity = (values, bandwidth, points = 80) => {
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    return Array.from({ length: points }, (_, index) => {
      const x = minimum + (index / (points - 1)) * (maximum - minimum);
      const density =
        values.reduce((total, value) => total + gaussian((x - value) / bandwidth), 0) /
        (values.length * bandwidth);
      return [x, density];
    });
  };
  const format = (value, digits = 0) =>
    new Intl.NumberFormat("es-MX", { maximumFractionDigits: digits }).format(value);
  const icon = (path) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"/></svg>`;
  const icons = {
    back: "m15 18-6-6 6-6",
    next: "m9 18 6-6-6-6",
    play: "m8 5 11 7-11 7Z",
    reset: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5",
    copy:
      "M9 9h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2ZM5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1",
  };

  function shell() {
    $("#app").innerHTML = `
      <header class="header">
        <a class="brand" href="index.html">
          <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span>
          <strong>DataClass Forge</strong>
          <span>Nivel 2</span>
        </a>
        <a class="header-link" href="../../datasets/README.md">Fuentes y licencias</a>
      </header>
      <div class="layout">
        <nav class="module-nav" aria-label="Bloques del Nivel 2">
          <p>Descripción y visualización</p>
          ${Object.values(modules)
            .map(
              (module) => `
              <a class="${module.id === moduleId ? "active" : ""}" href="${module.href}">
                <b>${module.number}</b><span>${module.title}</span>
              </a>`
            )
            .join("")}
          <a class="portal-link" href="index.html">Volver al nivel</a>
        </nav>
        <main>
          <div class="lesson-nav">
            <span id="lessonCount"></span>
            <div class="lesson-actions">
              <button id="previous" aria-label="Concepto anterior">${icon(icons.back)}</button>
              <button id="next">Siguiente ${icon(icons.next)}</button>
            </div>
          </div>
          <section class="intro">
            <p id="blockName"></p>
            <h1 id="lessonTitle"></h1>
            <p id="lessonObjective"></p>
          </section>
          <section class="lab">
            <div class="lab-toolbar">
              <div><strong id="datasetName"></strong><span id="datasetMeta"></span></div>
              <button id="resetVisual" class="secondary">${icon(icons.reset)} Reiniciar</button>
              <button id="runVisual" class="primary">${icon(icons.play)} <span></span></button>
            </div>
            <div id="visual" class="visual"></div>
            <div class="exercise">
              <div class="exercise-main">
                <div class="exercise-tabs">
                  <button data-exercise="0" class="active">Ejercicio guiado</button>
                  <button data-exercise="1">Transferencia</button>
                </div>
                <p id="exerciseEvidence" class="exercise-evidence"></p>
                <h2 id="question"></h2>
                <div id="options"></div>
                <button id="hint" class="hint">Mostrar pista</button>
                <p id="hintText" hidden></p>
              </div>
              <div id="feedback" class="feedback">
                <strong>Retroalimentación</strong>
                <p>Selecciona una respuesta y justifícala con la evidencia visual.</p>
              </div>
            </div>
          </section>
        </main>
        <aside class="teacher">
          <div class="teacher-tabs">
            <button data-mode="learn">Aprender</button>
            <button data-mode="practice">Ejercitar</button>
            <button data-mode="live" class="active">En vivo</button>
          </div>
          <div id="teacherContent"></div>
        </aside>
      </div>`;
  }

  function renderLesson() {
    visualStep = 0;
    exerciseIndex = 0;
    hasInteracted = false;
    const lesson = currentModule.lessons[lessonIndex];
    const dataset = source.datasets[currentModule.dataset_id];
    document.title = `${lesson.title} | DataClass Forge`;
    history.replaceState(null, "", `?concept=${lesson.id}`);
    $("#lessonCount").textContent = `Bloque ${currentModule.number} de 4 · Concepto ${
      lessonIndex + 1
    } de ${currentModule.lessons.length}`;
    $("#blockName").textContent = currentModule.title;
    $("#lessonTitle").textContent = lesson.title;
    $("#lessonObjective").textContent = lesson.objective;
    $("#datasetName").textContent = currentModule.dataset_name;
    $("#datasetMeta").textContent = `${dataset.rows.toLocaleString("es-MX")} filas · ${
      dataset.license
    }`;
    $("#runVisual span").textContent = lesson.visual.action;
    $("#previous").disabled = lessonIndex === 0;
    $("#next").innerHTML =
      lessonIndex === currentModule.lessons.length - 1
        ? `Volver al nivel ${icon(icons.next)}`
        : `Siguiente ${icon(icons.next)}`;
    renderVisual();
    renderExercise();
    renderTeacher();
  }

  function renderVisual() {
    const lesson = currentModule.lessons[lessonIndex];
    if (lesson.visual.type === "summary") renderSummary(lesson);
    if (lesson.visual.type === "distribution") renderDistribution(lesson);
    if (lesson.visual.type === "comparison") renderComparison(lesson);
    if (lesson.visual.type === "outlier") renderOutlier(lesson);
  }

  function svgFrame(content, label) {
    return `<p class="visual-cue">${label}</p>
      <svg class="chart" viewBox="0 0 760 330" role="img" aria-label="${label}">
        ${content}
      </svg>`;
  }

  function renderSummary(lesson) {
    const focus = lesson.visual.focus;
    let values = [...source.data.penguinMasses];
    if (
      ["mean", "median", "range", "variance", "sd"].includes(focus) &&
      visualStep % 2
    ) {
      values = [...values.slice(0, -1), Math.max(...values) + 1700];
    }

    if (focus === "mode") {
      const widths = [100, 250, 500];
      const bucketWidth = widths[visualStep % widths.length];
      const minimum = Math.floor(Math.min(...values) / bucketWidth) * bucketWidth;
      const maximum = Math.ceil(Math.max(...values) / bucketWidth) * bucketWidth;
      const buckets = Array.from(
        { length: Math.max(1, Math.ceil((maximum - minimum) / bucketWidth)) },
        (_, index) => ({ start: minimum + index * bucketWidth, count: 0 })
      );
      values.forEach((value) => {
        const index = Math.min(
          buckets.length - 1,
          Math.floor((value - minimum) / bucketWidth)
        );
        buckets[index].count += 1;
      });
      const maxCount = Math.max(...buckets.map((bucket) => bucket.count));
      const barWidth = 630 / buckets.length;
      const bars = buckets
        .map((bucket, index) => {
          const height = (bucket.count / maxCount) * 205;
          return `<rect x="${65 + index * barWidth}" y="${260 - height}" width="${
            barWidth - 2
          }" height="${height}" class="bar"/>
          <text x="${65 + index * barWidth + barWidth / 2}" y="282" text-anchor="middle" class="small">${
            index % 2 ? "" : format(bucket.start)
          }</text>`;
        })
        .join("");
      const mode = [...buckets].sort((a, b) => b.count - a.count)[0];
      $("#visual").innerHTML = svgFrame(
        `<line x1="55" y1="260" x2="715" y2="260" class="axis"/>
         ${bars}
         <text x="65" y="312">Masa corporal (g)</text>
         <text x="695" y="45" text-anchor="end">Intervalos de ${format(
           bucketWidth
         )} g · máximo ${format(mode.start)}–${format(mode.start + bucketWidth)} g</text>`,
        `${lesson.visual.cue} ${source.data.displayNotes.penguinMasses}`
      );
      return;
    }

    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const x = (value) => 65 + ((value - minimum) / (maximum - minimum || 1)) * 630;
    const center = mean(values);
    const middle = median(values);
    const sd = standardDeviation(values);
    const q1 = quantile(values, 0.25);
    const q3 = quantile(values, 0.75);
    const points = values
      .map(
        (value, index) =>
          `<circle cx="${x(value)}" cy="${242 - (index % 9) * 7}" r="3.2" class="point"/>`
      )
      .join("");
    const marker = (value, color, title, y = 88) => `
      <line x1="${x(value)}" y1="${y}" x2="${x(value)}" y2="250" stroke="${color}" stroke-width="3"/>
      <text x="${x(value)}" y="${y - 10}" text-anchor="middle" fill="${color}">${title}</text>`;
    let overlay = marker(center, "#087f7b", `Media ${format(center)}`);
    if (focus === "mean" || focus === "median") {
      overlay += marker(middle, "#285fb8", `Mediana ${format(middle)}`, 125);
    }
    if (focus === "percentile") {
      const percentiles = [0.25, 0.5, 0.75];
      const active = percentiles[visualStep % percentiles.length];
      const value = quantile(values, active);
      overlay = marker(
        value,
        "#285fb8",
        `P${active * 100} ${format(value)} g`,
        100
      );
    }
    if (focus === "range") {
      overlay = `${marker(minimum, "#d35a4a", `Mín ${format(minimum)}`)}
        ${marker(maximum, "#d35a4a", `Máx ${format(maximum)}`, 125)}
        <text x="380" y="62" text-anchor="middle">Rango ${format(maximum - minimum)} g</text>`;
    }
    if (focus === "variance" || focus === "sd") {
      overlay += `<rect x="${x(center - sd)}" y="125" width="${Math.max(
        0,
        x(center + sd) - x(center - sd)
      )}" height="42" fill="#dff3f1"/>
        <text x="380" y="152" text-anchor="middle">${
          focus === "variance"
            ? `Varianza descriptiva ${format(sd ** 2)} g²`
            : `±1 DE ${format(sd)} g`
        }</text>`;
    }
    $("#visual").innerHTML = svgFrame(
      `<line x1="55" y1="250" x2="715" y2="250" class="axis"/>
       <text x="55" y="280">${format(minimum)} g</text>
       <text x="715" y="280" text-anchor="end">${format(maximum)} g</text>
       ${q1 !== q3 ? `<line x1="${x(q1)}" y1="260" x2="${x(q3)}" y2="260" class="iqr"/>` : ""}
       ${points}${overlay}`,
      `${lesson.visual.cue} ${source.data.displayNotes.penguinMasses}`
    );
  }

  function histogram(values, binCount) {
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);
    const width = (maximum - minimum) / binCount;
    const bins = Array.from({ length: binCount }, (_, index) => ({
      start: minimum + index * width,
      count: 0,
    }));
    values.forEach((value) => {
      const index = Math.min(binCount - 1, Math.floor((value - minimum) / width));
      bins[index].count += 1;
    });
    return { bins, minimum, maximum, maxCount: Math.max(...bins.map((bin) => bin.count)) };
  }

  function renderDistribution(lesson) {
    const focus = lesson.visual.focus;
    const allValues = source.data.bikeCounts;

    if (focus === "density") {
      const bandwidths = [250, 600, 1200];
      const bandwidth = bandwidths[visualStep % bandwidths.length];
      const density = kernelDensity(allValues, bandwidth);
      const maxDensity = Math.max(...density.map(([, value]) => value));
      const minimum = Math.min(...allValues);
      const maximum = Math.max(...allValues);
      const x = (value) => 65 + ((value - minimum) / (maximum - minimum)) * 630;
      const y = (value) => 265 - (value / maxDensity) * 210;
      const points = density.map(([value, d]) => `${x(value)},${y(d)}`).join(" ");
      $("#visual").innerHTML = svgFrame(
        `<line x1="55" y1="265" x2="715" y2="265" class="axis"/>
         <polyline points="${points}" class="density"/>
         <text x="65" y="305">${format(minimum)} alquileres</text>
         <text x="715" y="305" text-anchor="end">${format(maximum)} alquileres</text>
         <text x="695" y="45" text-anchor="end">KDE · ancho de banda ${format(
           bandwidth
         )} · área = 1</text>`,
        lesson.visual.cue
      );
      return;
    }

    if (focus === "multimodal" && visualStep % 2) {
      const colors = ["#087f7b", "#285fb8", "#d35a4a", "#9b5ca5"];
      const entries = Object.entries(source.data.bikeSeasons);
      const minimum = Math.min(...allValues);
      const maximum = Math.max(...allValues);
      const curves = entries.map(([name, values], index) => ({
        name,
        color: colors[index],
        density: kernelDensity(values, 650),
      }));
      const maxDensity = Math.max(
        ...curves.flatMap((curve) => curve.density.map(([, value]) => value))
      );
      const x = (value) => 65 + ((value - minimum) / (maximum - minimum)) * 630;
      const y = (value) => 265 - (value / maxDensity) * 205;
      const paths = curves
        .map(
          (curve, index) =>
            `<polyline points="${curve.density
              .map(([value, d]) => `${x(value)},${y(d)}`)
              .join(" ")}" fill="none" stroke="${curve.color}" stroke-width="3"/>
             <text x="535" y="${52 + index * 22}" fill="${curve.color}">${curve.name}</text>`
        )
        .join("");
      $("#visual").innerHTML = svgFrame(
        `<line x1="55" y1="265" x2="715" y2="265" class="axis"/>
         ${paths}
         <text x="65" y="305">Alquileres diarios</text>
         <text x="695" y="45" text-anchor="end">Distribuciones por temporada</text>`,
        lesson.visual.cue
      );
      return;
    }

    const binChoices = [7, 12, 22];
    const binCount = binChoices[visualStep % binChoices.length];
    let values = allValues;
    let stateLabel = `${binCount} bins · n=${values.length}`;
    if (focus === "shape") {
      const choices = [
        ["Todos los días", allValues],
        ["Invierno", source.data.bikeSeasons.Invierno],
        ["Verano", source.data.bikeSeasons.Verano],
      ];
      const active = choices[visualStep % choices.length];
      values = active[1];
      stateLabel = `${active[0]} · n=${values.length}`;
    }
    const result = histogram(values, binCount);
    const barWidth = 630 / binCount;
    const bars = result.bins
      .map((bin, index) => {
        const height = (bin.count / result.maxCount) * 215;
        return `<rect x="${65 + index * barWidth}" y="${265 - height}" width="${barWidth - 2}"
          height="${height}" class="bar"/><text x="${65 + index * barWidth + barWidth / 2}"
          y="286" text-anchor="middle" class="small">${index % 2 ? "" : format(bin.start)}</text>`;
      })
      .join("");
    let overlay = "";
    if (focus === "skew" && visualStep % 2) {
      const q3 = quantile(values, 0.75);
      const center = mean(values);
      const middle = median(values);
      const x = (value) =>
        65 + ((value - result.minimum) / (result.maximum - result.minimum)) * 630;
      overlay = `
        <rect x="${x(q3)}" y="45" width="${Math.max(0, 695 - x(q3))}" height="220" fill="#fbecea" opacity=".72"/>
        <line x1="${x(center)}" y1="58" x2="${x(center)}" y2="265" stroke="#d35a4a" stroke-width="3"/>
        <line x1="${x(middle)}" y1="82" x2="${x(middle)}" y2="265" stroke="#285fb8" stroke-width="3"/>
        <text x="${x(center)}" y="50" text-anchor="middle" fill="#d35a4a">Media ${format(center)}</text>
        <text x="${x(middle)}" y="76" text-anchor="middle" fill="#285fb8">Mediana ${format(middle)}</text>`;
    }
    $("#visual").innerHTML = svgFrame(
      `<line x1="55" y1="265" x2="715" y2="265" class="axis"/>
       ${bars}${overlay}
       <text x="65" y="315">Alquileres diarios</text>
       <text x="695" y="45" text-anchor="end">${stateLabel}</text>`,
      lesson.visual.cue
    );
  }

  function renderComparison(lesson) {
    const groups = source.data.penguinGroups;
    const names = Object.keys(groups);
    if (lesson.visual.focus === "bar") {
      const showCount = visualStep % 2 === 1;
      const values = names.map((name) =>
        showCount ? groups[name].length : mean(groups[name])
      );
      const max = Math.max(...values);
      $("#visual").innerHTML = svgFrame(
        names
          .map((name, index) => {
            const height = (values[index] / max) * 210;
            return `<rect x="${120 + index * 190}" y="${265 - height}" width="92" height="${height}" class="bar"/>
              <text x="${166 + index * 190}" y="292" text-anchor="middle">${name}</text>
              <text x="${166 + index * 190}" y="${250 - height}" text-anchor="middle">${
                showCount ? `${format(values[index])} pingüinos` : `${format(values[index])} g`
              }</text>`;
          })
          .join("") +
          `<line x1="70" y1="265" x2="700" y2="265" class="axis"/>
           <text x="695" y="45" text-anchor="end">${
             showCount ? "Conteo por especie" : "Media de masa corporal"
           } · base cero</text>`,
        lesson.visual.cue
      );
      return;
    }
    if (lesson.visual.focus === "ecdf") {
      const colors = ["#087f7b", "#285fb8", "#d35a4a"];
      const all = Object.values(groups).flat();
      const min = Math.min(...all);
      const max = Math.max(...all);
      const x = (value) => 65 + ((value - min) / (max - min)) * 630;
      const thresholds = [3500, 4000, 4500, 5000];
      const threshold = thresholds[visualStep % thresholds.length];
      const paths = names
        .map((name, groupIndex) => {
          const values = sorted(groups[name]);
          const stride = Math.max(1, Math.ceil(values.length / 70));
          const points = values
            .map((value, index) => ({ value, index }))
            .filter(({ index }) => index % stride === 0 || index === values.length - 1)
            .map(({ value, index }) => `${x(value)},${260 - ((index + 1) / values.length) * 210}`)
            .join(" ");
          const proportion =
            values.filter((value) => value <= threshold).length / values.length;
          return `<polyline points="${points}" fill="none" stroke="${colors[groupIndex]}" stroke-width="3"/>
            <text x="${510}" y="${58 + groupIndex * 24}" fill="${colors[groupIndex]}">${
              name
            }: ${format(proportion * 100, 1)}% ≤ ${format(threshold)} g</text>`;
        })
        .join("");
      $("#visual").innerHTML = svgFrame(
        `<line x1="55" y1="260" x2="715" y2="260" class="axis"/>
         <line x1="65" y1="45" x2="65" y2="265" class="axis"/>${paths}
         <line x1="${x(threshold)}" y1="45" x2="${x(threshold)}" y2="260" stroke="#172436" stroke-dasharray="5 5"/>
         <text x="65" y="296">${format(min)} g</text><text x="715" y="296" text-anchor="end">${format(max)} g</text>
         <text x="22" y="52">1.0</text><text x="28" y="262">0</text>
         <text x="${x(threshold)}" y="285" text-anchor="middle">${format(threshold)} g</text>`,
        lesson.visual.cue
      );
      return;
    }
    const all = Object.values(groups).flat();
    const min = Math.min(...all);
    const max = Math.max(...all);
    const x = (value) => 75 + ((value - min) / (max - min)) * 610;
    const content = names
      .map((name, index) => {
        const values = groups[name];
        const q1 = quantile(values, 0.25);
        const q2 = median(values);
        const q3 = quantile(values, 0.75);
        const y = 95 + index * 78;
        if (lesson.visual.focus === "violin") {
          const bandwidths = [120, 250, 450];
          const bandwidth = bandwidths[visualStep % bandwidths.length];
          const density = kernelDensity(values, bandwidth, 65);
          const maxDensity = Math.max(...density.map(([, value]) => value));
          const top = density
            .map(([value, d]) => `${x(value)},${y - (d / maxDensity) * 24}`)
            .join(" ");
          const bottom = [...density]
            .reverse()
            .map(([value, d]) => `${x(value)},${y + (d / maxDensity) * 24}`)
            .join(" ");
          return `<polygon points="${top} ${bottom}" class="violin"/>
            <line x1="${x(q2)}" y1="${y - 29}" x2="${x(q2)}" y2="${y + 29}" class="median"/>
            <text x="28" y="${y + 5}">${name}</text>
            <text x="690" y="${y + 5}" text-anchor="end">n=${values.length}</text>`;
        }
        const iqr = q3 - q1;
        const lowerFence = q1 - 1.5 * iqr;
        const upperFence = q3 + 1.5 * iqr;
        const lowerWhisker = Math.min(...values.filter((value) => value >= lowerFence));
        const upperWhisker = Math.max(...values.filter((value) => value <= upperFence));
        const outliers = values.filter(
          (value) => value < lowerWhisker || value > upperWhisker
        );
        const labels =
          visualStep % 2
            ? `<text x="${x(q1)}" y="${y - 29}" text-anchor="middle">Q1</text>
               <text x="${x(q2)}" y="${y - 29}" text-anchor="middle">Mediana</text>
               <text x="${x(q3)}" y="${y - 29}" text-anchor="middle">Q3</text>`
            : "";
        const outlierPoints = outliers
          .map(
            (value) =>
              `<circle cx="${x(value)}" cy="${y}" r="${
                visualStep % 2 ? 5 : 3
              }" class="${visualStep % 2 ? "highlight-point" : "scatter-point"}"/>`
          )
          .join("");
        return `<line x1="${x(lowerWhisker)}" y1="${y}" x2="${x(
          upperWhisker
        )}" y2="${y}" class="whisker"/>
          <rect x="${x(q1)}" y="${y - 18}" width="${x(q3) - x(q1)}" height="36" class="box"/>
          <line x1="${x(q2)}" y1="${y - 18}" x2="${x(q2)}" y2="${y + 18}" class="median"/>
          ${outlierPoints}${labels}<text x="28" y="${y + 5}">${name}</text>`;
      })
      .join("");
    $("#visual").innerHTML = svgFrame(
      `${content}<line x1="65" y1="300" x2="700" y2="300" class="axis"/>
       <text x="65" y="323">${format(min)} g</text><text x="700" y="323" text-anchor="end">${format(max)} g</text>
       ${
         lesson.visual.focus === "violin"
           ? `<text x="695" y="45" text-anchor="end">Ancho de banda ${
               [120, 250, 450][visualStep % 3]
             } g</text>`
           : `<text x="695" y="45" text-anchor="end">Bigotes: 1.5 IQR</text>`
       }`,
      lesson.visual.cue
    );
  }

  function renderOutlier(lesson) {
    if (lesson.visual.focus === "capture") {
      const validated = visualStep % 2 === 1;
      $("#visual").innerHTML = `<p class="visual-cue">${lesson.visual.cue}</p>
        <div class="record-compare">
          <div><span>Snapshot real</span><strong>alcohol = 12.0</strong><p>Valor plausible y trazable.</p></div>
          <div class="${validated ? "invalid" : ""}"><span>Copia didáctica alterada</span><strong>alcohol = -12</strong><p>${
            validated
              ? "Regla alcohol ≥ 0: falla. Marcar faltante y conservar una bandera de incidencia."
              : "Ejecuta la regla de dominio antes de decidir cómo tratar el valor."
          }</p></div>
        </div>
        <p class="sample-note">${
          validated
            ? "Resultado: valor imposible, no se corrige por adivinanza."
            : "Estado inicial: registro pendiente de validación."
        }</p>`;
      return;
    }

    const allPairs = source.data.wineRegression;
    const alcoholValues = allPairs.map(([alcohol]) => alcohol);
    const q1 = quantile(alcoholValues, 0.25);
    const q3 = quantile(alcoholValues, 0.75);
    const upperFence = q3 + 1.5 * (q3 - q1);
    const maxRow = source.data.wineMaxAlcohol;

    if (lesson.visual.focus === "outlier") {
      const minimum = Math.min(...alcoholValues);
      const maximum = Math.max(...alcoholValues);
      const x = (value) => 65 + ((value - minimum) / (maximum - minimum)) * 630;
      const sampled = alcoholValues.filter(
        (_, index) => index % 37 === 0
      );
      const points = sampled
        .map(
          (value, index) =>
            `<circle cx="${x(value)}" cy="${230 - (index % 8) * 10}" r="3.2" class="scatter-point"/>`
        )
        .join("");
      const active = visualStep % 2 === 1;
      $("#visual").innerHTML = svgFrame(
        `<line x1="55" y1="245" x2="715" y2="245" class="axis"/>
         <rect x="${x(q1)}" y="170" width="${x(q3) - x(q1)}" height="42" class="box"/>
         <line x1="${x(upperFence)}" y1="105" x2="${x(
          upperFence
        )}" y2="250" stroke="#d35a4a" stroke-width="3" stroke-dasharray="5 5"/>
         ${points}
         <circle cx="${x(Number(maxRow.alcohol))}" cy="90" r="${
           active ? 9 : 5
         }" class="${active ? "highlight-point" : "scatter-point"}"/>
         <text x="${x(upperFence)}" y="92" text-anchor="middle" fill="#d35a4a">Cerca superior ${format(
           upperFence,
           1
         )}%</text>
         <text x="${x(Number(maxRow.alcohol))}" y="65" text-anchor="middle">Máximo ${format(
           Number(maxRow.alcohol),
           1
         )}% · ${active ? "revisar fila" : "sin veredicto"}</text>
         <text x="65" y="292">Alcohol (%)</text>`,
        `${lesson.visual.cue} Puntos: muestra visual determinística; cuartiles sobre 6,497 filas.`
      );
      return;
    }

    const points = source.data.winePoints;
    const minX = Math.min(...points.map((point) => point.alcohol));
    const maxX = Math.max(...points.map((point) => point.alcohol));
    const minY = Math.min(...points.map((point) => point.density));
    const maxY = Math.max(...points.map((point) => point.density));
    const x = (value) => 65 + ((value - minX) / (maxX - minX)) * 630;
    const y = (value) => 270 - ((value - minY) / (maxY - minY)) * 215;
    const highlighted = points.reduce((best, point) =>
      point.alcohol > best.alcohol ? point : best
    );
    const circles = points
      .map((point) => {
        const active =
          point === highlighted && (visualStep % 2 || lesson.visual.focus === "rare");
        return `<circle cx="${x(point.alcohol)}" cy="${y(point.density)}" r="${active ? 8 : 3.2}"
          class="${active ? "highlight-point" : "scatter-point"}"/>`;
      })
      .join("");
    let line = "";
    let details = "";
    if (lesson.visual.focus === "leverage") {
      const withoutExtreme = allPairs.filter(
        ([alcohol]) => alcohol < Number(maxRow.alcohol)
      );
      const fit = linearRegression(
        visualStep % 2 ? withoutExtreme : allPairs
      );
      const yFor = (value) => fit.intercept + fit.slope * value;
      line = `<line x1="${x(minX)}" y1="${y(yFor(minX))}" x2="${x(maxX)}" y2="${y(
        yFor(maxX)
      )}" class="fit"/>
        <text x="690" y="48" text-anchor="end">${
          visualStep % 2 ? "Ajuste sin el punto de 14.9%" : "Ajuste con todas las filas"
        } · pendiente ${fit.slope.toFixed(5)}</text>`;
    }
    if (lesson.visual.focus === "rare" && visualStep % 2) {
      details = `<div class="case-detail">
        <strong>Caso trazable con alcohol máximo</strong>
        <span>Alcohol ${format(Number(maxRow.alcohol), 1)}%</span>
        <span>Densidad ${Number(maxRow.density).toFixed(4)}</span>
        <span>Calidad ${format(Number(maxRow.quality))}/10</span>
        <span>Tipo ${maxRow.color === "red" ? "tinto" : "blanco"}</span>
        <p>Es extremo respecto de la regla IQR, pero sus campos son físicamente plausibles. La rareza no prueba un error.</p>
      </div>`;
    }
    $("#visual").innerHTML = svgFrame(
      `<line x1="55" y1="270" x2="715" y2="270" class="axis"/>
       <line x1="65" y1="45" x2="65" y2="280" class="axis"/>
       ${circles}${line}
       <text x="65" y="310">Alcohol (%)</text>
       <text x="20" y="45">Densidad</text>`,
      `${lesson.visual.cue} ${source.data.displayNotes.winePoints}`
    ) + details;
  }

  function renderExercise() {
    const lesson = currentModule.lessons[lessonIndex];
    const exercise = lesson.exercises[exerciseIndex];
    $$(".exercise-tabs button").forEach((button) =>
      button.classList.toggle("active", +button.dataset.exercise === exerciseIndex)
    );
    $("#exerciseEvidence").textContent = `Evidencia: ${exercise.evidence}`;
    $("#question").textContent = exercise.question;
    const offset = (lessonIndex + exerciseIndex) % exercise.options.length;
    const options = [
      ...exercise.options.slice(offset),
      ...exercise.options.slice(0, offset),
    ];
    $("#options").innerHTML = options
      .map(
        (option, index) =>
          `<button class="option" data-correct="${option.correct}" data-feedback="${encodeURIComponent(
            option.feedback
          )}" ${hasInteracted ? "" : "disabled"}><span>${String.fromCharCode(
            65 + index
          )}</span>${option.text}</button>`
      )
      .join("");
    $("#hintText").hidden = true;
    $("#hintText").textContent = exercise.hint;
    $("#hint").textContent = "Mostrar pista";
    $("#feedback").className = "feedback";
    $("#feedback p").textContent =
      hasInteracted
        ? "Selecciona una respuesta y justifícala con la evidencia visual."
        : `Ejecuta «${lesson.visual.action}» antes de responder.`;
    bindExercise();
  }

  function renderTeacher() {
    const lesson = currentModule.lessons[lessonIndex];
    $$(".teacher-tabs button").forEach((button) =>
      button.classList.toggle("active", button.dataset.mode === teacherMode)
    );
    if (teacherMode === "learn") {
      $("#teacherContent").innerHTML = `
        <p class="teacher-lead">Fuente conceptual</p>
        <section><h2>Definición</h2><p>${lesson.definition}</p></section>
        <section><h2>Intuición</h2><p>${lesson.intuition}</p></section>
        <section><h2>Error común</h2><p>${lesson.error}</p></section>
        <section><h2>Límite</h2><p>El snapshot permite describir patrones, no identificar sus causas.</p></section>`;
      return;
    }
    if (teacherMode === "practice") {
      $("#teacherContent").innerHTML = `
        <p class="teacher-lead">Protocolo de práctica</p>
        <ol>
          <li>Oculta el resultado y pide una predicción.</li>
          <li>Ejecuta la interacción una sola vez.</li>
          <li>Pide citar dos rasgos visibles.</li>
          <li>Contrasta el ejercicio guiado con la transferencia.</li>
          <li>Cierra con una afirmación permitida y una no permitida.</li>
        </ol>`;
      return;
    }
    const tools = [
      ["Codex", lesson.prompts.codex, "Ejecuta o modifica código reproducible."],
      ["Gemini", lesson.prompts.gemini, "Facilita preguntas y cuestiona la interpretación."],
      ["ChatGPT", lesson.prompts.chatgpt, "Revisa límites y propone transferencia."],
    ];
    $("#teacherContent").innerHTML = `
      <p class="teacher-lead">IA externa, roles complementarios</p>
      ${tools
        .map(
          ([name, prompt, role]) => `<section class="tool">
            <div><h2>${name}</h2><button class="copy" data-copy="${encodeURIComponent(
              prompt
            )}">${icon(icons.copy)} Copiar</button></div>
            <p>${role}</p><pre>${prompt}</pre>
          </section>`
        )
        .join("")}
      <section class="offline"><h2>Plan offline</h2><p>Usa el HTML, el CSV local, predicciones y pizarra. No pegues datos sensibles ni credenciales en una herramienta externa.</p></section>`;
    bindCopy();
  }

  function bindExercise() {
    $$(".option").forEach((button) =>
      button.addEventListener("click", () => {
        $$(".option").forEach((item) => item.classList.remove("correct", "wrong"));
        const correct = button.dataset.correct === "true";
        button.classList.add(correct ? "correct" : "wrong");
        $("#feedback").className = `feedback ${correct ? "success" : "error"}`;
        $("#feedback p").textContent = decodeURIComponent(button.dataset.feedback);
      })
    );
  }

  function bindCopy() {
    $$(".copy").forEach((button) =>
      button.addEventListener("click", async () => {
        const text = decodeURIComponent(button.dataset.copy);
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const area = document.createElement("textarea");
          area.value = text;
          document.body.append(area);
          area.select();
          document.execCommand("copy");
          area.remove();
        }
        button.textContent = "Copiado";
        setTimeout(() => (button.innerHTML = `${icon(icons.copy)} Copiar`), 1200);
      })
    );
  }

  function bindGlobal() {
    $("#runVisual").addEventListener("click", () => {
      visualStep += 1;
      hasInteracted = true;
      renderVisual();
      renderExercise();
    });
    $("#resetVisual").addEventListener("click", () => {
      visualStep = 0;
      hasInteracted = false;
      renderVisual();
      renderExercise();
    });
    $("#previous").addEventListener("click", () => {
      lessonIndex = Math.max(0, lessonIndex - 1);
      renderLesson();
    });
    $("#next").addEventListener("click", () => {
      if (lessonIndex === currentModule.lessons.length - 1) location.href = "index.html";
      else {
        lessonIndex += 1;
        renderLesson();
      }
    });
    $$(".exercise-tabs button").forEach((button) =>
      button.addEventListener("click", () => {
        exerciseIndex = +button.dataset.exercise;
        visualStep = 0;
        hasInteracted = false;
        renderVisual();
        renderExercise();
      })
    );
    $("#hint").addEventListener("click", () => {
      const hidden = $("#hintText").hidden;
      $("#hintText").hidden = !hidden;
      $("#hint").textContent = hidden ? "Ocultar pista" : "Mostrar pista";
    });
    $$(".teacher-tabs button").forEach((button) =>
      button.addEventListener("click", () => {
        teacherMode = button.dataset.mode;
        renderTeacher();
      })
    );
  }

  if (!currentModule) throw new Error(`Bloque desconocido: ${moduleId}`);
  shell();
  bindGlobal();
  renderLesson();
})();
