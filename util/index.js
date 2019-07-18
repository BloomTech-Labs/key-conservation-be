const forEachFile = require('./forEachFile');

// Requires all utility files.
let exportUtils = {};
forEachFile(__dirname, './', file => {
  const path = `./${file}`;
  const name = path.slice(2);
  exportUtils[name] = require(path);
});

module.exports = exportUtils;
