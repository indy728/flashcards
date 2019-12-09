import React from 'react'
import styled from 'styled-components'
import Button from '../../../UI/Button/Button'
// import AttributeInput from './AttributeInput/AttributeInput'
// import Autocomplete from '../../../../hoc/Autocomplete/Autocomplete'
// import DropDown from '../../../UI/DropDown/DropDown'

const Wrapper = styled.div`
    width: 100%;
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
    align-items: space-between;
`
const QtyDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
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
                clicked={() => props.removeAttribute(props.index)}>
                REMOVE
            </Button>
        )
    }
    if (props.type === 'ingredient') {
        const measurementOptions = qtyArray.map((measurement, i) => (
            <option key={measurement + i}>{measurement}</option>
        ))
        bottom = (
            <QtyDiv>
                <div>Quantity:</div>
                <input style={{'width': '5rem', 'margin': '0 1rem 0 2rem'}} />
                <select>
                    {measurementOptions}
                </select>
            </QtyDiv>
        )
    }


    // const suggestions = Object.keys(props.ingredients[props.category])

    return (
        <Wrapper>
            <TopDiv>
                {/* <AttributeInput 
                    {...props}
                    className='attribute' + {props.type}
                changed={(event) => props.changed(event, props.index)}/> */}
                <AttributeHeader>{props.header}</AttributeHeader>
                <RemoveDiv>
                    {remove}
                </RemoveDiv>  
            </TopDiv>
            <BottomDiv>
                {bottom}
            </BottomDiv>
        </Wrapper>
    )
}

export default attribute
