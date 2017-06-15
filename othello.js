import React from 'react';
import ReactDOM from 'react-dom';
import jquery from 'jquery';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from './React Components/Othello Layout';

const app = document.getElementById('app');
const eventSource = new EventSource('/events');

let playerDesignation = 0;
let status = 'waiting';

let layout = () => {
  return (
    <Layout
      player={playerDesignation}
      eventSource={eventSource}
      status={status}
    />
  );
};

jquery.get('/newgame', (data) => {
  const obj = JSON.parse(data);
  playerDesignation = obj.player;
  status = (obj.full) ? 'full' : 'valid';
  layout = () => {
    return (
      <Layout
        player={playerDesignation}
        eventSource={eventSource}
        status={status}
      />
    );
  };
});

ReactDOM.render(
  <Router>
    <Route exact path="/" render={layout} />
  </Router>,
   app);
