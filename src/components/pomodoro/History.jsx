/* eslint-disable consistent-return */
import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'
import uuid from 'react-uuid'

import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'
import Card from '../UI/Card.styles'
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
    <Wrapper>
      <span>Started</span>
      <span>Ended</span>
      <span>Duration(m)</span>
      <span>Rating</span>
      {entries &&
        entries.map((entry) => {
          const { formattedStartTime, formattedEndTime, duration } = entry
          return (
            <Entry
              key={uuid()}
              start={formattedStartTime}
              end={formattedEndTime}
              dur={duration}
            />
          )
        })}
    </Wrapper>
  )
}

const Wrapper = styled(Card)`
  position: relative;
  grid-area: history;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(2rem, 3rem);
  place-items: center;

  & div:nth-child(odd) {
    background-color: ${(props) => props.theme.colors.primary};
  }
`

export default TimeEntries
