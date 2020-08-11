import React, { createContext, useContext, useReducer } from 'react'

import { Duration } from 'luxon'
import pomoReducer from '../reducers/pomoReducer'
import { IPomo, TPomoDispatch } from '../utils/interfaces'

const initialState = {
  duration: Duration.fromObject({ minutes: 0 }),
  isPaused: false,
  isBreak: false,
  isPomo: false,
}

const PomoStateContext = createContext<IPomo | undefined>(undefined)
const PomoDispatchContext = createContext<TPomoDispatch | undefined>(undefined)

const PomoProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(pomoReducer, initialState)

  return (
    <PomoStateContext.Provider value={state}>
      <PomoDispatchContext.Provider value={dispatch}>
        {children}
      </PomoDispatchContext.Provider>
    </PomoStateContext.Provider>
  )
}

const usePomoState = () => {
  const context = useContext(PomoStateContext)

  if (context === undefined) {
    throw new Error('usePomoState must be used within a PomoProvider')
  }

  return context
}

const usePomoDispatch = () => {
  const context = React.useContext(PomoDispatchContext)
  if (context === undefined) {
    throw new Error('usePomoDispatch must be used within a PomoProvider')
  }
  return context
}

const usePomo = (): [IPomo, TPomoDispatch] => [
  usePomoState(),
  usePomoDispatch(),
]

export { PomoProvider, usePomo }
