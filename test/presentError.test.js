const assert = require('assert');
const { presentError } = require('../dist/experimental-runtime.cjs.js');
const expectedValues = require('./expectedValues');

describe('presentError', () => {
  it('should present an error', async () => {
    assert.equal(
      presentError(expectedValues.nameNotExported.error),
      expectedValues.nameNotExportedErrorPresented
    );
  });
});
