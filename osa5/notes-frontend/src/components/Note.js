import React from 'react'

const Note = ({ note, toggleImportance }) => {

    const label = (note.important) ? `tärkeä` : `ei tärkeä`

    return (
        <li className="note-row">
            <div>{ note.content }</div>
            <button onClick={ toggleImportance }>{ label }</button>
        </li>
    )
}

export default Note
