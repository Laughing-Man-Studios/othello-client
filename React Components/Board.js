import React from 'react';
import { Tile } from './Tile';

export class Board extends React.Component {

  render() {
    const colors = ['#000000', '#ffffff'];
    const pieces = ['no piece', '#ff0000', '#0000ff'];

    const currentBoard = [
      0, 1, 2, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0
    ].map((tile, i) => (<Tile
      key={i}
      color={colors[((i + Math.floor(i / 8)) % 2)]}
      piece={pieces[tile]}
      xOff={100 * (i % 8)}
      yOff={100 * (Math.floor(i / 8))}
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
