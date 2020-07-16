import React from 'react'
import styled from 'styled-components'

type Day = {
  key: string
  clicked: boolean
}

interface Props {
  onPick: (day: string) => void
  days: Day[]
}

const DayPicker: React.FC<Props> = ({ onPick, days }) => {
  return (
    <Wrapper>
      <label>When</label>
      {days.map((day) => (
        <Day
          key={day.key}
          isActive={day.clicked}
          onClick={() => onPick(day.key)}
        >
          {day.key}
        </Day>
      ))}
    </Wrapper>
  )
}

export default DayPicker

const Wrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  grid-column-gap: 0.2em;

  & label {
    align-self: start;
  }
`
const Day = styled.div<{ isActive: boolean }>`
  color: ${(props) => props.theme.colors.tertiary};
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.accent : props.theme.colors.secondary};
  cursor: pointer;
  user-select: none;
  align-self: end;
  text-align: center;
`
