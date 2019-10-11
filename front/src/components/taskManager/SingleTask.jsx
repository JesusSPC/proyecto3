import React, { Component } from "react";
import { Collapsible, CollapsibleItem, Icon } from "react-materialize";
import TaskService from "./TaskService.jsx";
import Timer2 from "../timer/Timer2.jsx";
import Moment from "react-moment";

export default class SingleTask extends Component {
  constructor(props) {
    super(props);
    this.service = new TaskService();

    this.state = {
      timeLapsed: ""
    }
  }


  render() {
    return (
      <Collapsible>
        <CollapsibleItem header={this.props.task.name} icon={<Icon />} iconClassName={"material-icons"}>
          <div>
            <p>{this.props.task.bio}</p>
            <p>{this.props.task.time}</p>
            <p>{this.props.task.timeLapsed}</p>
          </div>
          <div>
            <Timer2></Timer2>
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
