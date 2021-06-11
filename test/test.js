const assert = require('assert');
const { build } = require('../dist/experimental-runtime.cjs.js');

describe('ExperimentalRuntime', () => {
  describe('build', () => {
    it('should ', async () => {
      const files = {
        'index.js': 'export const main = () => console.log("Hello");',
      };
      assert.equal(
        await build(files),
        `(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.App = {}));
}(this, (function (exports) { 'use strict';

	const main = () => console.log("Hello");

	exports.main = main;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
`
      );
    });
  });
});
