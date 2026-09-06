(function () {
  "use strict";

  const labs = {
    "event": {
      title: "Convierte una condición en un evento",
      intro: "En código, un evento es una regla booleana aplicada a cada observación.",
      code: `pedidos = [3, 5, 2, 8, 1, 7]\n\nevento = [tacos >= 6 for tacos in pedidos]\np = sum(evento) / len(evento)\nprint(p)  # 0.333...`,
      takeaway: "La condición define el subconjunto; la proporción estima qué tan frecuente fue."
    },
    "complement": {
      title: "Construye el complemento sin inventar casos",
      intro: "El complemento usa exactamente las mismas observaciones y niega la condición original.",
      code: `pedidos = [3, 5, 2, 8, 1, 7]\n\nevento = [t >= 6 for t in pedidos]\ncomplemento = [not x for x in evento]\n\nprint(sum(evento) + sum(complemento))\nprint(len(pedidos))`,
      takeaway: "Evento y complemento deben cubrir el total una sola vez."
    },
    "independence": {
      title: "Compara una tasa global contra una condicionada",
      intro: "Una señal práctica contra independencia aparece cuando condicionar cambia claramente la probabilidad.",
      code: `es_adelie = [1, 1, 0, 0, 1, 0]\ntorgersen = [1, 1, 0, 0, 0, 0]\n\np_global = sum(es_adelie) / len(es_adelie)\nfiltrados = [a for a, t in zip(es_adelie, torgersen) if t]\np_cond = sum(filtrados) / len(filtrados)\n\nprint(p_global, p_cond)`,
      takeaway: "Comparar tasas ayuda a evaluar asociación probabilística; no demuestra causalidad."
    },
    "conditional-probability": {
      title: "Cambia primero el denominador",
      intro: "La probabilidad condicional empieza filtrando por la condición y solo después cuenta el evento.",
      code: `isla = ["T", "T", "B", "B", "T"]\nespecie = ["A", "A", "G", "A", "G"]\n\nuniverso = [e for e, i in zip(especie, isla) if i == "T"]\np = sum(e == "A" for e in universo) / len(universo)\nprint(p)`,
      takeaway: "El denominador correcto es el universo condicionado, no toda la tabla."
    },
    "bernoulli": {
      title: "Simula un ensayo sí/no",
      intro: "Una Bernoulli representa un solo resultado binario con probabilidad p de éxito.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\np = 0.30\nresultado = rng.binomial(n=1, p=p)\n\nprint(resultado)  # 0 o 1`,
      takeaway: "Un ensayo produce 0 o 1; p describe la frecuencia esperada al repetirlo."
    },
    "binomial": {
      title: "Cuenta éxitos en varios ensayos",
      intro: "La binomial suma n ensayos Bernoulli bajo un mismo p.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\nn, p = 20, 0.30\nexitos = rng.binomial(n=n, p=p, size=1000)\n\nprint(exitos.mean())\nprint(n * p)`,
      takeaway: "El promedio simulado se acerca a n·p, aunque cada grupo tenga un conteo distinto."
    },
    "normal": {
      title: "Simula una campana con media y dispersión",
      intro: "La normal se controla con dos parámetros: media y desviación estándar.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\nmu, sigma = 100, 15\nmuestra = rng.normal(mu, sigma, size=5000)\n\nprint(muestra.mean())\nprint(muestra.std(ddof=1))`,
      takeaway: "Una simulación normal es un modelo; no prueba que los datos reales sean normales."
    },
    "poisson": {
      title: "Simula conteos por intervalo",
      intro: "Poisson modela cuántos eventos aparecen en una ventana cuando trabajas con una tasa λ.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\nlam = 4.2\nconteos = rng.poisson(lam=lam, size=1000)\n\nprint(conteos.mean())\nprint(conteos[:10])`,
      takeaway: "λ es el conteo medio esperado por ventana, no el valor que ocurrirá siempre."
    },
    "sampling-variability": {
      title: "Repite muestras y mira cómo cambia el estimador",
      intro: "La variabilidad muestral se vuelve visible al recalcular la misma métrica sobre muchas muestras.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\npoblacion = rng.normal(50, 10, size=10000)\n\nmedias = [rng.choice(poblacion, 30).mean() for _ in range(500)]\nprint(np.mean(medias))\nprint(np.std(medias, ddof=1))`,
      takeaway: "El estimador cambia entre muestras aunque la población sea la misma."
    },
    "selection-bias": {
      title: "Haz visible un sesgo de selección",
      intro: "Comparar población y muestra seleccionada ayuda a detectar cuándo el mecanismo de selección altera la distribución.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\npoblacion = rng.normal(50, 10, size=5000)\n\nseleccion = poblacion[poblacion > 55]\nprint(poblacion.mean())\nprint(seleccion.mean())`,
      takeaway: "La diferencia viene de cómo elegiste la muestra, no de que el cálculo de la media esté mal."
    },
    "law-large-numbers": {
      title: "Observa la media acumulada estabilizarse",
      intro: "La ley de los grandes números se observa siguiendo el estimador conforme aumenta n.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\nx = rng.normal(10, 3, size=2000)\n\nmedia_acumulada = np.cumsum(x) / np.arange(1, len(x) + 1)\nprint(media_acumulada[-5:])`,
      takeaway: "Más observaciones reducen la inestabilidad del promedio; no eliminan todos los sesgos."
    },
    "standard-error": {
      title: "Calcula la incertidumbre del promedio",
      intro: "El error estándar combina dispersión observada y tamaño de muestra.",
      code: `import numpy as np\n\nx = np.array([12, 9, 11, 15, 13, 10, 14, 12])\n\nse = x.std(ddof=1) / np.sqrt(len(x))\nprint(se)`,
      takeaway: "Con dispersión similar, el error estándar disminuye cuando crece n."
    },
    "confidence-interval": {
      title: "Construye un intervalo alrededor del estimador",
      intro: "Un intervalo aproximado combina estimación puntual, error estándar y un multiplicador crítico.",
      code: `import numpy as np\n\nx = np.array([12, 9, 11, 15, 13, 10, 14, 12])\n\nmedia = x.mean()\nse = x.std(ddof=1) / np.sqrt(len(x))\nintervalo = (media - 1.96 * se, media + 1.96 * se)\nprint(intervalo)`,
      takeaway: "El intervalo expresa incertidumbre del procedimiento; no significa que 95% de los datos caigan dentro."
    },
    "bootstrap": {
      title: "Re-muestrea para aproximar incertidumbre",
      intro: "Bootstrap crea nuevas muestras tomando observaciones con reemplazo desde los datos observados.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\nx = np.array([12, 9, 11, 15, 13, 10, 14, 12])\n\nmedias = [rng.choice(x, size=len(x), replace=True).mean() for _ in range(2000)]\nprint(np.quantile(medias, [0.025, 0.975]))`,
      takeaway: "Las remuestras aproximan cómo podría variar el estimador bajo el mecanismo bootstrap."
    },
    "hypothesis": {
      title: "Construye un mundo bajo la hipótesis nula",
      intro: "Una prueba compara el estadístico observado contra valores compatibles con H₀.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\na = np.array([8, 9, 7, 10, 9])\nb = np.array([5, 7, 6, 6, 8])\nobservado = a.mean() - b.mean()\n\njuntos = np.r_[a, b]\nnulos = []\nfor _ in range(5000):\n    perm = rng.permutation(juntos)\n    nulos.append(perm[:len(a)].mean() - perm[len(a):].mean())\nprint(observado)`,
      takeaway: "La distribución nula responde qué diferencias veríamos si la asignación no cargara el efecto observado."
    },
    "p-value": {
      title: "Mide qué tan extremo es el observado bajo H₀",
      intro: "El p-value es una proporción de resultados nulos al menos tan extremos como el estadístico observado.",
      code: `import numpy as np\n\nobservado = 2.0\nnulos = np.array([-1.2, 0.3, 0.8, 2.4, -2.2, 1.1, 0.1])\n\np = np.mean(np.abs(nulos) >= abs(observado))\nprint(p)`,
      takeaway: "Un p pequeño habla de incompatibilidad con H₀; no es la probabilidad de que H₀ sea verdadera."
    },
    "type-i-error": {
      title: "Simula falsos positivos bajo una nula verdadera",
      intro: "El error tipo I ocurre cuando rechazas H₀ aunque el proceso realmente siga H₀.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\nalpha = 0.05\n\n# p-values ideales cuando H0 es verdadera\np_values = rng.uniform(0, 1, size=10000)\nfalsos_positivos = np.mean(p_values < alpha)\nprint(falsos_positivos)`,
      takeaway: "Con un procedimiento bien calibrado, la tasa de falsos positivos ronda α a largo plazo."
    },
    "type-ii-error": {
      title: "Haz visible un falso negativo",
      intro: "El error tipo II aparece cuando existe una diferencia real pero el procedimiento no logra detectarla.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\n\nefecto_real = 0.25\nruido = rng.normal(0, 1, size=1000)\nestimaciones = efecto_real + ruido / np.sqrt(20)\n\nno_detectados = np.mean(np.abs(estimaciones) < 0.20)\nprint(no_detectados)`,
      takeaway: "β depende del tamaño del efecto, ruido, tamaño de muestra y regla de decisión."
    },
    "power": {
      title: "Compara potencia al aumentar el tamaño de muestra",
      intro: "La potencia es la probabilidad de detectar un efecto cuando ese efecto realmente existe.",
      code: `import numpy as np\n\nrng = np.random.default_rng(42)\nefecto = 0.5\n\nfor n in [20, 50, 100, 300]:\n    estimaciones = efecto + rng.normal(0, 1 / np.sqrt(n), size=5000)\n    potencia = np.mean(estimaciones > 1.96 / np.sqrt(n))\n    print(n, round(potencia, 3))`,
      takeaway: "Más n suele aumentar potencia, pero la decisión también depende del efecto relevante y del costo del estudio."
    }
  };

  let applying = false;

  function currentConcept() {
    return new URLSearchParams(location.search).get("concept") || "event";
  }

  function syncJourney() {
    const codeStep = document.querySelector("#journeyCode");
    const visualStep = document.querySelector("#journeyVisual");
    const decisionStep = document.querySelector("#journeyDecision");
    if (!codeStep || !visualStep || !decisionStep) return;
    codeStep.classList.remove("muted");
    if (decisionStep.classList.contains("done")) {
      codeStep.classList.add("done");
      codeStep.classList.remove("active");
    } else if (visualStep.classList.contains("done")) {
      codeStep.classList.add("active");
      codeStep.classList.remove("done");
    } else {
      codeStep.classList.remove("active", "done");
    }
  }

  function apply() {
    if (applying) return;
    applying = true;
    try {
      const id = currentConcept();
      const lab = labs[id];
      const section = document.querySelector("#codeLab");
      if (!section || !lab) return;
      section.hidden = false;
      const title = document.querySelector("#codeTitle");
      const intro = document.querySelector("#codeIntro");
      const snippet = document.querySelector("#codeSnippet");
      const takeaway = document.querySelector("#codeTakeaway");
      if (title) title.textContent = lab.title;
      if (intro) intro.textContent = lab.intro;
      if (snippet) snippet.textContent = lab.code;
      if (takeaway) takeaway.textContent = lab.takeaway;
      syncJourney();
    } finally {
      applying = false;
    }
  }

  const observer = new MutationObserver(() => queueMicrotask(apply));
  observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:["class", "hidden"]});
  window.addEventListener("popstate", apply);
  setTimeout(apply, 0);
})();
