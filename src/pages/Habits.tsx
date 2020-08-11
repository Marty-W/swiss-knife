import { Route, Switch, useRouteMatch } from 'react-router-dom'

import React from 'react'
import styled from 'styled-components/'
import HabitDetail from '../components/habits/HabitList/HabitDetail'
import HabitList from '../components/habits/HabitList/HabitList'
import Modal from '../components/UI/Modal'
import NewHabit from '../components/habits/NewHabit/NewHabit'
import Plus from '../components/UI/Plus'
import useModal from '../hooks/useModal'

const Habits: React.FC = () => {
  const [newIsShowing, toggleNew] = useModal()
  const [detailIsShowing, toggleDetail] = useModal()
  const match = useRouteMatch()

  return (
    <Wrapper>
      <Switch>
        <Route path={`${match.path}/:id`}>
          <Modal
            isShowing={detailIsShowing}
            hide={toggleDetail}
            modalHeight="70vh"
          >
            <HabitDetail hide={toggleDetail} />
          </Modal>
        </Route>
      </Switch>
      <HabitList toggleDetail={toggleDetail} />
      <Modal isShowing={newIsShowing} hide={toggleNew} modalHeight="40vh">
        <NewHabit hide={toggleNew} />
      </Modal>
      <Plus onClick={toggleNew} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  grid-area: content;
`

export default Habits
