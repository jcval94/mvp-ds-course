# Level 1 Quality Checklist

## Cobertura

- [x] Existen cinco HTML.
- [x] Se cubren 18 conceptos.
- [x] Cada concepto tiene objetivo, visual, práctica y tres prompts.
- [x] Los cuatro datasets son sintéticos y reproducibles.

## Experiencia

- [x] Cada animación representa un cambio conceptual.
- [x] Reiniciar restaura el estado.
- [x] La navegación anterior/siguiente funciona.
- [x] Cada práctica muestra feedback específico.
- [x] Los HTML funcionan desde disco y servidor local.

## Enseñanza en vivo

- [x] Hay un prompt distinto para Codex, Gemini y ChatGPT por concepto.
- [x] Los prompts incluyen objetivo y salida esperada.
- [x] Copiar funciona o usa fallback local.
- [x] Existe plan offline.
- [x] Ningún HTML llama APIs.

## Accesibilidad y visual

- [x] Teclado y foco permiten recorrer controles.
- [x] Contraste suficiente.
- [x] `prefers-reduced-motion` reduce animación.
- [x] No hay solapamientos en desktop o móvil.
- [x] La implementación conserva la dirección visual aprobada.

## Criterio de paso

Todos los puntos esenciales deben cumplirse y los evals del repositorio deben obtener promedio mínimo de 4.

## Evidencia de ejecución

- Recorrido automatizado: 18 de 18 lecciones renderizadas, animadas y respondidas.
- Posiciones correctas: distribución equilibrada, 6 en A, 6 en B y 6 en C.
- Consola del navegador: 0 errores.
- Prompts: 54 en total, tres por concepto; el botón cambia a `Copiado`.
- Responsive: cuatro laboratorios revisados a 390 por 844 px sin desbordamiento del documento.
- Capturas: `output/playwright/level-1-alfabetizacion-desktop.png` y `output/playwright/level-1-alfabetizacion-mobile.png`.
- Dependencias remotas y llamadas de red desde los HTML: 0.

**Resultado:** aprobado.
