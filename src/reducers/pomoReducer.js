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
        isPomoRunning: true,
        isPomoPaused: false,
      }
    case 'POMO_ABORT':
      return {
        ...state,
        duration: Duration.fromMillis(0),
        isPomoRunning: false,
        isModalOpen: false,
      }
    case 'POMO_PAUSE':
      return {
        ...state,
        isPomoRunning: false,
        isPomoPaused: !state.isPaused,
      }
    case 'POMO_CONTINUE':
      return {
        ...state,
        isPomoRunning: true,
        isPomoPaused: false,
      }
    default:
      throw new Error('Unexpected action')
  }
}

export default pomoReducer
