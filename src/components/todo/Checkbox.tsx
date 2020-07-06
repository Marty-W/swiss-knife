import React, { useState } from 'react'
import { motion } from 'framer-motion'

const tickVariants = {
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
}

interface Props {
  done: boolean
  markChecked: () => void
}

const CheckBox: React.FC<Props> = ({ done, markChecked }) => {
  const [isChecked, setIsChecked] = useState(() => done)

  const handleMarkDone = () => {
    if (!done) {
      setIsChecked(!isChecked)
      markChecked()
    }
  }
  return (
    <motion.svg
      initial={false}
      animate={isChecked ? 'checked' : 'unchecked'}
      fill="#EFF6EE"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      width="24px"
      height="24px"
      onTap={handleMarkDone}
    >
      <motion.path
        fill="none"
        stroke="#EFF6EE"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M14.1 24.7L23 33 37 16.48"
        variants={tickVariants}
      />
      <path
        fill="none"
        stroke="#EFF6EE"
        strokeMiterlimit="10"
        strokeWidth="2"
        d={
          done
            ? ''
            : 'M39,45H11c-3.314,0-6-2.686-6-6V11c0-3.314,2.686-6,6-6h28c3.314,0,6,2.686,6,6v28C45,42.314,42.314,45,39,45z'
        }
      />
    </motion.svg>
  )
}

export default CheckBox
