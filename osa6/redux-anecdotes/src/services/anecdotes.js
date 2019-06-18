import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const findById = async (id) => {
    const response = await axios.get(baseUrl)
    return response.data.find(a => a.id === id)
}

const voteAnecdote = async (id) => {
    const anecdote = await findById(id)
    const updatedAnecdote = {
        ...anecdote, votes: anecdote.votes + 1
    }
    const response = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response.data
}

export default { getAll, createNew, voteAnecdote }
