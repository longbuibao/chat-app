const socket = io()
socket.on('message', (message) => {
    console.log(message)
})
document.querySelector('#sendMessage').addEventListener('click', (target) => {
    const message = document.querySelector('#message').value;
    socket.emit('sent message', message)
})