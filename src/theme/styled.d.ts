import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      primary: string
      secondary: string
    }
    colors: {
      primary: string
      secondary: string
      tertiary: string
      accent: string
    }
  }
}
