const { client } = require("discord");

module.exports = {
    name: "messageCreate",
    async execute(message, client) {
        const tag = "<@!1101950102656000182>"
        
        if (message.author.bot) return;

        if (message.content.contains(tag)) {
            console.log("Test")
        }

    },
};