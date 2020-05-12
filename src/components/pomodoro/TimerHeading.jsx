import React, { useContext } from 'react'
import styled from 'styled-components/macro'

import { PomoContext } from '../../context/pomoContext'

const TimerHeading = () => {
  const [state] = useContext(PomoContext)
  const { isBreak } = state

  return (
    <StyledTimerHeading>
      {isBreak
        ? 'Break time. Pick duration of break and go grab yourself some coffee!'
        : 'Focus...'}
    </StyledTimerHeading>
  )
}

const StyledTimerHeading = styled.h2`
  color: ${(props) => props.theme.colors.dark};
`

export default TimerHeading
