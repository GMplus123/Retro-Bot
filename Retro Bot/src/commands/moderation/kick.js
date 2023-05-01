const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user from the server!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to kick!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the kick!")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMembers),

  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason specified.";

    await user.send(
      "You've been kicked from " +
        interaction.guild.name +
        "\nReason: " +
        reason
    );

    await member.kick(reason).catch(console.error);

    await interaction.reply({
      content: "Kicked " + user.tag + "for " + reason,
      ephemeral: true,
    });
  },
};
