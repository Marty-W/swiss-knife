import React from 'react'
import styled from 'styled-components/macro'

import { useRouteMatch } from 'react-router-dom'
import Checkbox from '../UI/Checkbox'
import { db } from '../../firebase/firebase'
import useCurrentUser from '../../hooks/useCurrentUser'

interface Props {
  title: string
  done: boolean
  timestamp: number
  id: string
  onCheck?: (id: string) => void
}

const Task: React.FC<Props> = ({ title, done, id, onCheck }) => {
  const user = useCurrentUser()
  const { path } = useRouteMatch()

  const handleCheck = () => {
    if (path === '/todo/stash' && onCheck) {
      onCheck(id)
    } else {
      markTodoDone()
    }
  }

  const markTodoDone = async () => {
    if (user) {
      const taskListRef = db.doc(`users/${user.uid}/taskList/${id}`)
      try {
        await taskListRef.update({
          done: true,
        })
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <TaskWrapper done={done} active={false}>
      <SCheckbox done={done} onCheck={handleCheck} />
      <TaskTitle>{title}</TaskTitle>
    </TaskWrapper>
  )
}

export const TaskWrapper = styled.div<{ done?: boolean; active: boolean }>`
  background-color: ${(props) =>
    props.active ? props.theme.colors.primary : props.theme.colors.secondary};
  border-radius: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5em 1em;
`

const SCheckbox = styled(Checkbox)`
  margin-right: 1em;
  fill: ${(props) => props.theme.colors.tertiary};
`

const TaskTitle = styled.span`
  margin-left: 1em;
`

export default Task
