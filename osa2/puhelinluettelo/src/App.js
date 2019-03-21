import React, { useState } from 'react'

import AddForm from './components/AddForm'
import Directory from './components/Directory'
import Filter from './components/Filter'

const App = () => {

    // Application states
    const [ persons, setPersons ] = useState([
        { id: 1, name: 'Arto Hellas', number: '012-1231234' },
        { id: 2, name: 'Peetu Pasanen', number: '210-3214321' },
        { id: 3, name: 'Pelle Peloton', number: '333-2342324' },
        { id: 4, name: 'Yrjö Mällinen', number: '655-4566666' }
    ])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    // input handlers
    const handleNewName = (evt) => setNewName(evt.target.value)
    const handleNewNumber = (evt) => setNewNumber(evt.target.value)

    // check if number and or name exists
    const ifNameExists = persons.filter(a => a.name === newName).length > 0 ? true : false
    const ifNumExists = persons.filter(a => a.num === newNumber).length > 0 ? true : false

    // Insert a new record into the directory
    const insertRecord = (evt) => {
        evt.preventDefault()
        // Check if name or number exists and prevent addition
        if (ifNameExists) {
            window.alert(`${newName} on jo luettelossa`)
            setNewName('')
        } else if (ifNumExists) {
            window.alert(`${newNumber} on jo luettelossa`)
            setNewNumber('')
        } else {
            const newObject = {
                id: persons.length + 1,
                name: newName,
                number: newNumber
            }
            setPersons(persons.concat(newObject))
            setNewName('')
            setNewNumber('')
        }
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <AddForm persons={ persons }
                     setPersons={ setPersons }
                     newName={ newName }
                     setNewName={ setNewName }
                     newNumber={ newNumber }
                     setNewNumber={ setNewNumber }
                     handleNewName={ handleNewName }
                     handleNewNumber={ handleNewNumber }
                     insertRecord={ insertRecord }
                     />
            <h3>Rajaa henkilöitä</h3>
            <Filter newFilter={ newFilter } setNewFilter={ setNewFilter } />
            <Directory persons={ persons } newFilter={ newFilter } />
        </div>
    )
}

export default App
