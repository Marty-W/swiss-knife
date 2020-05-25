/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import { auth } from '../utils/firebase'

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser)
  }, [])

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
