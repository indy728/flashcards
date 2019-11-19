import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Main = styled.main`
    min-height: 100vh;
    margin-top: 6rem;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* background: ${props => props.theme.palette.secondary[3]}; */
    background: ${props => props.theme.palette.white[1]};
`

class Layout extends Component {
    state = {
        components: {
            authentication: {
                key: "auth",
                link: "/auth",
                title: "Log In",
                usage: "basic",
                isAuth: false,
            },
            home: {
                key: "home",
                link: "/",
                title: "Profile",
                usage: "basic",
                isAuth: true,
            },
            quiz: {
                key: "quiz",
                link: "/quiz",
                title: "Quiz",
                usage: "basic",
                isAuth: true,
            },
            appendix: {
                key: "appendix",
                link: "/appendix",
                title: "Appendix",
                usage: "basic",
                isAuth: true,
                                                                
            },
            logout: {
                key: "logout",
                link: "/logout",
                title: "Log Out",
                usage: "basic",
                isAuth: true,
            },
            addCocktail: {
                key: "addCocktail",
                link: "/add_cocktail",
                title: "Add A Cocktail",
                usage: "creator",
                isAuth: true,
            },
            addIngredient: {
                key: "addIngredient",
                link: "/add_ingredient",
                title: "Add An Ingredient",
                usage: "creator",
                isAuth: true,
            },
        },
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerOpenHandler = () => {
        this.setState({showSideDrawer: true})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isAuthenticated={this.props.isAuthenticated}
                    components={this.state.components}
                    sideDrawer={this.state.showSideDrawer}
                    toggle={this.sideDrawerToggleHandler}
                    />
                <SideDrawer
                    isAuthenticated={this.props.isAuthenticated}
                    components={this.state.components}
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHandler}
                     />
                <Main>
                    {this.props.children}
                </Main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.email !== null
    }
}

export default connect(mapStateToProps)(Layout)
