import React, { Component } from 'react'
import TaskService from "./TaskService.jsx"
import TaskForm from "./TaskForm.jsx";

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
          return <div key={idx}>
                
                <h3>{task.name}</h3>
                 <p>{task.bio}</p>
                 <p>{task.time}</p>
                 <p>{task.timeLapsed}</p>
                 <button onClick={() => this.deleteTask(task._id)}>Delete</button>
                 </div>
        })}
      </div>
    )
  }
}