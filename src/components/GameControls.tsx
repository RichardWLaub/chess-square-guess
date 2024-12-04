import React, { useEffect } from "react";

interface GameControlsProps {
  square: string;
  timeLeft: number;
  isGameOver: boolean;
  score: number;
  message: string;
  handleGuess: (guess: "white" | "black") => void;
  resetGame: () => void;
  setTimeLeft: (time: number) => void;
  setIsGameOver: (isGameOver: boolean) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  square,
  timeLeft,
  isGameOver,
  score,
  message,
  handleGuess,
  resetGame,
  setTimeLeft,
  setIsGameOver,
}) => {
  useEffect(() => {
    if (timeLeft > 0 && !isGameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsGameOver(true);
    }
  }, [timeLeft, isGameOver]);

  return (
    <div>
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

export default GameControls;
