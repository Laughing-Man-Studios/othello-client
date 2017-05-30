import React from 'react';

export class Score extends React.Component {

  constructor() {
    super();
    this.state = {
      playerOneScore: 0,
      playerTwoScore: 0
    }
  }

  updateScore() {

  }

  render() {
    return (
      <div className="row">
        <div id="score" className="col-lg-8 col-md-10 col-sm-12 col-xs-12">
          <div id="playerOneScore" className="col-lg-6">
            Player 1 - {this.state.playerOneScore}
          </div>
          <div id="playerTwoScore" className="col-lg-6">
            {this.state.playerTwoScore} - Player 2
          </div>
        </div>
      </div>
    );
  }
}
