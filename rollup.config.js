import pkg from './package.json';
const production = !process.env.ROLLUP_WATCH;

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

  // CommonJS build
  {
    input: 'src/index.js',
    external: ['rollup'],
    output: [{ file: pkg.main, format: 'cjs' }],
  },
];
