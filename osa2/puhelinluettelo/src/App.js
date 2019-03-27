import React, { useState, useEffect } from 'react'

import AddForm from './components/AddForm'
import Directory from './components/Directory'
import Filter from './components/Filter'
import Data from './services/DbMethods'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')

    useEffect(() => {
        Data.getDir()
        .then(dirList =>
            setPersons(dirList)
        )}, []);

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
        if (ifNumExists) {
            window.alert(`${newNumber} on jo luettelossa`)
            setNewNumber('')
        } else {
            const newObject = {
                name: newName,
                number: newNumber
            }
            if (ifNameExists) {
                // if name exists -> ask for confirmation on number change
                if (window.confirm(`${ newName } on jo luettelossa, haluatko korvata numeron uudella?`)) {
                    let oldPerson = persons.filter(a => a.name === newName)[0];
                    Data
                    .update(oldPerson.id, newObject)
                    .then(res => {
                        setPersons(persons.map(person => (person.id === oldPerson.id) ? res : person))
                    })
                }
            } else {
                Data.insert(newObject)
                .then(response => {
                    setPersons(persons.concat(response))
                })
            }
            setNewName('')
            setNewNumber('')
        }
    }

    const handleDelete = (numID) => {
        const person = persons.find(a => a.id === numID)
        if (window.confirm(`Haluatko poistaa kontaktin ${person.name} (ID: ${person.id})`)) {
            Data.delNum(numID)
            .then(res => {
                setPersons(persons.filter(num => num.id !== numID))
            })
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
            <Directory persons={ persons } setPersons={ setPersons } newFilter={ newFilter } handleDelete={ handleDelete } />
        </div>
    )
}

export default App
