# @knib/adrin

A CLI for managing Architecture Decision Records (ADRs) as plain Markdown with
YAML frontmatter, plus an `ink`-based terminal UI for browsing them.
**Node-only** (reads/writes the filesystem, renders to a TTY); requires
Node.js 22+.

## What matters

- Entry point `src/cli.ts` (bin `adrin`), a `commander` program with two
  subcommands: `new` (`src/commands/new.ts`) and `view`
  (`src/commands/view.ts`).
- `src/lib/adr.ts` owns the ADR file format and all filesystem I/O: numbering
  (`nextNumber`), slugging (`slugify`), frontmatter parsing/serialization
  (`normalize`/`serialize` via `@11ty/gray-matter`), and `createAdr`, which
  handles the supersession bookkeeping (mutating the superseded ADR's
  frontmatter and body in place).
- ADRs are files named `NNNN-title-slug.md` (4-digit, 1-based) in
  `DEFAULT_DIR` (`docs/adr`, overridable with `-d, --dir`).
- `STATUSES`/`DEFAULT_STATUS` in `src/lib/adr.ts` and `STATUS_COLOR` in
  `src/lib/status.ts` must stay in sync — every status needs a color.
- `src/tui/App.tsx` (ink/React) renders the split-pane browser; `view` falls
  back to a plain stdout list when `!process.stdout.isTTY` (piped/CI). Source
  uses the `@/*` → `src/*` tsconfig path alias.
- `tsdown.config.ts` builds only `src/cli.ts` (no `dts`, since this ships as a
  bin, not a library) — unlike other packages in this repo that emit types.

Full command/flag behavior and the file format live in `README.md` — keep
them in sync when changing CLI behavior or the frontmatter shape.
