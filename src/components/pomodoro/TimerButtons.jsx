import React, { useContext } from 'react'
import styled from 'styled-components/'
import { useHistory } from 'react-router-dom'

import Button from '../UI/Button.styles'
import { PomoContext } from '../../context/pomoContext'

const TimerButtons = () => {
  const [state, dispatch] = useContext(PomoContext)
  const { isPaused, isBreak, isRunning } = state
  const history = useHistory()

  const handlePomoPause = () => {
    dispatch({ type: isPaused ? 'POMO_CONTINUE' : 'POMO_PAUSE' })
  }

  const handlePomoAbort = () => {
    dispatch({ type: 'POMO_ABORT' })
    history.goBack()
  }

  return (
    <StyledButtons>
      {isBreak && !isRunning && (
        <Button onClick={() => dispatch({ type: 'BREAK_START' })}>
          Start break
        </Button>
      )}
      {!isBreak && (
        <>
          <Button onClick={handlePomoPause}>
            {isPaused ? 'Continue' : 'Pause'}
          </Button>
          <Button onClick={handlePomoAbort}>Abort</Button>
        </>
      )}
    </StyledButtons>
  )
}

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  & button {
    border-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.white};
  }
`

export default TimerButtons
