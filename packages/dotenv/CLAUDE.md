# @knib/dotenv

A thin, opinionated wrapper around `dotenv` that loads layered `.env` files
based on `NODE_ENV`. **Node-only** (uses `dotenv`, which reads the filesystem);
not usable in a browser at runtime.

## What matters

- Single entry `src/index.ts` exporting `config(options?: ConfigOption)`.
- `ConfigOption` = `Pick<DotenvConfigOptions, 'debug'|'quiet'|'override'|'encoding'> & { mode?: string; cwd?: string }`.
- **File precedence** (loaded in this order, matching Vite's env file
  ordering; `override: true` by default, so later wins): `.env`, `.env.local`,
  `.env.${mode}`, `.env.${mode}.local`, resolved against `cwd`. `mode` defaults
  to `process.env.NODE_ENV`, `cwd` defaults to `process.cwd()`. Missing files
  are skipped silently.
- Every field on `ConfigOption` defaults independently in the destructure, so
  a partial object (e.g. `config({ mode: 'test' })`) still gets the defaults
  above for unspecified keys.

Full behavior and the precedence table live in `README.md` — keep them in sync
when changing loading logic.
