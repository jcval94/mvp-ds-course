"""Course harness: validate contracts, build a portable dist/, check it and smoke-test it.

Run from the repository root:

    python -m harness validate
    python -m harness build
    python -m harness check      # links, portability and size budgets on dist/
    python -m harness smoke      # browser smoke tests at "/" and under a subpath
    python -m harness all
"""
