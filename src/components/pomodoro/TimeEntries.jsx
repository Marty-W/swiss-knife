/* eslint-disable consistent-return */
import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'

import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'
import Card from '../UI/Card'
import Entry from './Entry'

const TimeEntries = () => {
  const [entries, setEntries] = useState([])
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      const { uid } = currentUser
      return db.doc(`users/${uid}/pomo/timeEntries`).onSnapshot((snapshot) => {
        const entriesData = snapshot.data().timeEntries
        entriesData.map((entry) => {
          const formattedStartTime = DateTime.fromMillis(
            +entry.startTime
          ).toLocaleString(DateTime.TIME_24_SIMPLE)
          const formattedEndTime = DateTime.fromMillis(
            +entry.endTime
          ).toLocaleString(DateTime.TIME_24_SIMPLE)

          return setEntries((prev) => [
            ...prev,
            {
              formattedStartTime,
              formattedEndTime,
              duration: entry.durationInMinutes,
            },
          ])
        })
      })
    }
  }, [currentUser])

  return (
    <StyledCard>
      <StyledHeading>Session History</StyledHeading>
      <StyledList>
        <StyledHead>
          <span>Started</span>
          <span>Ended</span>
          <span>Length</span>
        </StyledHead>
        {entries &&
          entries.map((entry) => {
            const { formattedStartTime, formattedEndTime, duration } = entry
            return (
              <Entry
                key={new Date()}
                start={formattedStartTime}
                end={formattedEndTime}
                dur={duration}
              />
            )
          })}
      </StyledList>
    </StyledCard>
  )
}

const StyledCard = styled(Card)`
  color: ${(props) => props.theme.colors.white};
`

const StyledHeading = styled.h2`
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 0.5em;
  font-weight: bold;
  letter-spacing: 1.6px;
`

const StyledList = styled.div`
  display: grid;
  grid-template-columns: minmax(10px, 50px) repeat(3, 1fr);
  grid-auto-rows: minmax(25px, 1fr);
  grid-row-gap: 10px;
`

const StyledHead = styled.div`
  grid-column: 2 / -1;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  color: ${(props) => props.theme.colors.red};
  font-size: 1.2rem;
`

export default TimeEntries
