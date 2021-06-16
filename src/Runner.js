import { srcdoc } from './srcdoc';
import { build } from './build';

export const Runner = (iframe) => {
  return new Promise((resolve, reject) => {
    iframe.onload = () => {
      const runner = {
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
      };
      window.addEventListener('message', ({ data }) => {
        if (runner.onstatechange && data.type === 'stateChange') {
          runner.onstatechange(data.state);
        }
      });
      resolve(runner);
    };
    iframe.setAttribute('srcdoc', srcdoc);
  });
};
