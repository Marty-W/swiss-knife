/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components/'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

import { db } from '../../utils/firebase'
import Card from '../UI/Card.styles'
import Entry from './Entry'
import { useCurrentUser } from '~/context/AuthContext'

interface EntryInt {
  formattedStartTime: string
  formattedEndTime: string
  duration: number
}

const TimeEntries: React.FC = () => {
  const [entries, setEntries] = useState<EntryInt[] | undefined>()
  const currentUser = useCurrentUser()

  useEffect(() => {
    if (currentUser) {
      const { uid } = currentUser
      return db.doc(`users/${uid}/pomo/timeEntries`).onSnapshot((snapshot) => {
        const entriesData = snapshot?.data()?.timeEntries
        entriesData.map(
          (entry: {
            startTime: number
            endTime: number
            durationInMinutes: number
          }) => {
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
          }
        )
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
              key={uuidv4()}
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
