const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let notes = [
    {
      "id": 1,
      "content": "HTML on helppoa",
      "date": "2019-01-10T17:30:31.098Z",
      "important": true
    },
    {
      "id": 2,
      "content": "Selain pystyy suorittamaan vain javascriptiä",
      "date": "2019-01-10T18:39:34.091Z",
      "important": false
    },
    {
      "id": 3,
      "content": "HTTP-protokollan tärkeimmät metodit ovat GET ja POST",
      "date": "2019-01-10T19:20:14.298Z",
      "important": false
    },
    {
      "id": 4,
      "content": "ägägägägägägää",
      "date": "2019-03-22T11:01:34.238Z",
      "important": true,
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/notes', (req, res) => {
    res.json(notes)
})

app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find(a => a.id === id)
    if (note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
})

const generateId = () => {
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0

    return maxId + 1
}

app.post('/notes', (req, res) => {
    if (!body.content) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes = notes.concat(note)

    res.json(note)
})

app.delete('/notes/:id', (req, res) => {
    const id =Number(req.params.id);
    notes = notes.filter(note => note.id !== id)

    res.status(204).end();
})

const port = 3001

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})
