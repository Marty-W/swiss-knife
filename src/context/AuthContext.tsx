import React, { createContext, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { TUser } from '../utils/interfaces'
import { auth, signInAnounymously } from '../firebase/firebase'

const AuthContext = createContext<TUser | null>(null)

const AuthProvider: React.FC = ({ children }) => {
  const [user, loading] = useAuthState(auth)

  useEffect(() => {
    if (user === null && loading === false) {
      signInAnounymously().catch((err) => console.log(err))
    }
  }, [loading, user])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
