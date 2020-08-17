import React from 'react'
import styled from 'styled-components/macro'
import { useErrorHandler } from 'react-error-boundary'
import { useRouteMatch } from 'react-router-dom'
import Checkbox from '../UI/Checkbox'
import { db } from '../../firebase/firebase'
import useCurrentUser from '../../hooks/useCurrentUser'
import useUserDocumentRef from '../../hooks/useUserDocumentRef'

interface Props {
  title: string
  done: boolean
  timestamp: number
  id: string
  onCheck?: (id: string) => void
}

const Task: React.FC<Props> = ({ title, done, id, onCheck }) => {
  const { path } = useRouteMatch()
  const handleError = useErrorHandler()
  const taskListRef = useUserDocumentRef(
    'taskList',
  ) as firebase.firestore.CollectionReference

  const handleCheck = () => {
    if (path === '/todo/stash' && onCheck) {
      onCheck(id)
    } else {
      void markTodoDone()
    }
  }

  const markTodoDone = async () => {
    const taskToComplete = taskListRef.doc(id)
    try {
      await taskToComplete.update({
        done: true,
      })
    } catch (err) {
      handleError(err)
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
