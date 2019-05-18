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


app.listen(PORT, () => {
    console.log(`app running in port ${PORT}`)
})
