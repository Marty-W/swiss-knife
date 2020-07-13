import React from 'react'
import styled from 'styled-components'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Modal from '../components/UI/Modal'
import SessionFocus from '../components/pomodoro/SessionFocus'
import SessionBreak from '../components/pomodoro/SessionBreak'

const Session: React.FC = () => {
  const match = useRouteMatch()

  return (
    <Modal>
      <Wrapper>
        <Switch>
          <Route path={`${match.path}/focus`}>
            <SessionFocus />
          </Route>
          <Route path={`${match.path}/break`}>
            <SessionBreak />
          </Route>
        </Switch>
      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.primary};
  width: 100%;
  height: 100%;
  & > * {
    z-index: 10;
  }
`

export default Session
