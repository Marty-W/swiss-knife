import React, { useEffect, useState, useRef } from 'react'
import { useToasts } from 'react-toast-notifications'
import { motion } from 'framer-motion'
import styled from 'styled-components/macro'
import { FirebaseError } from 'firebase'
import { AiFillCheckCircle } from 'react-icons/ai'
import { TaskWrapper } from './Task'
import useUserDocumentRef from '../../hooks/useUserDocumentRef'
import useCurrentUser from '../../hooks/useCurrentUser'
import { db } from '../../firebase/firebase'
import { ITask } from '../../utils/interfaces'

interface Props {
  removeNewTask: () => void
  isNewTask: boolean
}

const NewTask: React.FC<Props> = ({ removeNewTask, isNewTask }) => {
  const [title, setTitle] = useState('')
  const { addToast } = useToasts()
  const inputRef = useRef<null | HTMLInputElement>(null)
  const user = useCurrentUser()
  const taskListRef = db.collection(`users/${user?.uid}/taskList`).doc()

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  })

  const addTask = async () => {
    if (!title) {
      return
    }
    try {
      await taskListRef.set({
        title,
        done: false,
        timestamp: Date.now(),
        id: taskListRef.id,
      })
      setTitle('')
    } catch (err) {
      addToast((err as FirebaseError).message, { appearance: 'error' })
    }
  }

  const handleTask = (e: string | React.MouseEvent) => {
    e === 'Escape' && removeNewTask()

    if (e === 'Enter' || typeof e === 'object') {
      addTask()
    }
  }

  return (
    <>
      <TaskWrapper active>
        <Title
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          ref={inputRef}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.5 }}
          onKeyDown={(e) => handleTask(e.key)}
        />
      </TaskWrapper>
      {isNewTask && <ConfirmBtn onClick={() => addTask()} />}
    </>
  )
}

const Title = styled(motion.input)`
  background: none;
  outline: none;
  border: none;
  color: ${(props) => props.theme.colors.tertiary};
  border-bottom: 1px solid ${(props) => props.theme.colors.accent};
`

const ConfirmBtn = styled(AiFillCheckCircle)`
  position: absolute;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  bottom: 0;
  right: 0;
`

export default NewTask
