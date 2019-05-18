import React from 'react'


const Directory = ({ persons, setPersons, newFilter, handleDelete }) => {

    // check if filter exists and match with RegExp (causes errors with symbols like +, -, / etc)
    const filteredPersons = (newFilter.length > 0) ? persons.filter(a => a.name.match(new RegExp(newFilter, 'gi'))) : persons

    return (
        <div>
            <h2>Kontaktit</h2>
            <ul>
                { filteredPersons.map(person =>
                    <li key={ person.id } className="list">
                        <div className="list-name">
                            { person.name }
                        </div>
                        <div className="list-number">
                            { person.number }
                        </div>
                        <div className="list-delete">
                            <button onClick={ () => handleDelete(person.id) }>
                                delete
                            </button>
                        </div>
                    </li>)
                }
            </ul>
        </div>
    )
}

export default Directory
