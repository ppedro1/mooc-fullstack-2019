require('dotenv').config()
const cors = require('cors')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const Note = require('./models/note')
const port = process.env.PORT

app.use(cors())
app.use(bodyParser.json())

app.get('/api', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
      res.json(notes.map(note => note.toJSON()))
    })
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    Note.findById(id).then(note => {
      res.json(note.toJSON())
    })
})

app.post('/api/notes', (req, res) => {
    const body = req.body

    if (body.content === undefined) {
        return res.status(400).json({
            error: 'content missing'
        })
    }

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })

    note.save().then(savedNote => {
      res.json(savedNote.toJSON)
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id)

    res.status(204).end();
})

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})
