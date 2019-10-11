import React, { Component } from "react";
import Moment from 'react-moment';
import 'moment-timezone';

import "./stylesheets/_style.scss";
import { Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/navbar/Navbar.jsx";
import Signup from "./components/auth/Signup.jsx";
import Login from "./components/auth/Login.jsx";
import AuthService from "./components/auth/AuthService.jsx";
import TaskManager from "./components/taskManager/TaskManager.jsx";
import TaskStats from "./components/taskManager/TaskStats.jsx";
import TaskNews from "./components/taskManager/TaskNews.jsx";
import Menu from "./components/navbarfooter/Menu.jsx";

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
          <Redirect to="/task-manager" />

          <div className="App">
            <header className="App-header">
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
              <Switch>
                <Route exact path="/task-manager" render={() => <TaskManager getUser={this.getUser} />} />
                <Route exact path="/stats" render={() => <TaskStats getUser={this.getUser} />} />
                <Route exact path="/news" render={() => <TaskNews getUser={this.getUser} />} />
              </Switch>
              <Menu />
            </header>
          </div>
        </React.Fragment>
      );

    } else {
      return (
        <React.Fragment>
          <Redirect to="/login" />

          <div className="App">
            <header className="App-header">
              <Navbar userInSession={this.state.loggedInUser} logout={this.logout} />
              <Switch>
                <Route exact path="/signup" render={() => <Signup getUser={this.getUser} />} />
                <Route exact path="/login" render={() => <Login getUser={this.getUser} />} />
              </Switch>
            </header>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default App;
