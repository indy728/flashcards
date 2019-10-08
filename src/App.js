import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import Flashcards from './containers/Flashcards/Flashcards'
import FlashcardCreator from './containers/FlashcardCreator/FlashcardCreator'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from './themes/default'

createGlobalStyle`
* { 
    -moz-box-sizing: border-box; 
    -webkit-box-sizing: border-box; 
      box-sizing: border-box; 
  }

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%; 
  }

  body {
    background-color: rgba(147, 180, 194, 0.336);
    font-family: ${props => props.theme.fonts.primary};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.header};
    font-weight: 300;
    text-transform: uppercase;
  }
`

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <Flashcards />
          <FlashcardCreator />
        </Layout>
      </ThemeProvider>
    )
  }

}

export default App;
