require('dotenv').config()
const cors = require('cors')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const Note = require('./models/note')
const port = process.env.PORT

app.use(express.static('build'))
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

app.get('/api/notes/:id', (req, res, next) => {
    const id = req.params.id
    Note.findById(id).then(note => {
        if (note) {
            res.json(note.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => { next(error) })
})

app.post('/api/notes', (req, res, next) => {
    const body = req.body

    const note = new Note({
      content: body.content,
      important: body.important || false,
      date: new Date(),
    })

    note.save()
    .then(savedNote => savedNote.toJSON())
    .then(formattedNote => {
        res.json(formattedNote)
    })
    .catch(error => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
    const id = req.params.id

    Note.findByIdAndRemove(id)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => {
        next(error)
    })
})

app.put('/api/notes/:id', (req, res, next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then(updatedNote => {
        res.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
    console.log(error.name)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running in port ${port}`)
})
