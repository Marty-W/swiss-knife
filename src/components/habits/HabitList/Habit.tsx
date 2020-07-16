import React from 'react'
import styled from 'styled-components/macro'
import { v4 as uuid } from 'uuid'
import HabitCheck from './HabitCheck'

interface Props {
  habitName: string
  days: Date[]
}

const Habit: React.FC<Props> = ({ days, habitName }) => {
  const cells = days.map((item) => (
    <Cell key={uuid()} id={item.getMilliseconds()}>
      <HabitCheck />
    </Cell>
  ))
  return (
    <Wrapper>
      <HabitName>{habitName}</HabitName>
      {cells}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 4rem 1fr;
  grid-auto-flow: column;
  grid-auto-columns: minmax(2.5rem, auto);
  place-items: center;
`

const HabitName = styled.span`
  grid-column: 1 / span 1;
`

const Cell = styled.div`
  /* border: 1px solid white; */
`

export default Habit
