import React from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'
import Button from '../../UI/Button/Button'

const Wrapper = styled.form`
    width: 55rem;
    padding: 2rem 4rem;
`

const SubmitButtonDiv = styled.div`
    width: 100%;
    padding-top: 2rem;
    display: flex;
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
        <Wrapper
            className='cocktailForm' 
            onSubmit={props.cocktailSubmitHandler}
            >
            {transformedAttributes}
            <SubmitButtonDiv>
                <Button
                    disabled={!props.formIsValid}>
                        SUBMIT NEW COCKTAIL
                </Button>
            </SubmitButtonDiv>
        </Wrapper>
    )
}

export default cocktailForm
