import React, { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '../firebase/firebase'

type User = firebase.User | undefined | null

const AuthContext = createContext<User | null>(null)

const useCurrentUser = (): User => {
  const context = useContext(AuthContext)

  return context
}
const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      user ? setUser(user) : setUser(null)
    })

    return () => unsubscribe()
  }, [user])

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export { AuthProvider, useCurrentUser }
