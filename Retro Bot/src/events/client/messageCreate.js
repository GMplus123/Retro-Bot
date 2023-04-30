const { client } = require("discord");
const { EmbedBuilder, DMChannel } = require("discord.js");
const chalk = require("chalk");


module.exports = {
    name: "messageCreate",
    async execute(message, client) {


        if (message.author.bot) return; 
        
        //Listen for DMs
        if (!message.guild) {      
            const modmail = client.channels.cache.get("1102160118377885788");
    
            //Log the message to the console
            console.log(
                chalk.green(
                    `Message recieved from: ${message.author.tag}: ${message.content}`
                )
            );

            message.reply("Your message has been sent to the moderators!")
    
            //Send the message to the modmail channel

            const embed = new EmbedBuilder()
                .setColor(client.colour)
                .setTitle("Modmail received!")
                .setDescription(message.content)
                .setTimestamp(Date.now())
                .setAuthor({
                    name: message.author.tag,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                });


            modmail.send({
                embeds: [embed],
            });
        }

    },
};