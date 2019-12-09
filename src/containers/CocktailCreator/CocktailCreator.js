import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentBlock from '../../components/UI/ContentBlock/ContentBlock'
import Header from '../../components/UI/Header/Header'
import Dashboard from '../../components/Dashboard/Dashboard'
import * as actions from '../../store/actions'

const attributesInit = {
    key: 'drinkName',
    label: 'Drink Name',
    type: 'name'
}

class CocktailCreator extends Component {
    state = {
        attributes: [],
        count: 1,
        drinkControls: {
            name: {
                tier: 0,
                type: 'name',
                label: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '',
                    autocomplete: '',
                },
                value: '',
                removeable: false,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            ingredient: {
                tier: 1,
                type: 'ingredient',
                label: '',
                ingredient: '',
                category: '',
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '',
                    autocomplete: '',
                },
                value: '',
                removeable: true,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            instructions: {
                tier: 2,
                type: 'instruction',
                label: '',
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: '',
                    autocomplete: '',
                },
                value: '',
                removeable: true,
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        }
    }

    componentDidMount() {
        if (!this.props.ingredients) this.props.onInitIngredients()
        this.addAttributeHandler(attributesInit)
    }

    sortAttributes = attributes => {

    }

    addAttributeHandler = (attrObj) => {
        const { attributes, count } = this.state
        const controls = {...this.state.drinkControls[attrObj.type]}

        controls.label = attrObj.label
        controls.ingredient = attrObj.ingredient
        controls.added = count
        attributes.push(controls)
        attributes.sort((a, b) => {
            if (a.tier > b.tier) return 1
            if (a.tier < b.tier) return -1
            return a.added > b.added ? 1 : -1
        })
        
        this.setState({ attributes, count: count + 1 })
    }
  
    removeAttributeHandler = (index) => {
        const attributes = [...this.state.attributes]

        attributes.splice(index, 1)
        this.setState({attributes: attributes})
    }

    inputChangedHandler = (event, controlIndex) => {
        // let controls = {...this.state.attributes[controlIndex]}
        // let formIsValid = true
        // let i = 0

        // const updatedControls = updateObject(controls, {
        //     [controlName]: updateObject(controls[controlName], {
        //         value: event.target.value,
        //         valid: this.checkValidity(event.target.value, controls[controlName].validation),
        //         touched: true
        //     })
        // })
        // for (let inputIdentifier in updatedControls) {
        //     if (this.state.tier <= i) {
        //         formIsValid = updatedControls[inputIdentifier].valid && formIsValid
        //     }
        //     i = i + 1
        // }
        // this.setState({ingredientControls: updatedControls, formIsValid: formIsValid})
    }

    clearAttributes = () => {
        this.setState({attributes: []}, () => {
            this.addAttributeHandler(attributesInit)
        })
    }

    render() {
        return (
            <React.Fragment>
                <ContentBlock>
                    <Header>Add A New Cocktail</Header>
                    <Dashboard 
                        ingredients={this.props.ingredients}
                        attributes={this.state.attributes}
                        addAttribute={this.addAttributeHandler}
                        removeAttribute={this.removeAttributeHandler}
                        inputChanged={this.inputChangedHandler} />
                </ContentBlock>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(actions.fetchIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CocktailCreator)
