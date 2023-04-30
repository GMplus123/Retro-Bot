const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const chalk = require("chalk");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("dm")
        .setDescription("Direct message an user!")
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

        await interaction.reply({
            content: `Message sent succesfully!`,
            ephemeral: true,
        });
    },
};
