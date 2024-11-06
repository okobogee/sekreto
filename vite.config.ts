import { defineConfig } from 'vitest/config';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import pkg from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react(), tsconfigPaths(), viteSingleFile()],
  test: {
    globalSetup: './vitest.global-setup.ts',
    environment: 'jsdom',
    globals: true,
  },
});
