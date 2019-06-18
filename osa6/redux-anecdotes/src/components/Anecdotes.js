import React from 'react'
import { connect } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setNotificationAction, resetNotificationAction } from '../reducers/notificationReducer'

const Anecdotes = (props) => {
    const voteAnecdote = (id) => () => {
        props.voteAction(id)
        props.setNotificationAction('Vote added!')
        setTimeout(() => {
            props.resetNotificationAction()
        }, 5000)
    }

    const rows = props.visibleAnecdotes.map(anecdote => {
        return(
            <div key={ anecdote.id }>
                <div>
                    { anecdote.content }
                </div>
                <div>
                    has { anecdote.votes }
                    <button onClick={ voteAnecdote(anecdote.id) }>vote</button>
                </div>
            </div>
        )
    })

    return(
        <div>
            <h2>Anecdotes</h2>
            { rows }
        </div>
    )
}

const anecdotesToShow = ({ anecdotes, filter }) => {
    if (filter !== '') {
        return anecdotes.filter(anecdote => anecdote.content.includes(filter)).sort((a, b) => b.votes-a.votes)
    }
    return anecdotes.sort((a, b) => b.votes-a.votes)
}

const mapStateToProps = (state) => {
    return {
        visibleAnecdotes: anecdotesToShow(state)
    }
}

const mapDispatchToProps = {
    voteAction,
    setNotificationAction,
    resetNotificationAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)
