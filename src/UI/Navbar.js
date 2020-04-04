import React from "react";
import styled from "styled-components";

import { ReactComponent as Exit } from "../assets/svgs/exit.svg";

const NavBar = ({ showMenu, toggleMenu }) => {
  return (
    <NavbarWrapper display={showMenu}>
      <Exit onClick={toggleMenu} />
      <ul>
        <li>fda</li>
        <li>gfs</li>
        <li>req</li>
        <li>gfs</li>
        <li>fda</li>
      </ul>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: ${(props) => (props.display ? "block" : "none")};
  z-index: 5;
  background-color: white;

  & svg {
    position: absolute;
    top: 1em;
    right: 1em;
    width: 4em;
    height: 4em;
  }
`;

export default NavBar;
