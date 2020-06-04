/* eslint-disable consistent-return */
import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'

import DailyGoalGetter from './DailyGoalGetter'
import DailyGoalSetter from './DailyGoalSetter'

import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'

const DailyGoal = () => {
  const [isGoalSet, setIsGoalSet] = useState(false)
  const [dailyGoal, setDailyGoal] = useState()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser && isGoalSet) {
      return db.doc(`users/${currentUser.uid}/pomo/stats`).onSnapshot((doc) => {
        const dtServer = DateTime.fromMillis(doc.data().timestamp).day
        const dtNow = DateTime.local().day

        if (dtServer === dtNow) {
          setDailyGoal(doc.data().dailyGoal)
        } else {
          setIsGoalSet(false)
        }
      })
    }
  }, [isGoalSet, currentUser])

  return (
    <Wrapper>
      {isGoalSet ? (
        <DailyGoalGetter dailyGoal={dailyGoal} />
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

const Wrapper = styled.div`
  grid-area: goal;
`

export default DailyGoal
