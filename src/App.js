import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "./Button";
import Square from "./Square";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("blue");
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ blue: 0, red: 0 });

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem("scores"));
    if (savedScores) {
      setScores(savedScores);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  const checkEndTheGame = () => {
    for (let square of squares) {
      if (!square) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
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

  const updateSquares = (ind) => {
    if (squares[ind] || winner) {
      return;
    }
    const s = squares.slice();
    s[ind] = turn;
    setSquares(s);
    setTurn(turn === "blue" ? "red" : "blue");
    const W = checkWinner();
    if (W) {
      setWinner(W);
      setScores((prevScores) => ({
        ...prevScores,
        [W]: prevScores[W] + 1,
      }));
    } else if (checkEndTheGame()) {
      setWinner("draw");
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("blue");
    setWinner(null);
  };

  return (
    <div className="tic-tac-toe">
      <h1>TIC-TAC-TOE</h1>
      <div className="scores">
        <div className="score blue">Blue: {scores.blue}</div>
        <div className="score red">Red: {scores.red}</div>
      </div>
      <Button resetGame={resetGame} />
      <div className="game">
        {squares.map((value, ind) => (
          <Square
            key={ind}
            ind={ind}
            updateSquares={() => updateSquares(ind)}
            clsName={squares[ind]}
          />
        ))}
      </div>
      <AnimatePresence>
        {winner && (
          <motion.div
            key={"parent-box"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="winner"
          >
            <motion.div
              key={"child-box"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text"
            >
              <motion.h2
                initial={{ scale: 0, y: 100 }}
                animate={{
                  scale: 1,
                  y: 0,
                  transition: {
                    y: { delay: 0.7 },
                    duration: 0.7,
                  },
                }}
              >
                {winner === "draw"
                  ? "No Winner :/"
                  : `${
                      winner.charAt(0).toUpperCase() + winner.slice(1)
                    } Wins !! :)`}
              </motion.h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 1.3,
                    duration: 0.2,
                  },
                }}
                className="win"
              >
                {winner === "draw" ? (
                  <>
                    <Square clsName="blue" />
                    <Square clsName="red" />
                  </>
                ) : (
                  <Square clsName={winner} />
                )}
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { delay: 1.5, duration: 0.3 },
                }}
              >
                <Button resetGame={resetGame} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
