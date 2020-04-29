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
  position: fixed;
  width: 100%;
  height: 5.5vh;
  bottom: 0;
  left: 0;
  background-color: ${(props) => props.theme.colors.red};
  box-shadow: 0px -3px 11px 0px rgba(204, 41, 54, 0.52);
`

export default Navbar
