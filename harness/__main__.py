"""Command line entry point: python -m harness <command>."""

from __future__ import annotations

import argparse
import json
import sys

from .config import HarnessError


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="python -m harness", description="Harness del curso: contratos, build portable y pruebas.")
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("validate", help="Schemas, referencias cruzadas, tokens de diseño e higiene del repo.")
    build_parser = sub.add_parser("build", help="Construye dist/ (alumno) o dist-docente/ (local).")
    build_parser.add_argument("--docente", action="store_true", help="Salida local dist-docente/, nunca publicada.")
    sub.add_parser("check", help="Enlaces internos, portabilidad entre hostings y presupuestos de tamaño en dist/.")
    smoke = sub.add_parser("smoke", help="Pruebas de humo en navegador sirviendo dist/ en '/' y bajo una subruta.")
    smoke.add_argument("--base-path", action="append", dest="base_paths", help="Subruta a probar (repetible). Por defecto: '/' y '/mvp-ds-course/'.")
    sub.add_parser("all", help="validate → build → check → smoke.")
    links = sub.add_parser("links", help="Audita enlaces externos con HEAD/GET; independiente de all.")
    links.add_argument("--rebuild", action="store_true", help="Reconstruye dist/; sin esto usa dist/ existente o lo construye si falta.")
    links.add_argument("--timeout", type=float, default=10.0)
    links.add_argument("--retries", type=int, choices=range(3), default=2)
    links.add_argument("--pause", type=float, default=0.5, help="Pausa mínima entre peticiones al mismo dominio (segundos).")
    links.add_argument("--workers", type=int, default=4)
    links.add_argument("--report", help="Destino JSON fuera de dist/.")
    links.add_argument("--markdown", help="Destino Markdown fuera de dist/.")
    args = parser.parse_args(argv)

    try:
        if args.command == "links":
            from . import links
            report = links.run(rebuild=args.rebuild, timeout=args.timeout, retries=args.retries,
                               pause=args.pause, workers=args.workers, report_path=args.report, markdown_path=args.markdown)
            print(links.markdown(report))
            return 1 if report["summary"]["failed"] else 0
        if args.command in ("validate", "all"):
            from . import validate
            report = validate.run()
            print(f"OK validate · versionado {report['tracked_mb']} MB · mayores: {report['largest'][:3]}")
        if args.command in ("build", "all"):
            from . import build
            info = build.build(docente=getattr(args, "docente", False))
            print(f"OK build · dist/ con {info['files']} archivos, {info['bytes'] / 1048576:.2f} MB · misiones públicas: {info['public_missions'] or 'ninguna'}")
        if args.command in ("check", "all"):
            from . import checks
            report = checks.run()
            print(f"OK check · {report['files']} archivos, {report['total_mb']} MB · mayor: {report['largest']}")
        if args.command in ("smoke", "all"):
            from . import smoke
            base_paths = getattr(args, "base_paths", None) or ["/", "/mvp-ds-course/"]
            results = smoke.run(base_paths=base_paths)
            print("OK smoke · " + json.dumps(results, ensure_ascii=False))
    except HarnessError as error:
        print(f"ERROR {args.command}: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
