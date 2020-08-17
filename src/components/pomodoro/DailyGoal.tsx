import React, { useEffect, useState } from 'react'
import { isToday } from 'date-fns'
import styled from 'styled-components/macro'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useErrorHandler } from 'react-error-boundary'
import { IPomoGoal } from '../../utils/interfaces'
import CardWithHeader from '../UI/CardWithHeader'
import DailyGoalGetter from './DailyGoalGetter'
import DailyGoalSetter from './DailyGoalSetter'
import { db } from '../../firebase/firebase'
import useCurrentUser from '../../hooks/useCurrentUser'
import Spinner from '../UI/Spinner'

const DailyGoal: React.FC = () => {
  const user = useCurrentUser()
  const [goalData, loading, error] = useDocumentData<IPomoGoal>(
    db.doc(`users/${user?.uid}/pomoGoal/goal`),
  )
  const [isGoalSet, setIsGoalSet] = useState(true)
  const errorHandler = useErrorHandler()

  useEffect(() => {
    if (error) {
      errorHandler(error)
    }

    if (goalData) {
      if (!isToday(goalData.timestamp) && !(goalData.dailyGoal > 0)) {
        setIsGoalSet(false)
      }
    }
  }, [loading, goalData, error, errorHandler])

  return (
    <Wrapper header="Daily Goal" gridArea="goal">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {isGoalSet && goalData ? (
            <DailyGoalGetter
              dailyGoal={goalData.dailyGoal}
              completed={goalData.completed ? goalData.completed : 0}
              onGoalSet={setIsGoalSet}
            />
          ) : (
            <DailyGoalSetter onGoalSet={setIsGoalSet} />
          )}
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(CardWithHeader)`
  grid-area: goal;
  position: relative;
`
export default DailyGoal
