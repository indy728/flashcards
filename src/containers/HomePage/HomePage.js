import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ContentBlock from '../../components/UI/ContentBlock/ContentBlock'

const Wrapper = styled(ContentBlock)`
    display: flex;
    flex-flow: column;
    justify-content: center;
    padding: 3rem;

    /* @media (min-width: 900px) {
        width: 80rem;
    } */
`

const Intro = styled.div`
    width: 80%;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;

    h1 {
        text-align: center;
        margin: 1rem;
    }
`

const FunctionalComponents = styled.div`
    font-size: 2.8rem;
    text-align: center;
    font-weight: bold;
    text-transform: uppercase;
    margin: 1.5rem;
`

class HomePage extends Component {

    render() {
        const functionalComponents = ["Logout", "Add Ingredient"]

        const funcCompList = functionalComponents.map(component => {
            return (
                <FunctionalComponents key={component}>
                    {component}
                </FunctionalComponents>
            )
        })
        return (
            <React.Fragment>
                <Wrapper className="HomePage">
                    <Intro>
                        <h1>Welcome, <span style={{"fontWeight": "bold"}}>{this.props.email}</span>! And congratulations!</h1>
                        <h2>Now that you are logged in, you can do <span style={{"fontWeight": "bold"}}>{functionalComponents.length}</span> things:</h2>
                    </Intro>
                    {funcCompList}
                </Wrapper>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.username,
        email: state.email
    }
}

export default connect(mapStateToProps)(HomePage)
