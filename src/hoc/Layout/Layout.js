import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import NavHeader from '../../components/Navigation/NavHeader/NavHeader'
import SideNav from '../../components/Navigation/SideNav/SideNav'

const Main = styled.main`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* background: ${({ theme }) => theme.palette.secondary[3]}; */
    background: ${({ theme }) => theme.palette.white[1]};
`

const Content = styled.div`
    display: flex;
    flex: 1;
    
`

const Container = styled.div`
    display: flex;
    flex-flow: column;

    @media (max-width: ${({ theme }) => theme.media.tablet}) {
        height: 100vh;
    }

    @media (min-width: ${({ theme }) => theme.media.tablet}) {
        margin: 8rem auto;
        box-shadow: ${({ theme }) => theme.shadow.container};
        
    }
    
    @media (min-width: ${({ theme }) => theme.media.laptop}) {
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
            // quiz: {
            //     key: "quiz",
            //     link: "/quiz",
            //     title: "Quiz",
            //     usage: "basic",
            //     isAuth: true,
            // },
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
                        className={'app-content--side-nav'}
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
