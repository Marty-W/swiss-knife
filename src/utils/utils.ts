import { eachDayOfInterval, sub } from 'date-fns'

export const generateDays = () => {
  const today = new Date()
  return eachDayOfInterval({
    start: sub(today, { days: 30 }),
    end: today,
  }).reverse()
}

export const checkIfToday = (date: number): boolean => {
  const today = new Date()
  const taskDate = new Date(date)
  return (
    taskDate.getDate() === today.getDate() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getFullYear() === today.getFullYear()
  )
}
