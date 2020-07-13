import React from 'react'
import styled from 'styled-components'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { usePomo } from '../../context/PomoContext'
import { useLocation } from 'react-router-dom'

const TimePicker: React.FC = () => {
  const [state, dispatch] = usePomo()
  const { duration } = state
  const location = useLocation()

  const handleDuration = (type: 'plus' | 'minus') => {
    location.pathname === '/session/break'
      ? dispatch({ type: 'BREAK_LENGTH', payload: type })
      : dispatch({ type: 'FOCUS_LENGTH', payload: type })
  }
  return (
    <Wrapper>
      <Chevron
        disabled={duration.as('milliseconds') === 0}
        onClick={() => handleDuration('minus')}
      >
        <BsChevronLeft />
      </Chevron>
      <Time>{duration.toFormat('mm:ss')}</Time>
      <Chevron onClick={() => handleDuration('plus')}>
        <BsChevronRight />
      </Chevron>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: timer;
`

const Chevron = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.tertiary};
  padding: 0;

  &:disabled {
    visibility: hidden;
  }
`

const Time = styled.span`
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 3.5rem;
  color: ${(props) => props.theme.colors.tertiary};
  display: inline-block;
  user-select: none;
`

export default TimePicker
