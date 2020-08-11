import { useLocation } from 'react-router-dom'
import { endOfYear, format, startOfYear } from 'date-fns'
import { useToasts } from 'react-toast-notifications'
import React from 'react'
import { FirebaseError } from 'firebase'
import { ResponsiveCalendar, CalendarDatum } from '@nivo/calendar'
import styled, { useTheme } from 'styled-components/'
import Button from '../../UI/Button'
import HabitStreaks from './HabitStreaks'
import { db } from '../../../firebase/firebase'
import useCurrentUser from '../../../hooks/useCurrentUser'
import { IHabitDetail } from '../../../utils/interfaces'

interface Props {
  hide: () => void
}

const HabitDetail: React.FC<Props> = ({ hide }) => {
  const { state } = useLocation<IHabitDetail>()
  const { color, name, id, dateArr, description } = state
  const theme = useTheme()
  const user = useCurrentUser()
  const { addToast } = useToasts()

  const deleteHabit = async (habitId: string) => {
    const habitRef = db.doc(`users/${user?.uid}/habitList/${habitId}`)

    try {
      await habitRef.delete()
      hide()
    } catch (err) {
      addToast((err as FirebaseError).message, { appearance: 'error' })
    }
  }

  const formatTimePoints = (timePoints: number[]) => {
    if (timePoints) {
      return timePoints.map((timePoint) => {
        const toDate = new Date(timePoint)
        const formatted = format(toDate, 'yyyy-MM-dd')
        return {
          day: formatted,
          value: 1,
        }
      })
    }
    return null
  }

  return (
    <Wrapper>
      <HabitName color={color}>{name}</HabitName>
      <HabitStreaks timePoints={dateArr} habitColor={color} />
      <Description color={color}>
        <span>Description:</span>
        <p>{description}</p>
      </Description>
      <CalendarWrapper>
        <ResponsiveCalendar
          data={formatTimePoints(dateArr) as CalendarDatum[]}
          from={format(startOfYear(new Date()), 'yyyy-MM-dd')}
          to={format(endOfYear(new Date()), 'yyyy-MM-dd')}
          direction="vertical"
          colors={[color]}
          emptyColor={theme.colors.primary}
          dayBorderColor={theme.colors.secondary}
          monthBorderWidth={0}
          monthLegendOffset={12}
          theme={{ legends: { text: { color: theme.colors.tertiary } } }}
          tooltip={({ day }) => (
            <strong style={{ color: '#101119' }}>{day}</strong>
          )}
        />
      </CalendarWrapper>
      <DeleteBtn
        color={color}
        onClick={() => deleteHabit(id)}
        variant="primary"
      >
        Delete Habit
      </DeleteBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 0.1fr 1fr 0.2fr 0.1fr;
  grid-row-gap: 1rem;
  grid-template-columns: 1fr 0.7fr;
  grid-template-areas:
    'name cal'
    'streaks cal'
    'desc cal'
    'button cal';
`

const CalendarWrapper = styled.div`
  grid-area: cal;
`

const HabitName = styled.h2`
  color: ${(props) => props.color};
  font-size: 1.3rem;
  grid-area: name;
`

const Description = styled.div`
  grid-area: desc;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.color};
  border-radius: 10px;
  & span {
    align-self: start;
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
  }
`

const DeleteBtn = styled(Button)<{ color: string }>`
  grid-area: button;
  place-self: center;
`

export default HabitDetail
