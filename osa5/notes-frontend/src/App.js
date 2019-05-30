import React, { useState, useEffect } from 'react'
import noteService from './services/notes.js'
import Note from './components/Note'
import Login from './components/Login'
import Logout from './components/Logout'
import Notification from './components/Notification'
import './App.css'

const App = () => {
    const [ notes, setNotes ] = useState([])
    const [ newNote, setNewNote ] = useState('')
    const [ showAll, setShowAll ] = useState(true)
    const [ error, setError ] = useState(null)
    const [ user, setUser ] = useState(null)
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')

    useEffect(() => {
        noteService
            .getAll()
            .then(notesList => {
                setNotes(notesList)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
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

    const noteHandler = (evt) => {
        setNewNote(evt.target.value)
    }

    const noteForm = () => {
        const addNote = (evt) => {
            evt.preventDefault();
            const noteObject = {
                content: newNote,
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

        return(
            <form onSubmit={ addNote }>
                <input value={ newNote } onChange={ noteHandler } />
                <button type="submit">tallenna muistiinpano</button>
            </form>
        )
    }

    return (
        <div>
            <h1>Muistiinpanot</h1>
            {
                user === null ?
                    <Login username={ username } setUsername={ setUsername } password={ password } setPassword={ setPassword } user={ user } setUser={ setUser } setError={ setError } />
                : <div>Logged in as { user.name }</div>
            }
            <Notification message={ error } />
            <div>
                <button onClick={ () => setShowAll(!showAll) }>
                    näytä { showAll ? 'vain tärkeät' : 'kaikki' }
                </button>
            </div>
            <ul>
                { rows() }
            </ul>
            { user !== null && noteForm() }
            { user !== null && <Logout setUser={ setUser } /> }
        </div>
    )
}

export default App
