const generateMessage = (text) => {
    const date = new Date()
    return {
        text,
        createAt: "Date: " + date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()
    }
}

const generateLocalMessage = (url) => {
    const date = new Date()
    return {
        url,
        createAt: "Date: " + date.getDate() +
            "/" + (date.getMonth() + 1) +
            "/" + date.getFullYear() +
            " " + date.getHours() +
            ":" + date.getMinutes() +
            ":" + date.getSeconds()
    }
}

module.exports = {
    generateMessage,
    generateLocalMessage
}