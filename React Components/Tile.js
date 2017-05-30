import React from 'react';
import { Piece } from './Piece';

export class Tile extends React.Component {

  render() {
    return (
      <g>
        <rect
          fill={this.props.color}
          width="100"
          height="100"
          x={this.props.xOff}
          y={this.props.yOff}
          ry="0"
        />
        <Piece
          color={this.props.piece}
          xOff={this.props.xOff + 50}
          yOff={this.props.yOff + 50}
        />
      </g>
    );
  }
}
