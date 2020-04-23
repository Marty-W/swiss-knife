import React from "react";
import styled from "styled-components/macro";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import TimerButtons from "./TimerButtons";
import Modal from "../../UI/Modal";

const Timer = ({
  handleSessionLength,
  pomoRunning,
  currentSesh,
  handleReset,
  handlePause,
  isPaused,
  startSesh,
}) => {
  return (
    <>
      {pomoRunning ? (
        <Modal>
          <StyledModalTimer>
            <span>{currentSesh.toFormat("mm:ss")}</span>
            <TimerButtons
              pomoRunning={pomoRunning}
              handleReset={handleReset}
              handlePause={handlePause}
              isPaused={isPaused}
              startSesh={startSesh}
              currentSesh={currentSesh}
            />
          </StyledModalTimer>
        </Modal>
      ) : (
        <StyledTimer>
          <StyledButton
            onClick={() => handleSessionLength("d")}
            disabled={currentSesh.as("milliseconds") === 0}
            pomoRunning={pomoRunning}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </StyledButton>
          <span>{currentSesh.toFormat("mm:ss")}</span>
          <StyledButton
            onClick={() => handleSessionLength("i")}
            pomoRunning={pomoRunning}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </StyledButton>
          <TimerButtons
            pomoRunning={pomoRunning}
            handleReset={handleReset}
            handlePause={handlePause}
            isPaused={isPaused}
            startSesh={startSesh}
            currentSesh={currentSesh}
          />
        </StyledTimer>
      )}
    </>
  );
};

const StyledModalTimer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & span {
    font-size: 2rem;
    color: white;
    margin: 0 auto;
  }
`;

const StyledTimer = styled.p`
  font-size: 2rem;
  text-align: center;

  & span {
    margin: 0 1em;
    user-select: none;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.5rem;
  display: ${(props) => (props.pomoRunning ? "none" : "inline-block")};
`;

export default Timer;
