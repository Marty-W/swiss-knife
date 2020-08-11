import { Link } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components/'
import { useToasts } from 'react-toast-notifications'
import { FirebaseError } from 'firebase'
import { v4 as uuid } from 'uuid'
import { db, firebase } from '../../../firebase/firebase'
import HabitCheck from './HabitCheck'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { IFirebaseHabit } from '../../../utils/interfaces'

interface Props extends IFirebaseHabit {
  toggleDetail: () => void
  days: Date[]
}

const Habit: React.FC<Props> = ({
  color,
  name,
  id,
  timePoints,
  description,
  toggleDetail,
  days,
}) => {
  const user = useCurrentUser()
  const dateArr = [...timePoints]
    .map((point) => point.toDate().getTime())
    .sort((a, b) => a - b)
    .reverse()
  const { addToast } = useToasts()

  const handleCheck = async (date: Date, checked: boolean) => {
    const habitRef = db.doc(`users/${user?.uid}/habitList/${id}`)

    if (!checked) {
      try {
        await habitRef.update({
          timePoints: firebase.firestore.FieldValue.arrayUnion(date),
        })
      } catch (err) {
        addToast((err as FirebaseError).message, { appearance: 'error' })
      }
    } else {
      try {
        await habitRef.update({
          timePoints: firebase.firestore.FieldValue.arrayRemove(date),
        })
      } catch (err) {
        addToast((err as FirebaseError).message, { appearance: 'error' })
      }
    }
  }

  return (
    <Wrapper>
      <HabitLink
        to={{
          pathname: `/habits/${id}`,
          state: {
            color,
            name,
            id,
            dateArr,
            description,
          } as const,
        }}
        onClick={toggleDetail}
      >
        <HabitName color={color}>{name}</HabitName>
      </HabitLink>
      <CheckWrapper>
        {days.map((date) => (
          <HabitCheck
            color={color}
            day={date}
            checked={dateArr.includes(date.getTime())}
            onCheck={handleCheck}
            key={uuid()}
          />
        ))}
      </CheckWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 5rem 1fr;
  grid-column: 1 / -1;
  grid-template-rows: 3rem;
`

const CheckWrapper = styled.div`
  display: grid;
  grid-column: 2 / -1;
  grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  grid-template-rows: 1fr;
  grid-auto-rows: 0px;
  grid-auto-columns: 0px;
  overflow: hidden;
`

const HabitLink = styled(Link)`
  grid-column: 1 / span 1;
  place-self: center;
`

const HabitName = styled.span<{
  color: string
}>`
  color: ${(props) => props.color};
`

export default Habit
