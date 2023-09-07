/// <reference types="vitest" />
/// <reference types="vite/client" />

import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import * as packageJson from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ['src/']
    }),
  ],
  build: {
    lib: {
      entry: resolve('src', 'index.tsx'),
      name: 'react-tag-input',
      formats: ['es', 'umd'],
      fileName: (format) => `react-tag-input.${format}.js`
    },
    rollupOptions: {
      external: [...Object.keys([packageJson.peerDependencies])],
      output: {
        globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/__tests__/setupTests.ts',
    coverage: {
      provider: 'v8',
    }
  },
})
