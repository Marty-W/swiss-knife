import React from 'react'
import styled, { useTheme } from 'styled-components/macro'
import BeatLoader from 'react-spinners/BeatLoader'

const Spinner: React.FC = () => {
  const theme = useTheme()

  return (
    <Wrapper>
      <BeatLoader color={theme.colors.tertiary} />
    </Wrapper>
  )
}

export default Spinner

const Wrapper = styled.div`
  grid-area: content;
  place-self: center;
`
