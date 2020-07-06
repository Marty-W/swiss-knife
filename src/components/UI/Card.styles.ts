import styled from 'styled-components/'

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom: 2px solid ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.tertiary};
  border-radius: 5px;
  padding: 0.5em 1em;
`

export default Card
