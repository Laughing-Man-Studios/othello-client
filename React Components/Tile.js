import React from 'react';

export default class Tile extends React.Component {

  constructor(i, color, piece) {
    super();
    this.state = {
      index: i,
      tileColor: color,
      pieceColor: piece
    };
  }

  render() {
    return (
      <div id="Tile">
        <rect
          fill={this.state.tileColor}
          width="100"
          height="100"
          x="0"
          y="0"
          ry="0"
        />
        <circle
          fill={this.state.pieceColor}
          cx="50"
          cy="50"
          r="40"
        />
      </div>
    );
  }
}
