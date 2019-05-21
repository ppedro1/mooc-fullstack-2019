import axios from 'axios'

const dbUrl = 'http://localhost:3001/api/persons'

const getDir = () => {
    const req = axios.get(dbUrl)
    return req.then(response => {
        return response.data
    })
}

const insert = (newObject) => {
    const req = axios.post(dbUrl, newObject)
    return req.then(response => response.data )
}

const update = (id, newObject) => {
    const req = axios.put(`${dbUrl}/${id}`, newObject)
    return req.then(response => response.data)
}

const delNum = (id) => {
    const req = axios.delete(`${dbUrl}/${id}`)
    return req.then(response => response.data)
}

export default { getDir, insert, update, delNum }
