import React from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'
import { Button } from '../../UI'

const Wrapper = styled.form`
    width: 100%;
    padding: 0 5%;
`

const ShowControlsButton = styled(Button)`
    display: none;

    @media (max-width: ${({ theme }) => theme.media.laptop}) {
        display: ${props => props.controlsOpen ? 'none' : 'block' };
    }
`

const SubmitButtonDiv = styled.div`
    width: 100%;
    justify-content: center;
    margin-top: 2rem;

    button {
        width: 100%;
        background-color: ${({ theme }) => theme.palette.secondary[2]};
        border: 2px outset ${({ theme }) => theme.palette.secondary[0]};
    }
`

const cocktailForm = props => {
    const transformedAttributes = props.attributes.map((attribute,i) => {
        const { type, label, removeable, value, attributes } = attribute

        return (
            <Attribute
                key={type + i}
                index={i}
                type={type}
                value={value}
                header={label}
                attributes={attributes}
                remove={removeable}
                changed={props.inputChanged}
                selectChanged={props.selectChanged}
                removeAttribute={props.removeAttribute}/>
        )
    })

    return (
        <React.Fragment>
            <Wrapper
                className='cocktail-form' 
                onSubmit={props.cocktailSubmitHandler}
                >
                {transformedAttributes}
                <ShowControlsButton
                    className='cocktail-form--show-controls-button'
                    controlsOpen={props.controlsOpen}
                    clicked={props.toggleControls}
                    >
                    add element
                </ShowControlsButton>
                <SubmitButtonDiv>
                    <Button
                        disabled={!props.formIsValid}
                        >
                        SUBMIT NEW COCKTAIL
                    </Button>
                </SubmitButtonDiv>
            </Wrapper>
        </React.Fragment>
    )
}

export default cocktailForm
