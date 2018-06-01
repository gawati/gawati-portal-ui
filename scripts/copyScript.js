var shell = require('shelljs'); 
require('dotenv').load();
console.log(" PROCESS ENV = ", process.env.NODE_ENV);

shell.cp(
    '-R', 
    `src/css/themes/${process.env.REACT_APP_THEME}/locales/`, 
    `public/`
);
// remove the duplicate copy of the locales folder
shell.rm(
    '-rf',
    `build/static/css/themes/${process.env.REACT_APP_THEME}/locales`
);

