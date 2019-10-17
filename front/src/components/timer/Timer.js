import React, { Component } from "react";
import TaskService from "../taskManager/TaskService.js";

import "moment-timezone";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.service = new TaskService();

    //: getInitialState() method
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      millis: 0,
      running: false
    };
  }

  _handleStartClick(event) {
    if (!this.state.running) {
      this.interval = setInterval(() => {
        this.tick();
      }, 100);

      this.setState({ running: true });
    }
  }

  _handleStopClick(event) {
    if (this.state.running) {
      let clonedState = { ...this.state };
      this.props.saveTimer(clonedState);

      clearInterval(this.interval);
      this.setState({
        ...this.state,
        hours: 0,
        minutes: 0,
        seconds: 0,
        millis: 0,
        running: false
      });
    }
  }

  // _handleResetClick(event) {
  //   this._handleStopClick();
  //   this.update(0, 0, 0, 0);
  // }

  tick() {
    let millis = this.state.millis + 1;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;
    let hours = this.state.hours;

    if (millis === 10) {
      millis = 0;
      seconds = seconds + 1;
    }

    if (seconds === 60) {
      millis = 0;
      seconds = 0;
      minutes = minutes + 1;
    }

    if (minutes === 60) {
      millis = 0;
      seconds = 0;
      minutes = 0;
      hours = hours + 1;
    }

    this.update(millis, seconds, minutes, hours);
  }

  zeroPad(value) {
    return value < 10 ? `0${value}` : value;
  }

  update(millis, seconds, minutes, hours) {
    this.setState({
      millis: millis,
      seconds: seconds,
      minutes: minutes,
      hours: hours
    });
  }

  componentDidMount() {
    // this.service.retrieveTime(this.props.task._id).then(retrievedTime => {
    //   let { hours, minutes, seconds, millis } = retrievedTime.taskFound;
      this.setState({
        ...this.state,
        hours: 0,
        minutes: 0,
        seconds: 0,
        millis: 0
    });
  }
  

  componentWillUnMount() {
    //TODO
  }

  render() {
    let run = this.state.running === true;
    if (this.props.time.completed) {
      return (
        <div className="app">
          <main className="main">
            <div className="display">
              <div className="segments">
                COMPLETED
                <i class="material-icons">mood</i>
                {/* <p>{this.props.time.overTime ? this.props.time.overTime : ""}</p> */}
              </div>
            </div>
          </main>
        </div>
      );
    } else {
      return (
        <div className="app">
          <header className="header">
            <div className="title">{this.props.ver}</div>
          </header>
          <main className="main">
            <div className="display">
              <div className="state">{run ? "Running" : "Stop"}</div>
              <div className="segments">
              <span className="mins">
                  {this.zeroPad(this.state.hours)}:
                </span>
                <span className="mins">
                  {this.zeroPad(this.state.minutes)}:
                </span>
                <span className="secs">
                  {this.zeroPad(this.state.seconds)}{" "}
                </span>
              </div>
            </div>
            <div className="actions">
              <button
                className={"btn stop " + (false == run ? "disabled" : "")}
                onClick={() => this._handleStopClick()}
              >
                <i className="material-icons">stop</i>
              </button>

              <button
                className={"btn start " + (run ? "disabled" : "")}
                onClick={() => this._handleStartClick()}
              >
                <i className="material-icons">play_arrow</i>
              </button>
            </div>
          </main>
        </div>
      );
    }
  }
}
