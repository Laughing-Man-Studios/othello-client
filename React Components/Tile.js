import React from 'react';
import jquery from 'jquery';
import PropTypes from 'prop-types';
import { Piece } from './Piece';


export class Tile extends React.Component {

  constructor() {
    super();
    this.placeTileHere = this.placeTileHere.bind(this);
  }

  placeTileHere() {
    const data = 'Row='+this.props.row+'&Col='+this.props.col;
    console.log(data);
    jquery.post('/move/' + this.props.player, data);
    console.log('you just placed a tile at [', this.props.row, ',', this.props.col, ']')
  }

  render() {
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
        console.log('valid move at [', this.props.col, ',', this.props.row, ']')
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
