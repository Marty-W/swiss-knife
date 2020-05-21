import React, { useState } from 'react'

const DailyGoal = () => {
  const [dailyGoal, setDailyGoal] = useState()

  return (
    <div>
      <label htmlFor="minutes">
        <input
          type="number"
          value={dailyGoal}
          onChange={(e) => setDailyGoal(e.target.value)}
        />
        <span>minutes</span>
      </label>
    </div>
  )
}

export default DailyGoal
