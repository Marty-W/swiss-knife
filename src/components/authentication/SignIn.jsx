import React, { useState } from 'react'

import Button from '../UI/Button'

const SignIn = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  return (
    <>
      <h2>Sign Up/Login</h2>
      <form>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
          />
        </label>
        <Button>Sign In</Button>
      </form>
    </>
  )
}

export default SignIn
