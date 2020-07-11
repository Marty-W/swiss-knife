import { useCollectionData } from 'react-firebase-hooks/firestore'
import useUserDocumentRef from './useUserDocumentRef'
import { DateTime } from 'luxon'
import { TaskInt } from '~/pages/Todo'

const useTodos = () => {
  const userRef = useUserDocumentRef()
  const startOfToday = DateTime.local().startOf('day').toMillis()
  const [todayTasks, todayLoading, todayError] = useCollectionData(
    userRef
      .collection('taskList')
      .orderBy('timestamp')
      .where('timestamp', '>=', startOfToday)
      .orderBy('done', 'desc'),
  )

  const [stashedTasks, stashedLoading, stashError] = useCollectionData(
    userRef
      .collection('taskList')
      .where('timestamp', '<=', startOfToday)
      .where('done', '==', false),
  )

  const loading = todayLoading || stashedLoading
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

export default useTodos
