import React from "react";
import styled from "styled-components/macro";

import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <StyledNavbar>
      <NavItems />
    </StyledNavbar>
  );
};

const StyledNavbar = styled.nav`
  position: fixed;
  width: 100%;
  height: 8vh;
  bottom: 0;
  left: 0;
  background-color: #ba274a;
  display: flex;
`;

export default Navbar;
