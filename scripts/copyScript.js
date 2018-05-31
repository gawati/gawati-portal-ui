var shell = require('shelljs'); 
require('dotenv').load();
shell.cp('-R', `src/css/themes/${process.env.REACT_APP_THEME}/locales/` , `public/`);
//console.log(`src/css/themes/${process.env.REACT_APP_THEME}/locales/ File written at path public/locales/`);


