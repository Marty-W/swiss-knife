/* eslint-disable @typescript-eslint/ban-types */
import { Duration } from 'luxon';

interface PomoInt {
  duration: Duration;
  isModalOpen: boolean;
  isRunning: boolean;
  isPaused: boolean;
  isBreak: boolean;
  isPomo: boolean;
}

type Actions =
  | { type: 'DUR'; payload: 'minus' | 'plus' }
  | { type: 'BREAK'; payload: 'minus' | 'plus' }
  | { type: 'POMO_START' }
  | { type: 'POMO_ABORT' }
  | { type: 'POMO_PAUSE' }
  | { type: 'POMO_CONTINUE' }
  | { type: 'POMO_FINISH' }
  | { type: 'BREAK_START' };

type Dispatch = (action: Actions) => void;

const pomoReducer = (state: PomoInt, action: Actions): PomoInt => {
  switch (action.type) {
    case 'DUR':
      return {
        ...state,
        duration: state.duration[action.payload](
          Duration.fromObject({ minutes: 5 }),
        ),
      };
    case 'BREAK':
      return {
        ...state,
        duration: state.duration[action.payload](
          Duration.fromObject({ minutes: 1 }),
        ),
      };
    case 'POMO_START':
      return {
        ...state,
        isModalOpen: true,
        isRunning: true,
        isPomo: true,
        isPaused: false,
        isBreak: false,
      };
    case 'POMO_ABORT':
      return {
        ...state,
        duration: Duration.fromMillis(0),
        isRunning: false,
        isModalOpen: false,
        isPomo: false,
        isBreak: false,
      };
    case 'POMO_PAUSE':
      return {
        ...state,
        isPaused: true,
      };
    case 'POMO_CONTINUE':
      return {
        ...state,
        isPaused: false,
      };
    case 'POMO_FINISH':
      return {
        ...state,
        isBreak: true,
        isPaused: true,
        isRunning: false,
        isPomo: false,
        isModalOpen: true,
        duration: Duration.fromMillis(0),
      };
    case 'BREAK_START':
      return {
        ...state,
        isPaused: false,
        isRunning: true,
      };
    default:
      throw new Error('Unexpected action');
  }
};

export { pomoReducer, PomoInt, Dispatch };
