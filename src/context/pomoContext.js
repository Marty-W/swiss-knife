/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useReducer } from 'react'
import { Duration } from 'luxon'
import pomoReducer from '../reducers/pomoReducer'

const initPomoState = {
  duration: Duration.fromMillis(0),
  isModalOpen: false,
  isPomoRunning: false,
  isPomoPaused: false,
}

const PomoContext = createContext()

const PomoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(pomoReducer, initPomoState)

  return (
    <PomoContext.Provider value={[state, dispatch]}>
      {children}
    </PomoContext.Provider>
  )
}

export { PomoContext, PomoContextProvider }
