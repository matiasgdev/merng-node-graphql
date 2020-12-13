import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,600;1,200&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500&display=swap');

  *, *::after, *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  .error {
    color: var(--red, #ff1e56);
    font-size: .950em;
    font-style: italic;
    margin-top: .5em;
  }

  a {
    text-decoration: none;
    color: initial;
  }

  :root {
    --main-font: "Source Sans Pro", sans-serif;
    --secondary-font: 'Montserrat', sans-serif;
    --black: #000;
    --black-400: #606060;
    --shadow: #d0cdcd;
    --white: #fff;
    --red: #ff1e56;
    --spacing-24: 24px;
  }
`