import React from 'react'
import styled from 'styled-components/macro'
import Ticker from './Ticker'
import TimerButtons from './TimerButtons'
import Quotes from './Quotes'

const SessionFocus: React.FC = () => {
  return (
    <>
      <FocusHeader>Focus...</FocusHeader>
      <Ticker />
      <TimerButtons />
      <Quotes />
    </>
  )
}

const FocusHeader = styled.h2`
  font-family: ${(props) => props.theme.fonts.secondary};
  font-size: 2rem;
`

export default SessionFocus
