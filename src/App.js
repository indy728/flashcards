import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Layout from './hoc/Layout/Layout'
import FlashcardCreator from './containers/FlashcardCreator/FlashcardCreator'
import Auth from './containers/Auth/Auth'
import HomePage from './containers/HomePage/HomePage'
import IngredientCreator from './components/IngredientCreator/IngredientCreator'
import Logout from './containers/Auth/Logout/Logout'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from './themes/default'
import { authCheckState } from './store/actions';

const GlobalStyle = createGlobalStyle`
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

  componentDidMount() {
    // On reaching this page, App checks for local tokens in storage
    // and clears localStorage if it has been too long
    this.props.onTryAutoSignIn()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Redirect to="/auth" />
      </Switch>
    )
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/logout" exact component={Logout} />
          <Route path="/add_cocktail" component={FlashcardCreator} />
          <Route path="/add_ingredient" component={IngredientCreator} />
          <Route path="/" exact component={HomePage}/>
          <Redirect to="/" />
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
    isAuthenticated: state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
