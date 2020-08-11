import React, { useState } from 'react'

import styled from 'styled-components/'
import { useHistory } from 'react-router-dom'
import Button from '../UI/Button'
import Card from '../UI/Card.styles'
import TimerButtons, { StyledButtons } from './TimerButtons'
import Ticker from './Ticker'
import TimePicker from './TimePicker'

import { usePomo } from '../../context/PomoContext'

const SessionBreak: React.FC = () => {
  const [{ duration }, dispatch] = usePomo()
  const [breakStarted, setBreakStarted] = useState(false)
  const history = useHistory()

  const handleBreakStart = () => {
    setBreakStarted(true)
    dispatch({ type: 'BREAK_START' })
  }

  return (
    <SessionWrapper>
      <SessionHeader>BREAK</SessionHeader>
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
        <ButtonWrapper>
          {duration.as('millisecond') > 0 && (
            <Button onClick={handleBreakStart} variant="primary">
              Start Break
            </Button>
          )}
          <Button onClick={() => history.push('/pomodoro')} variant="secondary">
            Go home
          </Button>
        </ButtonWrapper>
      )}
    </SessionWrapper>
  )
}

export const SessionWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.3fr 70% 0.5fr;
  grid-row-gap: 1rem;
  grid-template-areas:
    'heading heading'
    'timer timer'
    'buttons buttons';
`
export const SessionHeader = styled.h2`
  grid-area: heading;
  font-size: 1.7rem;
  justify-self: start;
  font-family: ${(props) => props.theme.fonts.secondary};
`

const ButtonWrapper = styled(StyledButtons)``

const Instructions = styled(Card)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 25%;
  padding: 0 1em;
  line-height: 1.3;
  font-size: 1.1rem;
  text-align: center;
  display: flex;
  justify-items: center;
  align-items: center;
  border-top-width: 0;
  border-left-width: 0;
  border-right-width: 0;
`

export default SessionBreak
