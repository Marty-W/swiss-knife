import React from 'react'
import styled from 'styled-components/'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import DayRow from './DayRow'
import Habit from './Habit'
import { db } from '../../../firebase/firebase'
import { generateDays } from '../../../utils/utils'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { IFirebaseHabit } from '../../../utils/interfaces'
import Spinner from '../../UI/Spinner'

interface Props {
  toggleDetail: () => void
}

const HabitList: React.FC<Props> = ({ toggleDetail }) => {
  const user = useCurrentUser()
  const listRef = db.collection(`users/${user?.uid}/habitList`)
  const [habits, loading] = useCollectionData<IFirebaseHabit>(listRef)
  const days = generateDays()
  return (
    <Wrapper>
      <DayRow days={days} />
      {!habits?.length && (
        <CtaText>Create your first habit to see the dashboard.</CtaText>
      )}
      {loading ? (
        <Spinner />
      ) : (
        habits?.map((habit) => {
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
        })
      )}
    </Wrapper>
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
