import React from 'react';
import { Piece } from './Piece';

export class Tile extends React.Component {

  placeTileHere() {
    // not sure how to emit an event
    // something like this maybe
    this.props.evtSource.emitEvent('/move', this.props.row, this.props.col);
  }

  render() {
    console.log('tile.render', this.props.piece)
    switch (this.props.piece) {
      case 'no piece':
        return (
          <g>
            <rect
              fill={this.props.color}
              width="100"
              height="100"
              x={this.props.col * 100}
              y={this.props.row * 100}
              ry="0"
            />
          </g>
        );

      case '#ff0000':
      case '#0000ff':
        return (
          <g>
            <rect
              fill={this.props.color}
              width="100"
              height="100"
              x={this.props.col * 100}
              y={this.props.row * 100}
              ry="0"
            />
            <Piece
              color={this.props.piece}
              xOff={(this.props.col * 100) + 50}
              yOff={(this.props.row * 100) + 50}
            />
          </g>
        );

      default:
        return (
          <g onClick={this.placeTileHere}>
            <rect
              className="valid-move"
              fill={this.props.color}
              width="100"
              height="100"
              x={this.props.col * 100}
              y={this.props.row * 100}
              ry="0"
            />
          </g>
        );
    }
  }
}

Tile.propTypes = {
  row: React.propTypes.number.isRequired,
  col: React.propTypes.number.isRequired,
  piece: React.propTypes.string.isRequired,
  color: React.propTypes.string.isRequired,
};
