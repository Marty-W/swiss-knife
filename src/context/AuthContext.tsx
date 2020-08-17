import React, { createContext, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useErrorHandler } from 'react-error-boundary'
import { TUser } from '../utils/interfaces'
import { auth, signInAnounymously } from '../firebase/firebase'

const AuthContext = createContext<TUser | null>(null)

const AuthProvider: React.FC = ({ children }) => {
  const [user, loading] = useAuthState(auth)
  const errorHandler = useErrorHandler()

  useEffect(() => {
    if (user === null && loading === false) {
      signInAnounymously().catch((err) => errorHandler(err))
    }
  }, [loading, user, errorHandler])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
