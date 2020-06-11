import React from 'react'
import styled from 'styled-components'

import NavItems from './NavItems'

const Navbar = () => {
  return (
    <StyledNavbar>
      <NavItems />
    </StyledNavbar>
  )
}

const StyledNavbar = styled.nav`
  grid-area: nav;
  width: 100%;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.primary};
`

export default Navbar
