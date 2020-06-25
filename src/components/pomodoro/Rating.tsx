import React from 'react'
import styled from 'styled-components/'
import { usePomo } from '../../context/PomoContext'

const Rating: React.FC = () => {
  const [state] = usePomo()
  const duration = state.duration.as('minutes')

  let output = ''

  if (duration < 25 && duration !== 0) {
    output = '🍅'
  } else if (duration < 50 && duration !== 0) {
    output = '🍅🍅'
  } else if (duration >= 50) {
    output = '🍅🍅🍅'
  }

  return (
    <>
      {dur > 0 && (
        <Wrapper>
          <span>Rating:</span>
          <span>{output}</span>
        </Wrapper>
      )}
    </>
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
