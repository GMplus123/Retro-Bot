const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("about")
        .setDescription("Return message with info about the bot!"),

    async execute(interaction, client) {
        const button = new ButtonBuilder()
            .setURL('https://github.com/Ebsku/Cafe-Waiter')
            .setLabel('Github')
            .setStyle(ButtonStyle.Link);
            

        const embed = new EmbedBuilder()
            .setColor(client.colour)
            .setTitle('**About me**')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setDescription("RetroBot Is A Bot Developed By Ebsku#0949 The bot could do commands and lots of more cool things.")
            .addFields([
            {
                name: '**Version**',
                value: `${client.version}`,
                inline: true

            },
            {
                name: '**Author**',
                value: 'TheRetro#5961',
            }
            ]);

        await interaction.reply({
            embeds: [embed],
            //components: [new ActionRowBuilder().addComponents(button)]
        });
    }        
}