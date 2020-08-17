import { Duration } from 'luxon'
import { FirebaseError } from 'firebase'

/// /////GENERAL/////////
export type TinputRef = HTMLInputElement

/// THEMING//////////

export type TTheme = 'dark' | 'light' | null

export type TThemeDispatch = React.Dispatch<React.SetStateAction<TTheme>> | null

/// ////////POMODORO///////////////////
export interface IPomoGoal {
  completed: number
  dailyGoal: number
  timestamp: number
}

export interface IUser {
  email: string
  name: string
  pomoGoal: IPomoGoal
}

export interface IPomoEntry {
  startTime: number
  endTime: number
  duration: number
  id: string
}

export interface IPomo {
  duration: Duration
  isPaused: boolean
  isBreak: boolean
  isPomo: boolean
}

export type THistoryQuery = 'today' | 'yesterday' | 'all'

export type TPomoReducerActions =
  | { type: 'FOCUS_LENGTH'; payload: 'minus' | 'plus' }
  | { type: 'BREAK_LENGTH'; payload: 'minus' | 'plus' }
  | { type: 'PAUSE' }
  | { type: 'ABORT' }
  | { type: 'CONTINUE' }
  | { type: 'POMO_START' }
  | { type: 'POMO_FINISH' }
  | { type: 'BREAK_START' }
  | { type: 'BREAK_FINISH' }

export type TPomoDispatch = (action: TPomoReducerActions) => void

/// ////////HABITS//////////////

export interface IFirebaseHabit {
  color: string
  timePoints: firebase.firestore.Timestamp[]
  description: string
  id: string
  name: string
}

export interface IHabitDetail extends IFirebaseHabit {
  dateArr: number[]
}

/// ////TODO /////

export interface ITask {
  title: string
  done: boolean
  timestamp: number
  id: string
}

/// ///AUTH/////

export type TUser = firebase.User | undefined | null

/// ///ERRORS /////

export type TError = FirebaseError | Error

export type TErrorDispatch = (err: TError) => void

// FIREBASE

export type TFQuery =
  | firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  | firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
  | firebase.firestore.DocumentReference
  | firebase.firestore.Query<firebase.firestore.DocumentData>
  | firebase.firestore.DocumentSnapshot
