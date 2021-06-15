import pkg from './package.json';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
  // Test app build
  {
    input: 'src/App.js',
    output: {
      file: 'public/bundle.js',
      format: 'umd',
      name: 'App',
      sourcemap: true,
      globals: { d3: 'd3', rollup: 'rollup' },
    },
    external: ['d3', 'rollup'],
  },

  // UMD build
  {
    input: 'src/index.js',
    output: [{ file: pkg.main, format: 'umd', name: 'ExperimentalRuntime' }],
    plugins: [nodeResolve()],
  },
];
