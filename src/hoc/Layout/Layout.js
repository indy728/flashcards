import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Header from '../../components/Navigation/Header/Header'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

const Main = styled.main`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* background: ${props => props.theme.palette.secondary[3]}; */
    background: ${props => props.theme.palette.white[1]};
`

const Content = styled.div`
`

const Container = styled.div`
    max-width: 120rem;
    margin: 8rem auto;
    box-shadow: ${props => props.theme.shadow.container};

    min-height: 50rem;
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
                <body>
                    <Container>
                        <Header
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
                        {/* <Content> */}
                            <Main>
                                {this.props.children}
                            </Main>
                        {/* </Content> */}
                    </Container>
                </body>
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
