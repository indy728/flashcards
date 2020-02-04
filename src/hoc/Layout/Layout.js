import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Header from '../../components/Navigation/Header/Header'
import SideNav from '../../components/Navigation/SideNav/SideNav'

const Main = styled.main`
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    /* background: ${props => props.theme.palette.secondary[3]}; */
    background: ${props => props.theme.palette.white[1]};
`

const Content = styled.div`
    display: flex;
    
`

const Container = styled.div`
    max-width: 120rem;
    margin: 8rem auto;
    box-shadow: ${props => props.theme.shadow.container};
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
            <React.Fragment>
                <Container>
                    <Header
                        isAuthenticated={this.props.isAuthenticated}
                        components={this.state.components}
                        sideNav={this.state.showSideNav}
                        toggle={this.sideNavToggleHandler}
                        />
                    <Content>
                        <SideNav
                            isAuthenticated={this.props.isAuthenticated}
                            components={this.state.components}
                            open={this.state.showSideNav}
                            close={this.sideNavClosedHandler}
                            />
                        <Main>
                            {this.props.children}
                        </Main>
                    </Content>
                </Container>
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
