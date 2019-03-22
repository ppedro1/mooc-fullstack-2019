import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AddForm from './components/AddForm'
import Directory from './components/Directory'
import Filter from './components/Filter'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, []);

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
            <Directory persons={ persons } setPersons={ setPersons } newFilter={ newFilter } />
        </div>
    )
}

export default App
