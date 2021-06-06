const generateMessage = (text, username) => {
    const date = new Date()
    return {
        username,
        text,
        createAt: date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()
    }
}

const generateLocalMessage = (url, username) => {
    const date = new Date()
    return {
        username,
        url,
        createAt: date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()
    }
}

module.exports = {
    generateMessage,
    generateLocalMessage
}