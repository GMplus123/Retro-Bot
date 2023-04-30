require("dotenv").config();
const package = require("./package.json");
const { token } = process.env;
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});
client.commands = new Collection();
client.buttons = new Collection();
client.commandArray = [];
client.colour = "80dfff";
client.version = package.version;

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

//Listen for dms
client.on("messageCreate", async (message) => {

    if (message.guild) return;
    if (message.author.client) return;

    //Log the message to the console
    console.log(
        chalk.green(
            `Message recieved: ${message.author.tag}: ${message.content}`
        )
    );
});



client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);