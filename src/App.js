import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Layout from './hoc/Layout/Layout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import CocktailCreator from './containers/CocktailCreator/CocktailCreator'
import HomePage from './containers/HomePage/HomePage'
import IngredientCreator from './containers/IngredientCreator/IngredientCreator'
import Logout from './containers/Auth/Logout/Logout'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from './themes/default'
import { authCheckState } from './store/actions';

const GlobalStyle = createGlobalStyle`
* { 
    margin: 0;
    padding: 0;
  }

  *,
  *::after,
  *::before {
    box-sizing: inherit;
    -moz-box-sizing: inherit; 
    -webkit-box-sizing: inherit;
  }
  
  html {
    box-sizing: border-box;
    font-size: 62.5%; 
  }

  body {
    @import url('https://fonts.googleapis.com/css?family=Lobster|Lora|Montserrat:700|Swanky+and+Moo+Moo|Ubuntu&display=swap');
    font-family: ${props => props.theme.fonts.primary};
    background-image: ${props => `linear-gradient(to right bottom, ${props.theme.palette.grayscale[5]}, ${props.theme.palette.grayscale[0]})`};
    background-size: cover;
    background-repeat: no-repeat;

    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.header};
    font-weight: 300;
    text-transform: uppercase;
  }
`

const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))
const asyncFlashcards = asyncComponent(() => import('./containers/Flashcards/Flashcards'))

class App extends Component {

  componentDidMount() {
    // On reaching this page, App checks for local tokens in storage
    // and clears localStorage if it has been too long
    this.props.onTryAutoSignIn()
    // Firebase.database().ref('/check').set({
    //   "test1": "1",
    //   "test2": {
    //     "t1": 1,
    //     "t2": 2
    //   }
    // })
    // const checkRef = Firebase.database().ref('check')
    // checkRef.on('value', snap => console.log(snap.val()))
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Redirect to="/auth" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" exact component={Logout} />
          <Route path="/add_cocktail" component={CocktailCreator} />
          <Route path="/add_element" component={IngredientCreator} />
          <Route path="/flashcards" component={asyncFlashcards} />
          <Route path="/" exact component={HomePage}/>
          <Redirect to="/flashcards" />
        </Switch>
      )
    }
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
          <Layout>
            {routes}
          </Layout>
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.email !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
