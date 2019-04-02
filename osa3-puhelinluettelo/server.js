const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        // if method is post, add stringified json
        (tokens.method(req, res) === "POST") ? JSON.stringify(req.body) : ''
    ].join(' ')
}))

let directory = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "014-2344444"
    },
    {
        id: 2,
        name: "Arto Järvinen",
        number: "053-3235555"
    },
    {
        id: 3,
        name: "Lea Kutvonen",
        number: "433-4455544"
    }
]

// root route
app.get('/api/', (req, res) => {
    res.send('<h1>Puhelinluettelo API root</h1>')
})

// API info
app.get('/info', (req, res) => {
    const date = new Date();
    res.send(`<h1>Puhelinluettelo API info</h1>
              <p>Puhelinluettelossa ${directory.length} kontaktia</p>
              <p>${date}</p>`)
})

// actions regarding the whole directory
app.get('/api/persons', (req, res) => {
    res.json(directory)
})

// a bit extra (unneccessary) work but,
// lets be sure the new random generated id isn't in the directory
const newID = () => {
    let rndID;
    while (1 > 0) {
        rndID = Math.floor(Math.random() * 200);
        let inList = directory.find(a => a.id === rndID)
        if (!inList) {
            return rndID;
        }
    }
}

app.post('/api/persons', (req, res) => {
    const body = req.body
    if (directory.find(a => a.name === body.name)) {
        return res.status(409).json({
            error: 'nimi löytyy jo luettelosta'
        })
    }
    else if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'nimi ja/tai numero puuttuu'
        })
    }
    const id = newID();
    const newPerson = {
        id: id,
        name: body.name,
        number: body.number
    }
    directory = directory.concat(newPerson)
    return res.status(201).json({
        message: 'kontakti lisätty'
    })
})

// actions regarding one person
app.get('/api/persons/:id', (req, res) => {
    const person = directory.find(p => p.id === Number(req.params.id))
    if (person) {
        res.json(person)
    } else {
        res.status(404).json({
            error: 'kontaktia kyseisellä id:llä ei löydy'
        })
    }
})
app.delete('/api/persons/:id', (req, res) => {
    const findPerson = directory.find(a => a.id === Number(req.params.id))
    if (findPerson) {
        directory = directory.filter(a => a.id !== Number(req.params.id))
        res.status(200).json({
            message: 'kontakti poistettu'
        })
    } else {
        res.status(404).json({
            error: 'kontaktia ei löydy'
        })
    }
})

// 404 route
app.get('*', (req, res) => {
    res.status(404).json({
        error: '404 hakemaasi resurssia ei löydy'
    })
})

const port = 3001
app.listen(port, () => {
    console.log('server is running in port ', port)
})
