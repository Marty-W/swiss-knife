import React from "react";
import styled from "styled-components/macro";

const TimerButtons = ({
  pomoRunning,
  handleReset,
  handlePause,
  isPaused,
  startSesh,
  currentSesh,
}) => (
  <StyledButtonWrapper>
    {pomoRunning ? (
      <>
        <StyledButton onClick={handleReset}>Reset</StyledButton>
        <StyledButton onClick={handlePause}>
          {isPaused ? "Continue" : "Pause"}
        </StyledButton>
      </>
    ) : (
      <StyledButton
        onClick={startSesh}
        disabled={currentSesh.as("milliseconds") === 0}
      >
        Start
      </StyledButton>
    )}
  </StyledButtonWrapper>
);

const StyledButton = styled.button`
  background: none;
  border: 2px solid #ba274a;
  padding: 0.3em 2em;
  border-radius: 6px;
  font-size: 1rem;
  display: inline-block;
  flex: 1;
  margin: 0 1em;
`;

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1em;
`;

export default TimerButtons;
