const { select } = d3;
const root = select('body').append('div').attr('class', 'root');
const codeEditor = root.append('textarea').attr('class', 'code-editor');
const runnerIframe = root.append('iframe').attr('class', 'runner-iframe');

const srcdoc = `
  <html>
    <head>
    </head>
    <body>
      <script>
        console.log('outside');
        window.addEventListener('message', (event) => {
          console.log('here');
          console.log(event);
        });
      </script>
    </body>
  </html>
`;

runnerIframe.attr('srcdoc', srcdoc);

codeEditor.on('input', () => {
  console.log(codeEditor.node().value);
  runnerIframe.node().contentWindow.postMessage('test', '*');
});
