import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Board } from './Board';
import { Score } from './Score';

export class Layout extends React.Component {
  render() {
    return (
      <div id="layout">

        <Header />

        <Score />

        <div id="middle-content" className="row" >
          <Board />
        </div>

        <Footer />

      </div>
    );
  }
}
