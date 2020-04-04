import React from "react";

import { ReactComponent as Menu } from "../assets/svgs/menu.svg";
import styled from "styled-components";

const MenuIcon = ({ showMenu, toggleMenu }) => {
  return (
    <IconWrapper display={showMenu}>
      <Menu onClick={toggleMenu} />
    </IconWrapper>
  );
};

export default MenuIcon;

const IconWrapper = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 1em;
  right: 1em;
  width: 3em;
  display: ${(props) => (props.display ? "none" : "block")};
  z-index: 1;
`;
