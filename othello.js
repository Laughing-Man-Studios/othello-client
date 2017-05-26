import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from './React Components/Othello Layout';

const app = document.getElementById('app');

ReactDOM.render(
  <Router>
    <div id="routes">
      <Route exact path="/" component={Layout} />
    </div>
  </Router>,
   app);
