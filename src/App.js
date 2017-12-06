import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Page from './components/Page';


class App extends Component {
  render() {
    //console.log("process.env", process.env);
    return (
      <Page />
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
