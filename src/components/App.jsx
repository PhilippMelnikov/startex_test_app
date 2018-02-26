import React, { Component } from 'react';
import Modal from 'react-modal';

import Header from './Header.jsx';
import SearchContainer from '../containers/SearchContainer.jsx';

/**
 * App component
 */
export default class App extends Component {
  componentDidMount() {
    Modal.setAppElement(document.querySelector('body'));
  }

  render() {
    return (
      <div>
        <Header />
        <SearchContainer />
      </div>);
  }
}