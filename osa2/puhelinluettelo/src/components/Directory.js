import React from 'react'


const Directory = ({ persons, newFilter }) => {

    // check if filter exists and match with RegExp (causes errors with symbols like +, -, / etc)
    const filteredPersons = (newFilter.length > 0) ? persons.filter(a => a.name.match(new RegExp(newFilter, 'gi'))) : persons

    return (
        <div>
            <h2>Kontaktit</h2>
            <ul>
                { filteredPersons.map(person => <li key={ person.id }> { person.name } - { person.number } </li>) }
            </ul>
        </div>
    )
}

export default Directory
