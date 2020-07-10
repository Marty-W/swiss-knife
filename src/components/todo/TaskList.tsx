import React, { useState, useEffect } from 'react'
import styled from 'styled-components/macro'
import { AiFillPlusCircle } from 'react-icons/ai'
import Task from './Task'
import NewTask from './NewTask'

import { TaskInt } from '../../pages/Todo'

interface Props {
  tasks: TaskInt[]
  showCompleted: boolean
}

const TaskList: React.FC<Props> = ({ tasks, showCompleted }) => {
  const [isNewTask, setIsNewTask] = useState(false)
  const localTasks = filterCompletedTasks(tasks)

  const removeNewTask = () => setIsNewTask(false)

  function filterCompletedTasks(tasks: TaskInt[]): TaskInt[] {
    if (!showCompleted) {
      return tasks.filter((task) => !task.done)
    }
    return tasks
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

const Plus = styled(AiFillPlusCircle)`
  fill: ${(props) => props.theme.colors.accent};
  font-size: 2.4rem;
  cursor: pointer;
  position: absolute;
  bottom: 2em;
  right: 1em;
`

export default TaskList
