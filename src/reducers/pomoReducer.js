import { Duration } from 'luxon'

// TODO rebuild the reducer
const pomoReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'DUR':
      return {
        ...state,
        duration: state.duration[payload](Duration.fromObject({ minutes: 5 })),
      }
    case 'BREAK':
      return {
        ...state,
        duration: state.duration[payload](Duration.fromObject({ minutes: 1 })),
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
    case 'POMO_FINISH':
      return {
        ...state,
        isBreak: true,
        isPaused: true,
        isRunning: false,
        isPomo: false,
        isModalOpen: true,
        duration: Duration.fromMillis(0),
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
