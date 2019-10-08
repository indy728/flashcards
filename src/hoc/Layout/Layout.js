import React, { Component } from 'react'
import styled from 'styled-components'

const Main = styled.main`
    min-height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: ${props => props.theme.palette.secondary[3]};
`

class Layout extends Component {
    render() {
        return (
            <Main>
                {this.props.children}
            </Main>
        )
    }
}

export default Layout
