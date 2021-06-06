const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const { generateMessage, generateLocalMessage } = require('./utils/message')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicPath = path.join(__dirname, '/../public')
app.use(express.static(publicPath))

io.on('connection', (socket) => {

    socket.on('sendMessage', (message, callback) => {
        io.to('party').emit('message', generateMessage(message))
        callback()
    })

    socket.on('disconnect', () => {
        io.to('party').emit('message', generateMessage('A user has left!'))
    })

    socket.on('sendLocation', (position, callback) => {
        socket.emit('locationMessage',
            generateLocalMessage(`https://google.com/maps?q=${position.long},${position.lat}`)
        )
        callback()
    })

    socket.on('join', ({ username, room }) => {
        socket.join(room)
        socket.emit('message', generateMessage('Welcome 👋👋👋'))
        socket.broadcast.to(room).emit('message', generateMessage(`${username} has join 👦👧👋👋👋!`))
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}👍`)
})