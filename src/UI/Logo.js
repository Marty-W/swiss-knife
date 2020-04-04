import React from "react";
import styled from "styled-components";

import { ReactComponent as Knife } from "./../assets/svgs/swiss-army-knife.svg";

const Logo = () => (
  <LogoWrapper>
    <Knife />
    <LogoText>
      Swiss <span>Knife</span>
    </LogoText>
  </LogoWrapper>
);

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 1 0.5em;
  & svg {
    height: 3em;
  }
`;

const LogoText = styled.span`
  display: block;
  font-family: "Amatic SC", sans-serif;
  margin-left: 0.5em;
  font-size: 1.3em;

  & span {
    display: block;
    margin: 0;
  }
`;

export default Logo;
