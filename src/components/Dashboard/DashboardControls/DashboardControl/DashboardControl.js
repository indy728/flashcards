import React from 'react'
import styled from 'styled-components'
import AddItemButton from '../AddItemButton/AddItemButton'
import Sprite from '../../../UI/Sprite/Sprite'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const DashboardControl = styled(AddItemButton)`
    
`

const dashboardControl = props => {
  return (
    <Wrapper
        className={props.className}
        >
        <DashboardControl
            className='dashboardControl--header'
            onClick={props.clicked}
            level={props.level}
            >
            <span>{props.label}</span>
            <Sprite 
                className='addItemParent--chevron'
                height='1.8rem'
                spriteName='magnifying-glass'
                />
        </DashboardControl>
    </Wrapper>
  )
}

export default dashboardControl
