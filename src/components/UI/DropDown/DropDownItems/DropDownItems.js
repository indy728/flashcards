import React from 'react'
import styled from 'styled-components'
import DropDownItem from './DropDownItem/DropDownItem'

const Wrapper = styled.ul`

`

const dropDownItems = props => {
    const listItems = props.list.map(li => {
        return (
            <DropDownItem
                key={li}>
                {li}
            </DropDownItem>
        )
    })

    return (
        <Wrapper>
            {listItems}
        </Wrapper>
    )
}

export default dropDownItems
