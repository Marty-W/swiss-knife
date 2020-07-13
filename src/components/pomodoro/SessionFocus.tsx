import React from 'react'
import styled from 'styled-components/macro'
import Ticker from './Ticker'
import TimerButtons from './TimerButtons'
import Quotes from './Quotes'
import { Wrapper } from './SessionBreak'
import SectionHeading from '../UI/SectionHeading.styles'

const SessionFocus: React.FC = () => {
  return (
    <SWrapper>
      <SectionHeading>Focus</SectionHeading>
      <Ticker />
      <TimerButtons />
      <Quotes />
    </SWrapper>
  )
}

const SWrapper = styled(Wrapper)`
  grid-template-areas:
    'heading .'
    'timer timer'
    'buttons buttons'
    'quotes quotes';
`

export default SessionFocus
