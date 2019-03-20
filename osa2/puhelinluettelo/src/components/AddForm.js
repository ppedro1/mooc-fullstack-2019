import React from 'react'

const AddForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons }) => {

    const ifNameExists = persons.filter(a => a.name === newName).length > 0 ? true : false
    const ifNumExists = persons.filter(a => a.num === newNumber).length > 0 ? true : false

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
                name: newName
            }
            setPersons(persons.concat(newObject))
            setNewName('')
        }
    }

    const handleNewName = (evt) => setNewName(evt.target.value)
    const handleNewNumber = (evt) => setNewNumber(evt.target.value)

    return (
        <form onSubmit={ insertRecord }>
            <h3>Lisää uusi kontakti</h3>
            <div>
                nimi: <br /> <input value={ newName } onChange={ handleNewName } />
            </div>
            <div>
                numero: <br /> <input value={ newNumber } onChange={ handleNewNumber} />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default AddForm
