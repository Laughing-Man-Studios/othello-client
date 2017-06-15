import React from 'react';
import jquery from 'jquery';
import PropTypes from 'prop-types';
import { Piece } from './Piece';


export class Tile extends React.Component {

  placeTileHere() {
    const data = JSON.stringify({ row: this.props.row, col: this.props.col });
    jquery.post('/move/' + this.props.player, data);
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
  row: PropTypes.number.isRequired,
  col: PropTypes.number.isRequired,
  player: PropTypes.number.isRequired,
  piece: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,

};
