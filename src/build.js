import { rollup } from 'rollup';
import { virtual } from './virtual';

export const build = async (files, includeSourcemaps) => {
  const bundle = await rollup({
    input: './index.js',
    plugins: virtual(files),
  });
  const { output } = await bundle.generate({
    format: 'umd',
    name: 'App',
    sourcemap: true,
  });
  const { code, map } = output[0];

  if (includeSourcemaps) {
    return code + '\n//# sourceMappingURL=' + map.toUrl();
  }

  //console.log('`' + code + '`');
  return code;
};
