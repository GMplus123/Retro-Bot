require("dotenv").config();
const package = require("../package.json");
const { token } = process.env;
const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");

const client = new Client({
    partials: [
        Partials.Message,
        Partials.Channel,
    ],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.Guilds,
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

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);