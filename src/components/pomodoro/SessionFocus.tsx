import React from 'react'
import styled from 'styled-components/macro'
import { SessionHeader, SessionWrapper } from './SessionBreak'

import Ticker from './Ticker'
import TimerButtons from './TimerButtons'

const SessionFocus: React.FC = () => (
  <SWrapper>
    <SessionHeader>Focus</SessionHeader>
    <Ticker />
    <TimerButtons />
  </SWrapper>
)

const SWrapper = styled(SessionWrapper)``

export default SessionFocus
