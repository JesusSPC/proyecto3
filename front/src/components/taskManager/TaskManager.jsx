import React, { Component } from 'react'
import { Switch, Route, Redirect } from "react-router-dom";
import TaskService from "./TaskService.jsx"
import TaskEditor from "./TaskEditor.jsx"
import TaskStats from "./TaskStats.jsx"
import TaskNews from "./TaskNews.jsx"


export default class TaskManager extends Component {
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

  render() {
    return (
      <div>
        <Switch>
                <Route exact path="/task-manager" render={() => <TaskEditor getUser={this.getUser} />} />
                <Route exact path="/stats" render={() => <TaskStats getUser={this.getUser} />} />
                <Route exact path="/news" render={() => <TaskNews getUser={this.getUser} />} />

        </Switch>
        {/* {this.state.tasks.map((task, idx) => {
          return <div>
            
                <h3>{task.name}</h3>
                 <p>{task.bio}</p>
                 <button onClick={() => this.service.delete(task._id)}></button>
                 </div>
        })} */}
      </div>
    )
  }
}
