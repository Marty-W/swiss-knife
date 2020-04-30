import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { Duration } from 'luxon'

import { useInterval } from '../../hooks/useInterval'

const Ticker = ({ duration, isPaused }) => {
  const [localSessionLength, setLocalSessionLength] = useState(() =>
    Duration.fromMillis(0)
  )

  useEffect(() => {
    setLocalSessionLength(duration)
  }, [duration])

  useInterval(() => {
    if (!isPaused) {
      setLocalSessionLength((prev) => {
        if (prev.as('milliseconds') > 0) {
          return prev.minus(1000)
        }
        return prev
      })
    }
  }, 1000)

  return <StyledTimeLeft>{localSessionLength.toFormat('mm:ss')}</StyledTimeLeft>
}

export default Ticker

const StyledTimeLeft = styled.span`
  color: ${(props) => props.theme.colors.dark};
  font-size: 1.8rem;
  margin: 1em;
  z-index: 10;
`
