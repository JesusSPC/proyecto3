import React, { Component } from "react";
import TaskService from "./TaskService.jsx";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", bio: "", time: "", frequency: "" };
    this.service = new TaskService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const bio = this.state.bio;
    const time = this.state.time;
    const frequency = this.state.frequency;

    this.service.addTask(name, bio, time, frequency)
    .then( response => {
        this.setState({
            name: "", 
            bio: "",
            time: "",
            frequency: ""
        });
        this.props.tasks(response.tasks)
    })
    .catch(error => {
      this.setState({
        name: name,
        bio: bio,
        time: time,
        frequency: frequency,
        error: true
      });
    })
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
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
          <label>Time: </label>
          <input
            type="number"
            name="time"
            value={this.state.time}
            onChange={e => this.handleChange(e)}
          />
        </fieldset>

        {/* <fieldset>
          <label>Frequency: </label>
          <select onChange={e => this.handleChange(e)}>
            <option name="frequency" value={this.state.frequency}>Day</option>
            <option name="frequency" value={this.state.frequency}>Week</option>
            <option name="frecuency" value={this.state.frequency}>Month</option>
          </select>
        </fieldset> */}

        <input type="submit" value="Sign up" />
      </form>
    );
  }
}
