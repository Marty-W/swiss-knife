import React from 'react'
import styled from 'styled-components/macro'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import useCurrentUser from '~/hooks/useCurrentUser'
import { db } from '../../../firebase/firebase'
import DayRow from './DayRow'
import Habit from './Habit'
import { generateDays } from '../../../utils/utils'
import Spinner from '~/components/UI/Spinner'

export interface HabitInt {
  color: string
  days: string
  description: string
  id: string
  name: string
}

const HabitList: React.FC = () => {
  const user = useCurrentUser()
  const listRef = db.collection(`users/${user?.uid}/habitList`)
  const [habits, loading, error] = useCollectionData(listRef)
  const days = generateDays()
  return (
    <Wrapper>
      <DayRow days={days} />
      {loading ? (
        <Spinner />
      ) : (
        habits?.map((habit) => (
          <Habit habitName={habit.name} days={days} key={habit.id} />
        ))
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-template-rows: 3rem repeat(auto-fit, minmax(3rem, 1fr));
`

export default HabitList
