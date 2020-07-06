import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components/macro'
import { motion } from 'framer-motion'
import { IoMdCheckmark } from 'react-icons/io'
import { db } from '../../firebase/firebase'

import { TaskWrapper } from './Task'
import { useCurrentUser } from '~/context/AuthContext'
import useClickOutside from '../../hooks/useClickOutside'

interface Props {
  removeNewTask: () => void
}

const NewTask: React.FC<Props> = ({ removeNewTask }) => {
  const [title, setTitle] = useState('')
  const user = useCurrentUser()

  const inputEl = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.focus()
    }
  })

  useClickOutside(inputEl, () => removeNewTask())

  const addTask = async () => {
    const taskListRef = db.collection(`users/${user?.uid}/taskList/`).doc()
    try {
      await taskListRef.set({
        title,
        done: false,
        timestamp: Date.now(),
        id: taskListRef.id,
      })
      setTitle('')
    } catch (err) {
      console.log(err)
    }
  }

  const handleTask = (e: string | React.MouseEvent) => {
    e == 'Escape' && removeNewTask()

    if (e === 'Enter' || typeof e === 'object') {
      addTask()
    }
  }

  return (
    <TaskWrapper>
      <Title
        type="text"
        value={title}
        onChange={(e) => setTitle(e.currentTarget.value)}
        ref={inputEl}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ duration: 1 }}
        onKeyDown={(e) => handleTask(e.key)}
      />
      {title && <Checkmark onClick={handleTask} />}
    </TaskWrapper>
  )
}

const Title = styled(motion.input)`
  background: none;
  outline: none;
  border: none;
  color: ${(props) => props.theme.colors.tertiary};
  border-bottom: 1px solid ${(props) => props.theme.colors.accent};
`

const Checkmark = styled(IoMdCheckmark)`
  stroke: ${(props) => props.theme.colors.tertiary};
  height: 1.2em;
  width: 1.2em;
  cursor: pointer;
`

export default NewTask
