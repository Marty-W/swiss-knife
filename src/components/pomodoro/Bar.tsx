import React, { useEffect, useState } from 'react'

import styled from 'styled-components/'

interface Props {
  max: number
  value: number
}

const Bar: React.FC<Props> = ({ max, value }) => {
  const [percentDone, setPercentDone] = useState(0)

  useEffect(() => {
    const percentage = Math.floor((value / max) * 100)
    setPercentDone(percentage > 0 ? percentage : 0)
  }, [max, value])

  return (
    <BarWrapper>
      <Track style={{ width: `${percentDone}%` }}>
        <span>
          <span>{percentDone}</span> %
        </span>
      </Track>
    </BarWrapper>
  )
}

const BarWrapper = styled.div`
  grid-area: bar;
  height: 100%;
  position: relative;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 25px;
  padding: 5px;
  display: flex;
`
const Track = styled.span`
  display: block;
  height: 100%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background: ${(props) => props.theme.colors.accent};
  position: relative;
  overflow: hidden;

  & span {
    padding: 0 1rem;
    & span {
      margin-right: 0.5rem;
    }
  }
`

export default Bar
