import React from "react";
import styled from "styled-components";

const Card = ({ children }) => <SCard>{children}</SCard>;

const SCard = styled.div`
  padding: 2em 4em;
  margin: 0 1em;
  width: 80%;
  border: 1px slategray solid;
  border-radius: 4px;
  position: relative;
  overflow: hidden;

  & svg {
    width: 500px;
    position: absolute;
    opacity: 0.1;
    top: -3em;
  }
`;

export default Card;
