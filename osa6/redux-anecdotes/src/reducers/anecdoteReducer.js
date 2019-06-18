import anecdoteService from '../services/anecdotes'

export const voteAction = (id) => {
    return async dispatch => {
        await anecdoteService.voteAnecdote(id)
        dispatch({
            type: 'VOTE_ANECDOTE',
            data: {
                id: id
            }
        })
    }
}

export const initializeAnecdotes = (content) => {
    return async  dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export const newAnecdoteAction = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

const anecdoteReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_ANECDOTES':
            return action.data
        case 'NEW_ANECDOTE':
            return state.concat(action.data)
        case 'VOTE_ANECDOTE':
            const id = action.data.id
            const anecdoteById = state.find(a => a.id === id)
            const changedAnecdote = {
                ...anecdoteById, votes: anecdoteById.votes + 1
            }

            return state.map(anecdote => anecdote.id === id ? changedAnecdote : anecdote)
        default:
            return state
    }
}

export default anecdoteReducer
