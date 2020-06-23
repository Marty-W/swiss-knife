import React from 'react'
import styled from 'styled-components'

import Modal from '../components/UI/Modal'
import Ticker from '../components/pomodoro/Ticker'
import TimePicker from '../components/pomodoro/TimePicker'
import TimerHeading from '../components/pomodoro/TimerHeading'
import TimerButtons from '../components/pomodoro/TimerButtons'
import Quotes from '../components/pomodoro/Quotes'
import { usePomo } from '~/context/PomoContext'

const FocusMode: React.FC = () => {
  const [state] = usePomo()
  const { isRunning } = state

  return (
    <Modal>
      <FocusWrapper>
        <TimerHeading />
        {isRunning ? <Ticker /> : <TimePicker />}
        <TimerButtons />
        <Quotes />
      </FocusWrapper>
    </Modal>
  )
}

const FocusWrapper = styled.div`
  background: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: relative;

  & > * {
    z-index: 10;
  }
`

export default FocusMode
