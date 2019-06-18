import React from 'react'
import { connect } from 'react-redux'
import { newAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotificationAction, resetNotificationAction } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {

    const newAnecdote = (evt) => {
        evt.preventDefault()
        const content = evt.target.anecdote.value
        props.newAnecdoteAction(content)
        props.setNotificationAction('New anecdote added!')
        setTimeout(() => {
            props.resetNotificationAction()
        }, 5000)
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
    setNotificationAction,
    resetNotificationAction
}

export default connect(null, mapDispatchToProps)(NewAnecdote)
