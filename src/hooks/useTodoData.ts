import { useCollectionData } from 'react-firebase-hooks/firestore'
import { startOfToday } from 'date-fns'
import { useToasts } from 'react-toast-notifications'
import { useEffect } from 'react'
import useUserDocumentRef from './useUserDocumentRef'
import { ITask } from '../utils/interfaces'

const useTodoData = () => {
  const todoRef = useUserDocumentRef('taskList')
  const todayStartMillis = startOfToday().getTime()
  const [todayTasks, todayLoading, todayError] = useCollectionData<ITask>(
    todoRef.where('timestamp', '>=', todayStartMillis),
  )
  const [stashedTasks, stashedLoading, stashError] = useCollectionData<ITask>(
    todoRef
      .where('timestamp', '<=', todayStartMillis)
      .where('done', '==', false),
  )
  const { addToast } = useToasts()

  useEffect(() => {
    if (todayError) {
      addToast(todayError.message, { appearance: 'error' })
    }

    if (stashError) {
      addToast(stashError.message, { appearance: 'error' })
    }
  }, [stashError, todayError, addToast])

  const loading = todayLoading || stashedLoading
  const tasks = {
    today: todayTasks as ITask[],
    stash: stashedTasks as ITask[],
  }

  return [tasks, loading] as const
}

export default useTodoData
