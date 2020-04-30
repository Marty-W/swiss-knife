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
    case 'POMO_STOP':
      return {
        ...state,
        duration: Duration.fromMillis(1000),
        isRunning: false,
      }
    default:
      throw new Error('Unexpected action')
  }
}

export default pomoReducer
