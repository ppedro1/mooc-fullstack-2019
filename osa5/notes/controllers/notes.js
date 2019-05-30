const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

notesRouter.get('/', async (req, res) => {
    const notes = await Note.find({}).populate('user', { id: 1, username: 1, name: 1 })
    res.json(notes.map(note => note.toJSON()))
})

notesRouter.post('/', async (req, res, next) => {
    const body = req.body
    const token = req.token

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const note = new Note({
            content: body.content,
            important: body.important || false,
            date: new Date(),
            user: user._id
        })

        const savedNote = await note.save()
        user.notes = user.notes.concat(savedNote._id)
        await user.save()
        res.json(savedNote.toJSON())
    } catch(exception) {
        next(exception)
    }
})

notesRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id
    console.log('kakkaa: ', id)
    try {
        const note = await Note.findById(id)
        if (note) {
            res.json(note.toJSON())
        } else {
            res.status(404).end()
        }
    } catch(exception) {
        next(exception)
    }
})

notesRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id

    try {
        await Note.findByIdAndRemove(id)
        res.status(204).end()
    } catch(exception) {
        next(exception)
    }
})

notesRouter.put('/:id', async (req, res, next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important
    }

    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
        res.json(updatedNote.toJSON())
    } catch(exception) {
        next(exception)
    }
})

module.exports = notesRouter
