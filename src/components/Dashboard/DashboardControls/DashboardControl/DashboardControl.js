import React from 'react'
import styled from 'styled-components'
import AddItemButton from '../AddItemButton/AddItemButton'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`

const DashboardControl = styled(AddItemButton)`
  
`

const DashboardControlLabel = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
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
            <DashboardControlLabel
              className={props.labelClassName}>{props.label}</DashboardControlLabel>
            <span style={{'fontSize':'1.8rem'}}>+</span>
        </DashboardControl>
    </Wrapper>
  )
}

export default dashboardControl
