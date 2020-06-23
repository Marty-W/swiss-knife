import React, { createContext, useState, useEffect, useContext } from 'react'
import { auth } from '../utils/firebase'

type User = firebase.User | undefined | null

const AuthContext = createContext<User>(undefined)

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      user && setUser(user)
    })
  })

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

const useCurrentUser = (): User => {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useCurrentUser }
