export const checkIfToday = (date: number): boolean => {
  const today = new Date()
  const taskDate = new Date(date)
  return (
    taskDate.getDate() === today.getDate() &&
    taskDate.getMonth() === today.getMonth() &&
    taskDate.getFullYear() === today.getFullYear()
  )
}
