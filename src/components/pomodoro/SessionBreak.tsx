import React, { useState } from 'react'
import styled from 'styled-components/macro'

import Ticker from './Ticker'
import TimePicker from './TimePicker'
import { usePomo } from '../../context/PomoContext'
import TimerButtons from './TimerButtons'
import Button from '../UI/Button.styles'
import SectionHeading from '../UI/SectionHeading.styles'

const SessionBreak: React.FC = () => {
  const [, dispatch] = usePomo()
  const [breakStarted, setBreakStarted] = useState(false)

  const handleBreakStart = () => {
    setBreakStarted(true)
    dispatch({ type: 'BREAK_START' })
  }

  return (
    <Wrapper>
      <Heading>BREAK</Heading>
      {breakStarted ? <Ticker /> : <TimePicker />}
      {!breakStarted && (
        <Instructions>
          Good job! Go grab some coffee. After the break ends, you will be
          brought back to homescreen where you can start your next session.
        </Instructions>
      )}
      {breakStarted ? (
        <TimerButtons />
      ) : (
        <Button onClick={handleBreakStart}>Start Break</Button>
      )}
    </Wrapper>
  )
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(1.5rem, 2rem) 1fr;
  grid-template-rows: 1fr 2fr 1fr 1fr;
  grid-template-areas:
    'heading .'
    'timer timer'
    'instructions instructions'
    'buttons buttons';
  place-items: center;

  & button {
    grid-area: buttons;
  }
`

const Instructions = styled.div`
  grid-area: instructions;
  padding: 0 1em;
  line-height: 1.3;
  font-size: 1.1rem;
`

const Heading = styled(SectionHeading)`
  align-self: start;
  margin-top: 2em;
`

export default SessionBreak
