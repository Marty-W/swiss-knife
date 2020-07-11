import useCurrentUser from './useCurrentUser'
import { db } from '~/firebase/firebase'

const useUserDocumentRef = () => {
  const user = useCurrentUser()

  const userColRef = db.collection('users').doc(`${user?.uid}`)

  return userColRef
}

export default useUserDocumentRef
