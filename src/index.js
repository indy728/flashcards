import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
// thunk allows you to apply synchronous updates by dispatching an action
import thunk from 'redux-thunk'
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from './store/reducers/auth'
import ingredientsReducer from './store/reducers/ingredients'
import cocktailsReducer from './store/reducers/cocktails'
import learningReducer from './store/reducers/learning'

require('dotenv').config()

const rootReducer = combineReducers({
    auth: authReducer,
    ingredients: ingredientsReducer,
    cocktails: cocktailsReducer,
    learning: learningReducer,
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(
            thunk
        )
    )
)

const app = (
    // Redux provider wraps entire application and requires store as props
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
