import { rollup } from 'rollup';
console.log(rollup);

export const ExperimentalRuntime = (iframe) => {
  const srcdoc = `
  <html>
    <head>
    </head>
    <body>
      <script>
        window.addEventListener('message', (event) => {
          document.getElementById('injected-script')?.remove();
          const script = document.createElement('script');
          script.src = 'data:text/javascript;charset=utf-8,' + event.data;
          script.id = 'injected-script';
          document.body.appendChild(script);
        });
      </script>
    </body>
  </html>
`;

  iframe.setAttribute('srcdoc', srcdoc);

  const run = (code) => iframe.contentWindow.postMessage(code, '*');

  return { run };
};
