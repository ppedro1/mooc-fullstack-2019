import React from 'react';
import { createStore } from 'redux'
import ReactDOM from 'react-dom';


const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1
        case 'DECREMENT':
            return state - 1
        case 'RESET':
            return 0
        default:
            return state
    }
}

const store = createStore(counterReducer)

const App = () => {
    return (
        <div>
            <div>
                { store.getState() }
            </div>
            <button onClick={ () => store.dispatch({ type: 'INCREMENT' }) }>increase</button>
            <button onClick={ () => store.dispatch({ type: 'RESET' }) }>reset</button>
            <button onClick={ () => store.dispatch({ type: 'DECREMENT' }) }>decrease</button>
        </div>
    )
}


const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)
