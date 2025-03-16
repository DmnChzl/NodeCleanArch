import * as esbuild from 'esbuild';

// esbuild src/index.ts --bundle --format=cjs --minify --outfile=dist/index.cjs --platform=node --target=node22.14
await esbuild.build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  format: 'cjs',
  minify: true,
  outfile: 'dist/index.cjs',
  platform: 'node',
  target: 'node22.14'
});
