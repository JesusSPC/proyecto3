// auth/Signup.js
import React, { Component } from "react";
import AuthService from "./AuthService.js";
import { Button } from "react-materialize";

//signup y login son iguales a excepción de el html renderizado y el endpoint de nuestra API rest a la que llamamos
//uno llama a /signup y el otro a /login usando nuestro AuthService
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
    this.service = new AuthService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    //aquí llamamos al endpoint /signup de nuestra API Rest usando nuestro AuthService
    this.service
      .signup(username, password)
      .then(response => {
        this.setState({
          username: "",
          password: ""
        });
        //aquí elevamos el nuevo usuario una vez creado a App usando getUser via props
        //por tanto, informamos a App de que el nuevo usuario ha sido creado, provocando un re-render
        //y mostrando la parte de contenidos. Mira la función getUser de App para más info (date cuenta de que establece el state de App)
        this.props.getUser(response.user);
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

        <h1>
          {this.state.error ? "Please, use a valid username and password." : ""}
        </h1>
      </div>
    );
  }
}

export default Signup;
