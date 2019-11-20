import React, { Component } from 'react'

class Autocomplete extends Component {
    state = {
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    }

    changeHandler = event => {
        const suggestions = this.props.suggestions
        const userInput = event.target.value
        const filteredSuggestions = suggestions.filter(suggestion => (
            suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        ))

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: userInput
          });
    }

    onClick = event => {
        // Update the user input and reset the rest of the state
        this.setState({
          activeSuggestion: 0,
          filteredSuggestions: [],
          showSuggestions: false,
          userInput: event.target.innerText
        })
    }

    onKeyDown = event => {
        const { activeSuggestion, filteredSuggestions } = this.state

        // User hits enter
        if (event.keyCode === 13) {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            })
        }
        // User hits up key
        else if (event.keyCode === 38) {
            if (activeSuggestion === 0) return
            this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
        // User hits down key
        else if (event.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) return
            this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }   
        } = this;
        let suggestionsListComponent
        const filteredSuggestionComponents = filteredSuggestions.map((suggestion, index) => {
            let className;

            if (index === activeSuggestion) className = "suggestion-active"
            return (
                <li
                    className={className}
                    key={suggestion}
                    onClick={onClick} >
                    {suggestion}
                </li>
            )
        })
    
        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul class="suggestions">
                        {filteredSuggestionComponents}
                    </ul>
                )
            } else {
                suggestionsListComponent = (
                    <div class="no-suggestions">
                        <em>No suggestions, you're on your own!</em>
                    </div>
                )
            }
        }
    
        return (
            <React.Fragment>
                <input
                    type="text"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput} />
                {suggestionsListComponent}
            </React.Fragment>
        )
    }
}

export default Autocomplete
