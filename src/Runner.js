import { srcdoc } from './srcdoc';
import { build } from './build';

export const Runner = (iframe) => {
  iframe.setAttribute('srcdoc', srcdoc);
  return {
    run: async (files) => {
      iframe.contentWindow.postMessage(await build(files, true), '*');
    },
  };
};
