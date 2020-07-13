import { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import { db } from '../firebase/firebase'
import useCurrentUser from './useCurrentUser'

interface Goal {
  dailyGoal: number
  completed: number
  timestamp: number
}

const useDailyGoalData = () => {
  const user = useCurrentUser()
  const [dailyGoal, setDailyGoal] = useState(0)
  const [completed, setCompleted] = useState(0)
  const [loading, setLoading] = useState<boolean>(true)
  const dtNow = DateTime.local().day
  const statsRef = db.doc(`users/${user?.uid}/pomoStats/stats`)

  const resetGoal = async () => {
    try {
      await statsRef.update({
        completed: 0,
        dailyGoal: 0,
        timestamp: Date.now(),
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (user) {
      return statsRef.onSnapshot((snap) => {
        if (snap.exists) {
          const data = snap.data()
          const dtServer = DateTime.fromMillis(data?.timestamp).day

          if (dtServer === dtNow) {
            setDailyGoal(data?.dailyGoal)
            setCompleted(data?.completed)
          } else {
            setCompleted(0)
            resetGoal()
          }
          setLoading(false)
        }
      })
    }
  }, [user])

  return [{ dailyGoal, completed }, loading, resetGoal] as const
}

export default useDailyGoalData
