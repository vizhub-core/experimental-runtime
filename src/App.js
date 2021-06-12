// This is the sample app / testing environment.
// The library lives in index.js
import { select } from 'd3';
import { ExperimentalRuntime } from './index';

export const main = () => {
  const root = select('body').append('div').attr('class', 'root');
  const codeEditor = root.append('textarea').attr('class', 'code-editor');
  const runnerIframe = root.append('iframe').attr('class', 'runner-iframe');

  const runtime = ExperimentalRuntime(runnerIframe.node());

  //  codeEditor.node().value = `window.App = {
  //  main: () => {
  //    console.log(window.x);
  //    window.x = window.x ? (window.x + 1) : 1;
  //  }
  //};`;
  codeEditor.node().value = `export const main = (state, setState) => {
  console.log(window.x);
  window.x = window.x ? (window.x + 1) : 1;
}`;
  codeEditor.on('input', () => {
    const code = codeEditor.node().value;
    const files = {
      'index.js': code,
    };
    runtime.run(files);
  });
};
