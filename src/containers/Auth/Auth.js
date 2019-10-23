import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import ContentBlock from '../../components/UI/ContentBlock/ContentBlock'
import * as actions from '../../store/actions'
import { updateObject } from '../../shared/utility'

const Wrapper = styled(ContentBlock)`
    width: 50rem;
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
    display: flex;
    justify-content: center;
    align-items: center;
`

const AuthHeader = styled.h1`
    font-weight: bold;
`

const FormButton = styled(Button)`
    width: 18rem;
    font-size: 1.6rem;
    font-weight: bold;
    margin-top: 2rem;
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
                    autocomplete: 'email',
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
                    autocomplete: 'current-password',
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
                    placeholder: 'Choose a Username',
                    autocomplete: 'username',
                },
                value: '',
                validation: {
                    required: true,
                    length: {
                        absMin: 5,
                        absMax: 22,
                    },
                    chars: 'alnum',
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email',
                    autocomplete: 'email',
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
                    autocomplete: 'new-password',
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
                    autocomplete: 'verify-password',
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
        isSignUp: false,
        formIsValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        
        if (!rules) return true
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        
        if (rules.length) {
            isValid = value.length >= rules.length.absMin && value.length <= rules.length.absMax && isValid
        }

        // TO DO
        // way more validation stuff

        return isValid
    }

    updateControlsAndFormValidity = (updatedControls, formIsValid) => {
        if (this.state.isSignUp) {
            this.setState({signUpControls: updatedControls, formIsValid: formIsValid})
        } else {
            this.setState({loginControls: updatedControls, formIsValid: formIsValid})
        }
    }

    // updates auth app with user entry, changes value, checks validity
    inputChangedHandler = (event, controlName) => {
        let controls = {...this.state.loginControls}
        if (this.state.isSignUp) controls = {...this.state.signUpControls}
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: this.checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })

        let formIsValid = true
        for (let inputIdentifier in controls) {
            formIsValid = controls[inputIdentifier].valid && formIsValid
        }

        this.updateControlsAndFormValidity(updatedControls, formIsValid)
    }

    switchAuthModeHandler = () => {
        let updatedControls = {...this.state.loginControls}
        if (this.state.isSignUp) updatedControls = {...this.state.signUpControls}
        
        for (let controlName in updatedControls) {
            updatedControls[controlName].value = ''
            updatedControls[controlName].valid = false
            updatedControls[controlName].touched = false
        }

        this.updateControlsAndFormValidity(updatedControls, false)

        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp}
            })
    }

    submitHandler = event => {
        // prevent reloading of page on submit
        event.preventDefault()
        let controls = this.state.loginControls
        if (this.state.isSignUp) controls = this.state.signUpControls
        const submitInfo = {
            email: controls.email.value,
            password: controls.password.value,
            isSignUp: this.state.isSignUp,
            userInfo: null
        }
        // use the below object to push user info to firebase
        if (this.state.isSignUp) {
            submitInfo.userInfo = {
                email: controls.email.value,
                username: controls.username.value,
                company: controls.companyAccessCode.value
            }
        }
        this.props.onAuth(submitInfo)
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
                autocomplete={formElement.config.elementConfig.autocomplete || ''}
                className="AuthInput"
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} 
                />
        ))
        return (
            <Wrapper className="Auth">
                <AuthHeader>
                    {this.state.isSignUp ? "SIGN UP" : "LOG IN"}
                </AuthHeader>
                <AuthForm 
                    onSubmit={this.submitHandler}>
                    {form}
                    <FormButton disabled={!this.state.formIsValid}>SUBMIT</FormButton>
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

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.email !== null,
        authRedirectPath: state.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (submitInfo) => dispatch(actions.auth(submitInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
