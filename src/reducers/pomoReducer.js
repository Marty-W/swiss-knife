import { DateTime, Duration } from 'luxon'

const pomoReducer = (state, action) => {
  switch (action.type) {
    case 'DUR_MINUS':
      return {
        ...state,
        duration: state.duration.minus(Duration.fromObject({ minutes: 5 })),
      }
    case 'DUR_PLUS':
      return {
        ...state,
        duration: state.duration.plus(Duration.fromObject({ minutes: 5 })),
      }
    case 'POMO_START':
      return {
        ...state,
        isRunning: true,
        timeEntries: state.timeEntries.push([DateTime.local()]),
      }
    case 'POMO_ABORT':
      return {
        ...state,
        duration: Duration.fromMillis(0),
        isRunning: false,
      }
    case 'POMO_END':
      return {
        ...state,
        isRunning: true,
        isBreak: true,
      }
    case 'POMO_BREAK':
      return {
        ...state,
        isBreak: true,
      }
    case 'POMO_PAUSE':
      return {
        ...state,
        isPaused: !state.isPaused,
      }
    default:
      throw new Error('Unexpected action')
  }
}

export default pomoReducer
