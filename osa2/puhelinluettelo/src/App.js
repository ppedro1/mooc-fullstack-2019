import React, { useState } from 'react'
import AddForm from './components/AddForm'
import Directory from './components/Directory'

const App = () => {
    const [ persons, setPersons ] = useState([
        { id: 1, name: 'Arto Hellas', number: '012-1231234' },
        { id: 2, name: 'Peetu Pasanen', number: '210-3214321' },
        { id: 3, name: 'Pelle Peloton', number: '333-2342324' },
        { id: 4, name: 'Yrjö Mällinen', number: '655-4566666' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <AddForm persons={ persons }
                     setPersons={ setPersons }
                     newName={ newName }
                     setNewName={ setNewName }
                     newNumber={ newNumber }
                     setNewNumber={ setNewNumber }
                     />
            <Directory persons={ persons } />
        </div>
    )
}
export default App
