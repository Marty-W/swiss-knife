import React from 'react'
import styled from 'styled-components/'
import { usePomo } from '../../context/PomoContext'

const TimerHeading: React.FC = () => {
  const [state] = usePomo()
  const { isBreak } = state

  return (
    <StyledTimerHeading>
      {isBreak
        ? 'Break time. Pick duration of break and go grab yourself some coffee!'
        : 'Focus Time !'}
    </StyledTimerHeading>
  )
}

const StyledTimerHeading = styled.h2`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 2rem;
`

export default TimerHeading
