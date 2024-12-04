import React from "react";

interface GameSetupProps {
  initialTime: number;
  setInitialTime: (time: number) => void;
  startGame: () => void;
}

const GameSetup: React.FC<GameSetupProps> = ({
  initialTime,
  setInitialTime,
  startGame,
}) => {
  return (
    <div className="setup">
      <p className="description">Select your timer duration:</p>
      <input
        type="number"
        min="10"
        max="300"
        value={initialTime}
        onChange={(e) => setInitialTime(Number(e.target.value))}
        className="timer-input"
      />
      <button className="button start" onClick={startGame}>
        Start Game
      </button>
    </div>
  );
};

export default GameSetup;
