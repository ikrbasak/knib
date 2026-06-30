import { config as dec, DotenvConfigOptions } from 'dotenv';

export type ConfigOption = Pick<DotenvConfigOptions, 'debug' | 'quiet' | 'override' | 'encoding'>;

export const config = (
  ne = process.env.NODE_ENV,
  { quiet, debug, override, encoding }: ConfigOption = {
    quiet: true,
    debug: false,
    override: true,
  },
) =>
  dec({
    path: ['.env.local', '.env', `.env.${ne}.local`, `.env.${ne}`],
    override,
    quiet,
    debug,
    encoding,
  });
