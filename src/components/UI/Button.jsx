import styled from 'styled-components/macro'

const Button = styled.button`
  background: none;
  border: 2px solid ${(props) => props.theme.colors.red};
  padding: 0.3em 2em;
  border-radius: 6px;
  font-size: 1rem;
  display: inline-block;
  margin: 0 1em;
  color: ${(props) => props.theme.colors.red};
  cursor: pointer;
`

export default Button
