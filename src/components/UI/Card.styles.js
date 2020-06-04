import styled from 'styled-components/macro'

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  border-bottom: 2px solid ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.tertiary};
  border-radius: 5px;
  line-height: 1.5;
  padding: 0.5em 1em;
`

export default Card
