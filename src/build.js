import { rollup } from 'rollup';
import { virtual } from './virtual';
import { getGlobals } from './getGlobals';

export const build = async (files, includeSourcemaps) => {
  let warnings;
  const inputOptions = {
    input: './index.js',
    plugins: virtual(files),
    onwarn: (warning) => {
      warnings = warnings || [];
      // Remove methods like .toString,
      // for convenience in tests,
      // and for eventual serializability across postMessage.
      warnings.push(JSON.parse(JSON.stringify(warning)));
    },
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

  // console.log('`' + code + '`');
  // console.log('`' + JSON.stringify(warnings, null, 2) + '`');
  return warnings ? { code, warnings } : { code };
};
