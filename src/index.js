const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const Filter = require('bad-words')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicPath = path.join(__dirname, '/../public')
app.use(express.static(publicPath))

io.on('connection', (socket) => {
    const filter = new Filter()
    socket.emit('message', 'Welcome!')

    socket.broadcast.emit('message', 'A user has join!')

    socket.on('sendMessage', (message, callback) => {
        message = filter.clean(message)
        io.emit('message', message)
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })

    socket.on('sendLocation', (position, callback) => {
        socket.emit('locationMessage',
            `https://google.com/maps?q=${position.long},${position.lat}`
        )
        callback()
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}👍`)
})