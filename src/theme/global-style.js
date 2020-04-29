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
         font-family: 'Oswald', sans-serif;
         background: ${(props) => props.theme.colors.dark};
         color: ${(props) => props.theme.colors.white}
    }

    h1 {
      font-size: 2rem;
    }
`

const theme = {
  fonts: {
    heading: 'Amatic SC',
  },
  colors: {
    grey: '#303036',
    red: '#CC2936',
    purple: '#3B3355',
    white: '#EAF2EF',
    dark: '#0F1020',
  },
}

export { GlobalStyle, theme }
