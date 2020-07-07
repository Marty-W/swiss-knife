import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Switch, Route, useRouteMatch } from 'react-router-dom'

import Header from '../components/todo/Header'
import CountBox from '../components/todo/CountBox'
import TodoNav from '~/components/todo/TodoNav'
import Toggle from '../components/todo/Toggle'
import TaskList from '~/components/todo/TaskList'
import Stash from '../components/todo/Stash'
import { db } from '../firebase/firebase'
import { useCurrentUser } from '~/context/AuthContext'

export interface TaskInt {
  title: string
  done: boolean
  timestamp: number
  id: string
}

type ServerTasks = TaskInt[] | firebase.firestore.DocumentData[] | []

const Todo: React.FC = () => {
  const [todayTasks, setTodayTasks] = useState<ServerTasks>([])
  const [stashedTasks, setStashedTasks] = useState<ServerTasks>([])
  const [showCompletedTasks, setShowCompletedTasks] = useState(true)
  const { path } = useRouteMatch()
  const user = useCurrentUser()

  useEffect(() => {
    if (user) {
      const taskListRef = db.collection(`users/${user?.uid}/taskList`)
      const unsubscribe = taskListRef.orderBy('done').onSnapshot((snap) => {
        if (snap.size) {
          const tasksToAdd = snap.docs.map((doc) => doc.data())
          const tasksToday = tasksToAdd.filter((task) => {
            if (!showCompletedTasks) {
              return !task.done && checkIfToday(task.timestamp)
            }
            return checkIfToday(task.timestamp)
          })
          const tasksStashed = tasksToAdd.filter(
            (task) => !checkIfToday(task.timestamp) && !task.done,
          )

          setTodayTasks(tasksToday)
          setStashedTasks(tasksStashed)
        }
      })
      return () => unsubscribe()
    }
  }, [user, showCompletedTasks])

  const checkIfToday = (date: number): boolean => {
    const today = new Date()
    const taskDate = new Date(date)
    return (
      taskDate.getDate() === today.getDate() &&
      taskDate.getMonth() === today.getMonth() &&
      taskDate.getFullYear() === today.getFullYear()
    )
  }

  return (
    <Wrapper>
      <Header numTasks={4} />
      <CountBox tasks={todayTasks as TaskInt[]} type="scheduled" />
      <CountBox tasks={stashedTasks as TaskInt[]} type="stashed" />
      <TodoNav />
      <TodayDate>{new Date().toLocaleDateString()}</TodayDate>
      <Switch>
        <Route exact path={path}>
          <Toggle
            show={showCompletedTasks}
            handleShow={setShowCompletedTasks}
          />
          <TaskList tasks={todayTasks as TaskInt[]} />
        </Route>
        <Route exact path={`${path}/stash`}>
          <Stash tasks={stashedTasks as TaskInt[]} />
        </Route>
      </Switch>
    </Wrapper>
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
