import { GiSwissArmyKnife } from 'react-icons/gi'
import React from 'react'
import styled from 'styled-components/macro'
import { BsQuestion } from 'react-icons/bs'
import { useLocation, useHistory } from 'react-router-dom'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'
import Auth from '../../pages/Auth'
import DarkModeToggle from './DarkModeToggle'
import Modal from './Modal'
import { signOut } from '../../firebase/firebase'
import useCurrentUser from '../../hooks/useCurrentUser'
import useModal from '../../hooks/useModal'
import InfoCard from './InfoCard'

interface Props {
  themeToggle: () => void
}

const Header: React.FC<Props> = ({ themeToggle }) => {
  const currentUser = useCurrentUser()
  const [isAuthShowing, toggleAuth] = useModal()
  const [isInfoShowing, toggleInfo] = useModal()
  const { pathname } = useLocation()
  const history = useHistory()

  return (
    <Wrapper>
      <Logo>
        <Knife onClick={() => history.push('/')} />
        <span>Swiss Knife</span>
      </Logo>
      <ButtonWrapper>
        <Question onClick={toggleInfo} pathname={pathname} />
        <DarkModeToggle themeToggle={themeToggle} />
        {currentUser && !currentUser.isAnonymous ? (
          <AuthButton onClick={() => signOut()}>
            <AiOutlineLogout />
            <span>sign out</span>
          </AuthButton>
        ) : (
          <AuthButton onClick={() => toggleAuth()}>
            <AiOutlineLogin />
            <span>sign in</span>
          </AuthButton>
        )}
      </ButtonWrapper>
      <Modal isShowing={isAuthShowing} hide={toggleAuth} modalHeight="50vh">
        <Auth hide={toggleAuth} />
      </Modal>
      <Modal
        isShowing={isInfoShowing}
        hide={toggleInfo}
        modalHeight="80vh"
        variant="info"
      >
        <InfoCard hide={toggleInfo} />
      </Modal>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: head;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;

  @media (min-width: 1000px) {
    padding: 0;
    display: initial;
    background-color: ${(props) => props.theme.colors.secondary};
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 1rem;
  max-width: 20%;

  & span {
    font-size: 1.4rem;
    display: none;
    font-family: ${(props) => props.theme.fonts.secondary};
  }
`

export const Knife = styled(GiSwissArmyKnife)`
  transform: rotate(-45deg);
  color: ${(props) => props.theme.colors.accent};
  width: 2.5rem;
  height: 2.5rem;

  @media (min-width: 520px) {
    display: none;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 300px;
  min-height: 50%;
  flex: 1;

  @media (min-width: 1000px) {
    min-height: 70%;
    flex-direction: column;
    justify-content: space-around;
  }
`
const Question = styled(BsQuestion)<{ pathname: string }>`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  display: ${(props) => (props.pathname === '/' ? 'none' : 'block')};
  fill: ${(props) => props.theme.colors.tertiary};

  &:hover {
    fill: ${(props) => props.theme.colors.accent};
  }
`

const AuthButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${(props) => props.theme.colors.accent};
  font-size: 1rem;
  display: flex;
  align-items: center;
  min-width: auto;
  min-height: 100%;

  & svg {
    width: 1.2rem;
    height: 1.2rem;
    display: block;
    margin-right: 0.5rem;
  }

  &:hover {
    color: ${(props) => props.theme.colors.tertiary};
    cursor: pointer;
  }

  @media (min-width: 1000px) {
    font-size: 1.3rem;

    & svg {
      height: 2rem;
      width: 2rem;
    }
  }
`

export default Header
