let anecdotes = [
    {
        id: 1,
        content: 'If it hurts, do it more often',
        votes: 0
    },
    {
        id: 2,
        content: 'Adding manpower to a late software project makes it later!',
        votes: 5
    },
    {
        id: 3,
        content: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        votes: 2

    },
    {
        id: 4,
        content: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        votes: 0
    },
    {
        id: 5,
        content: 'Premature optimization is the root of all evil.',
        votes: 10
    },
    {
        id: 6,
        content: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        votes: 0
    }
]

const getId = () => (100000 * Math.random()).toFixed(0)

export const voteAction = (id) => {
    return {
        type: 'VOTE_ANECDOTE',
        data: {
            id: id
        }
    }
}

export const newAnecdoteAction = (content) => {
    return {
        type: 'NEW_ANECDOTE',
        data: {
            id: getId(),
            content: content,
            votes: 0
        }
    }
}

const anecdoteReducer = (state = anecdotes, action) => {
    switch (action.type) {
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
