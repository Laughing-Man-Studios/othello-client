import React from 'react';
import jquery from 'jquery';
import { Header } from './Header';
import { Footer } from './Footer';
import { Board } from './Board';
import { Score } from './Score';
import { GameOver } from './GameOver';

const FULL = 'full';
const PLAYING = 'playing';
const VALID = 'valid';
const WAITING = 'waiting';

export class Layout extends React.Component {

  constructor() {
    super();
    this.state = {
      turn: 0,
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
      status: WAITING,
      player: 0,
    };
  }

  componentDidMount() {
    jquery.get('/newgame', (data) => {
      const obj = JSON.parse(data);
      const playerDesignation = obj.Player;
      const status = (obj.Full) ? FULL : VALID;
      this.setState({
        status: status,
        player: playerDesignation,
      });
    });

    const eventSource = new EventSource('/events');

    eventSource.addEventListener('move', (data) => {
      const moveData = JSON.parse(data.data);
      console.log('move event hit');
      console.log(moveData.Board);
      const board = this.reformatBoard(moveData.Board);
      const score = this.getScore(moveData.Board);
      this.setState({
        board: board,
        turn: moveData.Turn,
        playerOneScore: score[0],
        playerTwoScore: score[1],
      });
    });

    eventSource.addEventListener('end', (data) => {
      const endData = JSON.parse(data.data);
      this.setState({ winner: endData.winner });
    });

    eventSource.addEventListener('start', (data) => {
      console.log('start Received');
      const startData = JSON.parse(data.data);
      console.log(startData);
      this.setState({ turn: startData.Turn, status: PLAYING });
    });
  }

  getScore(gameBoard) {
    let score = [0, 0];
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        switch (gameBoard[i][j]) {

          case 1:
            score[0] += 1;
            break;

          case 2:
            score[1] += 1;
            break;

          default:
            break;
        }
      }
    }
    return score;
  }

  reformatBoard(gameBoard) {
    let board = [];
    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        board.push(gameBoard[i][j]);
      }
    }
    return board;
  }

  render() {
    console.log(this.props);

    if (this.state.status !== PLAYING) {

      const messages = {
        full: 'Please wait for the current game to end',
        valid: 'For another player to join',
        waiting: 'The server is setting up a game',
      }

      let message;

      switch (this.state.status) {

        case FULL:
          message = messages.full;
          break;

        case VALID:
          message = messages.valid;
          break;

        case WAITING:
          message = messages.waiting;
          break;

        default:
          message = 'The client experienced an error pease report a bug'
          break;
      }

      return (
        <div id="layout">
          <Header />
          <div id="middle-content" className="row">
            <div className="col-lg-3 col-md-3 col-sm-1 col-xs-11" />
            <div className="jumbotron col-lg-6 col-md-8 col-sm-10 col-xs-10">
              <h2>Please Wait</h2>
              <p>{message}</p>
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
            message={(this.state.turn === this.state.player) ? 'You Won' : 'You Lost'}
          />

          <Header />

          <Score
            playerOneScore={this.state.playerOneScore}
            playerTwoScore={this.state.playerTwoScore}
            message={(this.state.turn === this.state.player) ? 'Your Turn' : 'Their Turn'}
          />

          <div id="middle-content" className="row" >
            <Board
              player={this.state.player}
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
          message={(this.state.turn === this.state.player) ? 'Your Turn' : 'Their Turn'}
        />

        <div id="game-middle-content" className="row" >
          <Board board={this.state.board} turn={this.state.turn} player={this.state.player} />
        </div>

        <Footer />

      </div>
    );
  }
}
