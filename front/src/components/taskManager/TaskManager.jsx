import React, { Component } from "react";
import TaskService from "./TaskService.jsx";
import TaskForm from "./TaskForm.jsx";
import Timer from "../timer/Timer.jsx";
import Timer2 from "../timer/Timer2.jsx";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";

export default class TaskEditor extends Component {
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
              <Collapsible>
                <CollapsibleItem header={task.name} icon={<Icon />}>
                  <div>
                  <p>{task.bio}</p>
                  <p>{task.time}</p>
                  <p>{task.timeLapsed}</p>
                  </div>
                  <div>
                  <Timer2></Timer2>
                  <p>Created at: {task.created_at}</p>
                  <button onClick={() => this.deleteTask(task._id)}>
                    Delete
                  </button>
                  </div>
                </CollapsibleItem>
              </Collapsible>
            </div>
          );
        })}
      </div>
    );
  }
}
