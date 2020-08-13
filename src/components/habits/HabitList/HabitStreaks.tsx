/* eslint-disable no-restricted-syntax */
/* eslint-disable no-shadow */
import { differenceInCalendarDays, format, isToday } from 'date-fns'
import { v4 as uuid } from 'uuid'
import React from 'react'
import styled from 'styled-components/'

interface Props {
  timePoints: number[]
  habitColor: string
}

const HabitStreaks: React.FC<Props> = ({ timePoints, habitColor }) => {
  const { streaks, maxStr } = calculateStreaks(timePoints)
  streaks.length = 4

  function calculateStreaks(arr: number[]) {
    const result = []
    let maxStr = 0
    let current = null
    for (const entry of arr) {
      if (!current || !isConsecutive(current.end, entry)) {
        result.push(
          (current = {
            start: entry,
            end: entry,
          }),
        )
      } else {
        current.end = entry
      }
    }

    const streaks = result
      .sort((a, b) => {
        if (a.end > b.end) return -1
        if (a.end < b.end) return 1
        return 0
      })
      .map((entry) => {
        const streak = differenceInCalendarDays(entry.start, entry.end) + 1
        if (streak > maxStr) {
          maxStr = streak
        }
        return {
          start: new Date(entry.start),
          end: new Date(entry.end),
          streak,
        }
      })
      .filter((entry) => entry.streak > 1)

    return { streaks, maxStr } as const
  }

  function isConsecutive(a: number, b: number) {
    return differenceInCalendarDays(a, b) === 1
  }

  const formatDate = (date: Date) => format(date, 'd MMM')

  return (
    <Wrapper color={habitColor}>
      <span>Streaks:</span>
      <CurrentStreak>
        <p>Current streak:</p>
        <p>
          {streaks[0] && isToday(streaks[0].start) ? streaks[0].streak : 0}
          days
        </p>
      </CurrentStreak>
      {streaks.length > 0 &&
        streaks.map((streak) => (
          <React.Fragment key={uuid()}>
            <Start>{formatDate(streak.end)}</Start>
            <StreakBar
              color={habitColor}
              barWidth={`${(streak.streak / maxStr) * 100}%`}
            />
            <div>{streak.streak}</div>
            <End>{formatDate(streak.start)}</End>
          </React.Fragment>
        ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: streaks;
  align-self: stretch;
  justify-self: stretch;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 5% repeat(auto-fit, minmax(1rem, 3rem));
  grid-row-gap: 1em;
  place-items: center;
  border: 1px solid ${(props) => props.color};
  border-radius: 10px;
  padding: 0.5rem;

  & span {
    align-self: flex-start;
    font-size: 0.7rem;
  }
`

const CurrentStreak = styled.div`
  grid-column: 1 / -1;
  grid-row: 2;
  font-size: 1.1rem;
`

const Start = styled.p`
  grid-column: 1 / span 1;
  font-size: 0.7rem;
`

const End = styled.p`
  grid-column: 3 / span 1;
  font-size: 0.7rem;
`

const StreakBar = styled.div<{ color: string; barWidth: string }>`
  grid-column: 2 / span 1;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  padding: 0.1em 0;
  border-radius: 25px;
  justify-self: center;
  min-width: ${(props) => props.barWidth};

  & div {
    text-align: center;
    padding: 0.1em;
    color: ${(props) => props.theme.colors.primary};
    width: 1.1rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.tertiary};
  }
`

export default HabitStreaks
