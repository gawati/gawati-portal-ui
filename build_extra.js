#!usr/bin/env node
/**
 * Additional build steps.
 */

'use strict';

var shell = require('shelljs');
console.log("Copying locales.")
shell.cp('-R', 'node_modules/gawati-lang-packs/locales', 'build/');
