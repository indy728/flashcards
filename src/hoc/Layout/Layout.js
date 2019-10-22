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
    background: ${props => props.theme.palette.secondary[3]};
`

class Layout extends Component {
    state = {
        showSideDrawer: false
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
                    toggle={this.state.showSideDrawer ? this.sideDrawerClosedHandler : this.sideDrawerToggleHandler}
                    />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHandler} />
                <Main>
                    {this.props.children}
                </Main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null
    }
}

export default connect(mapStateToProps)(Layout)
