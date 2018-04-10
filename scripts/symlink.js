/**
 * Symlinks cross plaform; We use path.resolve because windows symlinking expects absolute paths
 */
const fs = require('fs');
const path = require('path');
const isWin = process.platform === 'win32';

const fromPath = path.join('.','build', 'static', 'css', 'themes');
const toPath = path.join('.', 'build', 'themes');

const from = isWin ? path.resolve(fromPath) : fromPath ;
const to = isWin ? path.resolve(toPath) : toPath ;

fs.symlink(from, to, "dir", function(err) { if (err !== null) {console.log("ERROR : ", err);}});