import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

const Wrapper = styled.div`
    width: 50rem;
    margin-top: 6rem;
    background-color: ${props => props.theme.palette.grayscale[5]};
    border: ${props => props.theme.palette.grayscale[2]};
    box-shadow: 2px 2px ${props => props.theme.palette.grayscale[0]};
    border-radius: 2px;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
`

const AuthForm = styled.form`
    width: 40rem;
    margin: 1rem 0;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
`

const AuthInput = styled(Input)`
    width: 100%;
`

const AuthHeader = styled.h1`
    font-weight: bold;
`

const FormButton = styled(Button)`
    width: 18rem;
    font-size: 1.6rem;
    font-weight: bold;
`

const SwitchButton = styled(Button)`
    text-decoration: underline;
    background-color: inherit;
    border: none;
`

class Auth extends Component {
    state = {
        loginControls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                  required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                  required: true,
                  length: {
                      absMin: 6,
                      absMax: 26
                  },
                },
                valid: false,
                touched: false
            },
        },
        signUpControls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Choose a Username'
                },
                value: '',
                validation: {
                    required: true,
                    length: {
                        absMin: 5,
                        absMax: 22,
                        chars: 'alnum'
                    }
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                },
                value: '',
                validation: {
                  required: true,
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                  required: true,
                  length: {
                      absMin: 6,
                      absMax: 26
                  },
                },
                valid: false,
                touched: false
            },
            verifyPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Re-enter Password',
                },
                value: '',
                validation: {
                  required: true,
                  match: 'password',
                },
                valid: false,
                touched: false
            },
            companyAccessCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '10 Character Company Access Code',
                },
                value: '',
                validation: {
                    required: true,
                    length: {
                        absMin: 10,
                        absMax: 10
                    },
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: false
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp}
            })
    }

    render() {
        const formElementsArray = []
        const formElementsObj = this.state.isSignUp ? this.state.signUpControls : this.state.loginControls
            
        for (let key in formElementsObj) {
            formElementsArray.push({
                id: key,
                config: formElementsObj[key],
            })
        }
        let form = formElementsArray.map(formElement => (
            <AuthInput 
                key={formElement.id}
                className="AuthInput"
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                // changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                />
        ))
        return (
            <Wrapper>
                <AuthHeader>
                    {this.state.isSignUp ? "SIGN UP" : "LOG IN"}
                </AuthHeader>
                <AuthForm onSubmit={this.submitHandler}>
                    {form}
                    <FormButton>{this.state.isSignUp ? "SIGN UP" : "LOG IN"}</FormButton>
                </AuthForm>
                <SwitchButton
                    className="SwitchButton"
                    clicked={this.switchAuthModeHandler}>
                    {this.state.isSignUp ? "Already registered? Sign in!" : "First time here? Sign up!"}
                </SwitchButton>
            </Wrapper>
        )
    }
}

export default Auth
