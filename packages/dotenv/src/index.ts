import { config as dec, DotenvConfigOptions } from 'dotenv';

export type ConfigOption = Pick<
  DotenvConfigOptions,
  'debug' | 'quiet' | 'override' | 'encoding'
> & { env: string | undefined };

export const config = (
  { quiet, debug, override, encoding, env }: ConfigOption = {
    quiet: true,
    debug: false,
    override: true,
    env: process.env.NODE_ENV,
  },
) =>
  dec({
    path: ['.env.local', '.env', `.env.${env}.local`, `.env.${env}`],
    override,
    quiet,
    debug,
    encoding,
  });
