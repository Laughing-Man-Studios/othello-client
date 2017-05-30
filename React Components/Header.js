import React from 'react';
import { Link } from 'react-router-dom';

export class Header extends React.Component {
  render() {
    return (
      <header id="header-container"className="container-fluid row">
        <div className="col-lg-1 col-md-1 col-sm-0 col-xs-0" />
        <div id="header" className="col-lg-10 col-md-10 col-sm-12 col-xs-12">
          <div id="name">
            <a><Link to="/">Othello</Link></a>
          </div>
          <div id="header-links">
            <Link to="/">New Game</Link>
          </div>
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="ham-menu" data-toggle="dropdown">
              <img src="../img/hm.png" height="25" alt="dropdown-menu" />
            </button>
            <div className="dropdown-menu">
              <li className="dropdown-item" href="#"><Link to="/">Home</Link></li>
              <li className="dropdown-item" href="#"><Link to="/Projects">Projects</Link></li>
              <li className="dropdown-item" href="#"><Link to="/Skills">Skills</Link></li>
              <li className="dropdown-item" href="#"><Link to="/Contact">Contact</Link></li>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
