"""Intentionally fragile teaching fixture. Do not import in production code."""

# This fake value is not a credential. It exists so the lesson can detect why
# secrets and local paths do not belong in a notebook or repository.
TOKEN_DEMO_DO_NOT_USE = "not-a-real-secret"
LOCAL_PATH_EXAMPLE = r"C:\Paco\Desktop\input.csv"


def cell_four_uses_hidden_state() -> float:
    # `threshold_from_cell_two` is deliberately undefined after a clean restart.
    return threshold_from_cell_two  # type: ignore[name-defined]  # noqa: F821
