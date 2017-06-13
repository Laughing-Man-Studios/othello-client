import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Board } from './Board';
import { Score } from './Score';

export class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      turn: 1,
      board: [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 3, 0, 0, 0,
        0, 0, 0, 1, 2, 3, 0, 0,
        0, 0, 3, 2, 1, 0, 0, 0,
        0, 0, 0, 3, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      playerOneScore: 0,
      playerTwoScore: 0,
      winner: false,
    }
  }

  const evtSource = new EventSource('/events'); // generic constructor

  evtSource.addEventListener('move', (row, col, player, turn, board) => {
    // move logic
  });

  evtSource.addEventListener('start', (turn) => {
    // start logic
  });

  evtSource.addEventListener('end', (winner) => {
    // end logic
  });


  render() {
    // if The game has not begun yet
    if (!this.props.player) {
      return (
        <div id="layout">
          <Header />
          <div id="middle-content" className="row">
            <div className="Jumbotron">
              <h2>Please Wait</h2>
            </div>
          </div>
          <Footer />
        </div>
      )
    }

    return (
      <div id="layout">

        <Header />

        <Score
          playerOneScore={this.state.playerOneScore}
          playerTwoScore={this.state.playerTwoScore}
          turn={(this.state.turn === this.props.player) ? 'Your Turn' : 'Their Turn';}
        />

        <div id="middle-content" className="row" >
          <Board board={this.state.board} turn={this.state.turn} />
        </div>

        <Footer />

      </div>
    );
  }
}

Layout.propTypes = {
   player: React.propTypes.number,
}
