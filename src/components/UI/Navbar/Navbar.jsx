import React from 'react'
import styled from 'styled-components/macro'

import NavItems from './NavItems'

const Navbar = () => {
  return (
    <StyledNavbar>
      <NavItems />
    </StyledNavbar>
  )
}

const StyledNavbar = styled.nav`
  position: sticky;
  width: 100%;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.primary};
`

export default Navbar
