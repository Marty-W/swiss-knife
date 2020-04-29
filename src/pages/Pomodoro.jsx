import React, { useReducer } from 'react'
import { Duration } from 'luxon'
import styled from 'styled-components/macro'
import { useInterval } from '../hooks/useInterval'

import Ticker from '../components/pomodoro/Ticker'
import Button from '../components/UI/Button'
import FocusMode from '../components/pomodoro/FocusMode'

import pomoReducer from '../reducers/pomoReducer'

const initPomoState = {
  duration: Duration.fromMillis(0),
  isRunning: false,
  timeEntries: [],
}

const Pomodoro = () => {
  const [pomoState, dispatch] = useReducer(pomoReducer, initPomoState)

  console.log('render')

  return (
    <>
      {pomoState.isRunning && (
        <FocusMode
          duration={pomoState.duration}
          isRunning={pomoState.isRunning}
          isPaused={pomoState.isPaused}
          dispatch={dispatch}
        />
      )}
      <PomoWrapper>
        <h1>Pomodoro</h1>
        <Ticker
          pomoRunning={pomoState.isRunning}
          duration={pomoState.duration}
          dispatch={dispatch}
        />
        <Button onClick={() => dispatch({ type: 'POMO_START' })}>Start</Button>
      </PomoWrapper>
    </>
  )
}

const PomoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  width: 100%;
`

export default Pomodoro
