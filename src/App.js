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

/* class Square extends Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()}>
            {this.props.value}
            </button>
        );
    }
} */

//Many components will be able to be written as functional componenets
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
        {props.value}
        </button>
    );
}

class Board extends Component {

    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        const obj = [];
        for(let i = 0; i < 3; i++) {
            let squareRows = [];
            for(let j = 0; j < 3; j++) {
                squareRows.push(this.renderSquare(3 * i + j));
            }
            obj.push(<div className="board-row">{squareRows}</div>);
        }
        return (
            <div>{obj}</div>
        );
    }
}

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    last: -1,
                }
            ],
            stepNumber: 0,
            xIsNext:true,
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        console.log(`i: ${i}`);
        this.setState({
            history: history.concat([{
                squares: squares,
                last: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            console.log(`Move: ${move}\nStep Number: ${this.state.stepNumber}`);

            const desc = move ? 'Go to move #' + move :
            'Go to game start';
            const currMove = history[move];
            let row = Math.floor(currMove.last / 3);
            let col = Math.floor(currMove.last % 3);
            let moveLocation = move ? `(${row}, ${col})` : '';
            let num = (move+1) / (this.state.stepNumber+1);
            let classname = (num === 1) ? 'triangle-right' : '';
            return (
                // If key is not mentioned, it will give a warning. Its recommended to assign proper keys whenever building dynamic lists.
                <li className="move-list-item" key={move}>
                <div className={classname}></div>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
                <div>{moveLocation}</div>
                </li>
            )
        })
        let status;
        status = (winner ? ('Winner: ' + winner) : ('Next Player: ' + (this.state.xIsNext ? 'X' : 'O')));

        return (
            <div className="game">
                <div className="game-board">
                <Board squares={current.squares} onClick={(i) => this.handleClick(i)}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    // All Possible Combinations of winning choices
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [0, 3, 6],
        [2, 4, 6],
    ];

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    let flag = true;
    for(let i = 0; i < 9; i++) {
        if(!squares[i]) flag = false;
    }

    return (flag ? 'Draw' : null);
}

export default Game;
