import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const App = (props) => {
    const [ counter, setCounter ] = useState(0)
    const setToValue = (value) => setCounter(value)

    return (
        <div>
            <Display counter={ counter } />
            <Button handleClick={() => setToValue(counter + 1)} text='lisää' />
            <Button handleClick={() => setToValue(0) } text='nollaa' />
        </div>
    )
}

const Button = ({ handleClick, text}) => {
    return (
        <button onClick={ handleClick }>
            { text }
        </button>
    )
}

const Display = (props) => {
    return (
        <div>
            { props.counter }
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
