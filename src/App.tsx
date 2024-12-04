import React, { useState } from "react";
import "./App.css";
import GameSetup from "./components/GameSetup";
import GameControls from "./components/GameControls";

const generateRandomSquare = (): string => {
  const columns = "ABCDEFGH";
  const rows = "12345678";
  const column = columns[Math.floor(Math.random() * columns.length)];
  const row = rows[Math.floor(Math.random() * rows.length)];
  return `${column}${row}`;
};

const App: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [square, setSquare] = useState(generateRandomSquare());
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [initialTime, setInitialTime] = useState(30);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleGuess = (guess: "white" | "black") => {
    if (isGameOver) return;

    const correctColor =
      (square.charCodeAt(0) - "A".charCodeAt(0) + parseInt(square[1])) % 2 === 0
        ? "white"
        : "black";

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
    setTimeLeft(initialTime);
    setIsGameOver(false);
    setIsGameStarted(false);
  };

  return (
    <div className="container">
      <h1 className="title">Chess Square Guessing Game</h1>
      {!isGameStarted ? (
        <GameSetup
          initialTime={initialTime}
          setInitialTime={setInitialTime}
          startGame={() => {
            setIsGameStarted(true);
            setTimeLeft(initialTime);
          }}
        />
      ) : (
        <GameControls
          square={square}
          timeLeft={timeLeft}
          isGameOver={isGameOver}
          score={score}
          message={message}
          handleGuess={handleGuess}
          resetGame={resetGame}
          setTimeLeft={setTimeLeft}
          setIsGameOver={setIsGameOver}
        />
      )}
    </div>
  );
};

export default App;
