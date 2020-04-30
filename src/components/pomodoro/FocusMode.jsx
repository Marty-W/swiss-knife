import React from 'react'
import styled, { keyframes } from 'styled-components/macro'

import Modal from '../UI/Modal'
import Ticker from './TimeLeft'
import TimerHeading from './TimerHeading'
import TimerButtons from './TimerButtons'
import TimePicker from './TimePicker'

const FocusMode = ({ dispatch, duration, isBreak, isPaused }) => (
  <>
    <Modal>
      <FocusWrapper>
        <TimerHeading isBreak={isBreak} />
        {isBreak && <TimePicker duration={duration} dispatch={dispatch} />}
        <Ticker duration={duration} isPaused={isPaused} />
        <TimerButtons dispatch={dispatch} isPaused={isPaused} />
      </FocusWrapper>
      <TickAnimationDiv duration={duration.as('seconds')} isPaused={isPaused} />
    </Modal>
  </>
)

const fillAnimation = keyframes`
  from {
    height: 0%
  } to {
    height: 100%
  }

`
const FocusWrapper = styled.div`
  background: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: -1;
`

const TickAnimationDiv = styled.div`
  background-color: ${(props) => props.theme.colors.red};
  width: 100%;
  position: absolute;
  bottom: 0;
  animation-name: ${fillAnimation};
  animation-duration: ${(props) => props.duration}s;
  animation-play-state: ${(props) => (props.isPaused ? 'paused' : 'running')};
  animation-timing-function: linear;
`

export default FocusMode
