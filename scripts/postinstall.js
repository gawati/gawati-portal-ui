
var shell = require('shelljs'); 
require('dotenv').config();

const fb = process.env.NPM_CONFIG_FB;

if (fb == 'yes') {
    shell.exec('npm install react-facebook');
    console.log('***Facebook integration included***');
} else {
    shell.exec('npm uninstall react-facebook');
    console.log('***Facebook integration not included***');
}
