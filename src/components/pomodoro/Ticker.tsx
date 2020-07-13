import React, { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import styled from 'styled-components'
import { useInterval } from '../../hooks/useInterval'
import { db, firebase } from '../../firebase/firebase'
import useCurrentUser from '../../hooks/useCurrentUser'
import { usePomo } from '../../context/PomoContext'
import { useHistory } from 'react-router-dom'

const Ticker: React.FC = () => {
  const [state, dispatch] = usePomo()
  const { duration, isPaused, isBreak, isPomo } = state
  const [localSessionLength, setLocalSessionLength] = useState(duration)
  const [startTime] = useState(() => Date.now())
  const currentUser = useCurrentUser()
  const history = useHistory()

  useInterval(() => {
    if (!isPaused) {
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

      if (isPomo) {
        dispatch({ type: 'POMO_FINISH' })
        history.push(`/session/break`)
      } else {
        dispatch({ type: 'BREAK_FINISH' })
        history.push('/pomodoro')
      }
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

  const calculatePercentage = () => {
    const max = duration.as('millisecond')
    const now = localSessionLength.as('millisecond')

    return (now / max) * 100
  }

  return (
    <ProgressBar
      value={calculatePercentage()}
      text={localSessionLength.toFormat('mm:ss')}
      styles={{
        path: {
          stroke: isPomo ? '#F02D3A' : '#008148',
        },
        text: {
          fill: isPomo ? '#F02D3A' : '#008148',
        },
      }}
    />
  )
}

const ProgressBar = styled(CircularProgressbar)`
  grid-area: timer;
  padding: 2em;
`

export default Ticker
