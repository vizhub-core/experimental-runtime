const { select } = d3;
const root = select('body').append('div').attr('class', 'root');
const codeEditor = root.append('textarea').attr('class', 'code-editor');
const runnerIframe = root.append('iframe').attr('class', 'runner-iframe');

codeEditor.node().value = `(() => {
  console.log(window.x);
  window.x = window.x ? (window.x + 1) : 1;
})();`;

const srcdoc = `
  <html>
    <head>
    </head>
    <body>
      <script>
        window.addEventListener('message', (event) => {
          const script = document.createElement('script');
          script.src = 'data:text/javascript;charset=utf-8,' + event.data;
          document.body.appendChild(script);
          // TODO remove the old one
        });
      </script>
    </body>
  </html>
`;

runnerIframe.attr('srcdoc', srcdoc);

codeEditor.on('input', () => {
  const code = codeEditor.node().value;
  runnerIframe.node().contentWindow.postMessage(code, '*');
});
