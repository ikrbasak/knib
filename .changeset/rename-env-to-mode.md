---
'@knib/dotenv': minor
---

Rename the `env` option to `mode` and align env file ordering with Vite.

**Breaking:** `config({ env })` is now `config({ mode })`, and the `ConfigOption`
type exposes `mode?: string` instead of `env: string | undefined`.

Files are now loaded in Vite's order — `.env`, `.env.local`, `.env.${mode}`,
`.env.${mode}.local` — so with `override: true` the effective precedence
(highest to lowest) is `.env.${mode}.local`, `.env.${mode}`, `.env.local`,
`.env`.
