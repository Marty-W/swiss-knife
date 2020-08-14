import React from 'react'
import styled from 'styled-components/macro'

interface Props {
  start: number
  end: number
  dur: number
}

const Entry: React.FC<Props> = ({ start, end, dur }) => {
  const calculateRating = (duration: number) => {
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
      <span>
        {new Date(start).toLocaleTimeString('cs', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
      <span>
        {new Date(end).toLocaleTimeString('cs', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </span>
      <span> {dur}</span>
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
    color: ${(props) => props.theme.colors.accent};
  }
`
export default Entry
