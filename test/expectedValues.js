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

        console.log(FooBar);

})));
`,
  },
  externalGuessedName: {
    code: `(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('foo-bar')) :
	typeof define === 'function' && define.amd ? define(['foo-bar'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.FooBar));
}(this, (function (FooBar) { 'use strict';

	console.log(FooBar);

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
  invalidPackage: {
    error: {
      code: 'INVALID_PACKAGE_JSON',
      message: 'Unexpected token } in JSON at position 7',
      name: 'SyntaxError',
    },
  },
  invalidPackageErrorPresented: `Invalid package.json:
SyntaxError: Unexpected token } in JSON at position 7`,
  invalidJS: {
    error: {
      code: 'PARSE_ERROR',
      frame: "1: import FooBar from 'foo-bar\n                      ^",
      id: './index.js',
      loc: {
        column: 19,
        file: './index.js',
        line: 1,
      },
      message: 'Unterminated string constant',
      name: 'Error',
      parserError: {
        loc: {
          column: 19,
          line: 1,
        },
        pos: 19,
        raisedAt: 27,
      },
      pos: 19,
      watchFiles: ['./index.js'],
    },
  },
  invalidJSErrorPresented: `Error: Unterminated string constant
./index.js (line 1)
1: import FooBar from 'foo-bar
                      ^`,
  nameNotExported: {
    error: {
      code: 'MISSING_EXPORT',
      frame:
        '1: \n' +
        "2:             import { add } from './add';\n" +
        '                        ^\n' +
        '3:             export const main = () => console.log(add(1, 2));',
      id: './index.js',
      loc: {
        column: 21,
        file: './index.js',
        line: 2,
      },
      message: "'add' is not exported by ./add, imported by ./index.js",
      name: 'Error',
      pos: 22,
      url: 'https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module',
      watchFiles: ['./index.js', './add'],
    },
  },
  nameNotExportedErrorPresented: `Error: 'add' is not exported by ./add, imported by ./index.js
https://rollupjs.org/guide/en/#error-name-is-not-exported-by-module
./index.js (line 2)
1: 
2:             import { add } from './add';
                        ^
3:             export const main = () => console.log(add(1, 2));`,
};
