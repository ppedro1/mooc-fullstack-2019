import React from 'react'
import { connect } from 'react-redux'
import { newAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

    const newAnecdote = (evt) => {
        evt.preventDefault()
        const content = evt.target.anecdote.value
        evt.target.anecdote.value = ''
        props.newAnecdoteAction(content)
        props.setNotification(`New anecdote added!`, 10)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={ newAnecdote }>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    newAnecdoteAction,
    setNotification
}

export default connect(null, mapDispatchToProps)(NewAnecdote)
