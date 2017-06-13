import React from 'react';

export class Score extends React.Component {

  render() {
    return (
      <div className="row">
        <div id="score" className="col-lg-8 col-md-10 col-sm-12 col-xs-12">
          <div id="playerOneScore" className="col-lg-5">
            Player 1 - {this.props.playerOneScore}
          </div>
          <div id="turn-message" className="col-lg-2">
            {this.props.message}
          </div>
          <div id="playerTwoScore" className="col-lg-5">
            {this.props.playerTwoScore} - Player 2
          </div>
        </div>
      </div>
    );
  }
}

Score.propTypes = {
  playerOneScore: React.PropTypes.number.isRequired,
  playerTwoScore: React.PropTypes.number.isRequired,
  message: React.PropTypes.String.isRequired,
};
