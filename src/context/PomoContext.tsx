import React, { createContext, useReducer, useContext } from 'react'
import { Duration } from 'luxon'
import { pomoReducer, PomoInt, Dispatch } from '../reducers/pomoReducer'

const initialState = {
  duration: Duration.fromObject({ minutes: 0 }),
  isPaused: false,
  isBreak: false,
  isPomo: false,
}

const PomoStateContext = createContext<PomoInt | undefined>(undefined)
const PomoDispatchContext = createContext<Dispatch | undefined>(undefined)

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

const usePomo = (): [PomoInt, Dispatch] => [usePomoState(), usePomoDispatch()]

export { PomoProvider, usePomo, PomoInt }
