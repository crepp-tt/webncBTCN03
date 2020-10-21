import React, { useState } from 'react';
import Board from './Board';
function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      location: {},
      step: -1,
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setxIsNext] = useState(true);
  const [boldStep, setBoldStep] = useState(0);
  const [type, setType] = useState(0);
  const winStep = [];

  const calculateWinner = (squares, winStep) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winStep.push(a, b, c);
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const historyT = history.slice(0, stepNumber + 1);
    const current = historyT[historyT.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares, winStep) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setBoldStep(i);
    setHistory(
      historyT.concat([
        {
          squares: squares,
          location: {
            x: (i % 3) + 1,
            y: Math.floor(i / 3) + 1,
          },
          step: i,
        },
      ])
    );
    setStepNumber(historyT.length);
    setxIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setBoldStep(history[step].step);
    setxIsNext(step % 2 === 0);
  };

  const historyT = history;
  const current = historyT[stepNumber];
  const winner = calculateWinner(current.squares, winStep);

  const moves = history.map((step, move) => {
    if (type) move = history.length - move - 1;
    const desc = move
      ? 'Go to move #' +
        move +
        '(' +
        history[move].location.x +
        ':' +
        history[move].location.y +
        ')'
      : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (stepNumber === 9) {
    status = 'Draw';
  } else status = 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
          boldStep={boldStep}
          winStep={winStep}
        />
      </div>

      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => setType(1 - type)}>Change type</button>

        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
// ========================================
