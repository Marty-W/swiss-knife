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
         font-size: 14px;
         background: #101119 ;
         color: #EFF6EE;
    }
`

export default GlobalStyle
