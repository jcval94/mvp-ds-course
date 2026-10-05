# 14 Quality Gatekeeper

## Fallo automatico

- apertura sin dialogo;
- personaje ausente;
- metrica sin contexto;
- menos de tres o mas de cinco escenas;
- fuera de 400-750 palabras;
- dialogo minoritario;
- frase prohibida o pregunta A/B/C;
- cero o mas de una grafica;
- cero o mas de una pausa;
- falta `**Lo que muestra:**` o `**Regla:**`;
- remate principal repetido;
- diálogo o narración reutilizados entre casos;
- frase de plantilla o abstracción que una persona no diría;
- HTML que no conserva el contenido.

## Revision editorial

Lee cada intercambio y pregunta si la segunda linea contesta la primera.
Comprueba que la risa aparezca antes de la explicacion y que la grafica cambie
una decision. PASS solo cuando naturalidad, humor y aprendizaje sobreviven
juntos.

Ejecuta `python tools/audit_story_language.py --collection <casos>` además del
validador estructural. La lectura manual sigue siendo obligatoria.
