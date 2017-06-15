import React from 'react';
import PropTypes from 'prop-types';
import { Header } from './Header';
import { Footer } from './Footer';
import { Board } from './Board';
import { Score } from './Score';
import { GameOver } from './GameOver';

export class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      turn: 1,
      board: [
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      playerOneScore: 0,
      playerTwoScore: 0,
      winner: false,
    };
  }

  componentDidMount() {
    this.props.eventSource.addEventListener('move', (data) => {
      const moveData = JSON.parse(data);
      this.setState({ board: moveData.board, turn: moveData.turn });
    });

    this.props.eventSource.addEventListener('end', (data) => {
      const endData = JSON.parse(data);
      this.setState({ winner: endData.winner });
    });

    this.props.eventSource.addEventListener('start', (data) => {
      const startData = JSON.parse(data);
      this.setState({ turn: startData.turn, start: true });
    });
  }

  render() {
    if (this.props.status === 'waiting') {
      return (
        <div id="layout">
          <Header />
          <div id="middle-content" className="row">
            <div className="Jumbotron">
              <h2>Please Wait</h2>
              <p>The server is setting up a game</p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    if (this.props.status === 'full') {
      return (
        <div id="layout">
          <Header />
          <div id="middle-content" className="row">
            <div className="Jumbotron">
              <h2>Game Full</h2>
              <p>Please wait for the current game to end</p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    if (!this.state.start) {
      return (
        <div id="layout">
          <Header />
          <div id="middle-content" className="row">
            <div className="jumbotron">
              <h2>Please Wait</h2>
              <p>The server is waiting for another player to connect</p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }


    if (this.state.winner) {
      return (
        <div id="layout">

          <GameOver
            playerOneScore={this.state.playerOneScore}
            playerTwoScore={this.state.playerTwoScore}
            message={(this.state.turn === this.props.player) ? 'You Won' : 'You Lost'}
          />

          <Header />

          <Score
            playerOneScore={this.state.playerOneScore}
            playerTwoScore={this.state.playerTwoScore}
            message={(this.state.turn === this.props.player) ? 'Your Turn' : 'Their Turn'}
          />

          <div id="middle-content" className="row" >
            <Board
              player={this.props.player}
              board={this.state.board}
              turn={this.state.turn}
            />
          </div>

          <Footer />

        </div>
      );
    }

    return (
      <div id="layout">

        <Header />

        <Score
          playerOneScore={this.state.playerOneScore}
          playerTwoScore={this.state.playerTwoScore}
          message={(this.state.turn === this.props.player) ? 'Your Turn' : 'Their Turn'}
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
  status: PropTypes.string.isRequired,
  player: PropTypes.number.isRequired,
  eventSource: PropTypes.object.isRequired,
};
