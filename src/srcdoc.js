export const srcdoc = `<html>
  <head>
  </head>
  <body>
    <script>
      (() => {
        let errored;
        let state;
        //window.onerror = function (msg, url, lineNo, columnNo, error) {
        //  console.log('onerror');
        //  console.log(arguments);
        //  console.log(msg);
        //  // TODO pass information back to containing app, with line number and file name
        //  // TODO use Rollup sourcemaps to get back to original error
        //  errored = true;
        //  return true;
        //}

        const setJS = (js) => {
          document.getElementById('injected-script')?.remove();
          const script = document.createElement('script');
          script.textContent = js;
          script.id = 'injected-script';
          document.body.appendChild(script);
          window.App?.main(state, setState);
        };

        let requestId = null;
        const setState = (newState) => {
          if(JSON.stringify(newState) !== JSON.stringify(state)) {
            state = newState;
            if(!requestId) {
              requestId = requestAnimationFrame(() => {
                requestId = null;
                window.App?.main(state, setState);
                window.parent.postMessage({type:'stateChange', state}, "*");
              });
            }
          }
        }

        window.addEventListener('message', ({data}) => {
          if(data.type === 'setJS') {
            setJS(data.js);
          }
          if(data.type === 'setState') {
            setState(data.state);
          }
        });
      })();
    </script>
  </body>
</html>`;

//    const run = (code) => eval(code);

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
