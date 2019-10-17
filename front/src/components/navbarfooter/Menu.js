import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Menu extends Component {
  render() {
    return (
          <nav className="menu-footer blue">
            <ul>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/task-manager">Tasks</Link>
              </li>
              <li>
                <Link to="/stats">Stats</Link>
              </li>
            </ul>
          </nav>
    );
  }
}
