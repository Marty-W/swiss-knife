import styled from 'styled-components/'

const SectionHeading = styled.h2`
  font-family: ${(props) => props.theme.fonts.secondary};
  writing-mode: vertical-lr;
  letter-spacing: 0.1px;
  font-size: 1.5rem;

  @media (min-width: 1000px) {
    writing-mode: initial;
  }
`

export default SectionHeading
