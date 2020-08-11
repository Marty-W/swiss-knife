import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset}

    *, *:before, *:after {
        box-sizing: border-box;
    }

    html {
        box-sizing: border-box;
        scroll-behavior: smooth;
        font-size: 100%;
        
    }

    body {
         font-family: 'Lato', sans-serif;
         font-size: 16px;
         background: ${(props) => props.theme.colors.primary};
         color: ${(props) => props.theme.colors.tertiary};
         overflow: hidden;
    }

    a {
        text-decoration: none; 
    }

    @media (min-width: 860px) {
    font-size: 18px;
  }

`

export default GlobalStyle
