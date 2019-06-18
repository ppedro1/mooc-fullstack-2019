import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import FilterAnecdotes from './components/FilterAnecdotes'

import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {

    useEffect(() => {
        props.initializeAnecdotes()
    }, [props])

    return (
        <div>
            <Notification />
            <FilterAnecdotes />
            <Anecdotes />
            <NewAnecdote />
        </div>
        )
}

const mapDispatchToProps = {
    initializeAnecdotes
}

export default connect(null, mapDispatchToProps)(App)
