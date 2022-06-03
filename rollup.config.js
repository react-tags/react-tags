import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json';

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto'
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
      exports: 'auto'
    },
    {
      name: 'ReactTags',
      file: packageJson.browser,
      format: 'umd',
      sourcemap: true,
      globals: { react: 'React' },
    },
  ],
  plugins: [external(), resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' }), postcss(), terser()],
},
{
  input: 'lib/esm/types/index.d.ts',
  output: [{ file: 'lib/index.d.ts', format: 'esm' }],
  external: [/\.css$/],
  plugins: [dts()]
}]