module.exports = {
  singleFileUMD: {
    code: `(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.App = {}));
}(this, (function (exports) { 'use strict';

	const main = () => console.log("Hello");

	exports.main = main;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
`,
  },
  modules: {
    code: `(function (global, factory) {
          typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
          typeof define === 'function' && define.amd ? define(['exports'], factory) :
          (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.App = {}));
}(this, (function (exports) { 'use strict';

          const add = (a, b) => a + b;

          const main = () => console.log(add(1, 2));

          exports.main = main;

          Object.defineProperty(exports, '__esModule', { value: true });

})));
`,
  },
  external: {
    code: `(function (global, factory) {
          typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('foo-bar')) :
          typeof define === 'function' && define.amd ? define(['foo-bar'], factory) :
          (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FOOBar));
}(this, (function (FooBar) { 'use strict';

          function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

          var FooBar__default = /*#__PURE__*/_interopDefaultLegacy(FooBar);

          console.log(FooBar__default['default']);

})));
`,
  },
  externalGuessedName: {
    code: `(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('foo-bar')) :
	typeof define === 'function' && define.amd ? define(['foo-bar'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FooBar));
}(this, (function (FooBar) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var FooBar__default = /*#__PURE__*/_interopDefaultLegacy(FooBar);

	console.log(FooBar__default['default']);

})));
`,
    warnings: [
      {
        code: 'UNRESOLVED_IMPORT',
        importer: './index.js',
        message:
          "'foo-bar' is imported by ./index.js, but could not be resolved – treating it as an external dependency",
        source: 'foo-bar',
        url: 'https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency',
      },
      {
        code: 'MISSING_GLOBAL_NAME',
        guess: 'FooBar',
        message:
          "No name was provided for external module 'foo-bar' in output.globals – guessing 'FooBar'",
        source: 'foo-bar',
      },
    ],
  },
};
