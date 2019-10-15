import React, { Component } from "react";
import TaskService from "./TaskService.js";

export default class TaskEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      name: "", 
      bio: "", 
      time: "", 
      frequency: ""
    };
    this.service = new TaskService();
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const id = this.props.task._id;
    const name = this.state.name;
    const bio = this.state.bio;
    const time = this.state.time;
    const frequency = this.state.frequency;

    if(name && bio && time){

    this.service.edit(id, name, bio, time, frequency)
    .then( response => {
        this.setState({
            name: name, 
            bio: bio,
            time: time,
            frequency: frequency
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
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    return (
      <form className="task-edit" onSubmit={this.handleFormSubmit}>
        <fieldset>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            // placeholder={this.props.task.name}
            onChange={e => this.handleChange(e)}
          />
        </fieldset>

        <fieldset>
          <label>Bio: </label>
          <input
            type="text"
            name="bio"
            value={this.state.bio}
            // placeholder={this.props.task.bio}
            onChange={e => this.handleChange(e)}
          />
        </fieldset>

        <fieldset>
          <label>Time: </label>
          <input
            type="number"
            name="time"
            value={this.state.time}
            // placeholder={this.props.task.time}
            onChange={e => this.handleChange(e)}
          />
        </fieldset>

        <fieldset>
          <label>Frequency: </label>
          <select onChange={e => this.handleChange(e)}>
            <option name="frequency" value={this.state.frequency}>Day</option>
            <option name="frequency" value={this.state.frequency}>Week</option>
            <option name="frecuency" value={this.state.frequency}>Month</option>
          </select>
        </fieldset>

        <input type="submit" value="Edit this project" />
      </form>
    );
  }
}
