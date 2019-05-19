import React, { useState, useEffect } from 'react'

import AddForm from './components/AddForm'
import Directory from './components/Directory'
import Filter from './components/Filter'
import Notification from './components/Notification'
import Error from './components/Error'
import Data from './services/DbMethods'

import './index.css'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newFilter, setNewFilter ] = useState('')
    const [ notification, setNotification ] = useState(null)
    const [ error, setError ] = useState(null)

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
    const ifNumExists = persons.filter(a => a.number === newNumber).length > 0 ? true : false

    // Insert a new record into the directory
    const insertRecord = (evt) => {
        evt.preventDefault()
        // Check if name or number exists and prevent addition
        if (ifNumExists) {
            let who = persons.filter(a => a.number === newNumber)[0]
            setNotification(`${who.number} on asetettu jo kontaktille ${who.name}`)
            setTimeout(() => { setNotification(null) }, 1500)
            setNewNumber('')
        } else {
            const newObject = {
                name: newName,
                number: newNumber
            }
            if (ifNameExists) {
                // if name exists -> ask for confirmation on number change
                if (window.confirm(`Kontakti ${ newName } on jo luettelossa, haluatko korvata numeron uudella?`)) {
                    let oldPerson = persons.filter(a => a.name === newName)[0];
                    Data
                    .update(oldPerson.id, newObject)
                    .then(res => {
                        setPersons(persons.map(person => (person.id === oldPerson.id) ? res : person))
                        setNotification(`Kontaktin ${newName} numero päivitetty.`)
                        setTimeout(() => { setNotification(null) }, 2500);
                    })
                }
            } else {
                Data.insert(newObject)
                .then(response => {
                    setPersons(persons.concat(response))
                    setNotification(`Uusi kontakti ${newName} lisätty`)
                    setTimeout(() => { setNotification(null) }, 2500);
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
                setNotification(`Kontakti ${person.name} poistettu`)
                setTimeout(() => { setNotification(null) }, 2500 )
            })
            .catch(err => {
                setError(`Kontakti ${person.name} on jo poistettu!`)
                setPersons(persons.filter(num => num.id !== numID))
                setTimeout(() => { setError(null) }, 2500)
            })
        }
    }

    return (
        <div>
            <h2>Puhelinluettelo</h2>
            <Notification message={ notification } />
            <Error errorMessage={ error } />
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
