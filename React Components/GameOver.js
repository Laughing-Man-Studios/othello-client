import React from 'react';
import PropTypes from 'prop-types';

export class GameOver extends React.Component {

  render() {
    return (
      <div className="gameover">
        <div className="jumbotron">
          <div className="row">
            <div className="col-lg-12">
              <h1>{this.props.message}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h2>Player 1 - {this.props.playerOneScore}</h2>
            </div>
            <div className="col-lg-6">
              <h2>Player 2 - {this.props.playerTwoScore}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameOver.propTypes = {
  playerOneScore: PropTypes.number.isRequired,
  playerTwoScore: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
