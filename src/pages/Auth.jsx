import React from 'react'

import Modal from '../components/UI/Modal'
import SignIn from '../components/authentication/SignIn'

const Auth = () => {
  return (
    <Modal type="center">
      <SignIn />
    </Modal>
  )
}

export default Auth
