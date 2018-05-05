import React from 'react';
import PropTypes from 'prop-types';
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
          piece={((tile === 3) && (this.props.turn !== this.props.player))
            ? pieces[0]
            : pieces[tile]}
          col={i % 8}
          row={Math.floor(i / 8)}
          player={this.props.player}
        />));

    return (
      <div id="board">
        <svg viewBox="0 0 800 800">
          {currentBoard}
        </svg>
      </div>
    );
  }
}

Board.propTypes = {
  turn: PropTypes.number.isRequired,
  board: PropTypes.array.isRequired,
  player: PropTypes.number.isRequired,
};
