import React from 'react'
import styled from 'styled-components/macro'

const TimerHeading = ({ isBreak }) => (
  <StyledTimerHeading>
    {isBreak ? 'Break time. Grab yourself a hot drink' : 'Focus...'}
  </StyledTimerHeading>
)

const StyledTimerHeading = styled.h2`
  color: ${(props) => props.theme.colors.dark};
`

export default TimerHeading
