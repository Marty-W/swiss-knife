import React, { useContext } from 'react'
import styled from 'styled-components/macro'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

import { PomoContext } from '../../context/pomoContext'

const TimePicker = () => {
  const [state, dispatch] = useContext(PomoContext)
  const { duration } = state

  return (
    <StyledTimer>
      <StyledButton
        disabled={duration.as('milliseconds') === 0}
        onClick={() => dispatch({ type: 'DUR_MINUS' })}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </StyledButton>
      <StyledTicker>{duration.toFormat('mm:ss')}</StyledTicker>
      <StyledButton onClick={() => dispatch({ type: 'DUR_PLUS' })}>
        <FontAwesomeIcon icon={faChevronRight} />
      </StyledButton>
    </StyledTimer>
  )
}

const StyledTimer = styled.p`
  font-size: 2rem;
  text-align: center;
  margin: 2em;
`

const StyledButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.red};
`

const StyledTicker = styled.span`
  color: ${(props) => props.theme.colors.white};
  display: inline-block;
  margin: 0 auto;
  user-select: none;
`

export default TimePicker
