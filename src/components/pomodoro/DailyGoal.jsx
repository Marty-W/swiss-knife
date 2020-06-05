/* eslint-disable consistent-return */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'

import Card from '../UI/Card.styles'
import DailyGoalGetter from './DailyGoalGetter'
import DailyGoalSetter from './DailyGoalSetter'

import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'

const DailyGoal = () => {
  const [isGoalSet, setIsGoalSet] = useState(true)
  const [dailyGoal, setDailyGoal] = useState()
  const [completed, setCompleted] = useState()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      return db.doc(`users/${currentUser.uid}/pomo/stats`).onSnapshot((doc) => {
        const dtServer = DateTime.fromMillis(doc.data().timestamp).day
        const dtNow = DateTime.local().day

        if (dtServer === dtNow) {
          setDailyGoal(doc.data().dailyGoal)
          setCompleted(doc.data().completed)
        } else {
          setIsGoalSet(false)
        }
      })
    }
  }, [currentUser])

  return (
    <Wrapper>
      {isGoalSet && dailyGoal ? (
        <DailyGoalGetter dailyGoal={dailyGoal} completed={completed} />
      ) : (
        <DailyGoalSetter
          dailyGoal={dailyGoal}
          setDailyGoal={setDailyGoal}
          setIsGoalSet={setIsGoalSet}
        />
      )}
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  grid-area: goal;
`

export default DailyGoal
