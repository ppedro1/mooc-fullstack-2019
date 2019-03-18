import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const History = ({ allClicks }) => {
    if (allClicks.length === 0) {
        return (
            <div>
                Ohjelma toimii klikkaamalla vasenta tai oikeaa -nappia
            </div>
        )
    }

    return (
        <div>
            Näppäilyhistoria: { allClicks.join(' ') }
        </div>
    )
}

const Button = ({ text, handler }) => {
    return (
        <button onClick={ handler }>
            { text }
        </button>
    )
}

const App = (props) => {
    const [left, setLeft] = useState(0)
    const [right, setRight] = useState(0)
    const [allClicks, setAll] = useState([])

    const handleLeftClick = () => {
        setAll(allClicks.concat('L'))
        setLeft(left + 1)
    }
    const handleRightClick = () => {
        setAll(allClicks.concat('R'))
        setRight(right + 1)
    }

    return (
        <div>
            <div>
                { left }
                <Button text='vasen' handler={ handleLeftClick } />
                <Button text='oikea' handler={ handleRightClick } />
                <Button text='toinenoikea' handler={ handleRightClick } />
                { right }
                <History allClicks={ allClicks } />

            </div>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
