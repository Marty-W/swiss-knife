import React from "react";
import styled from "styled-components/macro";

import { ReactComponent as Knife } from "./../assets/svgs/swiss-army-knife.svg";

const Logo = () => (
  <LogoWrapper>
    <Knife />
    <LogoText>Swiss Knife</LogoText>
  </LogoWrapper>
);

const LogoWrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  & svg {
    height: 3em;
  }
`;

const LogoText = styled.span`
  font-family: "Amatic SC", sans-serif;
  margin-left: 0.5em;
  font-size: 1.3em;

  & span {
    display: block;
    margin: 0;
  }
`;

export default Logo;
