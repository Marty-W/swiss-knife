import React from 'react'
import styled from 'styled-components/'

const Rating = ({ dur }) => {
  let output = ''

  if (dur < 25 && dur !== 0) {
    output = '🍅'
  } else if (dur < 50 && dur !== 0) {
    output = '🍅🍅'
  } else if (dur >= 50 && dur !== 0) {
    output = '🍅🍅🍅'
  }

  return (
    <Wrapper>
      <span>Rating:</span>
      <span>{output}</span>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: rating;
  width: 100%;

  & span:first-child {
    display: block;
  }
`

export default Rating
