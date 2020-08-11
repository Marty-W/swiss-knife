import React from 'react'
import styled from 'styled-components/'
import { NavLink, useRouteMatch } from 'react-router-dom'

const TodoNav: React.FC = () => {
  const { url } = useRouteMatch()
  return (
    <Wrapper>
      <TodoLink exact to={`${url}`}>
        today
      </TodoLink>
      <TodoLink exact to={`${url}/stash`}>
        stash
      </TodoLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: todoNav;
  align-self: center;
  display: flex;
  justify-content: space-around;
`

const TodoLink = styled(NavLink)`
  text-transform: uppercase;
  text-decoration: none;
  color: ${(props) => props.theme.colors.tertiary};
  &.active {
    color: ${(props) => props.theme.colors.accent};
  }
`

export default TodoNav
