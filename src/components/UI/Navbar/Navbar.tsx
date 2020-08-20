import React from 'react'
import styled from 'styled-components/macro'
import NavItems from './NavItems'

const Navbar: React.FC = () => (
  <StyledNavbar>
    <NavItems />
  </StyledNavbar>
)

const StyledNavbar = styled.nav`
  grid-area: nav;
  position: relative;
  background-color: ${(props) => props.theme.colors.secondary};
  @media (min-width: 520px) {
    max-width: 80px;
  }

  @media (min-width: 1000px) {
    max-width: 100%;
  }
`

export default Navbar
