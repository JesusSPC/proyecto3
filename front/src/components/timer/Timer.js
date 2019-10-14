import React, { Component } from "react";
import TaskService from "../taskManager/TaskService.js";

import Moment from "react-moment";
import "moment-timezone";

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.service = new TaskService();

    //: getInitialState() method
    this.state = {
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
      minutes: 0,
      seconds: 0,
      millis: 0,  
      running: false });
    }
  }

  _handleResetClick(event) {
    this._handleStopClick();
    this.update(0, 0, 0);
  }

  tick() {
    let millis = this.state.millis + 1;
    let seconds = this.state.seconds;
    let minutes = this.state.minutes;

    if (millis === 10) {
      millis = 0;
      seconds = seconds + 1;
    }

    if (seconds === 60) {
      millis = 0;
      seconds = 0;
      minutes = minutes + 1;
    }

    this.update(millis, seconds, minutes);
  }

  zeroPad(value) {
    return value < 10 ? `0${value}` : value;
  }

  update(millis, seconds, minutes) {
    this.setState({
      millis: millis,
      seconds: seconds,
      minutes: minutes
    });
  }

  componentDidMount() {
    this.service.retrieveTime(this.props.task._id)
    .then(retrievedTime => {
      console.log(retrievedTime)
      let { minutes, seconds, millis } = retrievedTime.taskFound;
      this.setState({
      ...this.state,
      minutes: minutes,
      seconds: seconds,
      millis: millis
          });
  })
}

  componentWillUnMount() {
    //TODO
  }

  render() {
    let run = this.state.running === true;
    return (
      <div className="app">
        <header className="header">
          <div className="title">{this.props.ver}</div>
        </header>
        <main className="main">
          <div className="display">
            <div className="state">{run ? "Running" : "Stop"}</div>
            <div className="segments">
              <span className="mins">{this.zeroPad(this.state.minutes)}:</span>
              <span className="secs">{this.zeroPad(this.state.seconds)} </span>
              {/* <span className="millis">.0{this.state.millis}</span> */}
            </div>
          </div>

          <div className="actions">
            <button
              className={"btn start " + (run ? "disabled" : "")}
              onClick={() => this._handleStartClick()}
            >
              Start
            </button>

            <button
              className={"btn stop " + (false == run ? "disabled" : "")}
              onClick={() => this._handleStopClick()}
            >
              Stop
            </button>

            {/* <button
              className={
                "btn reset " +
                (this.state.seconds > 0 && false == run ? "" : "disabled")
              }
              onClick={() => this._handleResetClick()}
            >
              Reset
            </button> */}
          </div>
        </main>
      </div>
    );
  }
}
