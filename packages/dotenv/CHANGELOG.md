# @knib/dotenv

## 0.4.0

### Minor Changes

- 1958e20: Add a `cwd` option to `config()` for resolving `.env` files against a directory other than `process.cwd()` (which remains the default).

  Individual `ConfigOption` fields (`mode`, `cwd`, `quiet`, `debug`, `override`) now each apply their default independently, so passing a partial object (e.g. `config({ mode: 'test' })`) no longer loses the defaults for unspecified fields.

## 0.3.0

### Minor Changes

- 6aa21ac: Rename the `env` option to `mode` and align env file ordering with Vite.

  **Breaking:** `config({ env })` is now `config({ mode })`, and the `ConfigOption`
  type exposes `mode?: string` instead of `env: string | undefined`.

  Files are now loaded in Vite's order — `.env`, `.env.local`, `.env.${mode}`,
  `.env.${mode}.local` — so with `override: true` the effective precedence
  (highest to lowest) is `.env.${mode}.local`, `.env.${mode}`, `.env.local`,
  `.env`.

## 0.2.0

### Minor Changes

- beaf68b: Replace the positional `ne` environment argument with an `env` field on the
  options object. `config` now takes a single `ConfigOption` argument, e.g.
  `config({ env: 'production', override: false })` instead of
  `config('production', { override: false })`.

## 0.1.1

### Patch Changes

- ee024b9: Move package publishing to OIDC-based npm trusted publishing (tokenless), with automatic provenance.

## 0.1.0

### Minor Changes

- 5d29b85: Initial public release of `@knib/dotenv`: a thin, opinionated wrapper around `dotenv` that loads layered `.env` files based on `NODE_ENV`, with sensible defaults.
