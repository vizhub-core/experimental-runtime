const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  output: {
    file: 'public/bundle.js',
    format: 'umd',
    sourcemap: true,
  },
};
