import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './React Components/Othello Layout';
import { PreGameScreen } from './React Components/Othello Layout';

const app = document.getElementById('app');

const evtSource = new EventSource('/newgame');

let playerDesignation = 0;
let layout = <Layout player={playerDesignation} />;

evtSource.addEventListener('return', (full, player) => {
  playerDesignation = player;
  layout = <Layout player={playerDesignation} />;
});

ReactDOM.render(
  <Router>
    <Route exact path="/" render={layout} />
  </Router>,
   app);
