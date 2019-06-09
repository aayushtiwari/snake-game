import React, { Component } from "react";
import Snake from "./Components/Snake";
import Food from "./Components/Food";
import "./App.css";
const getCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
};
const initialState = {
  food: getCoordinates(),
  speed: 100,
  direction: "RIGHT",
  snakeParts: [[0, 0], [2, 0]],
  hscore:null
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  componentDidMount() {
    setInterval(this.move, this.state.speed);
    document.onkeydown = this.onkeydown;
  }
  componentDidUpdate() {
    this.checkIfOut();
    this.eatYourself();
    this.eat();
  }
  eat() {
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    let food = this.state.food;
    if (head[0] == food[0] && head[1] == food[1]) {
      this.setState({
        food: getCoordinates()
      });
      this.big();
      this.speed();
    }
  }
  big() {
    let snake = [...this.state.snakeParts];
    snake.unshift([]);
    this.setState({
      snakeParts: snake
    });
  }
  speed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10
      });
    }
  }
  eatYourself() {
    let snake = [...this.state.snakeParts];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] == dot[0] && head[1] == dot[1]) {
        this.gameOver();
      }
    });
  }
  onkeydown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
      default:
        break;
    }
  };
  move = () => {
    let dots = [...this.state.snakeParts];
    let head = dots[dots.length - 1];
    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({ snakeParts: dots });
  };
  checkIfOut() {
    let head = this.state.snakeParts[this.state.snakeParts.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.gameOver();
    }
  }
  gameOver() {
    alert(`Game Over score: ${this.state.snakeParts.length-2}`);
    this.setState({
            food: getCoordinates(),
            speed: 100,
            direction: "RIGHT",
            snakeParts: [[0, 0], [2, 0]],
            hscore:this.state.snakeParts.length>this.state.hscore?this.state.snakeParts.length:this.state.hscore
    });
  }
  render() {
    return (
      <div className="container">
        <div className="head">
          <h1>Snake Game</h1>
        </div>
        <div class="gamec">
          <div className="game_ar">
            <Snake snakeParts={this.state.snakeParts} />
            <Food point={this.state.food} />
          </div>
        </div>
        <div className="result">
          <h1>Score</h1>
          <p>My score : {this.state.snakeParts.length-2}</p>
          <p>Top Score : {this.state.hscore?this.state.hscore-2:0}</p>
        </div>
      </div>
    );
  }
}

export default App;
