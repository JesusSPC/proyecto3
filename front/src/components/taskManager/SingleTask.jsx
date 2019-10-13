import React, { Component } from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import TaskService from "./TaskService.jsx";
import Timer from "../timer/Timer.jsx";
import Moment from "react-moment";

export default class SingleTask extends Component {
  constructor(props) {
    super(props);
    this.service = new TaskService();

    this.state = {
      timeLapsed: "",
      minutes: "",
      seconds: "",
      millis: ""
    };
  }

  saveTimer(time) {
    let id = this.props.task._id
    let {minutes, seconds, millis} = time
    this.service.updateTime(id, minutes, seconds, millis)
    .then(timeUpdated => {
      this.setState({
        ...this.state,
        minutes: minutes,
        seconds: seconds,
        millis: millis
      })
    })
  }

  render() {
    return (
      <Collapsible>
        <CollapsibleItem
          header={this.props.task.name}
          // icon={<Icon />}
          // iconClassName={"material-icons"}
        >
          <div>
            <p>{this.props.task.bio}</p>
            <p>{this.props.task.time}</p>
            <p>{this.props.task.timeLapsed}</p>
          </div>
          <div>
            <Timer
              saveTimer={time => this.saveTimer(time)}
              time={this.state}
            ></Timer>
            <p>
              Created:{" "}
              <Moment format="YYYY/MM/DD">{this.props.task.created_at}</Moment>
            </p>
            <button onClick={() => this.props.deleteTask(this.props.task._id)}>
              Delete
            </button>
          </div>
        </CollapsibleItem>
      </Collapsible>
    );
  }
}
