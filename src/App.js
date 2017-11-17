import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Page from './components/Page';
import TopBar from './components/TopBar';
import ContentArea from './components/ContentArea';
import Footer from './components/Footer';


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

export default App;
