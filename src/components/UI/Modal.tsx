import { AnimatePresence, motion } from 'framer-motion'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { IoMdClose } from 'react-icons/io'
import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components/macro'
import useClickOutside from '../../hooks/useClickOutside'

const modalRoot = document.getElementById('modal') as HTMLElement

interface Props {
  isShowing: boolean
  hide: () => void
  modalHeight: string
  variant?: string
}

const Modal: React.FC<Props> = ({
  isShowing,
  hide,
  children,
  modalHeight,
  variant,
}) => {
  const history = useHistory()
  const match = useRouteMatch()
  const modalRef = useClickOutside(() => {
    if (match.path === '/habits/:id') {
      history.push('/habits')
      hide()
    }

    if (match.path !== '/session') {
      hide()
    }
  })

  return isShowing
    ? createPortal(
        <AnimatePresence exitBeforeEnter>
          <StyledModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key="modal"
          >
            <ModalCardWrapper
              ref={modalRef as React.RefObject<HTMLDivElement>}
              key="card"
              modalHeight={modalHeight}
              variant={variant || ''}
            >
              <CloseBtn onClick={() => hide()} />
              {children}
            </ModalCardWrapper>
          </StyledModal>
        </AnimatePresence>,
        modalRoot,
      )
    : null
}

const StyledModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 20;
`

const ModalCardWrapper = styled(motion.div)<{
  variant: string
  modalHeight: string
}>`
  position: absolute;
  width: 85%;
  max-width: 500px;
  height: ${(props) => props.modalHeight};
  padding: 1em;
  background-color: ${(props) =>
    props.variant === 'info'
      ? props.theme.colors.accent
      : props.theme.colors.secondary};
  border-radius: 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

const CloseBtn = styled(IoMdClose)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  fill: ${(props) => props.theme.colors.tertiary};
  width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
`

export default Modal
