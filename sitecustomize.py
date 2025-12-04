"""Global runtime guards for Vercel.

This module is imported automatically by Python when present on sys.path.
We use it to harden builtins early, before Vercel's loader inspects the
user module. The Vercel wrapper (`vc__handler__python`) naively calls
``issubclass`` against every export to guess the correct handler type.
When a non-class (like a Flask app) is probed, the stock builtin raises
``TypeError`` and the process crashes with a 500. By replacing
``builtins.issubclass`` here, we ensure the wrapper always gets a safe
boolean instead of an exception, preventing cold-start failures.
"""
from __future__ import annotations

import builtins
from typing import Any

_real_issubclass = builtins.issubclass

def _safe_issubclass(obj: Any, cls: Any) -> bool:
    try:
        return _real_issubclass(obj, cls)  # type: ignore[arg-type]
    except TypeError:
        return False

if getattr(builtins, "issubclass", None) is not _safe_issubclass:
    builtins.issubclass = _safe_issubclass
