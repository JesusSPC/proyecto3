import React, { Component } from "react";
import { Collapsible, CollapsibleItem } from "react-materialize";
import { Modal, Button } from "react-materialize";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import TaskEdit from "./TaskEdit.js";
import TaskService from "./TaskService.js";
import Timer from "../timer/Timer.js";
import Moment from "react-moment";

export default class SingleTask extends Component {
  constructor(props) {
    super(props);
    this.service = new TaskService();

    this.state = {
      minutes: "",
      seconds: "",
      millis: "",
      timeSpent: "00:00",
      timeLapsed: ""
    };
  }

  // saveTimer(time) {
  //   let id = this.props.task._id;
  //   let { minutes, seconds, millis } = time;
  //   let timeLapsed = `${minutes}:${seconds}`;
  //   this.service
  //     .updateTime(id, minutes, seconds, millis, timeLapsed)

  //     .then(task => {
  //       let minutes = task.updatedTime.minutes;
  //       let seconds = task.updatedTime.seconds;
  //       let timeLapsed = `${minutes}:${seconds}`;
  //       let timeSplited = timeLapsed.split(":");
  //       for (let i = 0; i < timeSplited.length; i++) {
  //         if (timeSplited[i].length === 1) {
  //           timeSplited[i] = "0" + timeSplited[i];
  //         }
  //       }
  //       let timeSpent = timeSplited.join(":");

  //       this.setState({
  //         ...this.state,
  //         minutes: minutes,
  //         seconds: seconds,
  //         millis: millis,
  //         timeSpent: timeSpent
  //       });
  //     });
  // }

  saveTimer(time) {
    let id = this.props.task._id;
    let { minutes, seconds, millis } = time;

    this.service.singleTask(id)
      .then(taskFound => {
      
        let min = minutes + taskFound.taskFound.minutes;
        let sec = seconds + taskFound.taskFound.seconds;
        let mill = millis + taskFound.taskFound.millis;
        sec = sec >= 60 ? (sec - 60) && (min += 1) : sec;
        mill = mill >= 10 ? (mill - 10) && (sec += 1) : mill;
    

        let timeLapsed = `${min}:${sec}`;
        let timeSplited = timeLapsed.split(":");
        for (let i = 0; i < timeSplited.length; i++) {
          if (timeSplited[i].length === 1) {
            timeSplited[i] = "0" + timeSplited[i];
          }
        }
        let timeSpent = timeSplited.join(":");
        console.log(timeSpent)


        this.service
        .updateTime(id, min, sec, mill, timeSpent)
        .then(updatedTime => {
        this.setState({
          ...this.state,
          minutes: minutes,
          seconds: seconds,
          millis: millis,
          timeSpent: timeSpent
        })});
      });
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".collapsible");
      var instances = M.Collapsible.init(elems, {});
    });
    
    this.service.retrieveTime(this.props.task._id).then(retrievedTime => {
      let { minutes, seconds, millis, timeLapsed } = retrievedTime.taskFound;
      let timeSplited = timeLapsed.split(":");
      for (let i = 0; i < timeSplited.length; i++) {
        if (timeSplited[i].length === 1) {
          timeSplited[i] = "0" + timeSplited[i];
        }
      }
      let timeSpent = timeSplited.join(":");
      this.setState({
        ...this.state,
        minutes: minutes,
        seconds: seconds,
        millis: millis,
        timeSpent: timeSpent
      });
    });
  }

  render() {
    return (
      <Collapsible>
        <CollapsibleItem
          header={this.props.task.name}
          icon={<i className="material-icons">more_vert</i>}
        >
          <div>
            <p>{this.props.task.bio}</p>
            <p>{this.props.task.time}:00</p>
            <p>
              Currently:
              {this.state.timeSpent === "00" ? "00:00" : this.state.timeSpent}
            </p>
          </div>
          <div>
            <Timer
              saveTimer={time => this.saveTimer(time)}
              time={this.state}
              task={this.props.task}
            ></Timer>
            <p>
              Created:{" "}
              <Moment format="YYYY/MM/DD">{this.props.task.created_at}</Moment>
            </p>
            <a href="#editTask" className="btn modal-trigger">
            <i className="material-icons">edit</i>
            </a>

            <Modal header="Change your project" id="editTask">
              <TaskEdit task={this.props.task} tasks={tasks => this.props.tasks(tasks)}></TaskEdit>
            </Modal>
            <Button onClick={() => this.props.deleteTask(this.props.task._id)}>
            <i className="material-icons large">delete</i>
            </Button>
          </div>
        </CollapsibleItem>
      </Collapsible>
    );
  }
}
