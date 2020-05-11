import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components/macro'
import { Duration } from 'luxon'

import { useInterval } from '../../hooks/useInterval'
import { PomoContext } from '../../context/pomoContext'

const Ticker = () => {
  const [localSessionLength, setLocalSessionLength] = useState(() =>
    Duration.fromMillis(0)
  )
  const [state] = useContext(PomoContext)
  const { duration, isPomoRunning } = state

  useEffect(() => {
    setLocalSessionLength(duration)
  }, [duration])

  useInterval(() => {
    if (isPomoRunning) {
      setLocalSessionLength((prev) => {
        if (prev.as('milliseconds') > 0) {
          return prev.minus(1000)
        }
        return prev
      })
    }
  }, 1000)

  return <StyledTicker>{localSessionLength.toFormat('mm:ss')}</StyledTicker>
}

export default Ticker

const StyledTicker = styled.span`
  color: ${(props) => props.theme.colors.dark};
  font-size: 1.8rem;
  margin: 1em;
`
