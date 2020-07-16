import React from 'react'
import styled from 'styled-components/macro'
import { eachDayOfInterval, sub, format } from 'date-fns'
import { v4 as uuid } from 'uuid'

interface Props {
  days: Date[]
}

const DayRow: React.FC<Props> = ({ days }) => {
  return (
    <Wrapper>
      {days.map((day, index) => {
        const parsedDate = format(day, 'd')
        const parsedMonth = format(day, 'LLL')
        return index === 0 ? (
          <Today key={uuid()}>Today</Today>
        ) : (
          <DayWrapper key={uuid()}>
            <Date>{parsedDate}</Date>
            <Month>{parsedMonth}</Month>
          </DayWrapper>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-column: 2 / -1;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(2.5rem, auto);
  overflow: hidden;
`

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Today = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.accent};
  place-self: center;
`

const Date = styled.span``

const Month = styled.span``

export default DayRow
