import React, { useState } from 'react'

import styled from 'styled-components/'

import NewTask from './NewTask'
import Plus from '../UI/Plus'
import Task from './Task'
import { ITask } from '../../utils/interfaces'

interface Props {
  tasks: ITask[]
  showCompleted: boolean
}

const TaskList: React.FC<Props> = ({ tasks, showCompleted }) => {
  const [isNewTask, setIsNewTask] = useState(false)
  const localTasks = handleLocalTasks(tasks)

  const removeNewTask = () => setIsNewTask(false)

  function handleLocalTasks(tasksArr: ITask[]) {
    const ordered = tasksArr.sort((a, b) => {
      if (a.done > b.done) return 1
      if (a.done < b.done) return -1

      return 0
    })
    if (!showCompleted) {
      return ordered.filter((task) => !task.done)
    }
    return ordered
  }

  return (
    <>
      <TaskListWrapper>
        {isNewTask && (
          <NewTask removeNewTask={removeNewTask} isNewTask={isNewTask} />
        )}
        {localTasks.map((entry: ITask) => {
          const { title, id, done, timestamp } = entry
          return (
            <Task
              key={id}
              title={title}
              done={done}
              timestamp={timestamp}
              id={id}
            />
          )
        })}
      </TaskListWrapper>
      {!isNewTask && <Plus onClick={() => setIsNewTask(true)} />}
    </>
  )
}

export const TaskListWrapper = styled.div`
  grid-area: tasks;
  display: grid;
  grid-row-gap: 1em;
  grid-auto-rows: minmax(3em, 3.5em);
  overflow: auto;
  text-align: center;
`

export default TaskList
