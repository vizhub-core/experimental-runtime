import { rollup } from 'rollup';
import { virtual } from './virtual';
import { getGlobals } from './getGlobals';

export const build = async (files, includeSourcemaps) => {
  const inputOptions = {
    input: './index.js',
    plugins: virtual(files),
  };

  const outputOptions = {
    format: 'umd',
    name: 'App',
    sourcemap: true,
  };

  const globals = getGlobals(files);
  if (globals) {
    inputOptions.external = Object.keys(globals);
    outputOptions.globals = globals;
  }

  const { code, map } = (
    await (await rollup(inputOptions)).generate(outputOptions)
  ).output[0];

  if (includeSourcemaps) {
    return code + '\n//# sourceMappingURL=' + map.toUrl();
  }

  //console.log('`' + code + '`');

  return code;
};
