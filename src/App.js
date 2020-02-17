import React, { Component } from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from './components/Login.js';
import VerifyEmail from './components/VerifyEmail.js';
import Home from './components/Home.js';
import Signup from './components/Signup.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/verify-email">
                <VerifyEmail />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/sign-up">
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
