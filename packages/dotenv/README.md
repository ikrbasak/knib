# @knib/dotenv

A thin, opinionated wrapper around [`dotenv`](https://github.com/motdotla/dotenv)
that loads layered `.env` files based on `NODE_ENV`, with sensible defaults.

Instead of wiring up the file precedence yourself, call `config()` once and let
it load the right combination of base, environment-specific, and local override
files for the current `NODE_ENV`.

## Installation

```sh
npm add @knib/dotenv
# or
pnpm add @knib/dotenv
# or
yarn add @knib/dotenv
```

## Usage

```ts
import { config } from '@knib/dotenv';

// Load env files for the current process.env.NODE_ENV
config();

// Target a specific mode explicitly
config({ mode: 'production' });

// Override the defaults
config({ mode: 'test', override: false, debug: true, quiet: false });

// Resolve .env files relative to a different directory
config({ cwd: '/path/to/project' });
```

## How files are loaded

`config({ mode, cwd })` loads the following files, in this order (matching
[Vite's env file ordering](https://vite.dev/guide/env-and-mode#env-files)),
where `mode` defaults to `process.env.NODE_ENV` and `cwd` defaults to
`process.cwd()`:

1. `.env`
2. `.env.local`
3. `.env.${mode}`
4. `.env.${mode}.local`

Because `override` defaults to `true`, values from files loaded **later** in the
list replace earlier ones. The effective precedence, from highest to lowest, is
therefore:

| Priority | File                 | Notes                         |
| -------- | -------------------- | ----------------------------- |
| 1        | `.env.${mode}.local` | Mode-specific local overrides |
| 2        | `.env.${mode}`       | Mode-specific values          |
| 3        | `.env.local`         | Local overrides               |
| 4        | `.env`               | Shared defaults               |

> Missing files are skipped silently — you only need the ones you use.

## API

### `config(options?)`

Accepts a single `ConfigOption` object.

| Field      | Type                  | Default                | Description                                    |
| ---------- | --------------------- | ---------------------- | ---------------------------------------------- |
| `mode`     | `string \| undefined` | `process.env.NODE_ENV` | Mode name used to resolve mode-specific files. |
| `cwd`      | `string`              | `process.cwd()`        | Directory the env files are resolved against.  |
| `quiet`    | `boolean`             | `true`                 | Suppress `dotenv`'s logging.                   |
| `debug`    | `boolean`             | `false`                | Enable `dotenv`'s debug logging.               |
| `override` | `boolean`             | `true`                 | Let later files override earlier ones.         |
| `encoding` | `string`              | —                      | Encoding used to read the env files.           |

Returns the result of `dotenv`'s `config()` (`{ parsed, error }`).

> Each field defaults independently, so passing a partial object (e.g.
> `config({ mode: 'test' })`) still applies the defaults above to every
> unspecified field.

### `ConfigOption`

```ts
type ConfigOption = Pick<DotenvConfigOptions, 'debug' | 'quiet' | 'override' | 'encoding'> & {
  mode?: string;
  cwd?: string;
};
```

## License

[MIT](./LICENSE) © Krishna Basak
