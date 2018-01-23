import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

class Square extends Component {
    // React components can have state which should be considered private to the component
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {
        return (
            <button className="square" onClick={() => this.setState({value: 'X'})}>
            {this.state.value}
            </button>
        );
    }
}

class Board extends Component {
    renderSquare(i) {
        return <Square value={i} />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                </div>
                <div className="board-row">
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
                </div>
                <div className="board-row">
                {this.renderSquare(6)}
                {this.renderSquare(7)}
                {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game  extends Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                <Board />
                </div>
                <div className="game-info">
                    <div>{}</div>
                    <ol>{}</ol>
                </div>
            </div>
        );
    }
}

export default Game;
