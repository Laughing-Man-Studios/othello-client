import React from 'react';
import { Tile } from './Tile';

export class Board extends React.Component {

  render() {
    const colors = ['#000000', '#ffffff'];
    const pieces = ['no piece', '#ff0000', '#0000ff', 'valid move'];

    const currentBoard = this.props.board.map(
      (tile, i) => (
        <Tile
          key={i}
          color={colors[((i + Math.floor(i / 8)) % 2)]}
          piece={((pieces[tile] === 3) && (this.props.turn)) ? pieces[0] : pieces[tile]}
          col={i % 8}
          row={Math.floor(i / 8)}
        />));

    return (
      <div id="board">
        <svg>
          {currentBoard}
        </svg>
      </div>
    );
  }
}

Board.propTypes = {
  turn: React.propTypes.number.isRequired,
  board: React.propTypes.array.isRequired,
};
