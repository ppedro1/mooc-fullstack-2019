import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td class="left">{ text }</td>
            <td>{ value }</td>
        </tr>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    var total = good + neutral + bad;
    var badVal = bad * -1;
    var avg = (good + badVal) / total;
    var posFB = (good / total) * 100;

    if (total > 0) {
        return (
            <div>
                <table>
                    <thead>
                        <h1>statistiikka</h1>
                    </thead>
                    <tbody>
                        <Statistic text='hyvä' value={ good } />
                        <Statistic text='neutraali' value={ neutral } />
                        <Statistic text='huono' value={ bad } />
                        <Statistic text='yhteensä' value={ total } />
                        <Statistic text='keskiarvo' value={ avg } />
                        <Statistic text='positiivisia' value={ posFB + ' %' } />
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <p>Yhtäkään palautetta ei ole annettu</p>
            </div>
        )
    }
}

const Input = ({ incGood, incNeutral, incBad }) => {
    return (
        <div>
            <h1>anna palautetta</h1>
            <Button text='hyvä' handler={ incGood } />
            <Button text='neutraali' handler={ incNeutral } />
            <Button text='huono' handler={ incBad } />
        </div>
    )
}

const Button = ({ handler, text }) => {
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
    const incBad = () => setBad(bad + 1)

    return (
        <>
            <Input incGood={ incGood } incNeutral={ incNeutral } incBad={ incBad } />
            <Statistics good={ good } neutral={ neutral } bad={ bad } />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
