export const srcdoc = `<html>
  <head>
  </head>
  <body>
    <script>
      (() => {
        let errored;
        window.onerror = function (msg, url, lineNo, columnNo, error) {
          console.log('heere');
          console.log(arguments);
          // TODO pass information back to containing app, with line number and file name
          // TODO use Rollup sourcemaps to get back to original error
          errored = true;
          return true;
        }
        window.addEventListener('message', (event) => {
          document.getElementById('injected-script')?.remove();
          const script = document.createElement('script');
          script.src = 'data:text/javascript;charset=utf-8,' + event.data;
          script.id = 'injected-script';
          errored = false;
          script.onload = () => {
            console.log('errored', errored);
            if(!errored) {
              window.App.main();
            }
          }
          document.body.appendChild(script);
        });
      })();
    </script>
  </body>
</html>`;
