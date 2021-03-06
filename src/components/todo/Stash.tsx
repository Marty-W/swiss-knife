import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import styled from 'styled-components/macro'
import { FirebaseError } from 'firebase'
import Button from '../UI/Button'
import Task from './Task'
import { ITask } from '../../utils/interfaces'
import { TaskListWrapper as Wrapper } from './TaskList'
import { db } from '../../firebase/firebase'
import useCurrentUser from '../../hooks/useCurrentUser'

interface Props {
  tasks: ITask[]
}

const Stash: React.FC<Props> = ({ tasks }) => {
  const [pickedToMove, setPickedToMove] = useState<ITask[]>([])
  const { addToast } = useToasts()
  const user = useCurrentUser()

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
      const batch = db.batch()
      pickedToMove?.map((task) => {
        batch.update(taskListRef.doc(task.id), { timestamp: Date.now() })
      })
      try {
        await batch.commit()
      } catch (err) {
        addToast((err as FirebaseError).message, { appearance: 'error' })
      }
    }
  }

  return (
    <Wrapper>
      {tasks &&
        tasks.map((entry: ITask) => {
          const { title, id, done, timestamp } = entry
          return (
            <Task
              key={id}
              title={title}
              done={done}
              timestamp={timestamp}
              id={id}
              onCheck={pickToMove}
            />
          )
        })}
      {pickedToMove ? (
        <MoveButton
          onClick={moveToToday}
          disabled={!pickedToMove.length}
          variant="primary"
        >
          Move
        </MoveButton>
      ) : (
        <Text>No tasks in stash.</Text>
      )}
    </Wrapper>
  )
}

const MoveButton = styled(Button)`
  width: 20%;
  margin: 0 auto;
  &:disabled {
    filter: grayscale(100%);
  }
`

const Text = styled.p`
  margin-top: 2rem;
  font-size: 1.2rem;
`

export default Stash
