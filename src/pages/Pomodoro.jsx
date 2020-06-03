import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components/macro'

import TimePicker from '../components/pomodoro/TimePicker'
import FocusMode from '../components/pomodoro/FocusMode'
import Info from '../components/pomodoro/Info'
import SectionHeading from '../components/UI/SectionHeading.styles'
import DailyGoalSetter from '../components/pomodoro/DailyGoalSetter'
import History from '../components/pomodoro/History'

import { PomoContext } from '../context/pomoContext'
import { AuthContext } from '../context/authContext'
import { db } from '../utils/firebase'
import useLocalStorage from '../hooks/useLocalStorage'

const Pomodoro = () => {
  const [entries, setEntries] = useState()
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
      <Wrapper>
        <TimerHeading>Pomodoro</TimerHeading>
        <TimePicker handlePomoStart={handlePomoStart} />
        <GoalHeading>Time Goal</GoalHeading>
        <DailyGoalSetter handleGoalSet={setIsGoalSet} />
        <HistoryHeading>History</HistoryHeading>
        <History />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  padding: 0 0.8em;
  grid-area: content;
  display: grid;
  grid-template-columns: minmax(2.5rem, 3rem) 1fr;
  grid-template-rows: 30% 20% 40%;
  grid-template-areas:
    'timerH timer'
    'goalH goal'
    'historyH history';
  grid-row-gap: 1.2em;
`
const TimerHeading = styled(SectionHeading)`
  grid-area: timerH;
`
const GoalHeading = styled(TimerHeading)`
  grid-area: goalH;
`
const HistoryHeading = styled(TimerHeading)`
  grid-area: historyH;
`

export default Pomodoro
