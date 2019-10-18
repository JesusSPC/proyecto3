import React, { Component } from "react";
import TaskService from "./TaskService.js";
import { Button } from "react-materialize";
import M from "materialize-css/dist/js/materialize.min.js";
import {withRouter} from 'react-router-dom'

 class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: "",
      hoursObj: "",
      minutesObj: "",
      frequency: ""
    };
    this.service = new TaskService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const name = this.state.name;
    const bio = this.state.bio;
    const frequency = this.state.frequency || "Day";
    const hoursObj = this.state.hoursObj || "";
    const minutesObj = this.state.minutesObj || "";

    if (name && bio && (hoursObj || minutesObj)) {
      this.service
        .addTask(name, bio, frequency, hoursObj, minutesObj)
        .then(response => {
          this.props.tasks(response.tasks)
          this.setState({
            name: "",
            bio: "",
            frequency: "",
            hoursObj: "",
            minutesObj: ""
          });
          
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
          <label>Title: </label>
          <div className="form-field valign-wrapper">
            <i class="material-icons prefix">fiber_new</i>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Your activity..."
              onChange={e => this.handleChange(e)}
            />
          </div>
        </fieldset>

        <fieldset>
          <label>Bio: </label>
          <div className="form-field valign-wrapper">
            <i class="material-icons prefix">notes</i>
            <input
              type="text"
              name="bio"
              value={this.state.bio}
              onChange={e => this.handleChange(e)}
            />
          </div>
        </fieldset>

        <fieldset>
          <label>Hours: </label>
          <div className="form-field valign-wrapper">
            <i class="material-icons prefix">access_time</i>
            <input
              type="number"
              name="hoursObj"
              value={this.state.hoursObj}
              onChange={e => this.handleChange(e)}
            />
          </div>
        </fieldset>
        <fieldset>
          <label>Minutes: </label>
          <div className="form-field valign-wrapper">
            <i class="material-icons prefix">access_time</i>
            <input
              type="number"
              name="minutesObj"
              value={this.state.minutesObj}
              onChange={e => this.handleChange(e)}
            />
          </div>
        </fieldset>

        <label>Select your plan: </label>
        <div className="form-field select-box valign-wrapper">
          <i class="material-icons prefix">calendar_today</i>
          <select
            name="frequency"
            className="browser-default"
            onChange={e => this.handleChange(e)}
          >
            <option value="" disabled selected>
              Choose your option
            </option>
            <option value="Day">Day</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
          </select>
        </div>
        <Button type="submit" value="Add Task">
          Add Task
        </Button>
      </form>
    );
  }
}
export default withRouter(TaskForm)