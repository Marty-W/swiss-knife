import React from "react";

const TimerButtons = ({
  pomoRunning,
  handleReset,
  handlePause,
  isPaused,
  startSesh,
  currentSesh,
}) => (
  <>
    {pomoRunning ? (
      <>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handlePause}>{isPaused ? "Continue" : "Pause"}</button>
      </>
    ) : (
      <button
        onClick={startSesh}
        disabled={currentSesh.as("milliseconds") === 0}
      >
        Start
      </button>
    )}
  </>
);

export default TimerButtons;
