import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components/'

interface Props {
  percentage: number
}

const ProgressBar: React.FC<Props> = ({ percentage }) => (
  <Bar>
    <Done
      initial={{ width: '0%' }}
      animate={{ width: `${percentage}%` }}
      transition={{ duration: 1.5 }}
    />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {percentage}%
    </motion.span>
  </Bar>
)

export default ProgressBar

const Bar = styled.div`
  grid-area: bar;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 20px;
  position: relative;
  height: 2em;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0.35em;

  & span {
    position: absolute;
    right: 1em;
  }
`
const Done = styled(motion.div)`
  background: ${(props) => props.theme.colors.accent};
  border-radius: 20px;
  color: #fff;
  height: 100%;
`
