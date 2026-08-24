# Contributing to Hold My Beer

1. Open an issue before large routing or policy changes.
2. Keep reason codes stable — add, don’t rename.
3. Never persist prompt bodies in evidence.
4. Catalog prices belong in `src/gateway/catalog`. Regenerating? Run `python3 scripts/gen-gateway.py`.
5. Tests: `node --experimental-strip-types --test src/gateway/__tests__/*.test.ts`.
6. UI stays in the ink / cream / steel tokens. No purple, no neon.

The engine path is authenticate → constrain → select → reconcile. If your change skips a step, it is a bug.
