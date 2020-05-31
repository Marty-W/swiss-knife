import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import TimePicker from '../components/pomodoro/TimePicker'
import Button from '../components/UI/Button'
import FocusMode from '../components/pomodoro/FocusMode'
import Info from '../components/pomodoro/Info'
import Heading from '../components/UI/Heading'
import DailyGoal from '../components/pomodoro/DailyGoalSetter'

import { PomoContext } from '../context/pomoContext'
import { AuthContext } from '../context/authContext'
import { db } from '../utils/firebase'
import useLocalStorage from '../hooks/useLocalStorage'

const Pomodoro = () => {
  const [state, dispatch] = useContext(PomoContext)
  const { isModalOpen } = state
  const [isGoalSet, setIsGoalSet] = useLocalStorage(false, 'goalSet')
  const [dailyGoal, setDailyGoal] = useState(0)
  const [completedGoal, setCompletedGoal] = useState(0)
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      const { uid } = currentUser
      const fetchData = async () => {
        await db.doc(`users/${uid}/pomo/stats/`).onSnapshot((snapshot) => {
          setDailyGoal(snapshot.data().dailyGoal)
          setCompletedGoal(snapshot.data().completed)
        })
      }
      fetchData()
    }
  }, [currentUser])

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
