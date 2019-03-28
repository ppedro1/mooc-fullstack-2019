import React, { useState, useEffect } from 'react'
import noteService from './services/notes.js'
import Note from './components/Note'
import Notification from './components/Notification'

const App = () => {
    const [ notes, setNotes ] = useState([])
    const [ newNote, setNewNote ] = useState('')
    const [ showAll, setShowAll ] = useState(true)
    const [ error, setError ] = useState('virhoiehariosdh')

    useEffect(() => {
        noteService
            .getAll()
            .then(notesList => {
                setNotes(notesList)
            })
    }, [])

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(id, changedNote)
            .then(updatedNote => {
                setNotes(notes.map(note => note.id !== id ? note : updatedNote))
            }).catch(error => {
                setError(`virheviesti goes here`)
                setTimeout(() => {
                    setError(null)
                }, 2000)
                setNotes(notes.filter(a => a.id !== note.id))
            })
    }

    const rows = () => notesToShow.map(note => <Note key={ note.id } note={ note } toggleImportance={ () => toggleImportanceOf(note.id) } />)

    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const addNote = (evt) => {
        evt.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
        }
        noteService
            .create(noteObject)
            .then(returnNote => {
                setNotes(notes.concat(returnNote))
                setNewNote('')
            }
        )
    }

    const noteHandler = (evt) => {
        setNewNote(evt.target.value)
    }

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <Notification message={ error } />
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
