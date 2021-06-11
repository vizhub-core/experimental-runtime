import { rollup } from 'rollup';
import { srcdoc } from './srcdoc';
import { virtual } from './virtual';

export const ExperimentalRuntime = (iframe) => {
  iframe.setAttribute('srcdoc', srcdoc);

  const run = async (files) => {
    // TODO generate bundle in a Web Worker
    const bundle = await rollup({
      input: './index.js',
      plugins: virtual(files),
    });

    const { output } = await bundle.generate({
      format: 'umd',
      name: 'App',
      sourcemap: true,
    });

    const { code } = output[0];

    iframe.contentWindow.postMessage(code, '*');
  };

  return { run };
};
