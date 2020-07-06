/* eslint-disable consistent-return */
import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components/'

// TODO fix button styling
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

    return () => {
      modalRoot.removeChild(modalDiv)
    }
  }, [])

  return createPortal(<StyledModal>{children}</StyledModal>, elRef.current)
}

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 1);
  z-index: 10;
`

// const StyledCenterModal = styled(StyledFullModal)`
//   background-color: rgba(0, 0, 0, 0.8);
//   & > div {
//     background-color: #eaf2ef;
//     color: #000;
//     position: fixed;
//     width: 80%;
//     height: 55%;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
//     border-radius: 7px;
//   }
// `

export default Modal
