import React, { Component } from "react";
import { Link } from "react-router-dom";


export default class Menu extends Component {
  render() {
    return (
      <div>
        <div>
          <nav className="menu-footer">
            <ul>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/tasks">Tasks</Link>
              </li>
              <li>
                <Link to="/stats">Stats</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
