import React from 'react';

export class Piece extends React.Component {

  render() {
    switch (this.props.color) {
      case '#ff0000':
      case '#0000ff':
        return (
          <circle
            fill={this.props.color}
            cx={this.props.xOff}
            cy={this.props.yOff}
            r="40"
          />
        );

      default:
        return null;

    }
  }
}

Piece.propTypes = {
  xOff: React.propTypes.number.isRequired,
  yOff: React.propTypes.number.isRequired,
  color: React.propTypes.string.isRequired,
};
