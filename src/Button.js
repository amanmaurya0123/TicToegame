import React from "react";

const Button = ({ resetGame }) => {
  return (
    <button className="reset-button" onClick={resetGame}>
      Reset Game
    </button>
  );
};

export default Button;
