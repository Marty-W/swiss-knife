import React, { useContext, useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import styled from 'styled-components/macro'

import { PomoContext } from '../../context/pomoContext'

const TimerEstimate = () => {
  const [seshEnd, setSeshEnd] = useState()
  const [state] = useContext(PomoContext)
  const { duration } = state

  useEffect(() => {
    const now = DateTime.local()
    const seshEnds = now.plus(duration).toLocaleString(DateTime.TIME_SIMPLE)
    setSeshEnd(seshEnds)
  }, [duration])

  return (
    <>
      <StyledEstimate>Timer ends at: {seshEnd}</StyledEstimate>
    </>
  )
}

const StyledEstimate = styled.span`
  color: ${(props) => props.theme.colors.white};
  position: fixed;
  top: 0.2em;
  right: 0.2em;
  padding: 0.5em;
`

export default TimerEstimate
