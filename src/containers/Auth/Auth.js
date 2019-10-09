import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../../components/UI/Button/Button'

const Wrapper = styled.div`
    width: 50rem;
    margin-top: 6rem;
    background-color: ${props => props.theme.palette.grayscale[4]};
    display: flex;
    flex-flow: column;
`

class Auth extends Component {

    
    render() {
        return (
            <Wrapper>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" >LOG IN</Button>
                </form>
                <Button 
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                        SWITCH TO {this.state.isSignUp ? "SIGN IN" : "SIGN UP"}
                </Button>
            </Wrapper>
        )
    }
}

export default Auth
