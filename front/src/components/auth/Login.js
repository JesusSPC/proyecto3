// auth/Signup.js
import React, { Component } from "react";
import AuthService from "./AuthService.js";
import { Button } from "react-materialize";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    this.service
      .login(username, password)
      .then(response => {
        this.setState({
          username: username,
          password: password,
          error: false
        });

        this.props.getUser(response);
      })
      .catch(error => {
        this.setState({
          username: username,
          password: password,
          error: true
        });
      });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form className="task-form" onSubmit={this.handleFormSubmit}>
          <fieldset>
            <label>Username:</label>
            <div className="form-field valign-wrapper">
              <i class="material-icons prefix">account_circle</i>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={e => this.handleChange(e)}
              />
            </div>
          </fieldset>

          <fieldset>
            <label>Password:</label>
            <div className="form-field valign-wrapper">
              <i class="material-icons prefix">lock</i>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={e => this.handleChange(e)}
              />
            </div>
          </fieldset>
          <Button type="submit" value="Login">
          Sign In
          </Button>
        </form>

        <h1>{this.state.error ? "Invalid username or password." : ""}</h1>
      </div>
    );
  }
}

export default Login;
