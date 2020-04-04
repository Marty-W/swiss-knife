import React from "react";
import styled from "styled-components";

import { ReactComponent as Exit } from "../assets/svgs/exit.svg";

const NavBar = ({ showMenu, toggleMenu }) => {
  return (
    <NavbarWrapper display={showMenu}>
      <ExitIcon onClick={toggleMenu} />
      <NavList>
        <li>Home</li>
        <li>Pomodoro</li>
        <li>Habits</li>
        <li>Todos</li>
      </NavList>
    </NavbarWrapper>
  );
};

const ExitIcon = styled(Exit)`
  position: absolute;
  top: 1em;
  right: 1em;
  width: 4em;
  height: 4em;
  cursor: pointer;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: center;

  & li {
    font-size: 1.7em;
    margin-bottom: 1.2em;

    &:hover {
      cursor: pointer;
      border-bottom: 4px solid black;
    }
  }
`;

const NavbarWrapper = styled.nav`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 100vw;
  display: ${(props) => (props.display ? "flex" : "none")};
  z-index: 5;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export default NavBar;
