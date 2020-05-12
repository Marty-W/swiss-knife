import { Duration } from 'luxon'

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
        isModalOpen: true,
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
        isModalOpen: false,
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
    case 'BREAK_SET':
      return {
        ...state,
        isBreak: true,
        isPaused: true,
        isRunning: false,
        isPomo: false,
        isModalOpen: true,
      }
    case 'BREAK_START':
      return {
        ...state,
        isPaused: false,
        isRunning: true,
      }
    default:
      throw new Error('Unexpected action')
  }
}

export default pomoReducer
