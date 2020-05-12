import React from 'react'
import styled from 'styled-components/macro'

const TimeEntries = () => {
  return (
    <TimeEntriesWrapper>
      <p>whatever</p>
      <p>duuuh</p>
    </TimeEntriesWrapper>
  )
}

const TimeEntriesWrapper = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.white};
  color: ${(props) => props.theme.colors.dark};
`

export default TimeEntries
