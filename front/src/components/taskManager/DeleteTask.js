import React, { Component } from 'react'
import { Button } from "react-materialize";

export default class DeleteTask extends Component {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.deleteTask(this.props.task._id)}>
          YES
        </Button>
      </div>
    )
  }
}
