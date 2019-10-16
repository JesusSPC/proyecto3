import React, { Component } from "react";
import TaskService from "./TaskService.js";
import M from "materialize-css/dist/js/materialize.min.js";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", bio: "", hoursObj: "", minutesObj: "", frequency: "" };
    this.service = new TaskService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const name = this.state.name;
    const bio = this.state.bio;
    const frequency = this.state.frequency || "Day";
    const hoursObj = this.state.hoursObj;
    const minutesObj = this.state.minutesObj;

    if (name && bio && (hoursObj || minutesObj)) {
      this.service
        .addTask(name, bio, frequency, hoursObj, minutesObj)
        .then(response => {
          this.setState({
            name: "",
            bio: "",
            frequency: "",
            hoursObj: "",
            minutesObj: ""
          });
          this.props.tasks(response.tasks);
        })
        .catch(error => {
          this.setState({
            name: name,
            bio: bio,
            frequency: frequency,
            hoursObj: hoursObj,
            minutesObj: minutesObj,
            error: true
          });
        });
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll("select");
      var instances = M.FormSelect.init(elems, {});
    });
  }

  render() {
    return (
      <form className="task-form" onSubmit={this.handleFormSubmit}>
        <fieldset>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Your activity..."
            onChange={e => this.handleChange(e)}
          />
        </fieldset>

        <fieldset>
          <label>Bio: </label>
          <input
            type="text"
            name="bio"
            value={this.state.bio}
            onChange={e => this.handleChange(e)}
          />
        </fieldset>

        <fieldset>
          <label>Hours: </label>
          <input
            type="number"
            name="hoursObj"
            value={this.state.hoursObj}
            onChange={e => this.handleChange(e)}
          />
        </fieldset>
        <fieldset>
          <label>Minutes: </label>
          <input
            type="number"
            name="minutesObj"
            value={this.state.minutesObj}
            onChange={e => this.handleChange(e)}
          />
        </fieldset>
        <label>Select your plan: </label>
        <select name="frequency" className="browser-default" onChange={e => this.handleChange(e)}>
          <option value="" disabled selected>
            Choose your option
          </option>
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>

        <input type="submit" value="New Project" />
      </form>
    );
  }
}
