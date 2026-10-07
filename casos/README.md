# casos/

Banco de casos históricos de decisión (Wald, Snow, Semmelweis, Moneyball…).

- `cases.jsonl`: casos aprobados, uno por línea. Solo se agrega; para corregir se
  agrega una versión nueva con `supersedes`.
- `staging/<id>.json`: candidatos en investigación o verificación.
- `data/<id>/`: datos ligeros de cada caso con su procedencia. Datos pesados van a
  GitHub Releases, no a Git.

Contrato: `schemas/case.schema.json`. Estados `candidate` → `verified` →
`approved`. Un caso `verified` o `approved` exige al menos una afirmación
verificada con fuente, dos fuentes y una incertidumbre declarada.

Cada caso declara `access: public | premium`. El build público excluye lo premium.
