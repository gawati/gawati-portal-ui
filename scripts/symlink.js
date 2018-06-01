/**
 * Symlinks cross plaform; We use path.resolve because windows symlinking expects absolute paths
 */
const fs = require('fs');
const process = require('process');
// symlink static/css/themes into build folder
const from = 'static/css/themes';
const to = 'themes';
process.chdir('build');
fs.symlink(from, to, "dir", function(err) { if (err !== null) {console.log("ERROR : ", err);}});
// symlink static/css/themes/.