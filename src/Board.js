import React, { useState } from "react";
import Square from "./Square";

const Board = ({ updateScores }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isBlueNext, setIsBlueNext] = useState(true);
  const [scores, setScores] = useState({ blue: 0, red: 0 });

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = [...squares];
    newSquares[index] = isBlueNext ? "blue" : "red";
    setSquares(newSquares);
    setIsBlueNext(!isBlueNext);

    const winner = calculateWinner(newSquares);
    if (winner) {
      updateScores(winner);
    }
  };

  const calculateWinner = (squares) => {
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
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsBlueNext(true);
  };

  return (
    <div className="board">
      {squares.map((value, index) => (
        <Square key={index} value={value} onClick={() => handleClick(index)} />
      ))}
      <div className="scores">
        <div className="score blue">Blue: {scores.blue}</div>
        <div className="score red">Red: {scores.red}</div>
      </div>
      {calculateWinner(squares) && (
        <div className="winner">
          {calculateWinner(squares).toUpperCase()} Wins!
          <button onClick={resetGame}>Reset Game</button>
        </div>
      )}
    </div>
  );
};

export default Board;
