import React from 'react'
import styled from 'styled-components'
import AttributeInput from './AttributeInput/AttributeInput'
import { Button } from '../../../UI'

const Wrapper = styled.div`
    width: 100%;
    align-items: flex-start;
    justify-content: space-around;

    :not(:first-child) {
        /* padding-top: 1.5rem; */
    }

    :not(:last-child) {
        padding-bottom: 1.5rem;
        margin-bottom: 1.5rem;
        border-bottom: 1px solid ${props => props.theme.palette.grayscale[2]};
    }

    > div {
        /* padding: 1rem 0; */
    }
`

const AttributeHeader = styled.div`
    text-transform: uppercase;
    flex: 1;
    padding-right: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    align-items: flex-start;
`

const TopDiv = styled.div`
    width: 100%;
    justify-content: space-between;
    flex-flow: row;
    
    @media (max-width: ${({ theme }) => theme.media.tabletLandscape}) {
    }

    @media (min-width: ${({ theme }) => theme.media.tabletLandscape}) {
    }
`

const BottomDiv = styled.div`
    width: 100%;
`

const QtyDiv = styled.div`
    width: 100%;
    flex-flow: row;
    justify-content: flex-start;
`

const InstructionsText = styled.textarea`
    width: 100%;
    height: 6rem;
    margin-top: 1rem;
    padding: .8rem 1.2rem;
    border: 1px solid ${({ theme }) => theme.palette.grayscale[3]};
`

const RemoveDiv = styled.div`
`

const qtyArray = [
    'oz', 'dash', 'count'
]

const attribute = props => {
    let remove = null
    let qty = null
    let text = null
    let name = null

    // console.log('[Attribute] props: ', props)

    if (props.remove) {
        remove = (
            <RemoveDiv
                className='cocktail-form--attribute__remove'>
                <Button
                    clicked={(event) => props.removeAttribute(event, props.index)}>
                    REMOVE
                </Button>
            </RemoveDiv>
        )
    }
    if (props.attributes && props.attributes.qty) {
        const measurementOptions = qtyArray.map((measurement, i) => (
            <option key={measurement + i}>{measurement}</option>
        ))
        qty = (
            <QtyDiv className='cocktail-form--attributes__qty'>
                <div>Quantity:</div>
                <AttributeInput
                    className='cocktail-form--attributes__qty-input' 
                    width='7rem'
                    margin='0 0 0 1rem'
                    value={props.qty}
                    changed={(event) => props.changed(event, props.index, "qty")}
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
                className='cocktail-form--attributes__instructions-text'
                value={props.instruction}
                placeholder="Instructions Text (optional)"
                onChange={(event) => props.changed(event, props.index, "text")}
                />
        )
    } 
    if (props.type === 'name') {
        name = (
            <AttributeInput 
                    {...props}
                    className={'cocktail-form--attribute__' + props.type}
                    changed={(event) => props.changed(event, props.index)}/> 
        )
    }


    // const suggestions = Object.keys(props.ingredients[props.category])

    return (
        <Wrapper className='cocktail-form--attribute'>
            <TopDiv className="attributeTop">
                <AttributeHeader
                    className="attributeHeader"
                    >
                    <h2>{props.header}</h2>
                </AttributeHeader>
                {remove}
            </TopDiv>
            <BottomDiv
                className='cocktail-form--attributes__bottom'
                >
                {name}
                {qty}
                {text}
            </BottomDiv>
        </Wrapper>
    )
}

export default attribute
