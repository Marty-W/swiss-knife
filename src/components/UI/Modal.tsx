/* eslint-disable consistent-return */
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components/'
import { motion, AnimatePresence } from 'framer-motion'

// TODO fix close outside of modal

const modalRoot = document.getElementById('modal') as HTMLElement

const Modal: React.FC = ({ children }) => {
  const elRef = useRef(document.createElement('div'))

  useEffect(() => {
    if (!modalRoot) {
      return
    }
    const modalDiv = elRef.current
    modalRoot.appendChild(modalDiv)
    document.getElementById('root').style.filter = 'blur(8px)'

    return () => {
      modalRoot.removeChild(modalDiv)
      document.getElementById('root').style.filter = ''
    }
  }, [])

  return createPortal(<StyledModal>{children}</StyledModal>, elRef.current)
}

const StyledModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Modal
