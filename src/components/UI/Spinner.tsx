import React from 'react'
import styled from 'styled-components'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const Spinner: React.FC = () => (
  <LoaderWrapper>
    <Loader type="Oval" color="#fff" />
  </LoaderWrapper>
)

export default Spinner

const LoaderWrapper = styled.div`
  grid-area: content;
  display: flex;
  justify-content: center;
  place-items: center;
`
