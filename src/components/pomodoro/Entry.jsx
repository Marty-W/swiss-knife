import React from 'react'
import styled from 'styled-components/'

const Entry = ({ start, end, dur }) => {
  const calculateRating = (duration) => {
    if (+duration < 25) {
      return '🍅'
    }
    if (+duration < 50) {
      return '🍅🍅'
    }
    return '🍅🍅🍅'
  }
  return (
    <StyledEntry>
      <span>{start}</span>
      <span> {end}</span>
      <span> {dur} minutes</span>
      <span> {calculateRating(dur)}</span>
    </StyledEntry>
  )
}

const StyledEntry = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  place-self: stretch;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  place-items: center;

  svg {
    color: ${(props) => props.theme.colors.red};
  }
`
export default Entry
