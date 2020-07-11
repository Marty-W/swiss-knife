import React, { useEffect, useState } from 'react'
import { Duration } from 'luxon'

import styled from 'styled-components'
import { useInterval } from '../../hooks/useInterval'
import { db, firebase } from '../../firebase/firebase'
import TimerEstimate from './TimerEstimate'
import useCurrentUser from '../../hooks/useCurrentUser'
import { usePomo } from '../../context/PomoContext'

const Ticker: React.FC = () => {
  const [startTime] = useState(() => Date.now())
  const [localSessionLength, setLocalSessionLength] = useState(() =>
    Duration.fromMillis(0),
  )
  const currentUser = useCurrentUser()
  const [state, dispatch] = usePomo()
  const { duration, isRunning, isPaused, isBreak, isPomo } = state

  useEffect(() => {
    setLocalSessionLength(duration)
  }, [duration])

  useInterval(() => {
    if (isRunning && !isPaused) {
      setLocalSessionLength((prev) => {
        if (prev.as('milliseconds') > 0) {
          return prev.minus(1000)
        }
        return prev
      })
    }
    if (localSessionLength.as('milliseconds') === 0) {
      if (!isBreak && currentUser) {
        pushTimeEntries().catch((err) => console.log(err))
        addToTimeGoal().catch((err) => console.log(err))
      }

      isPomo
        ? dispatch({ type: 'POMO_FINISH' })
        : dispatch({ type: 'BREAK_FINISH' })
    }
  }, 100)

  const createTimeEntries = () => ({
    startTime,
    endTime: Date.now(),
    duration: duration.as('minutes'),
  })

  const pushTimeEntries = async () => {
    const entriesRef = db
      .collection(`users/${currentUser?.uid}/pomoEntries/`)
      .doc()
    const entry = createTimeEntries()
    await entriesRef.set({
      ...entry,
      id: entriesRef.id,
    })
  }

  const addToTimeGoal = async () => {
    await db.doc(`users/${currentUser?.uid}/pomoStats/stats`).update({
      completed: firebase.firestore.FieldValue.increment(
        duration.as('minutes'),
      ),
    })
  }

  return <StyledTicker>{localSessionLength.toFormat('mm:ss')}</StyledTicker>
}

export default Ticker

const StyledTicker = styled.span`
  color: ${(props) => props.theme.colors.tertiary};
  font-size: 2.3rem;
  margin: 1em;
`
