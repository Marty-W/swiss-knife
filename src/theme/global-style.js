import { createGlobalStyle } from 'styled-components/macro'
import reset from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    ${reset}

    *, *:before, *:after {
        box-sizing: border-box;
    }

    html {
        box-sizing: border-box;
        scroll-behavior: smooth;
    }

    body {
         font-family: 'Raleway', sans-serif;
         background: #0F1020;
         color: #EAF2EF;
    }

    h1 {
      font-size: 2rem;
    }
`

export default GlobalStyle
