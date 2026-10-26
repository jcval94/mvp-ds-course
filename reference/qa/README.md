# Capturas históricas de referencia

Estas 34 imágenes se trasladaron desde `output/playwright/` sin cambiar sus bytes.
El patrón de niveles de `docs/CURRICULUM_LEVEL_MIGRATION.md` las cita como evidencia
histórica. No son resultados de la última ejecución ni una baseline automática.

Las dos citas congeladas a `output/playwright/` del checklist de Nivel 1 en
`generated/` se conservan como texto histórico; no necesitan resolver y no existe
un enlace de compatibilidad. Las referencias editables usan `reference/qa/`.

## Capturas de una ejecución

Ambos scripts de QA usan `QA_SCREENSHOT_DIR`, por omisión `output/qa/` (ignorado
por Git). Las rutas relativas se resuelven desde la raíz del repositorio; también
se admite una ruta absoluta. Para otra ubicación, elige una carpeta externa al
repositorio o añade su ruta a `.git/info/exclude`. Nunca uses esta carpeta de
referencias como destino de QA.

```sh
python scripts/build_pages.py
python scripts/qa_pages.py
python scripts/qa_student_experience.py
# Ejemplo de override dentro de la carpeta ignorada:
QA_SCREENSHOT_DIR=output/qa/manual python scripts/qa_pages.py
QA_SCREENSHOT_DIR=output/qa/manual python scripts/qa_student_experience.py
```

`qa_student_experience.py` conserva las mismas comprobaciones y guarda una
captura final por dispositivo: escritorio, tableta y teléfono.

En GitHub: **Actions → CI → ejecución del commit/PR → Artifacts →
factory-qa-screenshots**. Descarga y descomprime el ZIP. El artefacto se conserva
14 días y se sube incluso si falla una prueba; contiene las capturas alcanzadas
antes del fallo. Si no se llegó a generar ninguna, no hay artefacto que descargar.
