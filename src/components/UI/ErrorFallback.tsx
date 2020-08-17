import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import Button from './Button'

const ErrorFallback: React.FC = () => {
  const history = useHistory()
  return (
    <Wrapper>
      <h2>Sorry, it looks like there has been an error</h2>
      <Button onClick={() => history.push('/')} variant="primary">
        Go Home
      </Button>
    </Wrapper>
  )
}

export default ErrorFallback

const Wrapper = styled.div`
  grid-area: content;
  width: 100%;
  height: 100%;
`
