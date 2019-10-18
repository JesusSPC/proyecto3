import React, { Component } from 'react'
import Graph from "../../images/HCBS-Job-Fit-Score-Group.png"

export default class TaskStats extends Component {
  render() {
    return (
      <div className="stats">
        <img src={Graph} alt="Graph Example"></img>
      </div>
    )
  }
}
