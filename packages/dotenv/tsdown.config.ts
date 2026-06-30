import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: 'src/index.ts',
  target: ['esnext'],
  tsconfig: 'tsconfig.json',
  platform: 'node',
  outDir: 'dist/',
  clean: true,
  treeshake: true,
  shims: true,
  sourcemap: true,
  minify: true,
  exports: true,
  dts: true,
  plugins: [],
  deps: {
    skipNodeModulesBundle: true,
  },
  env: {
    DOTENV_CONFIG_DEBUG: false,
    DOTENV_CONFIG_QUIET: true,
    DOTENV_KEY: '',
  },
});
