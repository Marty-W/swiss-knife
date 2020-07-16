import React, { useState } from 'react'
import Task from './Task'
import NewTask from './NewTask'
import Plus from '../UI/Plus.styles'
import styled from 'styled-components/macro'
import { TaskInt } from '../../pages/Todo'

interface Props {
  tasks: TaskInt[]
  showCompleted: boolean
}

const TaskList: React.FC<Props> = ({ tasks, showCompleted }) => {
  const [isNewTask, setIsNewTask] = useState(false)
  const localTasks = handleLocalTasks(tasks)

  const removeNewTask = () => setIsNewTask(false)

  function handleLocalTasks(tasks: TaskInt[]): TaskInt[] {
    const ordered = tasks.sort((a, b) => {
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
        {isNewTask && <NewTask removeNewTask={removeNewTask} />}
        {localTasks &&
          localTasks.map((entry: TaskInt) => {
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
      <Plus onClick={() => setIsNewTask(true)} />
    </>
  )
}

export const TaskListWrapper = styled.div`
  grid-area: tasks;
  display: grid;
  grid-row-gap: 1em;
  grid-auto-rows: minmax(3em, 3.5em);
  overflow: hidden;
  overflow-y: scroll;
`

export default TaskList
