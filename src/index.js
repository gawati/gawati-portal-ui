import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
/* import BrowserRouter from 'react-router-dom' */
import { BrowserRouter, HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

//import './index.css';
import 'bootstrap/dist/css/bootstrap-reboot.css';
import 'bootstrap/dist/css/bootstrap.css';
import './css/bootstrap-overrides.css';
import './css/app-custom.css';
import './css/app-media.css';

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>, 
    document.getElementById('root')
);
registerServiceWorker();
