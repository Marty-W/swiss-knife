import React, { useContext, useState } from 'react'
import styled from 'styled-components/macro'

import TimePicker from '../components/pomodoro/TimePicker'
import Button from '../components/UI/Button'
import FocusMode from '../components/pomodoro/FocusMode'
import Info from '../components/pomodoro/Info'
import Heading from '../components/UI/Heading'
import DailyGoal from '../components/pomodoro/DailyGoalSetter'

import { PomoContext } from '../context/pomoContext'

const Pomodoro = () => {
  const [state, dispatch] = useContext(PomoContext)
  const { isModalOpen } = state
  const [isGoalSet, setIsGoalSet] = useState(false)

  const handlePomoStart = () => {
    dispatch({ type: 'POMO_START' })
  }

  return (
    <>
      {isModalOpen && <FocusMode />}
      <PomoWrapper>
        <Heading>Pomodoro</Heading>
        <TimePicker />
        <StartButton onClick={handlePomoStart}>Start</StartButton>
        {!isGoalSet && <DailyGoal handleGoalSet={setIsGoalSet} />}
        <Info />
      </PomoWrapper>
    </>
  )
}

const PomoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100%;
  width: 100%;
`

const StartButton = styled(Button)`
  margin: 0 auto;
  padding: 0.4em 2em;
  color: ${(props) => props.theme.colors.white};
`

export default Pomodoro
