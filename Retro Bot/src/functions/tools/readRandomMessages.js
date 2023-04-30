const fs = require('fs');
const config = require('../../../config.json')
const messages = require(config.randomMessagesPath)


module.exports = (client) => {
    client.getRandomMessage = () => {
        let randomMessage = messages.messages[Math.floor(Math.random() * messages.messages.length)]
        return randomMessage;
    }
}