import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
      <nav className="menu-footer blue">
        <ul>
          <li>
            <Link to="/news">
            <i className="material-icons">new_releases</i>
            </Link>
          </li>
          <li>
            <Link to="/task-manager">
              <i className="material-icons">alarm_on</i>
            </Link>
          </li>
          <li>
            <Link to="/stats">
            <i className="material-icons">assessment</i>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}
