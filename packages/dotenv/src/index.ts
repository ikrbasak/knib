import { config as dec, DotenvConfigOptions } from 'dotenv';

export type ConfigOption = Pick<
  DotenvConfigOptions,
  'debug' | 'quiet' | 'override' | 'encoding'
> & { mode?: string };

export const config = (
  { quiet, debug, override, encoding, mode }: ConfigOption = {
    quiet: true,
    debug: false,
    override: true,
    mode: process.env.NODE_ENV,
  },
) =>
  dec({
    path: ['.env', '.env.local', `.env.${mode}`, `.env.${mode}.local`],
    override,
    quiet,
    debug,
    encoding,
  });
