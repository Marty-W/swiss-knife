import React, { useContext, useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import styled from 'styled-components/macro'

import { PomoContext } from '../../context/pomoContext'

const TimerEstimate = ({ localSesh }) => {
  const [seshEnd, setSeshEnd] = useState()
  const [state] = useContext(PomoContext)
  const { isPaused } = state

  useEffect(() => {
    const now = DateTime.local()
    const seshEnds = now.plus(localSesh).toLocaleString(DateTime.TIME_SIMPLE)
    setSeshEnd(seshEnds)
  }, [localSesh, isPaused])

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
