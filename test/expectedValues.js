module.exports = {
  singleFileUMD: `(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.App = {}));
}(this, (function (exports) { 'use strict';

	const main = () => console.log("Hello");

	exports.main = main;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
`,
  modules: `(function (global, factory) {
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
  external: `(function (global, factory) {
          typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('foo-bar')) :
          typeof define === 'function' && define.amd ? define(['foo-bar'], factory) :
          (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FOOBar));
}(this, (function (FooBar) { 'use strict';

          function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

          var FooBar__default = /*#__PURE__*/_interopDefaultLegacy(FooBar);

          console.log(FooBar__default['default']);

})));
`,
};
