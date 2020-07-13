import { useCollectionData } from 'react-firebase-hooks/firestore'
import useUserDocumentRef from './useUserDocumentRef'
import { DateTime } from 'luxon'
import { TaskInt } from '~/pages/Todo'

//TODO error handling

const useTodoData = () => {
  const userRef = useUserDocumentRef()
  const startOfToday = DateTime.local().startOf('day').toMillis()
  const [todayTasks, todayLoading, todayError] = useCollectionData(
    userRef.collection('taskList').where('timestamp', '>=', startOfToday),
  )

  const [stashedTasks, stashedLoading, stashError] = useCollectionData(
    userRef
      .collection('taskList')
      .where('timestamp', '<=', startOfToday)
      .where('done', '==', false),
  )

  const loading = todayLoading
  const error = {
    today: todayError,
    stash: stashError,
  }
  const tasks = {
    today: todayTasks as TaskInt[],
    stash: stashedTasks as TaskInt[],
  }

  return [tasks, loading, error] as const
}

export default useTodoData
