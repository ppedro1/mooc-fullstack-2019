import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useNotes = (url) => {
    const [ notes, setNotes ] = useState([])
    useEffect(() => {
        axios.get(url).then(response => {
            setNotes(response.data)
        })
    }, [url])
    return notes
}

const App = () => {
    const [ counter, setCounter ] = useState(0)
    const [ values, setValues ] = useState([])

    const notes = useNotes(BACKEND_URL)

    console.log(notes)

    const handleCounter = () => {
        setCounter(counter + 1)
        setValues(values.concat(counter))
    }


    return(
        <div className="container">
            <div>hello webpack { counter } clckksdfjsdsfs</div>
            <button onClick={ handleCounter }>press</button>
            <p>there are { notes.length } notes on server { BACKEND_URL }</p>
        </div>
    )
}

export default App
