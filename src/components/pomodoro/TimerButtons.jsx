import React from 'react'
import styled from 'styled-components/macro'

import Button from '../UI/Button'

const TimerButtons = ({ dispatch, handlePause, isPaused }) => (
  <StyledButtons>
    <Button onClick={handlePause}>{isPaused ? 'Continue' : 'Pause'}</Button>
    <Button onClick={() => dispatch({ type: 'POMO_STOP' })}>Reset</Button>
  </StyledButtons>
)

const StyledButtons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  z-index: 10;

  & button {
    border-color: ${(props) => props.theme.colors.dark};
    color: ${(props) => props.theme.colors.dark};
  }
`

export default TimerButtons
