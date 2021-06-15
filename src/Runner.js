import { srcdoc } from './srcdoc';
import { build } from './build';

export const Runner = (iframe) => {
  return new Promise((resolve, reject) => {
    iframe.onload = () => {
      resolve({
        run: async (files) => {
          iframe.contentWindow.postMessage(await build(files, true), '*');
        },
      });
    };
    iframe.setAttribute('srcdoc', srcdoc);
  });
};
