import { srcdoc } from './srcdoc';
import { build } from './build';

export const Runner = (iframe) => {
  return new Promise((resolve, reject) => {
    iframe.onload = () => {
      resolve({
        run: async (files) => {
          iframe.contentWindow.postMessage(
            {
              type: 'setJS',
              js: await build(files, true),
            },
            '*'
          );
        },
        setState: (state) => {
          iframe.contentWindow.postMessage(
            {
              type: 'setState',
              state,
            },
            '*'
          );
        },
      });
    };
    iframe.setAttribute('srcdoc', srcdoc);
  });
};
