require('dotenv').config()

const PORT = process.env.PORT

const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const Contact = require('./models/contact')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/persons', (req, res) => {
    Contact.find({}).then(result => {
        res.json(result)
    })
})

app.post('/persons', (req, res) => {
    const body = req.body

    if (!body.number || !body.name) {
        res.status(400).json({
            error: 'missing either number or name'
        })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then(response => {
        console.log('Added new contact to database: ' + contact.name + ' - ' + contact.number)
        res.json(response)
    })
})

app.get('/persons/:id', (req, res) => {
    Contact.findById(req.params.id)
    .then(contact => {
        if (contact) {
            res.json(contact.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => {
        console.log(error)
        res.status(404).end()
    })
})

app.delete('/persons/:id', (req, res) => {
    const userID = req.params.id
    var userName, userNumber;

    if (!userID) {
        res.status(400).json({
            error: 'id missing'
        })
    }

    Contact.find({ id: userID }).then((response) => {
        userName = response.name
        userNumber = response.number
    })

    Contact.findByIdAndDelete(userID, (error) => {
        if (error) {
            res.status(400).json({
                error: error
            })
        }

        console.log('deleted contact with id: ' + userID)

        res.status(200).json({
            id: userID,
            name: userName,
            number: userNumber
        })
    })
})

app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`)
})
