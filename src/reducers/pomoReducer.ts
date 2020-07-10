/* eslint-disable @typescript-eslint/ban-types */
import { Duration } from 'luxon'

interface PomoInt {
  duration: Duration
  isRunning: boolean
  isPaused: boolean
  isBreak: boolean
  isPomo: boolean
  isBreakFinished: boolean
}

type Actions =
  | { type: 'FOCUS_LENGTH'; payload: 'minus' | 'plus' }
  | { type: 'BREAK_LENGTH'; payload: 'minus' | 'plus' }
  | { type: 'PAUSE' }
  | { type: 'ABORT' }
  | { type: 'CONTINUE' }
  | { type: 'POMO_START' }
  | { type: 'POMO_FINISH' }
  | { type: 'BREAK_START' }
  | { type: 'BREAK_FINISH' }

export type Dispatch = (action: Actions) => void

const pomoReducer = (state: PomoInt, action: Actions): PomoInt => {
  switch (action.type) {
    case 'FOCUS_LENGTH':
      return {
        ...state,
        duration: state.duration[action.payload](
          Duration.fromObject({ minutes: 5 }),
        ),
      }
    case 'BREAK_LENGTH':
      return {
        ...state,
        duration: state.duration[action.payload](
          Duration.fromObject({ minutes: 1 }),
        ),
      }
    case 'ABORT':
      return {
        ...state,
        duration: Duration.fromMillis(0),
        isRunning: false,
        isPaused: false,
        isBreak: false,
        isPomo: false,
      }
    case 'PAUSE':
      return {
        ...state,
        isPaused: true,
      }
    case 'CONTINUE':
      return {
        ...state,
        isPaused: false,
      }
    case 'POMO_START':
      return {
        ...state,
        isRunning: true,
        isPomo: true,
        isPaused: false,
        isBreak: false,
        isBreakFinished: false,
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
    case 'BREAK_FINISH':
      return {
        ...state,
        isPaused: true,
        isPomo: false,
        isBreak: false,
        isRunning: false,
        isBreakFinished: true,
      }
    default:
      throw new Error('Unexpected action')
  }
}

export { pomoReducer, PomoInt }
