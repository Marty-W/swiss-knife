import React from 'react'
import styled from 'styled-components/macro'

const TimerHeading = () => {
  return (
    <StyledTimerHeading>
      {/* {isBreak
        ? 'Break time. Pick duration of break and go grab yourself some coffee!'
        : 'Focus...'} */}
      <p>Focus....s</p>
    </StyledTimerHeading>
  )
}

const StyledTimerHeading = styled.h2`
  color: ${(props) => props.theme.colors.dark};
`

export default TimerHeading
