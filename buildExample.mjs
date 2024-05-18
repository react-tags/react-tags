import * as esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

const buildExample = async () => {
  await esbuild.build({
    entryPoints: ['example/main.tsx'],
    plugins: [sassPlugin()],
    bundle: true,
    sourcemap: true,
    outfile: 'example/public/bundle.min.js',
    target: ['es2015'],
    loader: {
      '.ts': 'tsx',
    },
  });
};

buildExample();
