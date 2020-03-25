import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, NavLink } from "react-router-dom"
import './navigation.css';

import Board from './../boggle';

class Navigation extends React.Component {
    render(){
        return(
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light nav">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto nav__item nav__list">
                    <li className="nav-item nav__link"><NavLink to="/" exact activeClassName="active">Home</NavLink></li>
                    <li className="nav-item nav__link"><NavLink to="/highscore" exact activeClassName="active">HighScore</NavLink></li>
                    </ul>
                    </div>
                </nav>
                <Switch>
            <Route path="/" exact component={Board} />
            <Route path="/highscore" component={HighScoreComponent} />
            <Redirect to="/" />
          </Switch>
            </Router>
        )
    }
}
const HighScoreComponent = () => {
    return (
      <div><h1>HighScore</h1></div>
    );
  }

export default Navigation;