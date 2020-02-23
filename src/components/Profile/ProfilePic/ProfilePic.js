import React from 'react'
import styled from 'styled-components'
import nofile from '../../../assets/img/default-img/nofile-picture.jpg'

const Wrapper = styled.figure`
    width: 15rem;
    height: 15rem;
    /* float: left; */
    /* transform: translateX(-3rem) skewX(12deg); */
    /* position: relative; */
    overflow: hidden;
    border-radius: 50%;
    border: 2px solid black;

    @supports (clip-path: polygon(0 0)) or (-webkit-clip-path: polygon(0 0)) {
        -webkit-clip-path: circle(50% at 50% 50%);
        clip-path: circle(50% at 50% 50%);
        -webkit-shape-outside: circle(50% at 50% 50%);
        shape-outside: circle(50% at 50% 50%);
        border-radius: none;
    }
`

const ProfileIMG = styled.img`
    /* box-sizing: content-box;
    height: 25rem;
    width: 25rem;
    border-radius: 50%;
    border: 3px solid #fff; */

    height: 100%;
    transform: translateY(4%) scale(1.2);
    backface-visibility: hidden;
    transition: all .5s;
`

const profilePic = props => {
    return (
        <Wrapper
            className='profile--picture'>
            <ProfileIMG src={props.url || nofile} alt='nofile' />
        </Wrapper>
    )
}

export default profilePic
