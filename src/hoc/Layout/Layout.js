import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NavHeader from '../../components/Navigation/NavHeader/NavHeader'
import SideNav from '../../components/Navigation/SideNav/SideNav'

const Main = styled.main`
    flex: 1;
    /* background: ${({ theme }) => theme.palette.secondary[3]}; */
    background: ${({ theme }) => theme.palette.white[1]};
    
    @media (max-width: ${({ theme }) => theme.media.tabletLandscape}) {
        width: 100%;
    }

    @media (min-width: ${({ theme }) => theme.media.tablet}) {
        padding: 5%;
    }

    @media (min-width: ${({ theme }) => theme.media.tabletLandscape}) {
        height: 100%;
    }
`

const Content = styled.div`
    flex: 1;
    width: 100%;

    @media (max-width: ${({ theme }) => theme.media.tabletLandscape}) {
    }

    
    @media (min-width: ${({ theme }) => theme.media.tablet}) {
    }
    
    @media (min-width: ${({ theme }) => theme.media.tabletLandscape}) {
        flex-flow: row;
    }
`

const Container = styled.div`
    width: 100%;

    @media (max-width: ${({ theme }) => theme.media.tabletLandscape}) {
        height: 100vh;
    }

    @media (min-width: ${({ theme }) => theme.media.tabletLandscape}) {
        margin: 8rem auto;
        box-shadow: ${({ theme }) => theme.shadow.container};
        max-width: 120rem;
    }
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
            learningCenter: {
                key: "learning_center",
                link: "/learning_center",
                title: "Learning Center",
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
            home: {
                key: "home",
                link: "/",
                title: "Profile",
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
            addElement: {
                key: "addElement",
                link: "/add_element",
                title: "Add An Element",
                usage: "creator",
                isAuth: true,
            },
        },
        showSideNav: false,
    }

    sideNavClosedHandler = () => {
        this.setState({showSideNav: false})
    }

    sideNavOpenHandler = () => {
        this.setState({showSideNav: true})
    }

    sideNavToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideNav: !prevState.showSideNav}
        })
    }

    render() {
        return (
            <Container
                className={'app-container'}
                >
                <NavHeader
                    isAuthenticated={this.props.isAuthenticated}
                    components={this.state.components}
                    sideNav={this.state.showSideNav}
                    toggle={this.sideNavToggleHandler}
                    />
                <Content
                    className={'app-content'}
                    >
                    <SideNav
                        isAuthenticated={this.props.isAuthenticated}
                        components={this.state.components}
                        open={this.state.showSideNav}
                        close={this.sideNavClosedHandler}
                        />
                    <Main
                        className={'app-content--main'}
                        >
                        {this.props.children}
                    </Main>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.email !== null
    }
}

export default connect(mapStateToProps)(Layout)
