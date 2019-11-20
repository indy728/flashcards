import React from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'
import AttributeInput from './AttributeInput/AttributeInput'
import Autocomplete from '../../../../hoc/Autocomplete/Autocomplete'

const Wrapper = styled.div`
    width: 100%;
    height: 8rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    :not(:first-child) {
        padding-top: 3rem;
    }
    :not(:last-child) {
        padding-bottom: 3rem;
        border-bottom: 1px solid ${props => props.theme.palette.grayscale[2]};
    }

    div :not(:first-child) {
        margin-top: 1.5rem;
    }
    div :not(:last-child) {
        margin-bottom: 1.5rem;
    }
`

const AttributeHeader = styled.div`
    width: 100%;
    font-size: 2rem;
    text-transform: uppercase;
    font-family: ${props => props.theme.fonts.header};
`

const InputDiv = styled.div`
    width: 100%;
`

const BottomDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: space-between;
`
const QtyDiv = styled.div`
    width: 80%;
    display: flex;
`

const RemoveDiv = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const newAttribute = props => {
    let button = null
    let qty = <QtyDiv />

    if (props.remove) {
        button = (
            <Button
                clicked={() => props.removeAttribute(props.index)}>
                REMOVE
            </Button>
        )
    }
    if (props.quantity) {
        qty = (
            <QtyDiv>
                <div>Quantity:</div>
                <div><select><option>placeholder</option></select></div>
                <div><select><option>placeholder</option></select></div>
            </QtyDiv>
        )
    }

    console.log(props.index)

    // const suggestions = Object.keys(props.ingredients[props.category])
    // console.log(suggestions)

    return (
        <Wrapper>
            <AttributeHeader>{props.header}:</AttributeHeader>
            <InputDiv>
                <AttributeInput 
                    {...props}
                    changed={(event) => props.changed(event, props.index)}/>
            </InputDiv>
            <BottomDiv>
                {qty}
                <RemoveDiv>
                    {button}
                </RemoveDiv>  
            </BottomDiv>
        </Wrapper>
    )
}

export default newAttribute
