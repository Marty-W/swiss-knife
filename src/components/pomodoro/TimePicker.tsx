import React from 'react'
import styled from 'styled-components/'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import Card from '../UI/Card.styles'
import Button from '../UI/Button.styles'
import Rating from './Rating'
import { usePomo } from '../../context/PomoContext'

interface Props {
  handlePomoStart?: () => void
}

const TimePicker: React.FC<Props> = ({ handlePomoStart }) => {
  const [state, dispatch] = usePomo()
  const { duration, isBreak } = state

  const handlePlus = () => {
    const payload = 'plus'
    if (isBreak) {
      dispatch({ type: 'BREAK', payload })
    } else {
      dispatch({ type: 'DUR', payload })
    }
  }

  const handleMinus = () => {
    const payload = 'minus'
    if (isBreak) {
      dispatch({ type: 'BREAK', payload })
    } else {
      dispatch({ type: 'DUR', payload })
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
      <Time>{duration.toFormat('mm:ss')}</Time>
      <RightChevron onClick={handlePlus}>
        <BsChevronRight />
      </RightChevron>
      <StartButton onClick={handlePomoStart}>Start</StartButton>
      {!isBreak && <Rating dur={duration.as('minutes')} />}
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  grid-area: timer;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 2fr 1fr;
  place-items: center;
  grid-template-areas:
    'lchevron timer rchevron'
    '. btn rating';
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
  color: ${(props) => props.theme.colors.tertiary};
  display: inline-block;
  user-select: none;

  //TODO weird centering, timer and chevrons not really in one line
`

export default TimePicker
