import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Stats = ({ good, neutral, bad }) => {
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
                        <tr>
                            <td class="left">hyvä</td>
                            <td>{ good }</td>
                        </tr>
                        <tr>
                            <td class="left">neutraali</td>
                            <td>{ neutral }</td>
                        </tr>
                        <tr>
                            <td class="left">huono</td>
                            <td>{ bad }</td>
                        </tr>
                        <tr>
                            <td class="left">yhteensä</td>
                            <td>{ total }</td>
                        </tr>
                        <tr>
                            <td class="left">keskiarvo</td>
                            <td>{ avg }</td>
                        </tr>
                        <tr>
                            <td class="left">positiivisia</td>
                            <td>{ posFB } %</td>
                        </tr>
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
    const incBad = () => setBad(bad + 1)

    return (
        <>
            <Input incGood={ incGood } incNeutral={ incNeutral } incBad={ incBad } />
            <Stats good={ good } neutral={ neutral } bad={ bad } />
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
