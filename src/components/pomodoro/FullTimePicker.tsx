import React from 'react'
import styled from 'styled-components/macro'

import Card from '../UI/Card.styles'
import Button from '../UI/Button.styles'
import Rating from './Rating'
import TimePicker from './TimePicker'
import { usePomo } from '../../context/PomoContext'

interface Props {
  handlePomoStart?: () => void
}

const FullTimePicker: React.FC<Props> = ({ handlePomoStart }) => {
  const [state] = usePomo()
  const { duration, isBreak } = state
  const durInMinutes = duration.as('minutes')

  return (
    <Wrapper>
      <TimePicker />
      <StartButton onClick={handlePomoStart} disabled={durInMinutes === 0}>
        Start
      </StartButton>
      {!isBreak && <Rating dur={durInMinutes} />}
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
    'timer timer timer'
    '. btn rating';
`

const StartButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.accent};
  grid-area: btn;
  text-transform: uppercase;
  letter-spacing: 1.1px;

  &:disabled {
    background-color: ${(props) => props.theme.colors.primary};
    cursor: not-allowed;
  }
`

export default FullTimePicker
