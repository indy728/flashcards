import React from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'
import AttributeInput from './AttributeInput/AttributeInput'
// import Autocomplete from '../../../../hoc/Autocomplete/Autocomplete'
// import DropDown from '../../../UI/DropDown/DropDown'

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
    justify-content: space-between;
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
    'oz', 'dash(es)'
]

const attribute = props => {
    let remove = null
    let bottom = null

    if (props.remove) {
        remove = (
            <Button
                clicked={(event) => props.removeAttribute(event, props.index)}>
                REMOVE
            </Button>
        )
    }
    if (props.type === 'ingredient') {
        const measurementOptions = qtyArray.map((measurement, i) => (
            <option key={measurement + i}>{measurement}</option>
        ))
        bottom = (
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
    } else if (props.type === 'instructions') {
        bottom = (
            <InstructionsText
                className='instructionsText'
                value={props.value}
                onChange={(event) => props.changed(event, props.index)}
                />
        )
    } else {
        bottom = (
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
                {bottom}
            </BottomDiv>
        </Wrapper>
    )
}

export default attribute
