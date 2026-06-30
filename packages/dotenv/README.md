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

// Target a specific environment explicitly
config({ env: 'production' });

// Override the defaults
config({ env: 'test', override: false, debug: true, quiet: false });
```

## How files are loaded

`config({ env })` loads the following files, in this order, where `env` defaults
to `process.env.NODE_ENV`:

1. `.env.local`
2. `.env`
3. `.env.${env}.local`
4. `.env.${env}`

Because `override` defaults to `true`, values from files loaded **later** in the
list replace earlier ones. The effective precedence, from highest to lowest, is
therefore:

| Priority | File                | Notes                                |
| -------- | ------------------- | ------------------------------------ |
| 1        | `.env.${env}`       | Environment-specific values          |
| 2        | `.env.${env}.local` | Environment-specific local overrides |
| 3        | `.env`              | Shared defaults                      |
| 4        | `.env.local`        | Local overrides                      |

> Missing files are skipped silently — you only need the ones you use.

## API

### `config(options?)`

Accepts a single `ConfigOption` object.

| Field      | Type                  | Default                | Description                                          |
| ---------- | --------------------- | ---------------------- | ---------------------------------------------------- |
| `env`      | `string \| undefined` | `process.env.NODE_ENV` | Environment name used to resolve env-specific files. |
| `quiet`    | `boolean`             | `true`                 | Suppress `dotenv`'s logging.                         |
| `debug`    | `boolean`             | `false`                | Enable `dotenv`'s debug logging.                     |
| `override` | `boolean`             | `true`                 | Let later files override earlier ones.               |
| `encoding` | `string`              | —                      | Encoding used to read the env files.                 |

Returns the result of `dotenv`'s `config()` (`{ parsed, error }`).

> Note: the default `options` object only applies when the argument is omitted
> entirely. When you pass a partial object, unspecified keys (including `env`)
> fall back to `dotenv`'s own defaults rather than the ones above.

### `ConfigOption`

```ts
type ConfigOption = Pick<DotenvConfigOptions, 'debug' | 'quiet' | 'override' | 'encoding'> & {
  env: string | undefined;
};
```

## License

[MIT](./LICENSE) © Krishna Basak
