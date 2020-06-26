import React from 'react'
import styled from 'styled-components'

import { PomoProvider, usePomo } from '../context/PomoContext'

import Modal from '../components/UI/Modal'
import SessionFocus from '../components/pomodoro/SessionFocus'
import SessionBreak from '../components/pomodoro/SessionBreak'

const Session: React.FC = () => {
  const [state] = usePomo()
  const { isPomo, isBreak } = state

  return (
    <PomoProvider>
      <Modal>
        <Wrapper>
          {isPomo && <SessionFocus />}
          {isBreak && <SessionBreak />}
        </Wrapper>
      </Modal>
    </PomoProvider>
  )
}

const Wrapper = styled.div`
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

export default Session
