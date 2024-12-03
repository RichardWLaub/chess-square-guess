import React, { useState, useEffect } from "react";
import "./App.css";

const generateRandomSquare = (): string => {
  const columns = "ABCDEFGH";
  const rows = "12345678";
  const column = columns[Math.floor(Math.random() * columns.length)];
  const row = rows[Math.floor(Math.random() * rows.length)];
  return `${column}${row}`;
};

const getSquareColor = (square: string): "white" | "black" => {
  const column = square[0];
  const row = parseInt(square[1]);
  const columnIndex = column.charCodeAt(0) - "A".charCodeAt(0); // 'A'-'H' to 0-7
  return (columnIndex + row) % 2 === 0 ? "white" : "black";
};

const App: React.FC = () => {
  const [square, setSquare] = useState(generateRandomSquare());
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsGameOver(true);
    }
  }, [timeLeft]);

  const handleGuess = (guess: "white" | "black") => {
    if (isGameOver) return;

    const correctColor = getSquareColor(square);
    if (guess === correctColor) {
      setMessage(`✅ Correct! ${square} is ${correctColor}.`);
      setScore(score + 1);
    } else {
      setMessage(`❌ Wrong! ${square} is ${correctColor}.`);
    }
    setSquare(generateRandomSquare());
  };

  const resetGame = () => {
    setSquare(generateRandomSquare());
    setMessage("");
    setScore(0);
    setTimeLeft(30);
    setIsGameOver(false);
  };

  return (
    <div className="container">
      <h1 className="title">Chess Square Guessing Game</h1>
      <p className="description">
        Guess the color of the square before the timer runs out!
      </p>
      <h2 className="square">{square}</h2>
      {isGameOver ? (
        <div>
          <p className="message">⏰ Time's up! Final Score: {score}</p>
          <button className="button reset" onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <div className="button-container">
            <button
              className="button white"
              onClick={() => handleGuess("white")}
            >
              White
            </button>
            <button
              className="button black"
              onClick={() => handleGuess("black")}
            >
              Black
            </button>
          </div>
          <p className="message">{message}</p>
          <p className="score">Score: {score}</p>
          <p className="timer">Time Left: {timeLeft}s</p>
        </div>
      )}
    </div>
  );
};

export default App;
