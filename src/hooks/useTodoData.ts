import { useCollectionData } from 'react-firebase-hooks/firestore'
import { startOfToday } from 'date-fns'
import { useEffect } from 'react'
import { useErrorHandler } from 'react-error-boundary'
import useUserDocumentRef from './useUserDocumentRef'
import { ITask } from '../utils/interfaces'

const useTodoData = () => {
  const todoRef = useUserDocumentRef(
    'taskList',
  ) as firebase.firestore.CollectionReference
  const todayStartMillis = startOfToday().getTime()
  const [todayTasks, todayLoading, todayError] = useCollectionData<ITask>(
    todoRef.where('timestamp', '>=', todayStartMillis),
  )
  const [stashedTasks, stashedLoading, stashError] = useCollectionData<ITask>(
    todoRef
      .where('timestamp', '<=', todayStartMillis)
      .where('done', '==', false),
  )
  const errorHandler = useErrorHandler()

  useEffect(() => {
    if (todayError) {
      errorHandler(todayError)
    }

    if (stashError) {
      errorHandler(stashError)
    }
  }, [stashError, todayError, errorHandler])

  const loading = todayLoading || stashedLoading
  const tasks = {
    today: todayTasks as ITask[],
    stash: stashedTasks as ITask[],
  }

  return [tasks, loading] as const
}

export default useTodoData
