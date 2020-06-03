import React, { useContext } from 'react'
import styled from 'styled-components/macro'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import { PomoContext } from '../../context/pomoContext'

import Card from '../UI/Card.styles'
import Button from '../UI/Button.styles'

const TimePicker = () => {
  const [state, dispatch] = useContext(PomoContext)
  const { duration, isBreak } = state

  const handlePlus = () => {
    if (isBreak) {
      dispatch({ type: 'BREAK_PLUS' })
    } else {
      dispatch({ type: 'DUR_PLUS' })
    }
  }

  const handleMinus = () => {
    if (isBreak) {
      dispatch({ type: 'BREAK_MINUS' })
    } else {
      dispatch({ type: 'DUR_MINUS' })
    }
  }

  return (
    <Wrapper>
      <LeftChevron
        disabled={duration.as('milliseconds') === 0}
        onClick={handleMinus}
      >
        <BsChevronLeft />
      </LeftChevron>
      <Time isBreak={isBreak}>{duration.toFormat('mm:ss')}</Time>
      <RightChevron onClick={handlePlus}>
        <BsChevronRight onClick={handlePlus} />
      </RightChevron>
      <StartButton>Start</StartButton>
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  grid-area: timer;
  display: grid;
  grid-template-columns: minmax(1rem, 3rem) auto minmax(1rem, 3rem);
  grid-template-rows: 3fr 1fr;
  place-items: center;
  grid-template-areas:
    'lchevron timer rchevron'
    '. btn .';
`

const StartButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.accent};
  grid-area: btn;
  text-transform: uppercase;
  letter-spacing: 1.1px;
`

const LeftChevron = styled.button`
  grid-area: lchevron;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 2.5rem;
  color: ${(props) => props.theme.colors.tertiary};
  padding: 0;
`

const RightChevron = styled(LeftChevron)`
  grid-area: rchevron;
`

const Time = styled.span`
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 3.5rem;
  color: ${(props) => props.theme.colors.white};
  display: inline-block;
  user-select: none;

  //TODO weird centering, timer and chevrons not really in one line
`

export default TimePicker
