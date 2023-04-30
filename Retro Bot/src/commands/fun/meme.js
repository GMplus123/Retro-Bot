const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("Return a random meme!"),

    async execute(interaction, client) {

        const getmeme = await fetch('https://meme-api.com/gimme')
        let meme = await getmeme.json();

        let image = meme.preview[3];
        
        const embed = new EmbedBuilder()
            .setColor(client.colour)
            .setTitle(`**Here is your meme!**`)
            .setURL(`${meme.postLink}`)
            .setDescription(`${meme.title}`)
            .setImage(`${image}`)

        await interaction.reply({
            embeds: [embed]
        });
    }
}