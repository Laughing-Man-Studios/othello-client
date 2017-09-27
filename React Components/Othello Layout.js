import React from 'react';
import jquery from 'jquery';
import { Header } from './Header';
import { Footer } from './Footer';
import { Board } from './Board';
import { Score } from './Score';
import { GameOver } from './GameOver';


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
      status: 'waiting',
      player: 0,
    };
    this.reformatBoard = this.reformatBoard.bind(this);
    this.getScore = this.getScore.bind(this);
  }

  componentDidMount() {
    jquery.get('/newgame', (data) => {
      const obj = JSON.parse(data);
      const playerDesignation = obj.Player;
      const status = (obj.Full) ? 'full' : 'valid';
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
      this.setState({ turn: startData.Turn, status: 'playing' });
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

    if (this.state.status === 'waiting') {
      return (
        <div id="layout">
          <Header />
          <div id="middle-content" className="row">
            <div className="jumbotron col-lg-6 col-md-9 col-sm-12 col-xs-12">
              <h2>Please Wait</h2>
              <p>The server is setting up a game</p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    if (this.state.status === 'valid') {
      return (
        <div id="layout">
          <Header />
          <div id="middle-content" className="row">
            <div className="jumbotron col-lg-6 col-md-9 col-sm-12 col-xs-12">
              <h2>Please Wait</h2>
              <p>For another player to join</p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }

    if (this.state.status === 'full') {
      return (
        <div id="layout">
          <Header />
          <div id="middle-content" className="row">
            <div className="jumbotron col-lg-6 col-md-9 col-sm-12 col-xs-12">
              <h2>Game Full</h2>
              <p>Please wait for the current game to end</p>
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

        <div id="middle-content" className="row" >
          <Board board={this.state.board} turn={this.state.turn} player={this.state.player} />
        </div>

        <Footer />

      </div>
    );
  }
}
