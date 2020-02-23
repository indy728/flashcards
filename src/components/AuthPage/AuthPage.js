import React from 'react'
import styled from 'styled-components'
import { ContentBlock, Header, Button, Input } from '../UI'

const AuthForm = styled.form`
    width: 100%;
    /* margin: 1rem 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center; */
`

const AuthInput = styled(Input)`
    width: 95%;
    max-width: 60rem;

    @media (max-width: ${({ theme }) => theme.media.tablet} ) {
        max-width: 45rem;
    }
`

const FormButton = styled(Button)`
    width: 18rem;
    font-weight: bold;
    margin-top: 2rem;
`

const SwitchButton = styled(Button)`
    text-decoration: underline;
    background-color: inherit;
    border: none;
`

const authPage = props => {
    const formElementsArray = []
    const {
        formElementsObj,
        isSignUp,
        formSubmit,
        formIsValid,
        inputChanged,
        switchAuthMode,
    } = props
        
    for (let key in formElementsObj) {
        formElementsArray.push({
            id: key,
            config: formElementsObj[key],
        })
    }
    let form = formElementsArray.map(formElement => (
        <AuthInput 
            key={formElement.id}
            autocomplete={formElement.config.elementConfig.autocomplete}
            className="auth-form--input"
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChanged(event, formElement.id)} 
            />
    ))
    
    return (
        <ContentBlock
            className='auth=page'
            >
            <Header
                className='auth-page--header'
                >
                {isSignUp ? "SIGN UP" : "LOG IN"}
            </Header>
            <AuthForm
                className='auth-form'
                onSubmit={formSubmit}>
                {form}
                <FormButton disabled={!formIsValid}>SUBMIT</FormButton>
            </AuthForm>
            <SwitchButton
                className="auth-page--switch"
                clicked={switchAuthMode}>
                {isSignUp ? "Already registered? Sign in!" : "First time here? Sign up!"}
            </SwitchButton>
        </ContentBlock>
    )
}

export default authPage
