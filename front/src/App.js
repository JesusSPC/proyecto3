import React, { Component } from "react";
import 'moment-timezone';
import { Modal } from "react-materialize";

import "./stylesheets/_style.scss";

import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.js";
import Signup from "./components/auth/Signup.js";
import Login from "./components/auth/Login.js";
import AuthService from "./components/auth/AuthService.js";
import TaskManager from "./components/taskManager/TaskManager.js";
import TaskStats from "./components/taskManager/TaskStats.js";
import TaskNews from "./components/news/TaskNews.js";
import Menu from "./components/navbarfooter/Menu.js";

class App extends Component {
  constructor(props) {  
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();

    this.fetchUser()
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };

  fetchUser() {
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response,
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false,
        });
      });
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <React.Fragment>
          <Redirect to="/news" />
          <div className="App">
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
            <header className="App-header">
              <Switch>
                <Route exact path="/task-manager" render={() => <TaskManager getUser={this.getUser} />} />
                <Route exact path="/stats" render={() => <TaskStats getUser={this.getUser} />} />
                <Route exact path="/news" render={() => <TaskNews getUser={this.getUser} />} />
              </Switch>
            </header>
            <Menu className="nav-bottom"/>
          </div>
        </React.Fragment>
      );

    } else {
      return (
        <React.Fragment>
          <Redirect to="/login" />
            <div className="App">
              <div className="btns-auth">
                <a href="#signup" className="btn modal-trigger">Sign up</a>
                <Modal header="Get ready to enjoy!" id="signup">
                  <Signup getUser={this.getUser} />
                </Modal> 
                <a href="#login" className="btn modal-trigger">Sign in</a>
                <Modal header="Sign in" id="login">
                  <Login getUser={this.getUser} />
                </Modal> 
              </div>
            </div>
        </React.Fragment>
      );
    }
  }
}

export default App;
