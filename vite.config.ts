import { defineConfig } from 'vitest/config';
import { viteSingleFile } from 'vite-plugin-singlefile';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react-swc';
import pkg from './package.json';
import path from 'path';
import fs from 'fs';

const renameOutput = {
  name: 'rename-output',
  writeBundle() {
    const newName = `sekreto-${pkg.version}.html`;
    console.log('Renaming dist/index.html to', newName);
    fs.renameSync(path.join('dist', 'index.html'), path.join('dist', newName));
  },
};

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react(), tsconfigPaths(), viteSingleFile(), renameOutput],
  test: {
    globalSetup: './vitest.global-setup.ts',
    environment: 'jsdom',
    globals: true,
  },
});
