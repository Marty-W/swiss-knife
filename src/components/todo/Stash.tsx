import React, { useState } from 'react'
import styled from 'styled-components/macro'
import Task from './Task'
import ButtonStyle from '../UI/Button.styles'

import { TaskListWrapper as Wrapper } from './TaskList'

import { TaskInt } from '../../pages/Todo'
import { useCurrentUser } from '~/context/AuthContext'
import { db } from '~/firebase/firebase'

interface Props {
  tasks: TaskInt[]
}

const Stash: React.FC<Props> = ({ tasks }) => {
  const [pickedToMove, setPickedToMove] = useState<TaskInt[]>([])
  const user = useCurrentUser()

  //FIXME unchecking
  const pickToMove = (id: string) => {
    const taskToMove = tasks.find((task) => task.id === id)
    if (taskToMove) {
      if (pickedToMove?.includes(taskToMove)) {
        const newState = pickedToMove.filter((task) => task.id !== id)
        setPickedToMove(newState)
      } else {
        setPickedToMove((prev) => [...prev, taskToMove])
      }
    }
  }

  const moveToToday = async () => {
    if (user) {
      const taskListRef = db.collection(`users/${user.uid}/taskList`)
      try {
        pickedToMove.map((task) => {
          taskListRef.doc(task.id).update({
            timestamp: Date.now(),
          })
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Wrapper>
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
              move={pickToMove}
            />
          )
        })}
      <Button onClick={moveToToday} disabled={!pickedToMove.length}>
        Move
      </Button>
    </Wrapper>
  )
}

const Button = styled(ButtonStyle)`
  color: ${(props) => props.theme.colors.accent};
  width: 40%;
  margin: 0 auto;

  &:disabled {
    filter: grayscale(100%);
  }
`

export default Stash
