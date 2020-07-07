/* eslint-disable consistent-return */
import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components/macro'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

import { db } from '../../firebase/firebase'
import Card from '../UI/Card.styles'
import Entry from './Entry'
import { useCurrentUser } from '../../context/AuthContext'

interface EntryInt {
  startTime: string
  endTime: string
  duration: number
}

type QueryInt = 'today' | 'yesterday' | 'all'

const History: React.FC = () => {
  const user = useCurrentUser()
  const [entries, setEntries] = useState<EntryInt[]>([])
  const [query, setQuery] = useState<QueryInt>('today')

  useEffect(() => {
    if (user) {
      return db
        .collection(`users/${user?.uid}/pomoEntries`)
        .onSnapshot((snapshot) => {
          if (snapshot.size) {
            const entries = snapshot.docs.map((doc) => doc.data())
            const filtred = entries.filter((entry) => filterEntries(entry))
            const formatted = filtred.map((entry) => formatEntry(entry))
            setEntries(formatted)
          }
        })
    } else {
      setEntries([])
    }
  }, [user, query])

  const formatEntry = (entry: firebase.firestore.DocumentData) => {
    const formattedStartTime = DateTime.fromMillis(
      +entry.startTime,
    ).toLocaleString(DateTime.TIME_24_SIMPLE)
    const formattedEndTime = DateTime.fromMillis(+entry.endTime).toLocaleString(
      DateTime.TIME_24_SIMPLE,
    )

    return {
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      duration: entry.duration,
    }
  }

  const filterEntries = (entry: firebase.firestore.DocumentData) => {
    const todayStart = DateTime.local().startOf('day')
    const todayEnd = todayStart.endOf('day')
    const yesterdayStart = todayStart.minus({ day: 1 })
    const yesterDayEnd = yesterdayStart.endOf('day')
    switch (query) {
      case 'today':
        return (
          entry.startTime > todayStart.toMillis() &&
          entry.endTime < todayEnd.toMillis()
        )
      case 'yesterday':
        return (
          entry.startTime > yesterdayStart.toMillis() &&
          entry.endTime < yesterDayEnd.toMillis()
        )
      default:
        return true
    }
  }

  return (
    <Wrapper>
      <Options onChange={(e) => setQuery(e.target.value)}>
        <label>
          <input type="radio" name="options" value="today" defaultChecked />
          Today
        </label>
        <label>
          <input type="radio" name="options" value="yesterday" />
          Yesterday
        </label>
        <label>
          <input type="radio" name="options" value="all" />
          All
        </label>
      </Options>
      <ColWrapper>
        <span>Started</span>
        <span>Ended</span>
        <span>Duration(m)</span>
        <span>Rating</span>
      </ColWrapper>
      {!user && <p>Log in to view your past sessions.</p>}
      <EntriesWrapper>
        {entries &&
          entries.map((entry) => {
            const { startTime, endTime, duration } = entry
            return (
              <Entry
                key={uuidv4()}
                start={startTime}
                end={endTime}
                dur={duration}
              />
            )
          })}
      </EntriesWrapper>
    </Wrapper>
  )
}

//FIXME history styling

const Wrapper = styled(Card)`
  grid-area: history;
`

const EntriesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: minmax(2rem, 3rem);
  place-items: center;
  max-height: 100%;
  overflow-y: scroll;
  & div:nth-child(even) {
    background-color: ${(props) => props.theme.colors.primary};
  }
`

const ColWrapper = styled.div`
  width: 100%;
  grid-column: span 4;
  grid-row: 2;
  display: flex;
  justify-content: space-evenly;
`

const Options = styled.div`
  width: 100%;
  grid-column: span 4;
  grid-row: 1;
  display: flex;
  justify-content: start;
  margin-bottom: 0.7em;
`

export default History
