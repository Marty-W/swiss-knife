import React, { useState } from "react";
import { DateTime, Interval, Duration } from "luxon";
import { useInterval } from "../../hooks/useInterval";
import styled from "styled-components/macro";

import Timer from "./Timer";

const Pomodoro = () => {
  const [currentSesh, setCurrentSesh] = useState(Duration.fromMillis(0));
  const [pomoRunning, setPomoRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useInterval(() => {
    if (pomoRunning && !isPaused) {
      setCurrentSesh((prev) => {
        if (prev.as("milliseconds") > 0) {
          return prev.minus(1000);
        } else {
          setPomoRunning(false);
          return setCurrentSesh(Duration.fromMillis(0));
        }
      });
    }
  }, 100);

  const startSesh = () => {
    const startMoment = DateTime.local();
    const finishedMoment = startMoment.plus({ minutes: currentSesh.minutes });
    const momentDuration = Interval.fromDateTimes(
      startMoment,
      finishedMoment
    ).toDuration();
    setCurrentSesh(momentDuration);
    setPomoRunning(true);
  };

  const handleSessionLength = (type) => {
    setCurrentSesh((prev) => {
      return type === "i"
        ? prev.plus({ minutes: 1 })
        : prev.minus({ minutes: 1 });
    });
  };

  const handlePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleReset = () => {
    setPomoRunning(false);
    setCurrentSesh(Duration.fromMillis(0));
  };

  return (
    <PomoWrapper>
      <h1>Pomodoro</h1>
      <Timer
        handleSessionLength={handleSessionLength}
        pomoRunning={pomoRunning}
        currentSesh={currentSesh}
        handleReset={handleReset}
        handlePause={handlePause}
        isPaused={isPaused}
        startSesh={startSesh}
      />
    </PomoWrapper>
  );
};

const PomoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Pomodoro;
