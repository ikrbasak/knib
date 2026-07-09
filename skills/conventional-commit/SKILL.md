---
name: conventional-commit
description: >
  Ultra-compressed commit message generator. Cuts noise from commit messages while preserving
  intent and reasoning. Conventional Commits format. Subject ≤50 chars, lowercase, body only
  when "why" isn't obvious. Splits unrelated changes into scoped commit groups and
  orders them dependencies-first. Use whenever the user asks to commit something, or says
  "write a commit", "commit message", "generate commit", "/commit", or invokes
  /conventional-commit. Auto-triggers when staging changes or committing.
---

Write commit messages terse and exact. Conventional Commits format. No fluff. Why over what.

## Rules

**Subject line:**

- `<type>(<scope>): <imperative summary>` — `<scope>` optional
- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`, `revert`
- Imperative mood: "add", "fix", "remove" — not "added", "adds", "adding"
- ≤50 chars when possible, hard cap 72
- No trailing period
- Always lowercase — the entire subject, including the first word after the colon
  (proper nouns and code identifiers keep their casing, e.g. `fix(api): handle GET timeout`)

**Body (only if needed):**

- Skip entirely when subject is self-explanatory
- Add body only for: non-obvious _why_, breaking changes, migration notes, linked issues
- Wrap at 72 chars
- Bullets `-` not `*`
- Reference issues/PRs at end: `Closes #42`, `Refs #17`

**What NEVER goes in:**

- "This commit does X", "I", "we", "now", "currently" — the diff says what
- Any AI agent or AI tool as co-author — no `Co-authored-by: Claude`, no
  "Generated with Claude Code", no `Assisted-by`, no AI attribution of any kind,
  even if a tool offers to add one
- Emoji (unless project convention requires)
- Restating the file name when scope already says it

## Examples

Diff: new endpoint for user profile with body explaining the why

- ❌ "feat: add a new endpoint to get user profile information from the database"
- ✅

  ```
  feat(api): add GET /users/:id/profile

  Mobile client needs profile data without the full user payload
  to reduce LTE bandwidth on cold-launch screens.

  Closes #128
  ```

Diff: breaking API change

- ✅

  ```
  feat(api)!: rename /v1/orders to /v1/checkout

  BREAKING CHANGE: clients on /v1/orders must migrate to /v1/checkout
  before 2026-06-01. Old route returns 410 after that date.
  ```

## Auto-Clarity

Always include body for: breaking changes, security fixes, data migrations, anything reverting a prior commit. Never compress these into subject-only — future debuggers need the context.

## Grouping

When the working tree holds more than one logical change, split it into
multiple commits — never bundle unrelated work:

- Group by scope: changes to the same package/module/concern go together
- Group similar items: one commit for a rename touching many files, one for
  a config bump across packages
- Don't mix types: `feat` work and `chore` cleanup are separate commits even
  when they touch the same files area
- Commit dependencies before dependents: shared/base packages, dependency
  catalogs, lockfiles, and generated types land first; code that consumes
  them lands in a later commit, so every commit is self-consistent
- A single-file group is fine; merging groups just to have fewer commits
  is not

## Output

Inspect the changes (`git status`, `git diff`), identify the groups, then
output — for EACH group, in dependency order — a `git add` listing that
group's exact paths followed by its `git commit`, ready to run as-is:

```
# group 1: <one-line reason> (dependency of group 2)
git add <path> <path>
git commit --signoff -m "<subject>" -m "<body?>" -m "<trailer?>"

# group 2: <one-line reason>
git add <path>
git commit --signoff -m "<subject>" -m "<body?>" -m "<trailer?>"
```

- Omit the `-m "<body>"` and `-m "<trailer>"` parts when there is no body or trailer
- Trailers are things like `Closes #42`, `BREAKING CHANGE: ...`, or human
  `Co-authored-by:` lines — never an AI attribution
- Never `git add .` or `git add -A` — list each group's paths explicitly so
  no unrelated change rides along

## Boundaries

Only generates the groups, messages, and commands above. NEVER runs `git commit` or `git add` — the user runs them. Does not amend. Output the commands as a code block ready to paste. "stop conventional-commit" or "normal mode": revert to verbose commit style.
