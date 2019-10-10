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
      console.log(allTasks)
      this.setState({
        ...this.state,
        tasks: allTasks.foundUser.tasksId
      
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
          return <div>
                key={idx}
                <h3>{task.name}</h3>
                 <p>{task.bio}</p>
                 <button onClick={() => this.service.delete(task._id)}></button>
                 </div>
        })}
      </div>
    )
  }
}