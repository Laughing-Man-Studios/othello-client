import React from 'react';
import ReactDOM from 'react-dom';
import Tile from './Tile';

export default class Board extends React.Component {

  updateBoard(board){

  }

  render() {
    const colors = ['#000000', '#ffffff'];
    const pieces = ['rgba(0,0,0,0)', '#000000', '#ffffff'];

    const currentBoard = [
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0
    ].map((tile, i) => <Tile key={i} color=colors[{i}%2] piece=pieces[{tile}]>);

    return (
      <div id="Board">
        {currentBoard}
      </div>
    );
  }
};
