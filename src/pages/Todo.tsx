import React, { useState } from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import CountBox from '../components/todo/CountBox'
import Header from '../components/todo/Header'
import Stash from '../components/todo/Stash'
import TaskList from '../components/todo/TaskList'
import TodoNav from '../components/todo/TodoNav'
import Toggle from '../components/todo/Toggle'
import useTodoData from '../hooks/useTodoData'
import Spinner from '../components/UI/Spinner'

const Todo: React.FC = () => {
  const [tasks, loading] = useTodoData()
  const [showCompletedTasks, setShowCompletedTasks] = useState(true)
  const { path } = useRouteMatch()

  return (
    <Wrapper>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Header numTasks={tasks?.today.length} />
          <CountBox tasks={tasks?.today} type="scheduled" />
          <CountBox tasks={tasks?.stash} type="stashed" />
          <TodoNav />
          <TodayDate>{new Date().toLocaleDateString()}</TodayDate>
          <Switch>
            <Route exact path={path}>
              <Toggle
                show={showCompletedTasks}
                handleShow={setShowCompletedTasks}
              />
              <TaskList
                tasks={tasks?.today}
                showCompleted={showCompletedTasks}
              />
            </Route>
            <Route exact path={`${path}/stash`}>
              <Stash tasks={tasks?.stash} />
            </Route>
          </Switch>
        </>
      )}
    </Wrapper>
  )
}

export default Todo

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  grid-area: content;
  display: grid;
  grid-template-rows: 2fr 1.4fr 0.8fr 5vh 45vh;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  grid-template-areas:
    'header header'
    'tCount sCount'
    'todoNav todoNav'
    'date doneSwitch'
    'tasks tasks';

  @media (min-width: 750px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1.5fr 1.2fr 0.2fr 55%;
    grid-row-gap: 2rem;
    grid-template-areas:
      'header . tCount sCount'
      '. todoNav todoNav .'
      'date . . doneSwitch'
      'tasks tasks tasks tasks';
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1.5fr 1.2fr 0.2fr 55%;
    grid-row-gap: 2rem;
    grid-template-areas:
      'header header . . tCount sCount'
      '. . todoNav todoNav . .'
      '. date . . doneSwitch .'
      '. tasks tasks tasks tasks .';
  }
`

const TodayDate = styled.span`
  grid-area: date;
  align-self: center;
  font-size: 0.7rem;
`
