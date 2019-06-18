import React from 'react'

const App = (props) => {
    const store = props.store
    return (
        <div>
            <button onClick={ () => store.dispatch({ type: 'GOOD' }) }>hyvä</button>
            <button onClick={ () => store.dispatch({ type: 'OK' }) }>neutraali</button>
            <button onClick={ () => store.dispatch({ type: 'BAD' }) }>huono</button>
            <button onClick={ () => store.dispatch({ type: 'ZERO' }) }>nollaa tilastot</button>
            <div>hyvä { store.getState().good }</div>
            <div>neutraali { store.getState().ok }</div>
            <div>huono { store.getState().bad }</div>
        </div>
    )
}
