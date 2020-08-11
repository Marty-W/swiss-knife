import React from 'react'
import styled from 'styled-components/'
import Button from '../UI/Button'
import CardWithHeader from '../UI/CardWithHeader'
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
    <CardWithHeader header="Timer" gridArea="timer">
      <Wrapper>
        <TimePicker />
        {durInMinutes !== 0 ? (
          <StartButton
            onClick={handlePomoStart}
            disabled={durInMinutes === 0}
            variant="primary"
          >
            Start
          </StartButton>
        ) : (
          <Instructions>Pick the length of your session!</Instructions>
        )}
        {!isBreak && <Rating />}
      </Wrapper>
    </CardWithHeader>
  )
}

export default FullTimePicker

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  grid-template-rows: 2fr 1fr;
  place-items: center;
  grid-template-areas:
    'timer timer timer'
    '. btn rating';
`

const StartButton = styled(Button)`
  grid-area: btn;
  text-transform: uppercase;
  letter-spacing: 1.1px;
`

const Instructions = styled.p`
  grid-row: 2;
  grid-column: 1 / -1;
`
