import React, { useState } from 'react'
import styled from 'styled-components/macro'
import { AiFillPlusCircle } from 'react-icons/ai'
import Task from './Task'
import NewTask from './NewTask'

import { TaskInt } from '../../pages/Todo'

interface Props {
  tasks: TaskInt[]
}

const TaskList: React.FC<Props> = ({ tasks }) => {
  const [isNewTask, setIsNewTask] = useState(false)

  const removeNewTask = () => setIsNewTask(false)

  return (
    <TaskListWrapper>
      {isNewTask && <NewTask removeNewTask={removeNewTask} />}
      {tasks &&
        tasks.map((entry: TaskInt) => {
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
      <Plus onClick={() => setIsNewTask(true)} />
    </TaskListWrapper>
  )
}

export const TaskListWrapper = styled.div`
  grid-area: tasks;
  display: grid;
  grid-row-gap: 1em;
  grid-auto-rows: minmax(20px, 40px);
`

const Plus = styled(AiFillPlusCircle)`
  fill: ${(props) => props.theme.colors.accent};
  place-self: end;
  font-size: 2.4rem;
  cursor: pointer;
`

export default TaskList
