import styled from 'styled-components/macro'

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.tertiary};
  border-radius: 5px;
  line-height: 1.5;
  margin: 1em 0;
  padding: 0.5em 1em;
`

export default Card
