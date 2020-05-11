import React, { useContext } from 'react'
import styled from 'styled-components/macro'

import Button from '../UI/Button'
import { PomoContext } from '../../context/pomoContext'

const TimerButtons = () => {
  const [state, dispatch] = useContext(PomoContext)
  const { isPomoPaused } = state

  const handlePomoPause = () => {
    dispatch({ type: isPomoPaused ? 'POMO_CONTINUE' : 'POMO_PAUSE' })
  }

  return (
    <StyledButtons>
      <Button onClick={handlePomoPause}>
        {isPomoPaused ? 'Continue' : 'Pause'}
      </Button>
      <Button onClick={() => dispatch({ type: 'POMO_ABORT' })}>Abort</Button>
    </StyledButtons>
  )
}

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;

  & button {
    border-color: ${(props) => props.theme.colors.dark};
    color: ${(props) => props.theme.colors.dark};
  }
`

export default TimerButtons
