export const srcdoc = `<html>
  <head>
  </head>
  <body>
    <script>
      (() => {
        let errored;
        //window.onerror = function (msg, url, lineNo, columnNo, error) {
        //  console.log('onerror');
        //  console.log(arguments);
        //  console.log(msg);
        //  // TODO pass information back to containing app, with line number and file name
        //  // TODO use Rollup sourcemaps to get back to original error
        //  errored = true;
        //  return true;
        //}
        const run = code => eval(code);
        window.addEventListener('message', (event) => {
          run(event.data);
          window.App.main();
//          errored = false;
//          document.getElementById('injected-script')?.remove();
//          const script = document.createElement('script');
//          //script.src = 'data:text/javascript;charset=utf-8,' + event.data;
//          //script.type = 'text/javascript';
//          console.log('generating script');
//          script.textContent = event.data;
//          script.id = 'injected-script';
////          script.onload = () => {
//            if(!errored) {
//console.log('running main()');
//              window.App.main();
//            }
////          }
//          document.body.appendChild(script);
//          console.log('appended script');
        });
      })();
    </script>
  </body>
</html>`;
