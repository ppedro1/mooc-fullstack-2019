import React from 'react';
import Anecdotes from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Notification from './components/Notification'
import FilterAnecdotes from './components/FilterAnecdotes'

const App = (props) => {

return (
    <div>
        <Notification />
        <FilterAnecdotes />
        <Anecdotes />
        <NewAnecdote />
    </div>
    )
}

export default App
