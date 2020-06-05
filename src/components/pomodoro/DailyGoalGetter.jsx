import React, { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { motion } from 'framer-motion'

const DailyGoalGetter = ({ dailyGoal, completed }) => {
  const [percentDone, setPercentDone] = useState(0)

  useEffect(() => {
    const value = Math.floor((completed / dailyGoal) * 100)
    setPercentDone(value)
  }, [percentDone, completed, dailyGoal])

  return (
    <>
      <BarWrapper>
        <span style={{ width: `${percentDone}%` }} />
      </BarWrapper>
      {/* <span>{dailyGoal}</span>
      <span>{completed}</span> */}
    </>
  )
}

const BarWrapper = styled.div`
  height: 20%;
  position: relative;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 25px;
  padding: 10px;

  & span {
    display: block;
    height: 100%;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    background-color: ${(props) => props.theme.colors.accent};
    position: relative;
    overflow: hidden;
  }
`

export default DailyGoalGetter
