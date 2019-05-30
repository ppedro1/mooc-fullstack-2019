const app = require('./app')
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)

console.log(config)

server.listen(config.PORT, () => {
    console.log(`Express is running on port: ${ config.PORT }`)
})
