import React, { Component } from 'react'
import styled from 'styled-components'
import Backdrop from '../Backdrop/Backdrop'

const ModalFocus = styled.div`
    > * {
        transform: ${props => props.show ? "translateY(0)" : "translateY(-100vh)"} translateX(-50%);
        opacity: ${props => props.show ? '1' : '0'};
        z-index: 500;
        position: fixed;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 1px black;
        padding: 16px;
        left: 50%;
        /* top: 30%; */
        box-sizing: border-box;
        transition: all 0.3s ease-out;
    }
`

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 498;
`

class Modal extends Component {
    shouldComponentUpdate (nextProps) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    render() {
        return (
            <Wrapper>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <ModalFocus 
                    className='modal'
                    show={this.props.show}
                    >
                    {this.props.children}
                </ModalFocus>
            </Wrapper>
        )
    }
}

export default Modal
