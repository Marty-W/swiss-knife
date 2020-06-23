/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/'
import { DateTime } from 'luxon'

import Card from '../UI/Card.styles'
import DailyGoalGetter from './DailyGoalGetter'
import DailyGoalSetter from './DailyGoalSetter'

import { db } from '../../utils/firebase'
import { useCurrentUser } from '~/context/AuthContext'

const DailyGoal: React.FC = () => {
  const [isGoalSet, setIsGoalSet] = useState(true)
  const [dailyGoal, setDailyGoal] = useState(0)
  const [completed, setCompleted] = useState(0)
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (currentUser) {
      return db.doc(`users/${currentUser.uid}/pomo/stats`).onSnapshot((doc) => {
        const data = doc.data()
        if (data) {
          const dtServer = DateTime.fromMillis(data.timestamp).day
          const dtNow = DateTime.local().day

          if (dtServer === dtNow) {
            setDailyGoal(data.dailyGoal)
            setCompleted(data.completed)
          } else {
            setIsGoalSet(false)
          }
        }
      })
    }
  }, [currentUser])

  return (
    <Wrapper>
      {isGoalSet && dailyGoal ? (
        <DailyGoalGetter
          dailyGoal={dailyGoal}
          completed={completed}
          setIsGoalSet={setIsGoalSet}
        />
      ) : (
        <DailyGoalSetter setIsGoalSet={setIsGoalSet} />
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  grid-area: goal;
`

export default DailyGoal
