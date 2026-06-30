# @knib/dotenv

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
