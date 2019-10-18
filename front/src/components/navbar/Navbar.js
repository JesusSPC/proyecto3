// navbar/Navbar.js

import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../auth/AuthService.js";
import Logo from "../../images/QualitimeLogo.svg";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, loggedInUser: nextProps["userInSession"] });
  }

  handleLogout = e => {
    this.props.logout();
  };

  render() {
    if (this.state.loggedInUser) {
      return (
        <nav className="navbar nav-style blue navbar-float">
          <ul>
            {/* <li>
              <h2>{this.state.loggedInUser.username}</h2>
            </li> */}
            <li>
              <img className="logo-nav" src={Logo} alt="Qualitime Logo" />
            </li>
            <span className="logout">
              <a onClick={this.handleLogout}><i className="material-icons">exit_to_app</i></a>
          </span>
          </ul>

        </nav>
      );
    } else {
      return (
        <div>
          <nav className="navbar nav-style blue">
            <ul>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;
