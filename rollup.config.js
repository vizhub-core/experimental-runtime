const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/App.js',
  output: {
    file: 'public/bundle.js',
    format: 'umd',
    name: 'App',
    sourcemap: true,
    globals: { d3: 'd3', rollup: 'rollup' },
  },
  external: ['d3', 'rollup'],
};
