# @knib/dotenv

A thin, opinionated wrapper around `dotenv` that loads layered `.env` files
based on `NODE_ENV`. **Node-only** (uses `dotenv`, which reads the filesystem);
not usable in a browser at runtime.

## What matters

- Single entry `src/index.ts` exporting `config(options?: ConfigOption)`.
- `ConfigOption` = `Pick<DotenvConfigOptions, 'debug'|'quiet'|'override'|'encoding'> & { env }`.
- **File precedence** (loaded in this order; `override: true` by default, so
  later wins): `.env.local`, `.env`, `.env.${env}.local`, `.env.${env}`, where
  `env` defaults to `process.env.NODE_ENV`. Missing files are skipped silently.
- The default options object only applies when `config()` is called with **no
  argument**; passing a partial object falls back to `dotenv`'s own defaults for
  unspecified keys. Keep this quirk in mind when editing the signature.

Full behavior and the precedence table live in `README.md` — keep them in sync
when changing loading logic.
