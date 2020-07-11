import React, { useState } from 'react'
import styled from 'styled-components'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Header from '../components/todo/Header'
import CountBox from '../components/todo/CountBox'
import TodoNav from '../components/todo/TodoNav'
import Toggle from '../components/todo/Toggle'
import TaskList from '../components/todo/TaskList'
import Stash from '../components/todo/Stash'
import Spinner from '../components/UI/Spinner'
import useTodos from '../hooks/useTodos'

export interface TaskInt {
  title: string
  done: boolean
  timestamp: number
  id: string
}

const Todo: React.FC = () => {
  const [tasks, loading, error] = useTodos()
  const [showCompletedTasks, setShowCompletedTasks] = useState(true)
  const { path } = useRouteMatch()

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Wrapper>
          <Header numTasks={4} />
          <CountBox tasks={tasks.today} type="scheduled" />
          <CountBox tasks={tasks.stash} type="stashed" />
          <TodoNav />
          <TodayDate>{new Date().toLocaleDateString()}</TodayDate>
          <Switch>
            <Route exact path={path}>
              <Toggle
                show={showCompletedTasks}
                handleShow={setShowCompletedTasks}
              />
              <TaskList
                tasks={tasks.today}
                showCompleted={showCompletedTasks}
              />
            </Route>
            <Route exact path={`${path}/stash`}>
              <Stash tasks={tasks.stash} />
            </Route>
          </Switch>
        </Wrapper>
      )}
    </>
  )
}

export default Todo

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  overflow-y: scroll;
  grid-area: content;
  display: grid;
  grid-template-rows: 2fr 1.2fr 0.8fr 0.2fr 55%;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1em;
  grid-template-areas:
    'header header'
    'tCount sCount'
    'todoNav todoNav'
    'date doneSwitch'
    'tasks tasks';
`

const TodayDate = styled.span`
  grid-area: date;
  align-self: center;
  font-size: 0.7rem;
`
