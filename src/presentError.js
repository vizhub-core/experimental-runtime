// Generates a displayable error message in response to syntax errors.
// Inspired by https://github.com/rollup/rollup/blob/master/bin/src/logging.ts
export const presentError = (error) => {
  const lines = [];

  lines.push(`${error.name}: ${error.message}`);

  if (error.url) {
    lines.push(error.url);
  }

  if (error.loc) {
    lines.push(`${error.loc.file || error.id} (line ${error.loc.line})`);
  } else if (error.id) {
    lines.push(error.id);
  }

  if (error.frame) {
    lines.push(error.frame);
  }

  //if (error.stack) {
  //  lines.push(error.stack);
  //}

  // console.log('`' + lines.join('\n') + '`');
  return lines.join('\n');
};
