import React, { Component } from "react";
import Collapsible from "react-collapsible";
import { Modal, Button } from "react-materialize";

import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";

import Collapsiblebox from "./Collapsiblebox.js";
import TaskEdit from "./TaskEdit.js";
import TaskService from "./TaskService.js";
import Timer from "../timer/Timer.js";
import Moment from "react-moment";

export default class SingleTask extends Component {
  constructor(props) {
    super(props);
    this.service = new TaskService();
    this.today = new Date();

    this.state = {
      hours: "",
      minutes: "",
      seconds: "",
      millis: "",
      timeSpent: this.props.timeLapsed,
      timeLapsed: "",
      overTime: "",
      todayNow: this.today,
      completed: ""
    };
  }

  saveTimer(time) {
    let id = this.props.task._id;
    let { hours, minutes, seconds, millis } = time;

    this.service.singleTask(id).then(taskFound => {
      let hrs = hours + taskFound.taskFound.hours;
      let min = minutes + taskFound.taskFound.minutes;
      let sec = seconds + taskFound.taskFound.seconds;
      let mill = millis + taskFound.taskFound.millis;
      min = min >= 60 ? min - 60 && (hrs += 1) : min;
      sec = sec >= 60 ? sec - 60 && (min += 1) : sec;
      mill = mill >= 10 ? mill - 10 && (sec += 1) : mill;

      let timeLapsed = `${hrs}:${min}:${sec}`;
      let timeSplited = timeLapsed.split(":");
      for (let i = 0; i < timeSplited.length; i++) {
        if (timeSplited[i].length === 1) {
          timeSplited[i] = "0" + timeSplited[i];
        }
      }

      let timeSpent = timeSplited.join(":");

      let overTime = "";

      let h = hrs - taskFound.taskFound.hoursObj;
      let m = min - taskFound.taskFound.minutesObj;

      if (taskFound.taskFound.hoursObj <= hrs) {
        // let h = hrs - taskFound.taskFound.hoursObj;
        // let m = min - taskFound.taskFound.minutesObj;
        let hour = h < 10 ? `0${h}` : h;
        let minit = m < 10 ? `0${m}` : m;
        if (taskFound.taskFound.minutesObj <= min) {
          overTime = `${hour}:${minit}`;
        } else {
          overTime = `${hour - 1}:${minit + 60}`;
        }
      }

      console.log(h, m)

      console.log(overTime)

      taskFound.taskFound.hoursObj <= hrs &&
      taskFound.taskFound.minutesObj <= min
        ? this.service
            .updateTime(id, 0, 0, 0, 0, "00:00:00", true, overTime)
            .then(updatedTime => {
              this.setState({
                ...this.state,
                hours: hrs,
                minutes: min,
                seconds: sec,
                millis: mill,
                timeSpent: "00:00:00",
                overTime: overTime,
                completed: true
              });
            })
        : this.service
            .updateTime(id, hrs, min, sec, mill, timeSpent, false, overTime)
            .then(updatedTime => {
              this.setState({
                ...this.state,
                hours: hrs,
                minutes: min,
                seconds: sec,
                millis: mill,
                timeSpent: timeSpent,
                overTime: "",
                completed: false
              });
            });
    });
  }

  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
      var elems = document.querySelectorAll(".collapsible");
      var instances = M.Collapsible.init(elems, {});
    });

    this.service.retrieveTime(this.props.task._id).then(retrievedTime => {
      let {
        hours,
        minutes,
        seconds,
        millis,
        timeLapsed,
        finished
      } = retrievedTime.taskFound;
      let timeSplited = timeLapsed.split(":");
      for (let i = 0; i < timeSplited.length; i++) {
        if (timeSplited[i].length === 1) {
          timeSplited[i] = "0" + timeSplited[i];
        }
      }
      let timeSpent = timeSplited.join(":");
      this.setState({
        ...this.state,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        millis: millis,
        timeSpent: timeSpent,
        completed: finished
      });
    });
  }

  render() {
    return (
      <Collapsible
        classParentString="classParentString"
        openedClassName="openedCollapsible"
        className="closedCollapsible"
        trigger={<Collapsiblebox task={this.props.task} />}
      >
        <div className="task-desc">
          {/* <p>{this.state.completed ? "Completed" : null}</p> */}
          <div className="bio">
            <p>{this.props.task.bio}</p>
          </div>
          <p>
            Goal: {this.props.task.hoursObj ? this.props.task.hoursObj : "00"}:
            {this.props.task.minutesObj
              ? this.props.task.minutesObj < 10
                ? `0${this.props.task.minutesObj}`
                : this.props.task.minutesObj
              : "00"}
            :00
          </p>
          <p>
            Currently:{" "}
            {this.state.timeSpent === "00" ? "00:00:00" : this.state.timeSpent}
          </p>
        </div>
        <div className="time-clock">
          <Timer
            className="timer"
            saveTimer={time => this.saveTimer(time)}
            time={this.state}
            task={this.props.task}
          ></Timer>
          <p className="created">
            Created:{" "}
            <Moment format="YYYY/MM/DD">{this.props.task.created_at}</Moment>
          </p>

          <a href="#editTask" className="btn modal-trigger">
            <i className="material-icons">edit</i>
          </a>

          <Modal
            key={this.props.key}
            header="Change your activity"
            id="editTask"
          >
            <TaskEdit
              task={this.props.task}
              tasks={tasks => this.props.tasks(tasks)}
            ></TaskEdit>
          </Modal>
          <Button
            className="red"
            onClick={() => this.props.deleteTask(this.props.task._id)}
          >
            <i className="material-icons large">delete</i>
          </Button>
        </div>
      </Collapsible>
    );
  }
}
