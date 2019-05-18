const mongoose = require('mongoose')

if ( process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://peetupa:${password}@cluster0-qc1of.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length > 3) {
    var name = process.argv[3]
    var number= process.argv[4]

    const contact = new Contact({
        name: name,
        number: number,
    })

    contact.save().then(response => {
        console.log(`lisätään ${name} numero ${number} luetteloon`)
        mongoose.connection.close()
    })
} else {
    Contact.find({}).then(results => {
        console.log('Puhelinluettelo:')
        results.forEach(result => {
            console.log(`${result.name} ${result.number}`)
        })
        mongoose.connection.close()
    })
}
