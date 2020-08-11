import {
  startOfToday,
  startOfYesterday,
  endOfToday,
  endOfYesterday,
} from 'date-fns'
import useCurrentUser from './useCurrentUser'
import { db } from '../firebase/firebase'

const useUserDocumentRef = (
  type: 'habitList' | 'taskList' | 'pomoEntries',
  option?: 'today' | 'yesterday' | 'all',
) => {
  const user = useCurrentUser()

  const query = db.collection('users').doc(`${user?.uid}`).collection(`${type}`)

  if (type === 'pomoEntries') {
    if (option === 'today') {
      return query
        .where('endTime', '>', startOfToday().getTime())
        .where('endTime', '<', endOfToday().getTime())
    }

    if (option === 'yesterday') {
      return query
        .where('endTime', '>', startOfYesterday().getTime())
        .where('endTime', '<', endOfYesterday().getTime())
    }
  }

  return query
}

export default useUserDocumentRef
