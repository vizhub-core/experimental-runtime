const puppeteer = require('puppeteer');
const assert = require('assert');
//const { ExperimentalRuntime } = require('../dist/experimental-runtime.cjs.js');
//const { build } = require('../dist/experimental-runtime.js');

describe('run', () => {
  let browser;
  let page;
  let frame;
  it('should set up the runner', async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
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

    await page.evaluate(async () => {
      const iframe = document.getElementById('runner-iframe');
      const { Runner } = ExperimentalRuntime;
      window.runner = await Runner(iframe);
    });

    frame = page.frames().find((frame) => frame.name() === 'runner-iframe');

    assert.equal(frame.name(), 'runner-iframe');
  });

  it('should run JS', async () => {
    await page.evaluate(() => {
      window.runner.run({
        'index.js': `export const main = () => { window.foo = 'bar'; }`,
      });
    });
    // Allow the newly appended <script> tag to run.
    // TODO find a way to listen for this?
    await new Promise((resolve) => setTimeout(resolve, 100));
    const foo = await frame.evaluate(() => window.foo);
    assert.equal(foo, 'bar');
  });

  it('should tear down the browser', async () => {
    await browser.close();
  });
});
