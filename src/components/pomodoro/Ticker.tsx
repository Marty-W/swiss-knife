import 'react-circular-progressbar/dist/styles.css'

import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import { CircularProgressbar } from 'react-circular-progressbar'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { FirebaseError } from 'firebase'
import useCurrentUser from '../../hooks/useCurrentUser'
import { db, firebase } from '../../firebase/firebase'
import useInterval from '../../hooks/useInterval'
import { usePomo } from '../../context/PomoContext'

const Ticker: React.FC = () => {
  const [state, dispatch] = usePomo()
  const { duration, isPaused, isBreak, isPomo } = state
  const [localSessionLength, setLocalSessionLength] = useState(duration)
  const [startTime] = useState(() => Date.now())
  const { addToast } = useToasts()
  const currentUser = useCurrentUser()
  const history = useHistory()

  useInterval(() => {
    if (!isPaused) {
      setLocalSessionLength((prev: typeof localSessionLength) => {
        if (prev.as('milliseconds') > 0) {
          return prev.minus(1000)
        }
        return prev
      })
    }
    if (localSessionLength.as('milliseconds') === 0) {
      if (!isBreak && currentUser) {
        pushTimeEntries().catch((err) =>
          addToast((err as FirebaseError).message, { appearance: 'error' }),
        )
        addToTimeGoal().catch((err) =>
          addToast((err as FirebaseError).message, { appearance: 'error' }),
        )
      }

      if (isPomo) {
        dispatch({ type: 'POMO_FINISH' })
        history.push(`/session/break`)
      } else {
        dispatch({ type: 'BREAK_FINISH' })
        history.push('/pomodoro')
      }
    }
  }, 1000)

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
    await db.doc(`users/${currentUser?.uid}/pomoGoal/goal`).update({
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
    <ProgressBar>
      <CircularProgressbar
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
    </ProgressBar>
  )
}

const ProgressBar = styled.div`
  grid-area: timer;

  & svg {
    width: 100%;
    height: 100%;
  }
`

export default Ticker
