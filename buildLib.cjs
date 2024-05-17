const { build } = require('esbuild');
const fs = require('fs');
const config = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  format: 'esm',
  metafile: true,
  external: ['react', 'react-dom', 'react-dnd', 'react-dnd-html5-backend'],
};

const buildESM = async () => {
  const devBuild = await build({
    ...config,
    minify: false,
    sourcemap: true,
    outfile: 'dist/index.js',
  });

  fs.writeFileSync('meta-raw-dev.json', JSON.stringify(devBuild.metafile));

  const prodBuild = await build({
    ...config,
    minify: true,
    outfile: 'dist/index.min.js',
  });

  fs.writeFileSync('meta-raw-prod.json', JSON.stringify(prodBuild.metafile));
};

buildESM();
