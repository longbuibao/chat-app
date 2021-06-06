const express = require('express')
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const { generateMessage, generateLocalMessage } = require('./utils/message')
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
} = require('./utils/users')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicPath = path.join(__dirname, '/../public')
app.use(express.static(publicPath))

io.on('connection', (socket) => {

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('message', generateMessage(`${message}`, user.username))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user)
            io.to(user.room).emit('message', generateMessage(`${user.username} has left👐👐`, '🦁Administrator🦊'))

    })

    socket.on('sendLocation', (position, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage',
            generateLocalMessage(`https://google.com/maps?q=${position.long},${position.lat}`, user.username)
        )
        callback()
    })

    socket.on('join', ({ username, room }, callback) => {

        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage(`Welcome ${user.username}👋👋👋`, '🦁Administrator🦊'))
        socket.broadcast.to(user.room).emit('message', generateMessage(`${username} has join 👦👧👋👋👋!`, '🦁Administrator🦊'))

        callback()
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}👍`)
})