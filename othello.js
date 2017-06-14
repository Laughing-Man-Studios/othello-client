import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './React Components/Othello Layout';

const app = document.getElementById('app');

const newGameSource = new EventSource('/newgame');
const eventSource = new EventSource('/events');
const moveSource = new EventSource('/move');

let playerDesignation = 0;
let layout = (<Layout
  player={playerDesignation}
  eventSource={eventSource}
  moveSource={moveSource}
/>);

newGameSource.get((event) => {
  const data = JSON.parse(event.data);
  playerDesignation = data.player;
  layout = (<Layout
    player={playerDesignation}
    eventSource={eventSource}
    moveSource={moveSource}
  />);
});

ReactDOM.render(
  <Router>
    <Route exact path="/" render={layout} />
  </Router>,
   app);
