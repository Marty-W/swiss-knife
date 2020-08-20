import { format } from 'date-fns'

import React from 'react'
import styled from 'styled-components/macro'
import { v4 as uuid } from 'uuid'

interface Props {
  days: Date[]
}

const DayRow: React.FC<Props> = ({ days }) => (
  <>
    <Filler />
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
  </>
)

const Wrapper = styled.div`
  grid-column: 2 / -1;
  grid-row: 1 / span 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(3rem, 1fr));
  grid-template-rows: 1fr;
  grid-auto-rows: 0px;
  grid-auto-columns: 0px;
  overflow: hidden;
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom-right-radius: 8px;
  border-top-right-radius: 8px;
`

const Filler = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  grid-column: 1 / span 1;
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
`

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`

const Today = styled.span`
  font-weight: bold;
  color: ${(props) => props.theme.colors.accent};
  place-self: center;
`

const Date = styled.span``

const Month = styled.span``

export default DayRow
