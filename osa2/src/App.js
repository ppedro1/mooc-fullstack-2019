import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
    const [ notes, setNotes ] = useState(props.notes)
    const [ newNote, setNewNote ] = useState('')
    const [ showAll, setShowAll ] = useState(true)

    const rows =
        () => notesToShow.map(note =>
            <Note key={ note.id } note={ note } />
        )

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const addNote = (evt) => {
        evt.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1,
        }
        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const noteHandler = (evt) => {
        console.log(evt.target.value)
        setNewNote(evt.target.value)
    }

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <div>
                <button onClick={ () => setShowAll(!showAll) }>
                    näytä { showAll ? 'vain tärkeät' : 'kaikki' }
                </button>
            </div>
            <ul>
                { rows() }
            </ul>
            <form onSubmit={ addNote }>
                <input value={ newNote } onChange={ noteHandler } />
                <button type="submit">tallenna muistiinpano</button>
            </form>
        </div>
    )
}

export default App
