import path from 'node:path';
import { cwd as pwd } from 'node:process';

import { config as dec, DotenvConfigOptions } from 'dotenv';

export type ConfigOption = Pick<
  DotenvConfigOptions,
  'debug' | 'quiet' | 'override' | 'encoding'
> & { mode?: string; cwd?: string };

export const config = ({
  quiet = true,
  debug = false,
  override = true,
  encoding,
  mode = process.env.NODE_ENV,
  cwd = path.dirname(pwd()),
}: ConfigOption = {}) =>
  dec({
    path: ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`].map((p) =>
      path.join(cwd, p),
    ),
    override,
    quiet,
    debug,
    encoding,
  });
