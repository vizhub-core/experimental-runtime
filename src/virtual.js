// A Rollup plugin for a virtual file system.
// Inspired by https://github.com/Permutatrix/rollup-plugin-hypothetical/blob/master/index.js
export const virtual = (files) => ({
  name: 'virtual',
  resolveId: (id) => (id.startsWith('./') ? id : null),
  load: (id) => (id.startsWith('./') ? files[id.substring(2)] : null),
});
