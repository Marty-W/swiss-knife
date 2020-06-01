/* eslint-disable consistent-return */
import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'

import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'

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
    <Wrapper>
      <StyledList>
        <span>Started</span>
        <span>Ended</span>
        <span>Length</span>
        {entries &&
          entries.map((entry) => (
            <TimeEntry key={entry.formattedStartTime}>
              <span>{entry.formattedStartTime}</span>
              <span> {entry.formattedEndTime}</span>
              <span> {entry.duration} minutes</span>
            </TimeEntry>
          ))}
      </StyledList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  color: ${(props) => props.theme.colors.dark};
  background: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  padding: 0.5em;
`

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 1fr;
`

const TimeEntry = styled.li`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  span:nth-child(1) {
    grid-column: 1/2;
  }
`

export default TimeEntries
