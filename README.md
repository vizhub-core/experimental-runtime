# experimental-runtime

A runtime environment for in-browser live coding using Web technologies.

The fundamental idea behind this project is that JavaScript is executed in an iframe when the code is changed, _without_ re-evaluating the entire iframe. This is similar to [hot reloading](https://stackoverflow.com/questions/41428954/what-is-the-difference-between-hot-reloading-and-live-reloading-in-react-native) and [hot module replacement](https://webpack.js.org/concepts/hot-module-replacement/). This approach has a number of advantages over re-evaluating the entire iframe (setting `srcdoc`) on each code change, including:

- Application state can remain in memory between re-executions of JavaScript.
- DOM can remain in memory between re-executions of JavaScript.
- JavaScript libraries need only be loaded and parsed when dependencies change.
- It opens the door to dynamically injected state and CSS.

Inspired by:

- [Bret Victor - Inventing on Principle](https://www.youtube.com/watch?v=PUv66718DII)
- [Dan Abramov - Live React: Hot Reloading with Time Travel](https://www.youtube.com/watch?v=xsSnOQynTHs)

Related work:

- [GitHub: yangsu/inventing-on-principle](https://github.com/yangsu/inventing-on-principle)
