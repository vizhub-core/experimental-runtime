// This is the sample app / testing environment.
// The library lives in index.js
import { select } from 'd3';
import { Runner } from './index';

export const main = async () => {
  const root = select('body').append('div').attr('class', 'root');
  const codeEditor = root.append('textarea').attr('class', 'code-editor');
  const runnerIframe = root.append('iframe').attr('class', 'runner-iframe');

  const runner = await Runner(runnerIframe.node());

  codeEditor.node().value = `export const main = (state, setState) => {
  console.log(window.x);
  window.x = window.x ? (window.x + 1) : 1;
}`;
  codeEditor.on('input', () => {
    const code = codeEditor.node().value;
    const files = {
      'index.js': code,
    };
    runner.run(files);
  });
};
