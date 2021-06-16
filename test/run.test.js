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

    await page.setContent('<iframe id="runner-iframe"></iframe>');
    await page.addScriptTag({
      path: './dist/experimental-runtime.js',
    });

    await page.evaluate(async () => {
      window.runner = await ExperimentalRuntime.Runner(
        document.getElementById('runner-iframe')
      );
    });

    frame = page.frames().find((frame) => frame.name() === 'runner-iframe');

    // For debugging while writing tests.
    page.on('console', (msg) => console.log(msg.text()));

    assert.equal(frame.name(), 'runner-iframe');
  });

  it('should run JS', async () => {
    await page.evaluate(() => {
      window.runner.run({
        'index.js': "export const main = () => { window.foo = 'bar'; }",
      });
    });
    const foo = await frame.evaluate(() => window.foo);
    assert.equal(foo, 'bar');
  });

  it('should fail silently if main is undefined', async () => {
    await page.evaluate(() => {
      window.runner.run({
        'index.js': `window.foo = 'bar'`,
      });
    });
    const foo = await frame.evaluate(() => window.foo);
    assert.equal(foo, 'bar');
  });

  it('should set state from outside', async () => {
    await page.evaluate(() => {
      window.runner.setState('outside');
      window.runner.run({
        'index.js': 'export const main = (state) => { window.foo = state; }',
      });
    });
    const foo = await frame.evaluate(() => window.foo);
    assert.equal(foo, 'outside');
  });

  it('should set state from inside', async () => {
    await page.evaluate(() => {
      window.runner.run({
        'index.js': `
          export const main = (state, setState) => {
            setState('inside');
            window.foo = state;
          }
        `,
      });
    });
    // Wait for inner requestAnimationFrame.
    // TODO wait for message that state was set instead of this hack.
    await new Promise((resolve) => setTimeout(resolve, 100));

    const foo = await frame.evaluate(() => window.foo);
    assert.equal(foo, 'inside');
  });

  it('should tear down the browser', async () => {
    await browser.close();
  });
});
