import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import Layout from './hoc/Layout/Layout'
import FlashcardCreator from './containers/FlashcardCreator/FlashcardCreator'
import Auth from './containers/Auth/Auth'
import IngredientCreator from './components/IngredientCreator/IngredientCreator'
import Logout from './containers/Auth/Logout/Logout'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from './themes/default'

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
  render() {
    let routes = (
      <Switch>
        {/* log in */}
        <Route path="/auth" component={Auth} />
        {/* <Route path="/add_cocktail" component={FlashcardCreator} />
        <Route path="/add_ingredient" component={IngredientCreator} /> */}
        <Redirect to="/auth" />
      </Switch>
    )

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
        {/* log in */}
        <Route path="/logout" exact component={Logout} />
        <Route path="/add_cocktail" component={FlashcardCreator} />
        <Route path="/add_ingredient" component={IngredientCreator} />
        {/* <Route path="/" exact component={UserHome}/> */}
        <Route path="/" exact component={IngredientCreator}/>
        <Redirect to="/add_ingredient" />
      </Switch>
      )
    }
// {/* appendix */}
// <Route path="/" exact component={FlashcardCreator} />
// {/* quiz */}
// <Route path="/" component={FlashcardCreator} />
// {/* creator */}
// <Route path="/" component={FlashcardCreator} />
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

export default withRouter(connect(mapStateToProps)(App));
