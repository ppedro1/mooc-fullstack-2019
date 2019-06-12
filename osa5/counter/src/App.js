import React, { useState } from 'react'

const useField = (type) => {
    const [ value, setValue ] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

const App = () => {
    const name = useField('text')
    const age = useField('text')
    const password = useField('password')

    return (
        <div>
            <form>
                Name: <br />
                <input { ...name } /> <br />

                Age: <br />
                <input { ...age } /> <br />

                Password: <br />
                <input { ...password } />
            </form>
        </div>
    )
}

export default App
