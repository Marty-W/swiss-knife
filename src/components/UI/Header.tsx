import React from 'react';
import styled from 'styled-components/';
import { useHistory } from 'react-router-dom';
import { GiSwissArmyKnife } from 'react-icons/gi';
import { auth } from '../../utils/firebase';

import Button from './Button.styles';
import { useCurrentUser } from '../../context/AuthContext';

const Header: React.FC = () => {
  const currentUser = useCurrentUser();
  const history = useHistory();

  const signOutUser = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      <GiSwissArmyKnife />
      {currentUser ? (
        <LoginButton onClick={signOutUser}>Sign out</LoginButton>
      ) : (
        <LoginButton onClick={() => history.push('/auth')}>Sign in</LoginButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  grid-area: head;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5em;

  & svg {
    transform: rotate(-45deg);
    color: ${(props) => props.theme.colors.accent};
    width: 1.8em;
    font-size: 2rem;
    align-self: flex-start;
    margin-top: 0.6em;
  }
`;

const LoginButton = styled(Button)`
  border: 1px solid ${(props) => props.theme.colors.accent};
  padding: 0.5rem 1rem;
`;

// TODO add hover style

export default Header;
