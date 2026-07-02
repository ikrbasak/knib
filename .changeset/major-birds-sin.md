---
'@knib/dotenv': minor
---

Add a `cwd` option to `config()` for resolving `.env` files against a directory other than `process.cwd()` (which remains the default).

Individual `ConfigOption` fields (`mode`, `cwd`, `quiet`, `debug`, `override`) now each apply their default independently, so passing a partial object (e.g. `config({ mode: 'test' })`) no longer loses the defaults for unspecified fields.
