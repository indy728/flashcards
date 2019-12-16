import React from 'react'
import styled from 'styled-components'
import Attribute from './Attribute/Attribute'
import Button from '../../UI/Button/Button'

const Wrapper = styled.form`
    width: 55rem;
    padding: 2rem 4rem;
`

const cocktailForm = props => {
    const transformedAttributes = props.attributes.map((key,i) => {
        const { type, label, removeable, value } = key

        return (
            <Attribute
                key={type + i}
                index={i}
                type={type}
                value={value}
                header={label}
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
            <Button
                disabled={!props.formIsValid}>
                    SUBMIT
            </Button>
        </Wrapper>
    )
}

export default cocktailForm
