---
'@knib/dotenv': minor
---

Replace the positional `ne` environment argument with an `env` field on the
options object. `config` now takes a single `ConfigOption` argument, e.g.
`config({ env: 'production', override: false })` instead of
`config('production', { override: false })`.
