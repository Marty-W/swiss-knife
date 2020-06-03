import styled from 'styled-components/macro'

const Button = styled.button`
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.tertiary};
  border: none;
  padding: 0.4em 2.4em;
  border-radius: 3px;
  font-size: 1rem;
  display: inline-block;
  cursor: pointer;
`

export default Button
