//This is a cool function. This is where the magic happens. Please don't change unless you make it better!

const fs = require('fs');
const path = require('path');

const forEachFile = (dirname, pathway, callback) => {
  const files = fs.readdirSync(path.resolve(dirname, pathway));
  // Cleans up .js extensions, filters out index.js files,
  // and then applies the provided callback.

  files
    .map(file => (file.slice(-2) == 'js' ? file.slice(0, -3) : file))
    .filter(file => file != 'index')
    .forEach(callback);
};

module.exports = forEachFile;
