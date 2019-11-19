import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ContentBlock from '../../components/UI/ContentBlock/ContentBlock'
import Header from '../../components/UI/Header/Header'
import Dashboard from '../../components/Dashboard/Dashboard'
import * as actions from '../../store/actions'

const Wrapper = styled.div`
    width: 80%;
    background: ${props => props.theme.palette.grayscale[5]};
    display: flex;
    flex-flow: column;
    align-items: center;
`

class FlashcardCreator extends Component {
    state = {
        // attributes: {
        //     drinkName: {
        //         quantity: 0,
        //         type: "text",
        //         text: "Ingredient Name"
        //     },
        //     ingredient: {
        //         quantity: 0,
        //         type: "text",
        //         text: "Ingredient Name"
        //     },
        //     glass: {
        //         quantity: 0,
        //         type: "select",
        //         text: "Type of Glassware"
        //     },
        //     garnish: {
        //         quantity: 0,
        //         type: "text",
        //         text: "Garnish"
        //     },
        //     ice: {
        //         quantity: 0,
        //         type: "select",
        //         text: "Type of Ice"
        //     },
        //     instructions: {
        //         quantity: 0,
        //         type: "textarea",
        //         text: "Instructions"
        //     },
        //     picture: {
        //         quantity: 0,
        //         type: "input",
        //         text: "Picture"
        //     },
        // },
        attributes: [],
        // attributes: {
        //     drinkName: {
        //         label: 'Drink Name',
        //         elementType: 'input',
        //         elementConfig: {
        //             type: 'text',
        //             placeholder: '',
        //             autocomplete: '',
        //         },
        //         value: '',
        //         removeable: false,
        //         validation: {
        //             required: true,
        //         },
        //         valid: false,
        //         touched: false
        //     },
        // },
        drinkControls: {
            name: {
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
                label: '',
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
        let attributesInit = {
            key: 'drinkName',
            label: 'Drink Name',
            type: 'name'
        }
        this.addAttributeHandler(attributesInit)
    }
    // change to bool for some?
    addAttributeHandler = (attrObj) => {
        const attributes = [...this.state.attributes]
        const newAttribute = {}
        const controls = {...this.state.drinkControls[attrObj.type]}
        controls.label = attrObj.label
        newAttribute[attrObj.key] = controls
        attributes.push(newAttribute)
        this.setState({attributes: attributes})
    }
  
    removeAttributeHandler = (index) => {
        const attributes = [...this.state.attributes]
        console.log(index)
        console.log(attributes)
        attributes.splice(index, 1)
        console.log(attributes)
        this.setState({attributes: attributes})
    }

    addIngredientHandler = () => {
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
                        removeAttribute={this.removeAttributeHandler}/>
                    {/* <NewFlashcard attributes={this.state.attributes}/>
                    <AttributeControls 
                        attributeAdded={this.addAttributeHandler}
                        attributeRemoved={this.removeAttributeHandler}
                        /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(FlashcardCreator)
