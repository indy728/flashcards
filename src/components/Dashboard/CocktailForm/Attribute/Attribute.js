import React from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'
import AttributeInput from './AttributeInput/AttributeInput'
import { qtyStringToFloat } from '../../../../shared/stringUtility'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    :not(:first-child) {
        padding-top: 1.5rem;
    }

    :not(:last-child) {
        padding-bottom: 1.5rem;
        border-bottom: 1px solid ${props => props.theme.palette.grayscale[2]};
    }

    > div {
        padding: 1rem 0;
    }
`

const AttributeHeader = styled.div`
    font-size: 2rem;
    text-transform: uppercase;
    font-family: ${props => props.theme.fonts.header};
`

const TopDiv = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const BottomDiv = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;

    > *:not(:first-child) {
        margin-top: 2rem;
    }
`

const QtyDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    > div {
        font-size: 1.6rem;
    }
`

const InstructionsText = styled.textarea`
    width: 100%;
    height: 6rem;
    padding: .8rem 1.2rem;
    font-size: 1.4rem;
`

const RemoveDiv = styled.div`
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

`

const qtyArray = [
    'oz', 'dash(es)', 'count'
]

const attribute = props => {
    let remove = null
    let qty = null
    let text = null
    let name = null

    console.log('[Attribute] props: ', props)

    if (props.remove) {
        remove = (
            <Button
                clicked={(event) => props.removeAttribute(event, props.index)}>
                REMOVE
            </Button>
        )
    }
    if (props.attributes && props.attributes.qty) {
        console.log('[Attribute] qtyStringToFloat(props.value): ', qtyStringToFloat(props.value))
        const measurementOptions = qtyArray.map((measurement, i) => (
            <option key={measurement + i}>{measurement}</option>
        ))
        qty = (
            <QtyDiv className='attributeQty'>
                <div>Quantity:</div>
                <AttributeInput
                    className='qtyInput' 
                    width='7rem'
                    margin='0 0 0 1rem'
                    value={props.value}
                    changed={(event) => props.changed(event, props.index)}
                    />
                <select
                    style={{'marginLeft': '2rem'}}
                    onChange={event => props.selectChanged(event, props.index)}
                    >
                    {measurementOptions}
                </select>
            </QtyDiv>
        )
    }
    if (props.type === 'instructions' || (props.attributes && props.attributes.text)) {
    // if (props.type === 'instructions') {
        text = (
            <InstructionsText
                className='instructionsText'
                value={props.value}
                placeholder="Instructions Text (optional)"
                onChange={(event) => props.changed(event, props.index)}
                />
        )
    } 
    if (props.type === 'name') {
        name = (
            <AttributeInput 
                    {...props}
                    className={'attribute' + props.type}
                    changed={(event) => props.changed(event, props.index)}/> 
        )
    }


    // const suggestions = Object.keys(props.ingredients[props.category])

    return (
        <Wrapper className='attribute'>
            <TopDiv className="attributeTop">
                <AttributeHeader className="attributeHeader">{props.header}</AttributeHeader>
                <RemoveDiv className="attributeRemove">
                    {remove}
                </RemoveDiv>  
            </TopDiv>
            <BottomDiv className="attributeBottom">
                {name}
                {qty}
                {text}
            </BottomDiv>
        </Wrapper>
    )
}

export default attribute
