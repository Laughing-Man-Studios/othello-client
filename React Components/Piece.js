import React from 'react';
import PropTypes from 'prop-types';

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
  xOff: PropTypes.number.isRequired,
  yOff: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
