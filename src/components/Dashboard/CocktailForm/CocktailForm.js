import React from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'
import { Button } from '../../UI'

const Wrapper = styled.form`
    padding: 2rem 4rem;
`

const ShowControlsButton = styled(Button)`
    display: none;

    @media (max-width: ${({ theme }) => theme.media.tabletLandscape}) {
        display: ${props => props.controlsOpen ? 'none' : 'block' };
    }
`

const SubmitButtonDiv = styled.div`
    width: 100%;
    padding-top: 2rem;
    justify-content: center;
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
                <SubmitButtonDiv>
                    <ShowControlsButton
                        className='coctail-form--show-controls-button'
                        controlsOpen={props.controlsOpen}
                        clicked={props.toggleControls}
                        >
                            show controls
                    </ShowControlsButton>
                    <Button
                        disabled={!props.formIsValid}>
                            SUBMIT NEW COCKTAIL
                    </Button>
                </SubmitButtonDiv>
            </Wrapper>
        </React.Fragment>
    )
}

export default cocktailForm
