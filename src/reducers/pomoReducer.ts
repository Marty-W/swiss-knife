/* eslint-disable @typescript-eslint/ban-types */
import { Duration } from 'luxon'

export interface PomoInt {
  duration: Duration
  isRunning: boolean
  isPaused: boolean
  isBreak: boolean
  isPomo: boolean
}

type Actions =
  | { type: 'DUR'; payload: 'minus' | 'plus' }
  | { type: 'BREAK'; payload: 'minus' | 'plus' }
  | { type: 'POMO_START' }
  | { type: 'POMO_ABORT' }
  | { type: 'POMO_PAUSE' }
  | { type: 'POMO_CONTINUE' }
  | { type: 'POMO_FINISH' }
  | { type: 'BREAK_START' }

export type Dispatch = (action: Actions) => void

const pomoReducer = (state: PomoInt, action: Actions): PomoInt => {
  switch (action.type) {
    case 'DUR':
      return {
        ...state,
        duration: state.duration[action.payload](
          Duration.fromObject({ minutes: 5 }),
        ),
      }
    case 'BREAK':
      return {
        ...state,
        duration: state.duration[action.payload](
          Duration.fromObject({ minutes: 1 }),
        ),
      }
    case 'POMO_START':
      return {
        ...state,
        isRunning: true,
        isPomo: true,
        isPaused: false,
        isBreak: false,
      }
    case 'POMO_ABORT':
      return {
        ...state,
        duration: Duration.fromMillis(0),
        isRunning: false,
        isPomo: false,
        isBreak: false,
      }
    case 'POMO_PAUSE':
      return {
        ...state,
        isPaused: true,
      }
    case 'POMO_CONTINUE':
      return {
        ...state,
        isPaused: false,
      }
    case 'POMO_FINISH':
      return {
        ...state,
        isBreak: true,
        isPaused: true,
        isRunning: false,
        isPomo: false,
        duration: Duration.fromMillis(0),
      }
    case 'BREAK_START':
      return {
        ...state,
        isPaused: false,
        isRunning: true,
        isPomo: false,
        isBreak: true,
      }
    default:
      throw new Error('Unexpected action')
  }
}

export { pomoReducer }
