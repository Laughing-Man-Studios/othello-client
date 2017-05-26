import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Footer from './Footer';
import Board from './Board';
import Score from './Score';

export default class Layout extends React.Component {
  render() {
    return (
      <div id="layout">

        <Header />

        <Score />

        <div id="middle-content">
          <Board />
        </div>

        <Footer />

      </div>
    );
  }
}
