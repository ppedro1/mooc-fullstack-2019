import React from 'react'

const AddForm = ({ newName, setNewName, newNumber, setNewNumber, persons, setPersons, handleNewName, handleNewNumber, insertRecord }) => {
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
