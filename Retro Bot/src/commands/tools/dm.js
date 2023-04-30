const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Direct message a user!")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user to dm!")
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("The message to send!")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages),

    async execute(interaction, client) {
        const user = interaction.options.getUser("user");

        const modmail = client.channels.cache.get("1102160118377885788");
        
        user.send(interaction.options.getString("message")).catch(
            console.error
        );
        console.log(
            chalk.cyan(
                `Message sent to ${user.tag}: ${interaction.options.getString(
                    "message"
                )}`
            )
        );

        const embed = new EmbedBuilder()
        .setColor(client.colour)
        .setTitle("Response sent!")
        .setDescription(interaction.options.getString("message"))
        .setTimestamp(Date.now())
        .setAuthor({
            name: interaction.user.tag,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true })
        });

        modmail.send({
            embeds: [embed],
        });

        await interaction.reply({
            content: `Message sent succesfully!`,
            ephemeral: true,
        });
    },
};
