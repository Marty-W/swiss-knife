import styled from 'styled-components/macro'
import { AiFillPlusCircle } from 'react-icons/ai'

const Plus = styled(AiFillPlusCircle)`
  fill: ${(props) => props.theme.colors.accent};
  font-size: 2.4rem;
  cursor: pointer;
  position: absolute;
  bottom: 2em;
  right: 0.5em;
`

export default Plus
