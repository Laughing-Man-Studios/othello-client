import React from 'react';

export class Piece extends React.Component {

  render() {
    switch (this.props.color) {
      case '#ff0000':
        return (
          <circle
            fill={this.props.color}
            cx={this.props.xOff}
            cy={this.props.yOff}
            r="40"
          />
        );

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
