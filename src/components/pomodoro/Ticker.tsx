import 'react-circular-progressbar/dist/styles.css'

import React, { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import styled from 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { useErrorHandler } from 'react-error-boundary'
import { firebase } from '../../firebase/firebase'
import useInterval from '../../hooks/useInterval'
import { usePomo } from '../../context/PomoContext'
import useUserDocumentRef from '../../hooks/useUserDocumentRef'

const Ticker: React.FC = () => {
  const [state, dispatch] = usePomo()
  const { duration, isPaused, isBreak, isPomo } = state
  const [localSessionLength, setLocalSessionLength] = useState(duration)
  const [startTime] = useState(() => Date.now())
  const history = useHistory()
  const errorHandler = useErrorHandler()
  const entriesRef = useUserDocumentRef(
    'pomoEntries',
  ) as firebase.firestore.CollectionReference
  const goalRef = useUserDocumentRef(
    'pomoGoal',
  ) as firebase.firestore.DocumentReference

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
      if (!isBreak) {
        pushTimeEntries().catch((err) => errorHandler(err))
        addToTimeGoal().catch((err) => errorHandler(err))
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
    const newEntryDoc = entriesRef.doc()
    const entry = createTimeEntries()
    await newEntryDoc.set({
      ...entry,
      id: newEntryDoc.id,
    })
  }

  const addToTimeGoal = async () => {
    await goalRef.update({
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
