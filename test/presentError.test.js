const assert = require('assert');
const { presentError } = require('../dist/experimental-runtime.js');
const expectedValues = require('./expectedValues');

describe('presentError', () => {
  it('should present an error for invalid package', async () => {
    assert.equal(
      presentError(expectedValues.invalidPackage.error),
      expectedValues.invalidPackageErrorPresented
    );
  });
  it('should present an error for invalid JS', async () => {
    assert.equal(
      presentError(expectedValues.invalidJS.error),
      expectedValues.invalidJSErrorPresented
    );
  });
  it('should present an error for name not exported', async () => {
    assert.equal(
      presentError(expectedValues.nameNotExported.error),
      expectedValues.nameNotExportedErrorPresented
    );
  });
});
