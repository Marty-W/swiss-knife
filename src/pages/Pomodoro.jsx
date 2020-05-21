import React, { useContext } from 'react'
import styled from 'styled-components/macro'

import TimePicker from '../components/pomodoro/TimePicker'
import Button from '../components/UI/Button'
import FocusMode from '../components/pomodoro/FocusMode'
import Info from '../components/pomodoro/Info'
import Heading from '../components/UI/Heading'
import DailyGoal from '../components/pomodoro/DailyGoal'

import { PomoContext } from '../context/pomoContext'
import { db } from '../utils/firebase'

const Pomodoro = () => {
  const [state, dispatch] = useContext(PomoContext)
  const { isModalOpen } = state

  const handlePomoStart = () => {
    dispatch({ type: 'POMO_START' })
  }

  db.collection('pomodoros')
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        console.log(doc.data())
      })
    })

  return (
    <>
      {isModalOpen && <FocusMode />}
      <PomoWrapper>
        <Heading>Pomodoro</Heading>
        <TimePicker />
        <StartButton onClick={handlePomoStart}>Start</StartButton>
        <Info />
        <DailyGoal />
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
