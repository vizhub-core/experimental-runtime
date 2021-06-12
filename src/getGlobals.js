// Extracts the browser globals from package.json
export const getGlobals = (files) => {
  if ('package.json' in files) {
    const json = JSON.parse(files['package.json']);
    if ('browser-builds' in json) {
      return Object.entries(json['browser-builds']).reduce(
        (accumulator, [packageName, config]) => {
          accumulator[packageName] = config.global;
          return accumulator;
        },
        {}
      );
    }
  }
  return null;
};
