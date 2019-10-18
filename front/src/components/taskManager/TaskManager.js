import React, { Component } from "react";
import { Modal, Button } from "react-materialize";

import TaskService from "./TaskService.js";
import TaskForm from "./TaskForm.js";
import Task from "./SingleTask.js";

export default class TaskManager extends Component {
  constructor(props) {
    super(props);
    this.service = new TaskService();
    this.state = {
      tasks: [],
      sortedByName: false,
      sortedByTime: false,
      sortedByDate: false
    };
  }

  componentDidMount() {
    this.service.all().then(allTasks => {
      this.setState({
        ...this.state,
        tasks: allTasks.foundUser.tasksId
      });
    });
  }

  deleteTask(id) {
    this.service.delete(id).then(tasksUpdated => {
      let tasksStateCopy = [...this.state.tasks];
      tasksStateCopy = tasksUpdated.tasks;
      this.setState({
        ...this.state,
        tasks: tasksStateCopy
      });
    });
  }

  sortByTime(e) {
    e.preventDefault();
    let order;
    let clonedTasks = [...this.state.tasks];
    let sortedByTime = clonedTasks.sort((a, b) => {
      if (this.state.sortedByTime === true) {
        order = false;
        return a.time > b.time ? 1 : -1;
      } else {
        order = true;
        return a.time < b.time ? 1 : -1;
      }
    });
    this.setState({
      ...this.state,
      tasks: sortedByTime,
      sortedByTime: order
    });
  }

  sortByName(e) {
    e.preventDefault();
    let order;
    let clonedTasks = [...this.state.tasks];
    let sortedByName = clonedTasks.sort((a, b) => {
      if (this.state.sortedByName === true) {
        order = false;
        return a.name > b.name ? 1 : -1;
      } else {
        order = true;
        return a.name < b.name ? 1 : -1;
      }
    });
    this.setState({
      ...this.state,
      tasks: sortedByName,
      sortedByName: order
    });
  }

  sortByDate(e) {
    e.preventDefault();
    let order;
    let clonedTasks = [...this.state.tasks];
    let sortedByDate = clonedTasks.sort((a, b) => {
      if (this.state.sortedByDate === true) {
        order = false;
        return a.name > b.name ? 1 : -1;
      } else {
        order = true;
        return a.name < b.name ? 1 : -1;
      }
    });
    this.setState({
      ...this.state,
      tasks: sortedByDate,
      sortedByDate: order
    });
  }

  setTasks(tasks) {
    this.setState({
      tasks
    });
  }

  render() {
    return (
      <div>
        <div className="task-new">
          <a href="#newTask" className="btn orange modal-trigger">
            +New Project
          </a>
          <Modal header="New activity" id="newTask">
            <TaskForm tasks={tasks => this.setTasks(tasks)}></TaskForm>
          </Modal>
        </div>
        <div className="sorts">
          <Button onClick={e => this.sortByDate(e)}>By date</Button>
          <Button onClick={e => this.sortByName(e)}>By name</Button>
          <Button onClick={e => this.sortByTime(e)}>By time</Button>
        </div>
        {this.state.tasks.map((task, idx) => {
          return (
            <div className="task-box"
             key={task._id}
             >
              <Task
                tasks={tasks => this.setTasks(tasks)}
                deleteTask={() => this.deleteTask(task._id)}
                task={task}
                key={task._id}
              ></Task>
            </div>
          );
        })}
      </div>
    );
  }
}
