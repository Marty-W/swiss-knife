import { useLocation, useHistory } from 'react-router-dom'
import { endOfYear, format, startOfYear } from 'date-fns'
import React from 'react'
import { ResponsiveCalendar, CalendarDatum } from '@nivo/calendar'
import styled, { useTheme } from 'styled-components/macro'
import { useErrorHandler } from 'react-error-boundary'
import Button from '../../UI/Button'
import HabitStreaks from './HabitStreaks'
import { IHabitDetail } from '../../../utils/interfaces'
import useUserDocumentRef from '../../../hooks/useUserDocumentRef'

interface Props {
  hide: () => void
}

const HabitDetail: React.FC<Props> = ({ hide }) => {
  const { state } = useLocation<IHabitDetail>()
  const { color, name, id, dateArr, description } = state
  const theme = useTheme()
  const history = useHistory()
  const habitRef = useUserDocumentRef(
    'habitList',
  ) as firebase.firestore.CollectionReference
  const errorHandler = useErrorHandler()

  const deleteHabit = async (habitId: string) => {
    const habitToDelete = habitRef.doc(habitId)
    try {
      await habitToDelete.delete()
      history.push('/habits')
      hide()
    } catch (err) {
      errorHandler(err)
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
          tooltip={({ day }) => (
            <strong style={{ color: '#101119' }}>{day}</strong>
          )}
          theme={{ labels: { text: { fill: '#ffffff' } } }}
        />
      </CalendarWrapper>
      <ButtonWrapper>
        <Button onClick={() => deleteHabit(id)} variant="primary">
          Delete Habit
        </Button>
      </ButtonWrapper>
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

  & button {
    grid-area: button;
  }
`

const ButtonWrapper = styled.div`
  grid-area: button;
  display: flex;
  justify-content: center;
  width: 100%;
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

export default HabitDetail
