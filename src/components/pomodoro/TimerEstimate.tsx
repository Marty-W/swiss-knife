import React, { useEffect, useState } from 'react'
import { DateTime, Duration } from 'luxon'
import styled from 'styled-components/'
import { usePomo } from '~/context/PomoContext'

interface Props {
  localSesh: Duration
}

const TimerEstimate: React.FC<Props> = ({ localSesh }) => {
  const [seshEnd, setSeshEnd] = useState('')
  const [state] = usePomo()
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
  color: ${(props) => props.theme.colors.tertiary};
  position: fixed;
  top: 0.2em;
  right: 0.2em;
  padding: 0.5em;
`

export default TimerEstimate
