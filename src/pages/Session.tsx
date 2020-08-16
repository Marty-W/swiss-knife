import { Route, Switch, useRouteMatch } from 'react-router-dom'

import React from 'react'
import Modal from '../components/UI/Modal'
import SessionBreak from '../components/pomodoro/SessionBreak'
import SessionFocus from '../components/pomodoro/SessionFocus'
import useModal from '../hooks/useModal'

const Session: React.FC = () => {
  const match = useRouteMatch()
  const [isShowing, toggle] = useModal(true)
  return (
    <Modal
      isShowing={isShowing}
      hide={toggle}
      modalHeight="60vh"
      variant="session"
    >
      <>
        <Switch>
          <Route path={`${match.path}/focus`}>
            <SessionFocus />
          </Route>
          <Route path={`${match.path}/break`}>
            <SessionBreak />
          </Route>
        </Switch>
      </>
    </Modal>
  )
}

export default Session
