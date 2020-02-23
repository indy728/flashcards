import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ContentBlock from '../../components/UI/ContentBlock/ContentBlock'
import Profile from '../../components/Profile/Profile'
import { LinkDiv } from '../../components/UI'

const MyLinks = styled(LinkDiv)`
    font-size: 3.5rem;
    font-family: ${({ theme }) => theme.fonts.script};
`

class HomePage extends Component {
    
    render() {
        const links = {
            myAccount: {
                name: 'My Account Info',
                component: null
            },
            myStacks: {
                name: 'My Study Stacks',
                component: null
            },
            myGroups: {
                name: 'My Groups',
                component: null
            }
        }

        const linkDivs = Object.keys(links).map(link => {
            const linkObj = links[link]
            return (
                <MyLinks
                    className={'profile--' + link}
                    component={linkObj.component}
                    >
                    {linkObj.name}
                </MyLinks>
            )
        })

        return (
            <ContentBlock
                className='profile'>
                <Profile 
                    userInfo={this.props.userInfo}
                    />
                {linkDivs}
            </ContentBlock>
        )
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.auth.userInfo,
    }
}

export default connect(mapStateToProps)(HomePage)
