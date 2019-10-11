import React, { Component } from 'react'
import TaskService from "./TaskService.jsx"
import TaskForm from "./TaskForm.jsx";
import Timer from "../timer/Timer.jsx";
import Timer2 from "../timer/Timer2.jsx";

export default class TaskEditor extends Component {
  constructor(props){
    super(props)
    this.service = new TaskService()
    this.state = {
      tasks: []
    }
  }

  componentDidMount(){
    this.service.all()
    .then(allTasks => {
      this.setState({
        ...this.state,
        tasks: allTasks.foundUser.tasksId
      
      })
    })
  }

  deleteTask(id) {
    this.service.delete(id)
    .then(tasksUpdated => {
      let tasksStateCopy = [...this.state.tasks]
      tasksStateCopy = tasksUpdated.tasks
      this.setState({
        ...this.state,
        tasks: tasksStateCopy
      })
    })
  }

  setTasks(tasks){
    this.setState({
      ...this.state,
      tasks: tasks
    })
  }

  render() {
    return (
      <div>
        <TaskForm tasks={(tasks) => this.setTasks(tasks)}></TaskForm>
         {this.state.tasks.map((task, idx) => {
          return <div className="task-box" key={idx}>
                <h3>{task.name}</h3>
                 <p>{task.bio}</p>
                 <p>{task.time}</p>
                 <p>{task.timeLapsed}</p>
                 <Timer2></Timer2>
                 <p>{Date.now()}</p>
                 <button>Timer</button>
                 <button onClick={() => this.deleteTask(task._id)}>Delete</button>
                 </div>
        })}
      </div>
    )
  }
}