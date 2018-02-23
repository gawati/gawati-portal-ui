import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import './App.css';
import { I18n /* , Trans */ } from 'react-i18next';
import Page from './components/Page';


class App extends Component {

  componentDidMount() {
    const path = './css/themes/' + process.env.REACT_APP_THEME + '/vars.css';
    require(`${path}`);
    console.log(process.env);
  }

  render() {
    //console.log("process.env", process.env);
    return (
      <I18n ns="translations">
      {
        (t, { i18n })=>(
          <Page i18n={i18n} />
        )
      }
      </I18n>  
    );
  }
}


/*
class App extends Component {
  render() {
    return (
      <Page>
        <TopBar />
        <ContentArea />
        <Footer />
      </Page>
    );
  }
}

*/

export default App;
