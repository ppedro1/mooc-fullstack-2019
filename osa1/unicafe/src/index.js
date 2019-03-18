import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Stats = ({ good, neutral, bad }) => {
    return (
        <div>
            <h1>statistiikka</h1>

            <p>hyvä { good }</p>
            <p>neutraali { neutral }</p>
            <p>huono { bad }</p>
        </div>
    )
}

const Input = ({ incGood, incNeutral, incBad }) => {
    return (
        <div>
            <h1>anna palautetta</h1>
            <ReviewButton text='hyvä' handler={ incGood } />
            <ReviewButton text='neutraali' handler={ incNeutral } />
            <ReviewButton text='huono' handler={ incBad } />
        </div>
    )
}

const ReviewButton = ({ handler, text }) => {
    return (
        <button onClick={ handler }>
            { text }
        </button>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incGood = () => setGood(good + 1)
    const incNeutral = () => setNeutral(neutral + 1)
    const incBad = () => setBad(neutral + 1)

    return (
        <>
            <Input incGood={ incGood } incNeutral={ incNeutral } incBad={ incBad } />
            <Stats good={ good } neutral={ neutral } bad={ bad } />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
