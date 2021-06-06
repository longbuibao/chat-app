const socket = io()
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButtton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')
const $message = document.querySelector('#messages')


const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createAt: message.createAt,
        username: message.username
    })
    $message.insertAdjacentHTML('beforeend', html)
})

socket.on('locationMessage', (locationLink) => {
    const html = Mustache.render(locationTemplate, {
        link: locationLink.url,
        createAt: locationLink.createAt,
        username: locationLink.username
    })
    $message.insertAdjacentHTML('beforeend', html)
})

$messageForm.addEventListener('submit', (target) => {
    target.preventDefault()

    const message = $messageFormInput.value
    $messageFormButtton.setAttribute('disabled', 'disabled')

    socket.emit('sendMessage', message, (err) => {
        $messageFormInput.value = ''
        $messageFormInput.focus()
        $messageFormButtton.removeAttribute('disabled')
        if (err) {
            return console.log(err)
        }
    })
})

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Your browser does not support geolocation')
    }
    $locationButton.setAttribute('disabled', 'disabeled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            long: position.coords.latitude,
            lat: position.coords.longitude
        }, () => {
            console.log('Shared location!')
            $locationButton.removeAttribute('disabled')
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

socket.on('roomData', (roomData) => {
    const html = Mustache.render(sidebarTemplate, {
        room: roomData.room,
        users: roomData.users
    })
    document.querySelector('#chat__sidebar').innerHTML = html
})