import React from 'react';
import styled from 'styled-components';

import Ticker from '../components/pomodoro/Ticker';
import Timer from '../components/pomodoro/Timer';
import TimerHeading from '../components/pomodoro/TimerHeading';
import TimerButtons from '../components/pomodoro/TimerButtons';
import Quotes from '../components/pomodoro/Quotes';
import { usePomo } from '../context/PomoContext';

const Session: React.FC = () => {
  const [state] = usePomo();
  const { isRunning } = state;

  return (
    <Wrapper>
      <TimerHeading />
      {isRunning ? <Ticker /> : <Timer />}
      {isRunning && <TimerButtons />}
      <Quotes />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;

  & > * {
    z-index: 10;
  }
`;

export default Session;
