import React from 'react'
import styled from 'styled-components/'
import { useHistory, useLocation } from 'react-router-dom'

import Button from '../UI/Button.styles'
import { usePomo } from '../../context/PomoContext'

const TimerButtons: React.FC = () => {
  const [state, dispatch] = usePomo()
  const { isPaused } = state
  const history = useHistory()

  const handlePause = () => {
    dispatch({ type: isPaused ? 'CONTINUE' : 'PAUSE' })
  }

  const handleAbort = () => {
    dispatch({ type: 'ABORT' })
    history.push('/pomodoro')
  }

  return (
    <StyledButtons>
      <Button onClick={handlePause}>{isPaused ? 'Continue' : 'Pause'}</Button>
      <Button onClick={handleAbort}>Abort</Button>
    </StyledButtons>
  )
}

const StyledButtons = styled.div`
  grid-area: buttons;
  width: 100%;
  display: flex;
  justify-content: space-around;

  & button {
    border-color: ${(props) => props.theme.colors.tertiary};
    color: ${(props) => props.theme.colors.tertiary};
  }
`

export default TimerButtons
