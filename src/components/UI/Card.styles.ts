import styled from 'styled-components/macro'

const Card = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.tertiary};
  border-radius: 10px;
  padding: 0.8rem 1.3rem;
  width: 100%;
  height: 100%;
  overflow: auto;

  @media (min-width: 673px) {
    padding: 1rem 1.5rem;
  }
`

export default Card
