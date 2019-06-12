import React, { useState, useEffect } from 'react'
import noteService from './services/notes'
import loginService from './services/login'

import Note from './components/Note'
import Login from './components/Login'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import NoteForm from './components/NoteForm'

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

    // refs
    const noteFormRef = React.createRef()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log(`${username} // ${password}`)
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exception) {
            setError('käyttäjätunnus tai salasana väärin')
            setTimeout(() => {
                setError(null)
            }, 2500)
        }
    }

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

    const handleNoteChange = (evt) => {
        setNewNote(evt.target.value)
    }

    const addNote = (evt) => {
        evt.preventDefault()
        noteFormRef.current.toggleVisibility()
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

    const LoginForm = () => {
        return(
            <Togglable buttonLabel="kirjaudu">
                <Login setUsername={ setUsername }
                       username={ username }
                       setPassword={ setPassword }
                       password={ password }
                       setUser={ setUser }
                       user={ user }
                       setError={ setError }
                       error={ error }
                       handleSubmit={ handleLogin }
                       />
            </Togglable>
        )
    }

    const NewNote = () => {
        return(
            <Togglable buttonLabel="new note" ref={ noteFormRef }>
                <NoteForm
                    onSubmit={ addNote }
                    value={ newNote }
                    handleChange={ handleNoteChange }
                    />
            </Togglable>
        )
    }

    return (
        <div>
            <h1>Muistiinpanot</h1>
            <Notification message={ error } />
            { user === null && LoginForm() }
            <div>
                <button onClick={ () => setShowAll(!showAll) }>
                    näytä { showAll ? 'vain tärkeät' : 'kaikki' }
                </button>
            </div>
            <ul>
                { rows() }
            </ul>
            { user !== null && NewNote() }
            { user !== null && <Logout setUser={ setUser } /> }
        </div>
    )
}

export default App
