import { useHistory } from 'react-router-dom'

import Button from '../UI/Button'
import React from 'react'
import styled from 'styled-components/macro'
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
      <Button variant="primary" onClick={handlePause}>
        {isPaused ? 'Continue' : 'Pause'}
      </Button>
      <Button variant="secondary" onClick={handleAbort}>
        Abort
      </Button>
    </StyledButtons>
  )
}

export const StyledButtons = styled.div`
  grid-area: buttons;
  justify-self: stretch;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export default TimerButtons
