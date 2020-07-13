/* eslint-disable @typescript-eslint/ban-types */
import { Duration } from 'luxon'

interface PomoInt {
  duration: Duration
  isPaused: boolean
  isBreak: boolean
  isPomo: boolean
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
        isPomo: true,
        isPaused: false,
        isBreak: false,
      }
    case 'POMO_FINISH':
      return {
        ...state,
        isBreak: true,
        isPaused: true,
        isPomo: false,
        duration: Duration.fromMillis(0),
      }
    case 'BREAK_START':
      return {
        ...state,
        isPaused: false,
        isPomo: false,
        isBreak: true,
      }
    case 'BREAK_FINISH':
      return {
        ...state,
        duration: Duration.fromMillis(0),
        isPaused: true,
        isPomo: false,
        isBreak: false,
      }
    default:
      throw new Error('Unexpected action')
  }
}

export { pomoReducer, PomoInt }
