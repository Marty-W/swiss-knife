import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components/macro'

interface Props {
  onClick: () => void
}

const Plus: React.FC<Props> = ({ onClick }) => (
  <PlusSVG
    xmlns="http://www.w3.org/2000/svg"
    fill="#F02D3A"
    viewBox="0 0 50 50"
    width="50px"
    height="50px"
    whileHover={{ scale: 1.1 }}
    onClick={onClick}
  >
    <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z" />
  </PlusSVG>
)

const PlusSVG = styled(motion.svg)`
  position: absolute;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  bottom: 0;
  right: 0;

  @media (min-width: 1000px) {
    bottom: 5rem;
  }
`

export default Plus
