import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { TUser } from '../utils/interfaces'

const useCurrentUser = (): TUser => {
  const context = useContext(AuthContext)
  return context
}

export default useCurrentUser
