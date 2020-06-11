import React, { useContext } from 'react'
import styled, { keyframes } from 'styled-components'
import { PomoContext } from '../context/pomoContext'

import Modal from '../components/UI/Modal'
import Ticker from '../components/pomodoro/Ticker'
import TimePicker from '../components/pomodoro/TimePicker'
import TimerHeading from '../components/pomodoro/TimerHeading'
import TimerButtons from '../components/pomodoro/TimerButtons'
import Quotes from '../components/pomodoro/Quotes'

const FocusMode = () => {
  const [state] = useContext(PomoContext)
  const { isRunning, isPaused, isPomo, duration } = state

  return (
    <Modal>
      <FocusWrapper>
        <TimerHeading />
        {isRunning ? <Ticker /> : <TimePicker />}
        <TimerButtons />
        <Quotes />
      </FocusWrapper>
      <TickAnimationDiv
        duration={duration.as('seconds')}
        isPaused={isPaused}
        isPomo={isPomo}
      />
    </Modal>
  )
}

const fillAnimation = keyframes`
  from {
    height: 0%
  } to {
    height: 100%
  }

`
const FocusWrapper = styled.div`
  background: ${(props) => props.theme.colors.dark};
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
`

const TickAnimationDiv = styled.div`
  background-color: ${(props) =>
    props.isPomo ? props.theme.colors.red : props.theme.colors.green};
  width: 100%;
  position: absolute;
  bottom: 0;
  animation-name: ${fillAnimation};
  animation-duration: ${(props) => props.duration}s;
  animation-play-state: ${(props) => (props.isPaused ? 'paused' : 'running')};
  animation-timing-function: linear;
`

export default FocusMode
