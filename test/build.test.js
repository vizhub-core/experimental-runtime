const assert = require('assert');
const { build } = require('../dist/experimental-runtime.js');
const expectedValues = require('./expectedValues');

describe('build', () => {
  it('should build a single file as UMD', async () => {
    assert.deepEqual(
      await build({
        'index.js': 'export const main = () => console.log("Hello");',
      }),
      expectedValues.singleFileUMD
    );
  });

  it('should handle modules', async () => {
    assert.deepEqual(
      await build({
        'index.js': `
            import { add } from './add';
            export const main = () => console.log(add(1, 2));
          `,
        'add.js': 'export const add = (a, b) => a + b;',
      }),
      expectedValues.modules
    );
  });

  it('should use external packages', async () => {
    assert.deepEqual(
      await build({
        'index.js': `
          import FooBar from 'foo-bar';
          console.log(FooBar);
        `,
        'package.json': `{
          "browser-builds": {
            "foo-bar": {
              "global": "FOOBar",
              "cdn-path": "/umd/react-dom.production.min.js"
            }
          }
        }`,
      }),
      expectedValues.external
    );
  });

  it('should not crash when package is missing browser-builds', async () => {
    assert.deepEqual(
      await build({
        'index.js': `import FooBar from 'foo-bar'; console.log(FooBar);`,
        'package.json': `{}`,
      }),
      expectedValues.externalGuessedName
    );
  });

  it('should not crash when package is malformed JSON', async () => {
    assert.deepEqual(
      await build({
        'index.js': `import FooBar from 'foo-bar'; console.log(FooBar);`,
        'package.json': `{"foo":}`,
      }),
      expectedValues.invalidPackage
    );
  });

  it('should not crash when JS is malformed', async () => {
    assert.deepEqual(
      await build({
        'index.js': `import FooBar from 'foo-bar`,
      }),
      expectedValues.invalidJS
    );
  });

  it('should not crash when import name is not exported', async () => {
    assert.deepEqual(
      await build({
        'index.js': `
            import { add } from './add';
            export const main = () => console.log(add(1, 2));
          `,
        'add.js': 'export const Add = (a, b) => a + b;',
      }),
      expectedValues.nameNotExported
    );
  });
});
