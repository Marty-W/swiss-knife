/* eslint-disable @typescript-eslint/ban-types */
import { Duration } from 'luxon'
import { TPomoReducerActions, IPomo } from '../utils/interfaces'

const pomoReducer = (state: IPomo, action: TPomoReducerActions): IPomo => {
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

export default pomoReducer
