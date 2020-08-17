import React, { useEffect } from 'react'
import styled from 'styled-components/macro'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useErrorHandler } from 'react-error-boundary'
import DayRow from './DayRow'
import Habit from './Habit'
import { generateDays } from '../../../utils/utils'
import { IFirebaseHabit } from '../../../utils/interfaces'
import Spinner from '../../UI/Spinner'
import useUserDocumentRef from '../../../hooks/useUserDocumentRef'

interface Props {
  toggleDetail: () => void
}

const HabitList: React.FC<Props> = ({ toggleDetail }) => {
  const habitList = useUserDocumentRef(
    'habitList',
  ) as firebase.firestore.CollectionReference
  const [habits, loading, error] = useCollectionData<IFirebaseHabit>(habitList)
  const errorHandler = useErrorHandler()
  const days = generateDays()

  useEffect(() => {
    error && errorHandler(error)
  }, [error, errorHandler])

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Wrapper>
          <DayRow days={days} />
          {!habits?.length && (
            <CtaText>Create your first habit to see the dashboard.</CtaText>
          )}
          {habits?.map((habit) => {
            const { color, name, id, timePoints, description } = habit
            return (
              <Habit
                days={days}
                color={color}
                name={name}
                id={id}
                key={id}
                timePoints={timePoints}
                description={description}
                toggleDetail={toggleDetail}
              />
            )
          })}
        </Wrapper>
      )}
    </>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  grid-template-rows: 4rem repeat(auto-fill, 3rem);
`

const CtaText = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  grid-row: 2 / span 1;
  grid-column: 2 / -1;
  margin-top: 2rem;
  justify-self: center;
`

export default HabitList
