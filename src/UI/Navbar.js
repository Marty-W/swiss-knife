import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { ReactComponent as Exit } from "../assets/svgs/exit.svg";

const NavBar = ({ showMenu, toggleMenu }) => {
  return (
    <NavbarWrapper display={showMenu}>
      <ExitIcon onClick={toggleMenu} />
      <NavList>
        <li>
          <SNavLink to="/" activeClassName="active">
            Home
          </SNavLink>
        </li>
        <li>
          <SNavLink to="/pomodoro" activeClassName="active">
            Pomodoro
          </SNavLink>
        </li>
        <li>
          <SNavLink to="/habits" activeClassName="active">
            Habits
          </SNavLink>
        </li>
        <li>
          <SNavLink to="/todo" activeClassName="active">
            Todos
          </SNavLink>
        </li>
      </NavList>
    </NavbarWrapper>
  );
};

const SNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;

  &.active {
    color: red;
  }
`;

const ExitIcon = styled(Exit)`
  position: absolute;
  top: 1em;
  right: 1em;
  width: 4em;
  height: 4em;
  cursor: pointer;

  @media (min-width: 460px) {
    display: none;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: center;

  @media (min-width: 460px) {
    display: flex;
    justify-content: space-around;
  }

  & li {
    font-size: 1.7em;
    margin-bottom: 1.2em;
    margin-right: 1.2em;

    @media (min-width: 460px) {
      font-size: 1.2em;
      margin-bottom: 0;
    }
    &:hover {
      cursor: pointer;
      border-bottom: 4px solid black;
    }
  }
`;

const NavbarWrapper = styled.div`
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

  @media (min-width: 460px) {
    position: initial;
    display: flex;
    height: auto;
    width: 70%;
  }
`;

export default NavBar;
