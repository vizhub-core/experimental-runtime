import { srcdoc } from './srcdoc';
import { build } from './build';
import { presentError } from './presentError';

export const ExperimentalRuntime = (iframe) => {
  iframe.setAttribute('srcdoc', srcdoc);
  return {
    run: async (files) => {
      iframe.contentWindow.postMessage(await build(files, true), '*');
    },
  };
};

export { build, presentError };
