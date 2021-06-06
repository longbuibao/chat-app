const users = []

const addUser = ({ id, username, room }) => {
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    if (!username || !room) {
        return {
            error: 'you must provide username and room'
        }
    }

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if (existingUser) {
        return {
            error: 'username is in use'
        }
    }

    const user = {
        id,
        username,
        room
    }
    users.push(user)
    return user
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index != -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    const user = users.find(user => user.id === id)
    return user
}

const getUsersInRoom = (roomName) => {
    const usersInRoom = []
    users.forEach(user => {
        if (user.room === roomName) {
            usersInRoom.push(user)
        }
    })
    return usersInRoom
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}