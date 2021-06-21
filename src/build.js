import { rollup } from 'rollup';
import { virtual } from './virtual';
import { getGlobals } from './getGlobals';

export const build = async (files, includeSourcemaps = false) => {
  const warnings = [];
  const onwarn = (warning) => {
    warnings.push(JSON.parse(JSON.stringify(warning)));
  };

  const inputOptions = { input: './index.js', plugins: virtual(files), onwarn };
  const outputOptions = {
    format: 'umd',
    name: 'App',
    sourcemap: true,
    interop: 'default',
  };

  try {
    const globals = getGlobals(files);

    if (globals) {
      inputOptions.external = Object.keys(globals);
      outputOptions.globals = globals;
    }

    const bundle = await rollup(inputOptions);
    const { code, map } = (await bundle.generate(outputOptions)).output[0];

    if (includeSourcemaps) {
      return code + '\n//# sourceMappingURL=' + map.toUrl();
    }

    // console.log('`' + code + '`');
    // console.log('`' + JSON.stringify(warnings, null, 2) + '`');
    return warnings.length > 0 ? { code, warnings } : { code };
  } catch (error) {
    const serializableError = JSON.parse(JSON.stringify(error));
    serializableError.name = error.name;
    serializableError.message = error.message;
    return { error: serializableError };
  }
};
