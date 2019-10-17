import React, { Component } from 'react'

export default class Collapsiblebox extends Component {
  render() {
    return (
      <div className="collapseBox">
        {this.props.task.name}
        <i className="material-icons right">more_vert</i>
      </div>
    )
  }
}