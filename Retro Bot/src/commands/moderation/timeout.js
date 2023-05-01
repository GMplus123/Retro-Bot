const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Time a user out")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to time out!")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("The lenght of the time out in minutes!")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the time out!")
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMembers),

  async execute(interaction, client) {
    const user = interaction.options.getUser("user");
    let reason = interaction.options.getString("reason");
    const time = interaction.options.getInteger("time");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    if (!reason) reason = "No reason specified.";

    await user.send(
      "You've been timed out in " +
        interaction.guild.name +
        "\nReason:" +
        reason
    );

    await member.timeout(time * 60 * 1000, reason).catch(console.error);

    await interaction.reply({
      content: "Timed out " + user.tag + " for " + reason,
      ephemeral: true,
    });
  },
};
