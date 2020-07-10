import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

type User = firebase.User | undefined | null

const useCurrentUser = (): User => {
  const context = useContext(AuthContext)

  return context
}

export default useCurrentUser
