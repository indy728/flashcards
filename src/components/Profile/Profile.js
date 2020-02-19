import React from 'react'
import styled from 'styled-components'
import ProfilePic from './ProfilePic/ProfilePic'

const Wrapper = styled.div`

`

const Username = styled.div`
    font-size: 3rem;
    font-family: ${({ theme }) => theme.fonts.nameplate};
`

const profileDisplay = props => {
    const { username, url } = props.userInfo

    return (
        <Wrapper
            className='profile--display'>
            <ProfilePic 
                url={url}
                />
            <Username>{username}</Username>
        </Wrapper>
    )
}

export default profileDisplay
