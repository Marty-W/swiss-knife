import React, { useRef } from 'react'
import styled from 'styled-components/macro'
import Plus from '../components/UI/Plus.styles'

import { Route, useRouteMatch, useHistory } from 'react-router-dom'
import NewHabit from '../components/habits/NewHabit/NewHabit'
import HabitList from '~/components/habits/HabitList/HabitList'

const Habits: React.FC = () => {
  const match = useRouteMatch()
  const history = useHistory()

  return (
    <Wrapper>
      <Route path={`${match.path}/newHabit`}>
        <NewHabit />
      </Route>
      <HabitList />
      <Plus onClick={() => history.push(`${match.path}/newHabit`)} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: content;
`

export default Habits
