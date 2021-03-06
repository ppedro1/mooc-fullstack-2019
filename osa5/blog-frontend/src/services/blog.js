import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setToken = (newToken) => {
    token = `bearer ${ newToken }`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const insert = (newBlog) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.post(baseUrl, newBlog, config)
    return request.then(response => response.data)
}

const update = (id, updatedBlog) => {
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.put(`${baseUrl}/${id}`, updatedBlog, config)
    return request.then(response => response.data)
}

const deleteBlog = (id) => {
    console.log('service: ', id)
    const config = {
        headers: { Authorization: token }
    }
    const request = axios.delete(`${baseUrl}/${id}`, config)
    return request.then(response => response.data)
}

export default {
    getAll,
    insert,
    update,
    deleteBlog,
    setToken
}
