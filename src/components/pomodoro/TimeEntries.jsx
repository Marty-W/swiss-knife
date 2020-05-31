import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/macro'

import { db } from '../../utils/firebase'
import { AuthContext } from '../../context/authContext'

const TimeEntries = () => {
  const [entries, setEntries] = useState()
  const { currentUser } = useContext(AuthContext)

  useEffect(() => {
    if (currentUser) {
      const { uid } = currentUser
      const fetchData = async () => {
        try {
          await db
            .doc(`users/${uid}/pomo/timeEntries`)
            .onSnapshot((snapshot) => {
              setEntries(snapshot.data().timeEntries)
            })
        } catch (err) {
          console.log(err)
        }
      }
      fetchData()
    }
  }, [currentUser])

  return (
    <Wrapper>
      {entries &&
        entries.map((entry) => (
          <>
            <span>
              Start : {new Date(entry.startTime).toLocaleTimeString()}
            </span>
            <span>End : {new Date(entry.endTime).toLocaleTimeString()}</span>
            <span>Duration : {entry.durationInMinutes} minutes</span>
          </>
        ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.colors.dark};
  background: ${(props) => props.theme.colors.white};
`

export default TimeEntries
