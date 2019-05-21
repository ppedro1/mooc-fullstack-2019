require('dotenv').config()

const PORT = process.env.PORT

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Contact = require('./models/contact')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/info', (req, res) => {
    Contact.countDocuments({})
    .then(count => {
        const date = new Date()
        res.status(200)
        .send(`<h1>Puhelinluettelo API v0.12345678</h1><p>Tietokannassa on ${ count } kontaktia.</p><p>${ date }</p>`)
    })
})

app.get('/api/persons', (req, res) => {
    Contact.find({}).then(result => {
        res.json(result)
    })
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then(response => {
        console.log('Added new contact to database: ' + contact.name + ' - ' + contact.number)
        res.json(response)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id)
    .then(contact => {
        if (contact) {
            res.json(contact.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const id = req.params.id

    const newObject = {
        name: body.name,
        number: body.number
    }

    Contact.findByIdAndUpdate(id, newObject, { new: true })
    .then(updatedNote => {
        res.json(updatedNote.toJSON())
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    const userID = req.params.id
    var userName, userNumber;

    Contact.findByIdAndRemove(userID)
    .then(result => {
        res.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {

    console.log(error.name)
    console.log(error.message)

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: error.message
        })
    }

    next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`)
})
