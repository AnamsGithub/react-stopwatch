import React, { Component } from "react";

class StopWatch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stopwatch: 0,
      hours: 0,
      min: 0,
      sec: 0,
      milisec: 0,
      btn: "Start",
    };
  }
  watchInterval;
  laps = [];

  timeFormat = () => {
    this.state.milisec = Number(this.state.stopwatch.toString().slice(-2));
    this.state.stopwatch = Number(
      this.state.stopwatch.toString().slice(0, -2) + "00"
    );

    this.state.sec = Number(this.state.stopwatch.toString().slice(-4, -2));
    this.state.stopwatch = Number(
      this.state.stopwatch.toString().slice(0, -4) + "0000"
    );

    this.state.min = this.state.stopwatch / (100 * 60);
    this.state.stopwatch = Number(
      this.state.stopwatch.toString().slice(0, -6) + "000000"
    );

    this.state.hours = this.state.stopwatch / (100 * 60 * 60);

    // let time_Str = `${hours}:${minutes}:${seconds}:${miliSec}`;
    // return time_Str;
  };

  startStopwatch = () => {
    this.watchInterval = setInterval(() => {
      this.setState({
        stopwatch: this.state.stopwatch + 1,
      });
      this.timeFormat();
    }, 10);
    this.setState({
      btn: "Stop",
    });
  };

  stopStopwatch = () => {
    clearInterval(this.watchInterval);
    this.setState({
      btn: "Start",
    });
  };

  resetStopwatch = () => {
    clearInterval(this.watchInterval);
    this.laps = [];
    this.setState({
      stopwatch: 0,
      hours: 0,
      min: 0,
      sec: 0,
      milisec: 0,
      btn: "Start",
    });
  };

  lapStopwatch = () => {
    if (this.state.btn === "Stop") {
      const lap = `${this.state.hours}:${this.state.min}:${this.state.sec}:${this.state.milisec}`;

      this.laps.push(<li key={this.laps.length}>{lap}</li>);
    }
  };

  render() {
    return (
      <>
        <div>
          {this.state.hours}:{this.state.min}:{this.state.sec}:
          {this.state.milisec}
        </div>
        <div>
          {this.state.btn === "Start" ? (
            <button onClick={this.startStopwatch}>Start</button>
          ) : (
            <button onClick={this.stopStopwatch}>Stop</button>
          )}

          <button onClick={this.resetStopwatch}>Reset</button>
          <button onClick={this.lapStopwatch}>Lap</button>
        </div>
        <div>{this.laps}</div>
      </>
    );
  }
}

export default StopWatch;
