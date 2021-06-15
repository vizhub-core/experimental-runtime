const puppeteer = require('puppeteer');
const assert = require('assert');
//const { ExperimentalRuntime } = require('../dist/experimental-runtime.cjs.js');
//const { build } = require('../dist/experimental-runtime.js');

describe('run', () => {
  it('should run code', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', (msg) => console.log(msg.text()));
    await page.setContent(`
      <html>
        <head>
        </head>
        <body>
          <iframe id="runner-iframe"></iframe>
        </body>
      </html
    `);
    await page.addScriptTag({
      path: './dist/experimental-runtime.js',
    });
    await page.evaluate(() => {
      const iframe = document.getElementById('runner-iframe');
      const { Runner } = ExperimentalRuntime;
      const runner = Runner(iframe);
      console.log(runner);
      console.log('b');
      const files = {
        'index.js': `window.foo = 'bar';`,
      };
      runner.run(files);
    });

    // Allow the new srcdoc to execute.
    // TODO find a way to listen for this?
    await new Promise((resolve) => setTimeout(resolve, 500));
    const frame = page
      .frames()
      .find((frame) => frame.name() === 'runner-iframe');
    // TODO make sure this returns 'bar';
    const foo = await frame.evaluate(() => window.foo);
    assert.deepEqual(foo, 'bar');
    await browser.close();
  });
});
