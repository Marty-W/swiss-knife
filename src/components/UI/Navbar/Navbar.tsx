import { AnimateSharedLayout, motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components/macro'
import NavItems from './NavItems'

const Navbar: React.FC = () => (
  <AnimateSharedLayout>
    <StyledNavbar>
      <NavItems />
    </StyledNavbar>
  </AnimateSharedLayout>
)

const StyledNavbar = styled(motion.nav)`
  grid-area: nav;
  position: relative;
  z-index: 10;
  background-color: ${(props) => props.theme.colors.secondary};
  @media (min-width: 520px) {
    max-width: 80px;
  }

  @media (min-width: 1000px) {
    max-width: 100%;
  }
`

export default Navbar
