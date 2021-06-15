const puppeteer = require('puppeteer');
const assert = require('assert');
//const { ExperimentalRuntime } = require('../dist/experimental-runtime.cjs.js');
//const { build } = require('../dist/experimental-runtime.js');

describe('run', () => {
  it('should run code', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(`
      <html>
        <head>
        </head>
        <body>
          <iframe></iframe>
        </body>
      </html
    `);
    await page.addScriptTag({
      path: './dist/experimental-runtime.js',
    });
    console.log(await page.evaluate(() => typeof ExperimentalRuntime));
    //assert.deepEqual();
    await browser.close();
  });
});
