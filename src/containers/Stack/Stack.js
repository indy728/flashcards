import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import StackSearch from '../../components/LearningCenterContent/StackManager/StackSearch/StackSearch'
import * as actions from '../../store/actions'
import { updateObject } from '../../shared/objectUtility'

const Wrapper = styled.div`
  width: 100rem;
  height: 90vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column;

  opacity: .9;
  border: 3px outset white;
  padding: 2px;
`

const StackItemLists = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
`

const StackListView = styled.div`
  width: 70rem;
  background-color: ${props => props.theme.palette.grayscale[4]};;
  overflow: hidden;
`

const StackListViewItem = styled.div`
  width: 10rem;
  height: 4rem;
  background-color: ${props => props.selected ? 'red' : 'inherit'};
`

const ListEditor = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`

const ListEditorItems = styled.div`
  width: 100%;
  flex: 1;
  background-color: purple;

`

const ListEditorCheckout = styled.div`
  width: 100%;
  height: 8rem;
  background-color: orangered;
`

const listItemProps = {
  name: '',
  selected: false
}

class Stack extends Component {
  state = {
    listCocktails: {},
    editListItems: []
  }

  componentDidMount() {
    const { stack, cocktails } = this.props
    let listCocktails = { ...this.state.listCocktails }
    if (stack) {
      if (stack.manager) {
        stack.pool.forEach(id => {
          let newListItem = { ...listItemProps }
          listCocktails = updateObject(listCocktails, {
            [id]: updateObject(newListItem, {
              name: cocktails[id].name,
            })
          })
        })
      }
    }
    this.setState({ listCocktails })
  }

  stackManagerInit = () => {
    const { listCocktails } = this.state

    return (
      Object.keys(listCocktails).map(id => {
        const item = listCocktails[id]
        return (
          <StackListViewItem
            key={id}
            selected={item.selected}
            onClick={() => this.listItemClickedSelected(id)}
            >
            {item.name}
          </StackListViewItem> 
        )
      })
    )
  }

  listItemClickedSelected = id => {
    const editListItems = [ ...this.state.editListItems ]
    let updatedListCocktails = { ...this.state.listCocktails }

    updatedListCocktails = updateObject(updatedListCocktails, {
      [id]: updateObject(updatedListCocktails[id], {
        selected: !updatedListCocktails[id].selected
      })
    })

    editListItems.push(updatedListCocktails[id])

    this.setState({ listCocktails: updatedListCocktails, editListItems})

  }

  render() {
    const { stack, cocktails } = this.props
    let stackListViewItem= null
    if (stack.manager) stackListViewItem = this.stackManagerInit()
    // {
    //   stackListViewItem = Object.keys(listCocktails).map(id => {
    //     console.log('[Stack] id: ', id)
    //     const item = listCocktails[id]
    //     return (
    //       <StackListViewItem
    //         key={id}
    //         selected={item.selected}
    //         >
    //         {item.name}
    //       </StackListViewItem> 
    //     )
    //   })
    // }

    console.log('[Stack] stackListViewItem: ', stackListViewItem)
    return(
      <Wrapper>
        <StackSearch />
        <StackItemLists>
          <StackListView>
            {stackListViewItem}
          </StackListView>
          <ListEditor>
            <ListEditorItems />
            <ListEditorCheckout />
          </ListEditor>
        </StackItemLists>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    stack: state.learning.stack,
    cocktails: state.cocktails.cocktails,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddToStack: pool => dispatch(actions.addToStack(pool)),
    onRemoveFromStack: pool => dispatch(actions.removeFromStack(pool)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stack)