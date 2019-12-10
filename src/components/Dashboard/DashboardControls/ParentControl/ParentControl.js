import React, { Component } from 'react'
import styled from 'styled-components'
import Sprite from '../../../UI/Sprite/Sprite'
import AddItemButton from '../AddItemButton/AddItemButton'

const Wrapper = styled.div`

`

const AddItemParent = styled(AddItemButton)`
    font-size: 1.6rem;
    font-weight: bold;
    text-transform: uppercase;
`

class ParentControl extends Component {
    state = {
        hideChildren: true
    }

    toggleShowHide() {
        this.setState(prevState => {
            return { hideChildren: !prevState.hideChildren }
        })
    }

    render() {
        const { hideChildren } = this.state

        return (
            <Wrapper
                className={this.props.className}
                >
                <AddItemParent 
                    className='addItemParent--header'
                    level={this.props.level}
                    onClick={() => this.toggleShowHide()}
                    >
                    <span>{this.props.label}</span>
                    <Sprite 
                        className='addItemParent--chevron'
                        height='1.8rem'
                        spriteName={hideChildren ? 'chevron-right' : 'chevron-down'}
                        />
                </AddItemParent>
                {!hideChildren && this.props.children}
            </Wrapper>
        )
    }
}

export default ParentControl
