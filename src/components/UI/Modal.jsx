import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components/macro'

const modalRoot = document.getElementById('modal')

// TODO fix button styling
const Modal = ({ children, type }) => {
  const elRef = useRef(null)
  if (!elRef.current) {
    elRef.current = document.createElement('div')
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current)
    return () => modalRoot.removeChild(elRef.current)
  }, [])

  return createPortal(
    type === 'center' ? (
      <StyledCenterModal>
        <div>{children}</div>
      </StyledCenterModal>
    ) : (
      <StyledFullModal>{children}</StyledFullModal>
    ),
    elRef.current
  )
}

const StyledFullModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.95);
  z-index: 10;
`

const StyledCenterModal = styled(StyledFullModal)`
  background-color: rgba(0, 0, 0, 0.8);
  & > div {
    background-color: #eaf2ef;
    color: #000;
    position: fixed;
    width: 80%;
    height: 55%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 7px;
  }
`

export default Modal
