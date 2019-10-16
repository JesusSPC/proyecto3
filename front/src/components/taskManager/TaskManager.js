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
      tasks: []
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
    let clonedTasks = [...this.state.tasks]
    let sortedTasks = clonedTasks.sort((a, b) => a.time < b.time ? 1 : -1)
    this.setTasks(sortedTasks);
  }

  sortByName(e) {
    e.preventDefault();
    let clonedTasks = [...this.state.tasks]
    let sortedTasks = clonedTasks.sort((a, b) => a.name < b.name ? 1 : -1)
    this.setTasks(sortedTasks);
  }

  setTasks(tasks) {
    this.setState({
      ...this.state,
      tasks: tasks
    });
  }

  render() {
    return (
      <div>
        <div>
        <a href="#newTask" className="btn modal-trigger">+New Project</a>
        <Modal header="What you wanna do?" id="newTask">
        <TaskForm tasks={tasks => this.setTasks(tasks)}></TaskForm>
        </Modal>
        </div>
        <div>
        <Button onClick={(e) => this.sortByName(e)}>By name</Button>
        <Button onClick={(e) => this.sortByTime(e)}>By time</Button>
        </div>
        {this.state.tasks.map((task, idx) => {
          return (
            <div className="task-box" key={idx}>
              <Task
                tasks={tasks => this.setTasks(tasks)}
                deleteTask={() => this.deleteTask(task._id)}
                task={task}
              ></Task>
            </div>
          );
        })}
      </div>
    );
  }
}