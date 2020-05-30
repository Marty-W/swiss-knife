import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { Duration } from 'luxon'

import { useInterval } from '../../hooks/useInterval'
import { PomoContext } from '../../context/pomoContext'

import TimerEstimate from './TimerEstimate'

const Ticker = () => {
  const [localSessionLength, setLocalSessionLength] = useState(() =>
    Duration.fromMillis(0)
  )
  const [state, dispatch] = useContext(PomoContext)
  const { duration, isRunning, isPaused, isBreak } = state

  useEffect(() => {
    setLocalSessionLength(duration)
  }, [duration])

  useInterval(() => {
    if (isRunning && !isPaused) {
      setLocalSessionLength((prev) => {
        if (prev.as('milliseconds') > 0) {
          handleDocumentTitle(prev.minus(1000))
          return prev.minus(1000)
        }
        return prev
      })
    }
    if (localSessionLength.as('milliseconds') === 0) {
      if (!isBreak) {
        dispatch({ type: 'POMO_FINISH' })
      } else if (isBreak) {
        dispatch({ type: 'POMO_ABORT' })
      }
    }
  }, 1000)

  const handleDocumentTitle = (timeLeft) => {
    document.title = timeLeft.toFormat('mm:ss')
  }

  return (
    <>
      <StyledTicker>{localSessionLength.toFormat('mm:ss')}</StyledTicker>
      <TimerEstimate localSesh={localSessionLength} />
    </>
  )
}

export default Ticker

const StyledTicker = styled.span`
  color: ${(props) => props.theme.colors.white};
  font-size: 2.3rem;
  margin: 1em;
`
