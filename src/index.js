const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)


const publicPath = path.join(__dirname, '/../public')
app.use(express.static(publicPath))

io.on('connection', () => {
    console.log('new connection connected')
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})