import React from 'react'
import styled from 'styled-components'
import AddItemButton from '../AddItemButton/AddItemButton'
import { titleCase } from '../../../../shared/stringUtility'

const Wrapper = styled.div`
    width: 100%;
    flex-wrap: wrap;
`

const DashboardControlLabel = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 1rem;
  padding-right: 1rem;
`

const dashboardControl = props => {
  return (
    <Wrapper
        className={props.className}
        >
        <AddItemButton
            className='dashboardControl--header'
            onClick={props.clicked}
            level={props.level}
            >
            <DashboardControlLabel
              className={props.labelClassName}>{titleCase(props.label)}</DashboardControlLabel>
            <span style={{'fontSize':'1.8rem'}}>+</span>
        </AddItemButton>
    </Wrapper>
  )
}

export default dashboardControl
