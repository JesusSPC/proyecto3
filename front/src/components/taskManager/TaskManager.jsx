import React, { Component } from "react";
import Moment from "react-moment";

import TaskService from "./TaskService.jsx";
import TaskForm from "./TaskForm.jsx";
import Task from "./SingleTask.jsx";

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

  setTasks(tasks) {
    this.setState({
      ...this.state,
      tasks: tasks
    });
  }

  render() {
    return (
      <div>
        <TaskForm tasks={tasks => this.setTasks(tasks)}></TaskForm>
        {this.state.tasks.map((task, idx) => {
          return (
            <div className="task-box" key={idx}>
              <Task deleteTask={() => this.deleteTask(task._id)} task={task}></Task>
            </div>
          );
        })}
      </div>
    );
  }
}
