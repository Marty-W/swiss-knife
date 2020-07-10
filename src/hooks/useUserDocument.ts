import useCurrentUser from './useCurrentUser'
import { db } from '~/firebase/firebase'

type refType = 'taskList' | 'history' | 'pomoStats'

//FIXME repair get ref

const useUserDocument = (refType: refType) => {
  const user = useCurrentUser()

  const userRef = db.collection('users').doc(user?.uid)
  const pomoStatsRef = userRef.collection('pomoStats/stats')
  const taskListRef = userRef.collection('taskList')

  let ref

  switch (refType) {
    case 'taskList':
      ref = taskListRef
      break
    case 'history':
      console.log('repair history')
      break
    case 'pomoStats':
      ref = pomoStatsRef
      break
    default:
      console.warn('select a proper type')
  }

  return ref
}

export default useUserDocument
