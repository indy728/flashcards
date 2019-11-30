import React from 'react'
import styled from 'styled-components'

import sprites from '../../../assets/img/sprite.svg'

const Wrapper = styled.svg`
    height: ${props => props.height};
    width: ${props => props.width ? props.width : props.height};
`

const sprite = props => {
    return (
        <Wrapper
            className={props.className}
            height={props.height}
            width={props.width}>
            <use xlinkHref={`${sprites}#icon-${props.spriteName}`} />
        </Wrapper>
    )
}

export default sprite
