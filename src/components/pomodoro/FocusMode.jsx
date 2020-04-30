import React, { useEffect, useState } from 'react'
import { Duration } from 'luxon'

import styled, { keyframes } from 'styled-components/macro'
import { useInterval } from '../../hooks/useInterval'
import Modal from '../UI/Modal'
import TimeLeft from './TimeLeft'
import TimerHeading from './TimerHeading'
import TimerButtons from './TimerButtons'

const FocusMode = ({ dispatch, duration }) => {
  const [localSessionLength, setLocalSessionLength] = useState(() =>
    Duration.fromMillis(0)
  )
  const [isPaused, setIsPaused] = useState(false)
  const [isBreak] = useState(false)

  useEffect(() => {
    setLocalSessionLength(duration)
  }, [duration])

  useInterval(() => {
    setLocalSessionLength((prev) => {
      if (prev.as('milliseconds') > 0 && !isPaused) {
        return prev.minus(1000)
      }
      return prev
    })
  }, 1000)

  const handlePause = () => setIsPaused((prev) => !prev)

  return (
    <>
      <Modal>
        <FocusWrapper duration={duration.as('seconds')} isPaused={isPaused}>
          <TimerHeading isBreak={isBreak} />
          <TimeLeft duration={localSessionLength} />
          <TimerButtons
            dispatch={dispatch}
            handlePause={handlePause}
            isPaused={isPaused}
          />
        </FocusWrapper>
      </Modal>
    </>
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
  background: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 5;
  position: relative;

  &::before {
    content: '';
    background-color: ${(props) => props.theme.colors.red};
    width: 100%;
    position: absolute;
    bottom: 0;
    animation-name: ${fillAnimation};
    animation-duration: ${(props) => props.duration}s;
    animation-play-state: ${(props) => (props.isPaused ? 'paused' : 'running')};
    animation-timing-function: linear;
  }
`

export default FocusMode
