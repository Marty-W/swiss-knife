import React, { useState } from 'react'
import styled from 'styled-components/macro'

import Ticker from './Ticker'
import TimePicker from './TimePicker'
import { usePomo } from '../../context/PomoContext'
import TimerButtons from './TimerButtons'

// FIXME break finish should be in reducer

const SessionBreak: React.FC = () => {
  const [state, dispatch] = usePomo()
  const { isPaused, isRunning, isBreakFinished } = state

  const handleSessionStart = () => {
    if (isBreakFinished) {
      dispatch({ type: 'POMO_START' })
    } else {
      dispatch({ type: 'BREAK_START' })
    }
  }

  let sessionHeading = 'Time for a break :)'

  if (isBreakFinished) {
    sessionHeading = 'Time for another Pomodoro!'
  }

  return (
    <>
      <h2>{sessionHeading}</h2>
      <p>set session length</p>
      {isRunning ? <TimePicker /> : <Ticker />}
      <TimerButtons />
    </>
  )
}

export default SessionBreak
