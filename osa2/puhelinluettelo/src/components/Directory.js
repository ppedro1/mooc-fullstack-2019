import React from 'react'


const Directory = ({ persons }) => {
    return (
        <div>
            <h2>Kontaktit</h2>
            <ul>
                { persons.map(person => <li key={ person.id }> { person.name } - { person.number } </li>) }
            </ul>
        </div>
    )
}

export default Directory
