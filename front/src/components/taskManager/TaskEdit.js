import React, { Component } from "react";
import TaskService from "./TaskService.js";
import { Button } from "react-materialize";

export default class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      bio: "",
      frequency: "",
      hoursObj: "",
      minutesObj: ""
    };
    this.service = new TaskService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const id = this.props.task._id;
    const name = this.state.name;
    const bio = this.state.bio;
    const frequency = this.state.frequency;
    const hoursObj = this.state.hoursObj || "";
    const minutesObj = this.state.minutesObj || "";

    if (name && bio && (hoursObj || minutesObj)) {
      this.service
        .edit(id, name, bio, frequency, hoursObj, minutesObj)
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

  // componentDidMount(){
  //   let clonedState = {...this.props.task}
  //   this.setState(clonedState)
  // }

  render() {
    console.log(this.state.name)
    return (
      <form className="task-form" onSubmit={this.handleFormSubmit}>
        <fieldset>
          <label>Name: </label>
          <div className="form-field valign-wrapper">
            <i class="material-icons prefix">fiber_new</i>
            <input
              type="text"
              name="name"
              value={this.state.name}
              placeholder={this.state.name}
              maxlength="24"
              onChange={e => this.handleChange(e)}
            />
          </div>
        </fieldset>

        <fieldset>
          <label>Description: </label>
          <div className="form-field valign-wrapper">
            <i class="material-icons prefix">notes</i>
            <input
              type="text"
              name="bio"
              value={this.state.bio}
              maxlength="30"
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
              min="0"
              max="1000"
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
              min="0"
              max="59"
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
        <Button type="submit" value="Edit Task">
          Edit Task
        </Button>
      </form>
    );
  }
}
