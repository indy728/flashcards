import React, { Component } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import DropDownHeader from './DropDownHeader/DropDownHeader'
import DropDownItems from './DropDownItems/DropDownItems'

const Wrapper = styled.div`

`

export class DropDown extends Component {
    state = {
        listOpen: false,
        displayText: ''
    }

    clickedOutsideHandler() {
        this.setState({listOpen: false})
    }

    toggleListOpenHandler() {
        this.setState(prevState => ({listOpen: !prevState.listOpen}))
    }

    render() {
        return (
            <Wrapper>
                <DropDownHeader
                    clicked={() => this.toggleListOpenHandler()} />
                <DropDownItems 
                    list={this.props.list} />
            </Wrapper>
        )
    }
}

export default onClickOutside(DropDown)
