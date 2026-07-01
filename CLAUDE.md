# knib

A pnpm + Turbo monorepo of small, focused, independently published `@knib/*`
packages. Each package lives under `packages/*` (apps, if any, under `apps/*`).

## Toolchain & conventions

- **Package manager: pnpm workspaces** with **`catalogMode: strict`**. Every
  shared dependency version lives in `pnpm-workspace.yaml` under `catalog:`, and
  packages reference it as `"dep": "catalog:"`. Strict mode means a cataloged
  dependency **must** be referenced via `catalog:` — never pin a version inline
  for a dep that is in the catalog. Adding a new shared dep = add it to the
  catalog first, then `catalog:` in the package. Peer dependencies use real
  semver ranges (not `catalog:`).
- **Build: `tsdown`** (`pnpm build`, Turbo-driven). ESM-only output to `dist/`
  (`index.mjs` + `index.d.mts`), `type: module`, `sideEffects: false`. `dist/`
  is git-ignored; `files: ["dist"]` is what gets published.
- **Typecheck: `tsc --noEmit`** (`pnpm tsc`, Turbo task). Each package extends
  the same strict `tsconfig.json`.
- **Task runner: Turbo.** Tasks: `build` (depends on `^tsc`/`^build`) and `tsc`.
- **Formatting: `oxfmt`** — `pnpm fmt` to write, `pnpm fmt:c` to check.
- **Commits: Conventional Commits**, enforced by commitlint via `lefthook`
  git hooks (pre-commit, commit-msg, pre-push). Installed on `pnpm install`.
- **Versioning & release: Changesets.** Any user-facing change needs a
  changeset in `.changeset/` (`'@knib/<pkg>': patch|minor|major` + summary).
  Publishing is OIDC trusted publishing with provenance (CI).

## Adding a package

Mirror an existing package (e.g. `packages/dotenv`) verbatim: copy its
`tsconfig.json`, `turbo.json` (`extends ["//"]`), `tsdown.config.ts`, `LICENSE`,
and the `package.json` shape (name, `exports`, `files`, `publishConfig`,
`type: module`, `sideEffects: false`). Add any new deps to the workspace
catalog, add a per-package `CLAUDE.md`, and add an initial changeset.

## Packages

- **`@knib/dotenv`** — layered `.env` loader (Node). See
  `packages/dotenv/CLAUDE.md`.
